import { useEffect, useRef } from "react"
import { X, ShoppingCart, Trash2, Plus, Minus } from "lucide-react"
import { Button } from "../ui/button"
import { useCartStore } from "../../store/cart"

interface CartDrawerProps {
  open: boolean
  onClose: () => void
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, clearCart, totalPrice, totalItems } =
    useCartStore()
  const drawerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [onClose])

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-50 bg-bg/80"
          onClick={onClose}
        />
      )}

      <div
        ref={drawerRef}
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-md border-l border-border bg-bg transition-transform duration-500 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-border px-6 py-5">
            <div className="flex items-center gap-3">
              <ShoppingCart className="h-4 w-4 text-accent-text" />
              <h2 className="text-sm font-medium uppercase tracking-[0.15em] text-text">
                Carrito
              </h2>
              <span className="font-mono text-[10px] text-text-tertiary">
                ({totalItems()})
              </span>
            </div>
            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center border border-border text-text-tertiary transition-all duration-300 hover:border-accent/50 hover:text-accent-text"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {items.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 text-center">
              <ShoppingCart className="h-12 w-12 text-text-tertiary" />
              <div>
                <p className="font-display text-xl text-text italic">
                  Carrito vacío
                </p>
                <p className="text-xs text-text-tertiary mt-2">
                  Agregá productos para empezar
                </p>
              </div>
              <Button variant="outline" onClick={onClose}>
                Seguir comprando
              </Button>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="border border-border p-4"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1 min-w-0 mr-4">
                        <p className="font-display text-base text-text leading-snug">
                          {item.product.name}
                        </p>
                        <p className="font-mono text-[10px] text-text-tertiary mt-1 uppercase tracking-wider">
                          {item.product.category}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="shrink-0 text-text-tertiary transition-colors duration-300 hover:text-red-400"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                          className="flex h-7 w-7 items-center justify-center border border-border text-text-tertiary transition-all duration-300 hover:border-accent/50 hover:text-accent-text"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="font-mono text-sm text-text w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                          className="flex h-7 w-7 items-center justify-center border border-border text-text-tertiary transition-all duration-300 hover:border-accent/50 hover:text-accent-text"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <span className="font-mono text-xs text-accent-text">
                        ${(item.product.price * item.quantity / 1000).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-border px-6 py-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-text-tertiary">
                    Total
                  </span>
                  <span className="font-display text-2xl text-accent-text italic">
                    $
                    {(totalPrice() / 1000)
                      .toFixed(0)
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearCart}
                  >
                    Vaciar
                  </Button>
                  <Button className="flex-1">
                    Finalizar
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}
