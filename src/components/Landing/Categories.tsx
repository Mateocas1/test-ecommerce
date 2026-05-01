import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Link } from "react-router-dom"

gsap.registerPlugin(ScrollTrigger)

const categories = [
  { label: "Procesadores", slug: "processors", glyph: "01" },
  { label: "Motherboards", slug: "motherboards", glyph: "02" },
  { label: "Gráficas", slug: "graphics-cards", glyph: "03" },
  { label: "Memoria RAM", slug: "memory", glyph: "04" },
  { label: "Almacenamiento", slug: "storage", glyph: "05" },
  { label: "Refrigeración", slug: "cooling", glyph: "06" },
  { label: "Monitores", slug: "monitors", glyph: "07" },
  { label: "Periféricos", slug: "peripherals", glyph: "08" },
]

export default function Categories() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 75%",
        onEnter: () => {
          if (titleRef.current) {
            gsap.fromTo(
              titleRef.current.children,
              { y: 30, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" }
            )
          }
          if (gridRef.current) {
            gsap.fromTo(
              gridRef.current.children,
              { y: 40, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.5,
                stagger: 0.06,
                ease: "power2.out",
              }
            )
          }
        },
        once: true,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div ref={titleRef} className="mb-16">
          <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-text-tertiary">
            Categorías
          </span>
          <h2 className="font-display text-5xl sm:text-6xl mt-4 text-text leading-[1.1]">
            Explorá por
            <br />
            <span className="italic text-accent-text">Componente</span>
          </h2>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-px bg-border"
        >
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              to={`/products?category=${cat.slug}`}
              className="group relative bg-surface p-8 transition-all duration-500 hover:bg-surface-elevated"
            >
              <span className="font-mono text-[10px] text-text-tertiary tracking-wider">
                {cat.glyph}
              </span>
              <h3 className="mt-6 text-sm font-medium text-text transition-colors duration-300 group-hover:text-accent-text">
                {cat.label}
              </h3>
              <div className="mt-4 h-px w-8 bg-border transition-all duration-500 group-hover:w-16 group-hover:bg-accent/50" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
