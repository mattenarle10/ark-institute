import React from 'react'

export default function WhoWeAre() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="font-montserrat text-2xl font-extrabold tracking-tight text-primary sm:text-3xl">Who we are</h2>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <p className="text-base leading-relaxed text-gray-700">
              We pride ourselves on offering <span className="font-semibold text-primary">TESDA-accredited</span> courses tailored for
              students who aspire to excel in their chosen fields and become workforce-ready. Our comprehensive training
              programs are meticulously designed and evaluated by seasoned instructors, ensuring that each student
              receives extensive, hands-on learning experiences. Our commitment to quality education and skill
              development equips every student with the expertise, discipline, and confidence needed for a successful future.
            </p>
          </div>
          <aside className="md:col-span-1">
            <div className="rounded-xl border border-gray-100 bg-primary/5 p-5">
              <p className="text-sm font-semibold uppercase tracking-wide text-primary">At a glance</p>
              <ul className="mt-3 space-y-2 text-sm text-primary">
                <li>TESDA-accredited programs</li>
                <li>Hands-on, practical training</li>
                <li>Career and certification readiness</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
