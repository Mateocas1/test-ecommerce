import { Link } from "react-router-dom"
import { ShoppingCart, User, LogOut, Zap } from "lucide-react"
import { Button } from "../ui/button"
import { useAuth, signOut } from "../../hooks/use-auth"
import { useCartStore } from "../../store/cart"
import { useState } from "react"
import CartDrawer from "../Cart/CartDrawer"

export default function Header() {
  const { user } = useAuth()
  const totalItems = useCartStore((s) => s.totalItems())
  const [cartOpen, setCartOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 liquid-glass">
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6 sm:px-8 lg:px-12">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="relative flex h-7 w-7 items-center justify-center">
              <div className="absolute inset-0 bg-accent/10 animate-[breathe_3s_ease-in-out_infinite]" />
              <Zap className="relative h-3.5 w-3.5 text-accent-text" strokeWidth={2} />
            </div>
            <span className="text-sm font-semibold tracking-tight text-text">
              Tech<span className="text-accent-text">Haven</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {[
              { label: "Productos", to: "/products" },
              { label: "Procesadores", to: "/products?category=processors" },
              { label: "Gráficas", to: "/products?category=graphics-cards" },
              { label: "Periféricos", to: "/products?category=peripherals" },
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-xs font-medium text-text-tertiary transition-colors duration-300 hover:text-text"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCartOpen(true)}
              className="relative flex h-9 w-9 items-center justify-center border border-border text-text-tertiary transition-all duration-300 hover:border-accent/30 hover:text-accent-text"
            >
              <ShoppingCart className="h-3.5 w-3.5" strokeWidth={1.5} />
              {totalItems > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center bg-accent text-[9px] font-bold text-bg">
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </button>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="flex h-9 w-9 items-center justify-center border border-border text-text-tertiary transition-all duration-300 hover:border-accent/30 hover:text-accent-text"
                >
                  <User className="h-3.5 w-3.5" strokeWidth={1.5} />
                </button>
                {menuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setMenuOpen(false)}
                    />
                    <div className="absolute right-0 top-11 z-50 w-44 border border-border bg-surface">
                      <div className="px-4 py-2.5 text-[11px] text-text-tertiary border-b border-border truncate">
                        {user.email}
                      </div>
                      <button
                        onClick={() => { signOut(); setMenuOpen(false) }}
                        className="flex w-full items-center gap-2 px-4 py-2.5 text-xs text-red-400 transition-colors hover:bg-surface-elevated"
                      >
                        <LogOut className="h-3 w-3" strokeWidth={1.5} />
                        Cerrar sesión
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link to="/login">
                <Button variant="outline" size="sm">
                  Ingresar
                </Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  )
}
