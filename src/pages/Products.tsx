import { useSearchParams } from "react-router-dom"
import { useProducts } from "../hooks/use-products"
import ProductCard from "../components/Product/ProductCard"
import type { ProductCategory } from "../types"

const categories: { label: string; slug: ProductCategory | "all" }[] = [
  { label: "Todos", slug: "all" },
  { label: "CPU", slug: "processors" },
  { label: "GPU", slug: "graphics-cards" },
  { label: "MOBO", slug: "motherboards" },
  { label: "RAM", slug: "memory" },
  { label: "SSD", slug: "storage" },
  { label: "I/O", slug: "peripherals" },
  { label: "AIO", slug: "cooling" },
  { label: "PSU", slug: "power-supplies" },
  { label: "LED", slug: "monitors" },
]

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams()
  const categoryParam = searchParams.get("category") as ProductCategory | null
  const { data: products, isLoading } = useProducts(categoryParam ?? undefined)

  return (
    <div className="min-h-screen pt-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-12">
        <div className="mb-12">
          <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-text-tertiary">
            Productos
          </span>
          <h1 className="font-display text-5xl sm:text-6xl mt-4 text-text leading-[1.1]">
            Catálogo
            {categoryParam && (
              <>
                <br />
                <span className="italic text-accent-text">
                  {categories.find((c) => c.slug === categoryParam)?.label}
                </span>
              </>
            )}
          </h1>
        </div>

        <div className="mb-12 flex flex-wrap gap-1">
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => {
                setSearchParams(cat.slug === "all" ? {} : { category: cat.slug })
              }}
              className={`px-4 py-2 text-[10px] font-medium uppercase tracking-[0.15em] transition-all duration-300 border ${
                (cat.slug === "all" && !categoryParam) ||
                cat.slug === categoryParam
                  ? "border-accent/50 bg-accent/10 text-accent-text"
                  : "border-border text-text-tertiary hover:border-border-hover hover:text-text-secondary"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="py-20 text-center font-mono text-[10px] text-text-tertiary uppercase tracking-wider">
            Cargando...
          </div>
        ) : (
          <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {products?.length === 0 && (
          <div className="py-20 text-center">
            <p className="font-display text-2xl text-text-tertiary italic">
              Sin resultados
            </p>
            <p className="mt-2 text-[10px] text-text-tertiary uppercase tracking-wider">
              No se encontraron productos en esta categoría
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
