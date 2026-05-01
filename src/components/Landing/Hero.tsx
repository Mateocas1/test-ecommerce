import { useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowRight, Cpu, HardDrive } from "lucide-react"
import { Button } from "../ui/button"

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const tagRef = useRef<HTMLDivElement>(null)
  const decorationsRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (tagRef.current) {
        gsap.fromTo(
          tagRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
        )
      }

      if (textRef.current) {
        gsap.fromTo(
          textRef.current.children,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" }
        )
      }

      if (decorationsRef.current) {
        gsap.fromTo(
          decorationsRef.current.children,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1,
            stagger: 0.2,
            ease: "expo.out",
          }
        )
      }

      if (statsRef.current) {
        gsap.fromTo(
          statsRef.current.children,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.08,
            delay: 0.6,
            ease: "power2.out",
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden pt-16"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-bg pointer-events-none" />
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-accent/[0.02] to-transparent pointer-events-none" />

      {/* Decorative grid lines */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none">
        <div className="h-full w-full" style={{
          backgroundImage: 'linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)',
          backgroundSize: '80px 80px'
        }} />
      </div>

      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-24 relative z-10 w-full">
        <div className="relative">
          {/* Decorative elements — brutalist composition */}
          <div
            ref={decorationsRef}
            className="absolute -top-20 right-0 hidden lg:flex flex-col items-end gap-4"
          >
            <div className="h-32 w-1 bg-accent/20" />
            <div className="h-16 w-16 border border-accent/20 flex items-center justify-center">
              <Cpu className="h-6 w-6 text-accent/40" />
            </div>
            <div className="h-24 w-1 bg-accent/10" />
            <div className="h-10 w-10 border border-accent/10 flex items-center justify-center">
              <HardDrive className="h-4 w-4 text-accent/30" />
            </div>
          </div>

          {/* Tag */}
          <div ref={tagRef} className="mb-8">
            <span className="inline-flex items-center gap-2 border border-accent/20 bg-accent/5 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.2em] text-accent-text">
              <span className="h-1.5 w-1.5 bg-accent" />
              Nueva generación 2025
            </span>
          </div>

          {/* Main heading */}
          <div ref={textRef} className="max-w-3xl mb-12">
            <h1 className="font-display text-7xl sm:text-8xl lg:text-9xl leading-[0.9] text-text">
              El Hardware
              <br />
              <span className="italic text-accent-text">Que Merecés</span>
            </h1>
            <p className="mt-10 max-w-xl text-sm leading-relaxed text-text-secondary font-light">
              Componentes premium seleccionados con criterio. Desde la
              arquitectura de silicona hasta el periférico que define tu
              precisión — cada pieza tiene un propósito.
            </p>
          </div>

          {/* CTA */}
          <div className="flex flex-wrap gap-4 mb-20">
            <Link to="/products">
              <Button size="lg" className="gap-3 group">
                <span>Explorar</span>
                <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/products?category=graphics-cards">
              <Button variant="outline" size="lg">
                <span>Gráficas</span>
              </Button>
            </Link>
          </div>

          {/* Stats bar */}
          <div
            ref={statsRef}
            className="grid grid-cols-3 border-t border-border pt-8"
          >
            {[
              { value: "12K+", label: "COMPONENTES" },
              { value: "99.9%", label: "SATISFACCIÓN" },
              { value: "5 AÑOS", label: "TRAYECTORIA" },
            ].map((s) => (
              <div key={s.label} className="text-left">
                <p className="font-display text-4xl text-accent-text italic">
                  {s.value}
                </p>
                <p className="text-[10px] font-medium tracking-[0.2em] text-text-tertiary mt-1">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
