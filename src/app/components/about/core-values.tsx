import React from 'react'

type ValueCardProps = {
  title: string
  description: string
  iconPath: string
  color: 'primary' | 'accent' | 'blue' | 'orange'
}

const ValueCard = ({ title, description, iconPath, color }: ValueCardProps) => {
  const colorClasses = {
    primary: 'bg-primary/5 border-primary/10 text-primary',
    accent: 'bg-accent/5 border-accent/10 text-accent',
    blue: 'bg-blue-500/5 border-blue-500/10 text-blue-600',
    orange: 'bg-orange-500/5 border-orange-500/10 text-orange-600',
  }

  return (
    <div className={`rounded-xl border p-6 ${colorClasses[color]}`}>
      <div className="mb-4 flex items-center">
        <div className={`mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/80`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" dangerouslySetInnerHTML={{ __html: iconPath }} />
        </div>
        <h3 className="font-montserrat text-lg font-bold">{title}</h3>
      </div>
      <p className="text-sm leading-relaxed opacity-90">{description}</p>
    </div>
  )
}

export default function CoreValues() {
  const values = [
    {
      title: 'Resilience',
      description: 'We cultivate the ability to adapt and thrive in the face of challenges, ensuring our students are prepared to overcome obstacles and succeed in their careers.',
      iconPath: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />',
      color: 'primary' as const,
    },
    {
      title: 'Innovation',
      description: 'We embrace creativity and forward-thinking approaches, continuously enhancing our programs and methods to stay at the forefront of industry advancements.',
      iconPath: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />',
      color: 'accent' as const,
    },
    {
      title: 'Stewardship',
      description: 'We are committed to responsible management of resources, promoting a culture of sustainability, accountability, and ethical practices within our institution and beyond.',
      iconPath: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />',
      color: 'blue' as const,
    },
    {
      title: 'Excellence',
      description: 'We strive for the highest standards in education and training, ensuring our students achieve outstanding results and are well-prepared for professional success.',
      iconPath: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />',
      color: 'orange' as const,
    },
  ]

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="font-montserrat text-2xl font-extrabold tracking-tight text-primary sm:text-3xl">Our Core Values</h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-gray-600">
            These principles guide our approach to education and shape the learning experience at Ark Institute.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => (
            <ValueCard
              key={value.title}
              title={value.title}
              description={value.description}
              iconPath={value.iconPath}
              color={value.color}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
