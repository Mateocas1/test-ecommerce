import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import type { Product } from "../../types"
import { useCartStore } from "../../store/cart"

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

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem)

  return (
    <div className="group border border-border bg-surface p-6 transition-all duration-500 hover:border-border-hover">
      <div className="mb-5 flex items-start justify-between">
        <Badge>{categoryLabels[product.category] ?? product.category}</Badge>
        <span className="font-mono text-[10px] text-text-tertiary">
          $
          {(product.price / 1000)
            .toFixed(0)
            .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
        </span>
      </div>

      <h3 className="font-display text-lg sm:text-xl text-text leading-snug mb-2 transition-colors duration-300 group-hover:text-accent-text tracking-tight">
        {product.name}
      </h3>

      <p className="text-xs leading-relaxed text-text-secondary mb-5 line-clamp-2">
        {product.description}
      </p>

      {product.specs && (
        <div className="mb-5 space-y-1 border-t border-border pt-4">
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
        className="w-full"
      >
        Agregar
      </Button>
    </div>
  )
}
