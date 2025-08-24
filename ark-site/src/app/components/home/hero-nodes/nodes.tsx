'use client'

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import type { PanInfo } from 'framer-motion';

const MOBILE_OFFSETS: Record<string, { x: number; y: number }> = {
    "node1": {
        "x": -8.63232421875,
        "y": -149.05014038085938
      },
      "node2": {
        "x": 124.17130279541016,
        "y": -212.63861083984375
      },
      "node3": {
        "x": 256.96705627441406,
        "y": 65.45361328125
      },
      "node4": {
        "x": 172.28791427612305,
        "y": 16.58172607421875
      },
      "node5": {
        "x": 88.91712188720703,
        "y": -8.731109619140625
      },
      "node6": {
        "x": -95.42599487304688,
        "y": 52.43182373046875
      },
      "node7": {
        "x": 110.23728013038635,
        "y": -132.21270751953125
      },
      "node8": {
        "x": -183.21739318966866,
        "y": -35.64508056640625
      },
      "node9": {
        "x": -134.33904457092285,
        "y": 76.82684326171875
      }
};

// Design-time base container size (iPhone 12 Pro): width ~390px, height matches h-[20rem] = 320px
const DESIGN_BASE = { width: 390, height: 320 } as const;

type NodeId = keyof typeof MOBILE_OFFSETS;

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mql = window.matchMedia('(max-width: 767px)');
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    setIsMobile(mql.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);
  return isMobile;
}

interface NodeProps {
  id: keyof typeof MOBILE_OFFSETS;
  image: string;
  alt: string;
  width: number;
  height: number;
  wrapperClass: string;
  cardSizeClass: string;
  tooltipPlacement?: 'top' | 'bottom';
  mobilePos: { x: number; y: number };
  editMode?: boolean;
  onDragEnd?: (info: PanInfo) => void;
  priority?: boolean;
}

function Node({ image, alt, width, height, wrapperClass, cardSizeClass, tooltipPlacement = 'top', priority, mobilePos, editMode = false, onDragEnd }: NodeProps) {
  const isMobile = useIsMobile();

  return (
    <div className={`circle absolute ${wrapperClass} transition-all duration-700 ease-in-out group`}>
      <motion.div
        drag={isMobile && !!editMode}
        dragMomentum={false}
        style={{ x: isMobile ? mobilePos.x : 0, y: isMobile ? mobilePos.y : 0 }}
        onDragEnd={(e, info) => onDragEnd?.(info)}
      >
        <div className={`node-card rounded-2xl bg-white hover:bg-accent/20 transition-colors duration-700 ring-2 ring-gray-200 ring-offset-2 ring-offset-white p-1.5 md:p-2 shadow-lg ${cardSizeClass} transition-opacity duration-700 ease-in-out origin-center scale-110 hover:scale-115 hover:shadow-2xl group-hover/minimap:opacity-60 hover:!opacity-100`}>
          <div className="overflow-hidden rounded-xl w-full h-full">
            <Image 
              src={image}
              alt={alt}
              width={width}
              height={height}
              className="object-cover w-full h-full scale-105"
              priority={priority}
            />
          </div>
        </div>
        <div className={`absolute opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out bg-white p-2 rounded-md shadow-md left-1/2 -translate-x-1/2 ${tooltipPlacement === 'bottom' ? '-bottom-10' : '-top-9'} whitespace-nowrap text-xs font-medium`}>
          {alt}
        </div>
      </motion.div>
    </div>
  );
}

export default function HeroNodes() {
  const isMobile = useIsMobile();
  const searchParams = useSearchParams();
  const editMode = isMobile && searchParams?.get('editNodes') === '1';
  const [draftOffsets, setDraftOffsets] = useState<Record<NodeId, { x: number; y: number }>>(() => JSON.parse(JSON.stringify(MOBILE_OFFSETS)));
  const [containerSize, setContainerSize] = useState<{ width: number; height: number } | null>(null);
  const [baseSize] = useState<{ width: number; height: number }>(DESIGN_BASE);

  const getPos = (id: NodeId) => (editMode ? draftOffsets[id] : MOBILE_OFFSETS[id]);
  const handleDragEnd = (id: NodeId) => (info: PanInfo) => {
    setDraftOffsets(prev => {
      const next = {
        ...prev,
        [id]: {
          x: prev[id].x + (info?.offset?.x || 0),
          y: prev[id].y + (info?.offset?.y || 0),
        },
      } as Record<NodeId, { x: number; y: number }>;
      try {
        console.log('[HeroNodes] Updated', id, next[id]);
        console.log('[HeroNodes] Copy these offsets into MOBILE_OFFSETS:', JSON.stringify(next, null, 2));
      } catch {}
      return next;
    });
  };

  useEffect(() => {
    const ro = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      setContainerSize({ width, height });
    });
    const el = document.getElementById('hero-nodes-container');
    if (el) {
      ro.observe(el);
    }
    return () => ro.disconnect();
  }, []);

  const sx = containerSize ? containerSize.width / baseSize.width : 1;
  const sy = containerSize ? containerSize.height / baseSize.height : 1;

  return (
    <div id="hero-nodes-container">
      <Node id="node1" image="/images/housekeep-1.png" alt="Housekeeping NC II" width={256} height={256} wrapperClass="bottom-4 right-2 z-40" cardSizeClass="w-24 h-24 md:w-32 md:h-32 lg:w-36 lg:h-36" priority tooltipPlacement="top" mobilePos={getPos('node1')} editMode={editMode} onDragEnd={handleDragEnd('node1')} />
      <Node id="node2" image="/images/bartend-1.png" alt="Food and Beverage Services NC II" width={256} height={256} wrapperClass="bottom-24 md:bottom-48 left-1/2 -translate-x-1/2 z-30" cardSizeClass="w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32" tooltipPlacement="top" mobilePos={getPos('node2')} editMode={editMode} onDragEnd={handleDragEnd('node2')} />
      <Node id="node3" image="/images/tables-1.png" alt="Housekeeping NC II" width={256} height={256} wrapperClass="bottom-16 md:bottom-32 left-6 md:left-12 z-20" cardSizeClass="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28" tooltipPlacement="top" mobilePos={getPos('node3')} editMode={editMode} onDragEnd={handleDragEnd('node3')} />
      <Node id="node4" image="/images/tables-2.png" alt="Food and Beverage Services NC II" width={256} height={256} wrapperClass="bottom-6 md:bottom-10 left-3 md:left-8 z-10" cardSizeClass="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24" tooltipPlacement="top" mobilePos={getPos('node4')} editMode={editMode} onDragEnd={handleDragEnd('node4')} />
      <Node id="node5" image="/images/beds-1.png" alt="Food and Beverage Services NC II" width={256} height={256} wrapperClass="top-10 left-6 md:left-12 z-30" cardSizeClass="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28" tooltipPlacement="bottom" mobilePos={getPos('node5')} editMode={editMode} onDragEnd={handleDragEnd('node5')} />
      <Node id="node6" image="/images/bedsroom-1.png" alt="Housekeeping NC II" width={256} height={256} wrapperClass="top-20 right-10 md:right-16 z-40" cardSizeClass="w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32" tooltipPlacement="bottom" mobilePos={getPos('node6')} editMode={editMode} onDragEnd={handleDragEnd('node6')} />
      <Node id="node7" image="/images/tables-3.png" alt="Food and Beverage Services NC II" width={256} height={256} wrapperClass="top-32 left-24 md:left-40 z-10" cardSizeClass="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24" tooltipPlacement="bottom" mobilePos={getPos('node7')} editMode={editMode} onDragEnd={handleDragEnd('node7')} />
      <Node id="node8" image="/images/beds-2.png" alt="Housekeeping NC II" width={256} height={256} wrapperClass="top-48 right-24 md:right-32 z-20" cardSizeClass="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28" tooltipPlacement="bottom" mobilePos={getPos('node8')} editMode={editMode} onDragEnd={handleDragEnd('node8')} />
      <Node id="node9" image="/images/cr-1.png" alt="Food and Beverage Services NC II" width={256} height={256} wrapperClass="bottom-16 left-1/2 -translate-x-1/2 z-10" cardSizeClass="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24" tooltipPlacement="bottom" mobilePos={getPos('node9')} editMode={editMode} onDragEnd={handleDragEnd('node9')} />
    </div>
  );
}