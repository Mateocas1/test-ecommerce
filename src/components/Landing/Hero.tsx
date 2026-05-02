import { useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowRight, Cpu } from "lucide-react"
import { Button } from "../ui/button"

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const tagRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const bodyRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const decorRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

      tl.fromTo(tagRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 })
        .fromTo(headingRef.current, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, "-=0.3")
        .fromTo(bodyRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.5")
        .fromTo(ctaRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, "-=0.3")
        .fromTo(decorRef.current, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.2 }, "-=1")
        .fromTo(statsRef.current?.children ?? [], { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.08 }, "-=0.5")
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] flex items-center overflow-hidden pt-16"
    >
      {/* Subtle gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.03] via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-accent/[0.015] to-transparent pointer-events-none" />

      {/* Decorative grid */}
      <div className="absolute inset-0 opacity-[0.012] pointer-events-none">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)",
            backgroundSize: "100px 100px",
          }}
        />
      </div>

      <div className="mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-12 py-20 relative z-10 w-full">
        <div className="grid lg:grid-cols-[55%_45%] gap-12 lg:gap-8 items-center">
          {/* Left: Content */}
          <div className="lg:pl-[4vw]">
            <div ref={tagRef} className="mb-8">
              <span className="inline-flex items-center gap-2 border border-accent/15 bg-accent/5 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-accent-text">
                <span className="h-1.5 w-1.5 bg-accent animate-[breathe_2s_ease-in-out_infinite]" />
                Nueva generación 2025
              </span>
            </div>

            <h1
              ref={headingRef}
              className="font-display text-6xl sm:text-7xl lg:text-[8rem] leading-[0.9] tracking-tighter text-text"
            >
              El Hardware
              <br />
              <span className="text-accent-text">Que Merecés</span>
            </h1>

            <p
              ref={bodyRef}
              className="mt-8 max-w-md text-sm leading-relaxed text-text-secondary font-light"
            >
              Componentes premium seleccionados con criterio. Desde la
              arquitectura de silicona hasta el periférico que define tu
              precisión — cada pieza tiene un propósito.
            </p>

            <div ref={ctaRef} className="mt-10 flex flex-wrap gap-3">
              <Link to="/products">
                <Button size="lg" className="gap-2 group">
                  Explorar
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} />
                </Button>
              </Link>
              <Link to="/products?category=graphics-cards">
                <Button variant="outline" size="lg">
                  Gráficas
                </Button>
              </Link>
            </div>
          </div>

          {/* Right: Decorative element */}
          <div ref={decorRef} className="hidden lg:flex items-center justify-center">
            <div className="relative w-[400px] h-[400px]">
              {/* Concentric rings */}
              <div className="absolute inset-0 border border-border animate-[slow-spin_30s_linear_infinite]" />
              <div className="absolute inset-8 border border-border/50 animate-[slow-spin_25s_linear_infinite_reverse]" />
              <div className="absolute inset-16 border border-border/30 animate-[slow-spin_20s_linear_infinite]" />

              {/* Center element */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <div
                    className="flex h-20 w-20 items-center justify-center border border-accent/20 bg-accent/5"
                    style={{ animation: "float 6s ease-in-out infinite" }}
                  >
                    <Cpu className="h-8 w-8 text-accent/60" strokeWidth={1} />
                  </div>
                  <div className="absolute -inset-4 border border-accent/5" style={{ animation: "float 6s ease-in-out infinite 0.5s" }} />
                </div>
              </div>

              {/* Floating dots */}
              <div className="absolute top-4 right-12 h-2 w-2 bg-accent/40 animate-[breathe_3s_ease-in-out_infinite]" />
              <div className="absolute bottom-20 left-8 h-1.5 w-1.5 bg-accent/30 animate-[breathe_4s_ease-in-out_infinite_1s]" />
              <div className="absolute top-1/3 -right-2 h-2.5 w-2.5 bg-accent/20 animate-[breathe_5s_ease-in-out_infinite_0.5s]" />
            </div>
          </div>
        </div>

        {/* Stats bar — asymmetric */}
        <div
          ref={statsRef}
          className="mt-24 grid grid-cols-2 md:grid-cols-4 border-t border-border pt-8 gap-y-8"
        >
          {[
            { value: "12K+", label: "Componentes" },
            { value: "99.9%", label: "Satisfacción" },
            { value: "5 Años", label: "Trayectoria" },
            { value: "24h", label: "Envío" },
          ].map((s, i) => (
            <div key={s.label} className={i === 3 ? "col-span-2 md:col-span-1 text-left md:text-right" : "text-left"}>
              <p className="font-mono text-2xl text-accent-text">{s.value}</p>
              <p className="text-[10px] uppercase tracking-[0.15em] text-text-tertiary mt-1">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
