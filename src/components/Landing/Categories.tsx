import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Link } from "react-router-dom"

gsap.registerPlugin(ScrollTrigger)

const categories = [
  { label: "Procesadores", slug: "processors", glyph: "01", span: "lg:col-span-2 lg:row-span-2" },
  { label: "Gráficas", slug: "graphics-cards", glyph: "02", span: "" },
  { label: "Motherboards", slug: "motherboards", glyph: "03", span: "" },
  { label: "Memoria RAM", slug: "memory", glyph: "04", span: "lg:col-span-2" },
  { label: "Almacenamiento", slug: "storage", glyph: "05", span: "" },
  { label: "Refrigeración", slug: "cooling", glyph: "06", span: "" },
  { label: "Monitores", slug: "monitors", glyph: "07", span: "lg:col-span-2" },
  { label: "Periféricos", slug: "peripherals", glyph: "08", span: "" },
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
              { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" }
            )
          }
          if (gridRef.current) {
            gsap.fromTo(
              gridRef.current.children,
              { y: 50, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.5, stagger: 0.06, ease: "power2.out" }
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

      <div className="mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-12">
        <div ref={titleRef} className="mb-20 lg:mb-28">
          <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-text-tertiary">
            Categorías
          </span>
          <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl mt-4 text-text leading-[0.95] tracking-tighter">
            Explorá por
            <br />
            <span className="text-accent-text">Componente</span>
          </h2>
        </div>

        {/* Bento grid — asymmetric fractional layout */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border"
        >
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              to={`/products?category=${cat.slug}`}
              className={`group relative bg-surface p-6 sm:p-8 lg:p-10 transition-all duration-500 hover:bg-surface-elevated ${cat.span}`}
            >
              <span className="font-mono text-[10px] text-text-tertiary tracking-wider">
                {cat.glyph}
              </span>
              <h3 className="mt-8 text-base sm:text-lg font-medium text-text transition-colors duration-300 group-hover:text-accent-text">
                {cat.label}
              </h3>
              <div className="mt-4 h-px w-6 bg-border transition-all duration-500 group-hover:w-12 group-hover:bg-accent/40" />

              {/* Hover accent line */}
              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-accent transition-all duration-500 group-hover:w-full" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
