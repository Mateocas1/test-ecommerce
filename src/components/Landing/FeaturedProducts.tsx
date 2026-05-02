import { useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowRight } from "lucide-react"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { useProducts } from "../../hooks/use-products"
import { useCartStore } from "../../store/cart"

gsap.registerPlugin(ScrollTrigger)

const categoryLabels: Record<string, string> = {
  processors: "CPU",
  "graphics-cards": "GPU",
  motherboards: "MOBO",
  memory: "RAM",
  storage: "SSD",
  peripherals: "I/O",
  cooling: "AIO",
  "power-supplies": "PSU",
  monitors: "LED",
}

export default function FeaturedProducts() {
  const { data: products, isLoading } = useProducts()
  const addItem = useCartStore((s) => s.addItem)
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  const featured = products?.slice(0, 4) ?? []

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
              { y: 60, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: "power3.out" }
            )
          }
        },
        once: true,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  if (isLoading) {
    return (
      <section className="py-32">
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className={`border border-border bg-surface p-8 ${
                  i === 0 ? "lg:col-span-7" : i === 1 ? "lg:col-span-5" : i === 2 ? "lg:col-span-5" : "lg:col-span-7"
                }`}
              >
                <div className="h-4 w-16 bg-border animate-pulse mb-6" />
                <div className="h-8 w-3/4 bg-border animate-pulse mb-4" />
                <div className="h-4 w-full bg-border animate-pulse mb-2" />
                <div className="h-4 w-2/3 bg-border animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-12">
        <div ref={titleRef} className="flex items-end justify-between mb-20">
          <div>
            <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-text-tertiary">
              Destacados
            </span>
            <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl mt-4 text-text leading-[0.95] tracking-tighter">
              Selección
              <br />
              <span className="text-accent-text">Premium</span>
            </h2>
          </div>
          <Link
            to="/products"
            className="hidden sm:flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.2em] text-text-tertiary transition-colors duration-300 hover:text-accent-text"
          >
            Ver todo
            <ArrowRight className="h-3 w-3" strokeWidth={1.5} />
          </Link>
        </div>

        {/* Asymmetric grid — NO equal columns */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4"
        >
          {featured.map((product, i) => (
            <div
              key={product.id}
              className={`group border border-border bg-surface p-6 sm:p-8 transition-all duration-500 hover:border-border-hover ${
                i === 0
                  ? "lg:col-span-7"
                  : i === 1
                  ? "lg:col-span-5"
                  : i === 2
                  ? "lg:col-span-5"
                  : "lg:col-span-7"
              }`}
            >
              <div className="mb-6 flex items-start justify-between">
                <Badge>{categoryLabels[product.category] ?? product.category}</Badge>
                <span className="font-mono text-[10px] text-text-tertiary">
                  $
                  {(product.price / 1000)
                    .toFixed(0)
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                </span>
              </div>

              <h3 className="font-display text-xl sm:text-2xl text-text leading-snug mb-3 transition-colors duration-300 group-hover:text-accent-text tracking-tight">
                {product.name}
              </h3>

              <p className="text-xs leading-relaxed text-text-secondary mb-6 line-clamp-2 max-w-[50ch]">
                {product.description}
              </p>

              {product.specs && (
                <div className="mb-6 space-y-1.5 border-t border-border pt-4">
                  {Object.entries(product.specs).slice(0, 3).map(([key, val]) => (
                    <div
                      key={key}
                      className="flex justify-between font-mono text-[10px]"
                    >
                      <span className="text-text-tertiary uppercase tracking-wider">
                        {key}
                      </span>
                      <span className="text-text-secondary">{val}</span>
                    </div>
                  ))}
                </div>
              )}

              <Button
                variant="outline"
                size="sm"
                onClick={() => addItem(product)}
                className="w-full sm:w-auto"
              >
                Agregar
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center sm:hidden">
          <Link to="/products">
            <Button variant="outline" className="gap-2">
              Ver todo
              <ArrowRight className="h-3 w-3" strokeWidth={1.5} />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
