import throttle from "lodash.throttle"

import { useUnmount } from "@/hooks/use-unmount"
import { type DependencyList, useMemo } from "react"

interface ThrottleSettings {
  leading?: boolean | undefined
  trailing?: boolean | undefined
}

const defaultOptions: ThrottleSettings = {
  leading: false,
  trailing: true,
}

/**
 * A hook that returns a throttled callback function.
 *
 * @param fn The function to throttle
 * @param wait The time in ms to wait before calling the function
 * @param dependencies The dependencies to watch for changes
 * @param options The throttle options
 */
export function useThrottledCallback<T extends (...args: unknown[]) => unknown>(
  fn: T,
  wait = 250,
  dependencies: DependencyList = [],
  options: ThrottleSettings = defaultOptions
): {
  (this: ThisParameterType<T>, ...args: Parameters<T>): ReturnType<T>
  cancel: () => void
  flush: () => void
} {
  const handler = useMemo(
    () => throttle<T>(fn, wait, options),
    [fn, wait, options, ...dependencies]
  )

  useUnmount(() => {
    handler.cancel()
  })

  return handler
}

export default useThrottledCallback
