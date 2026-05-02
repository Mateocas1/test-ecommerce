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
    <section ref={sectionRef} className="relative py-32 lg:py-40 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-accent/[0.02] to-transparent pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="cta-item mb-6">
              <div className="h-px w-12 bg-accent/40" />
            </div>

            <h2 className="cta-item font-display text-5xl sm:text-6xl lg:text-7xl text-text leading-[0.95] tracking-tighter">
              ¿Listo para el
              <br />
              <span className="text-accent-text">Upgrade?</span>
            </h2>
          </div>

          <div className="lg:pl-12">
            <p className="cta-item text-sm leading-relaxed text-text-secondary max-w-md">
              Cada componente cuenta. Armá la máquina que realmente merecés con el
              hardware más exigente del mercado.
            </p>

            <div className="cta-item mt-8 flex flex-wrap gap-3">
              <Link to="/products">
                <Button size="lg" className="gap-2 group">
                  Comprar ahora
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} />
                </Button>
              </Link>
              <Link to="/products?category=peripherals">
                <Button variant="outline" size="lg">
                  Periféricos
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
