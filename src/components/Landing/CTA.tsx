import { useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowRight } from "lucide-react"
import { Button } from "../ui/button"

gsap.registerPlugin(ScrollTrigger)

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%",
        onEnter: () => {
          const items = sectionRef.current?.querySelectorAll(".cta-item")
          if (!items) return
          gsap.fromTo(
            items,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, stagger: 0.12, ease: "power3.out" }
          )
        },
        once: true,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-accent/[0.02] to-transparent pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="mx-auto max-w-3xl px-6 text-center sm:px-8 lg:px-12">
        <div className="cta-item mb-6">
          <div className="mx-auto h-px w-16 bg-accent/50" />
        </div>

        <h2 className="cta-item font-display text-5xl sm:text-7xl text-text leading-[1.1]">
          ¿Listo para el
          <br />
          <span className="italic text-accent-text">Upgrade?</span>
        </h2>

        <p className="cta-item mx-auto mt-6 max-w-md text-xs leading-relaxed text-text-secondary">
          Cada componente cuenta. Armá la máquina que realmente merecés con el
          hardware más exigente del mercado.
        </p>

        <div className="cta-item mt-10 flex flex-wrap justify-center gap-4">
          <Link to="/products">
            <Button size="lg" className="gap-3 group">
              <span>Comprar ahora</span>
              <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Link>
          <Link to="/products?category=peripherals">
            <Button variant="outline" size="lg">
              Periféricos
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
