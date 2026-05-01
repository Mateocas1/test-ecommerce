import { Link } from "react-router-dom"
import { ShoppingCart, User, LogOut, Monitor } from "lucide-react"
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
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-bg/90 backdrop-blur-lg">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 sm:px-8 lg:px-12">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="flex h-8 w-8 items-center justify-center border border-accent/30 bg-accent/5 transition-all duration-500 group-hover:bg-accent/20">
              <Monitor className="h-4 w-4 text-accent-text" />
            </div>
            <span className="text-sm font-medium uppercase tracking-[0.2em] text-text">
              Tech<b className="text-accent-text">Haven</b>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-10">
            <Link
              to="/products"
              className="text-[11px] font-medium uppercase tracking-[0.15em] text-text-tertiary transition-colors duration-300 hover:text-text"
            >
              Productos
            </Link>
            <Link
              to="/products?category=processors"
              className="text-[11px] font-medium uppercase tracking-[0.15em] text-text-tertiary transition-colors duration-300 hover:text-text"
            >
              Procesadores
            </Link>
            <Link
              to="/products?category=graphics-cards"
              className="text-[11px] font-medium uppercase tracking-[0.15em] text-text-tertiary transition-colors duration-300 hover:text-text"
            >
              Gráficas
            </Link>
            <Link
              to="/products?category=peripherals"
              className="text-[11px] font-medium uppercase tracking-[0.15em] text-text-tertiary transition-colors duration-300 hover:text-text"
            >
              Periféricos
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCartOpen(true)}
              className="relative flex h-10 w-10 items-center justify-center border border-border text-text-tertiary transition-all duration-300 hover:border-accent/50 hover:text-accent-text"
            >
              <ShoppingCart className="h-4 w-4" />
              {totalItems > 0 && (
                <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center bg-accent text-[8px] font-bold uppercase tracking-wider text-bg">
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </button>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="flex h-10 w-10 items-center justify-center border border-border text-text-tertiary transition-all duration-300 hover:border-accent/50 hover:text-accent-text"
                >
                  <User className="h-4 w-4" />
                </button>
                {menuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setMenuOpen(false)}
                    />
                    <div className="absolute right-0 top-12 z-50 w-48 border border-border bg-surface">
                      <div className="px-4 py-3 text-xs text-text-tertiary border-b border-border truncate">
                        {user.email}
                      </div>
                      <button
                        onClick={() => { signOut(); setMenuOpen(false) }}
                        className="flex w-full items-center gap-2 px-4 py-3 text-xs text-red-400 transition-colors hover:bg-surface-elevated uppercase tracking-wider"
                      >
                        <LogOut className="h-3 w-3" />
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
