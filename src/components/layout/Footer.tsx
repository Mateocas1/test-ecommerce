import { Monitor } from "lucide-react"
import { Link } from "react-router-dom"

const footerLinks = {
  Productos: [
    { label: "Procesadores", href: "/products?category=processors" },
    { label: "Gráficas", href: "/products?category=graphics-cards" },
    { label: "Periféricos", href: "/products?category=peripherals" },
    { label: "Monitores", href: "/products?category=monitors" },
    { label: "Almacenamiento", href: "/products?category=storage" },
  ],
  Compañía: [
    { label: "Sobre Nosotros", href: "#" },
    { label: "Manifiesto", href: "#" },
    { label: "Prensa", href: "#" },
    { label: "Contacto", href: "#" },
  ],
  Soporte: [
    { label: "FAQ", href: "#" },
    { label: "Envíos", href: "#" },
    { label: "Garantía", href: "#" },
    { label: "Términos", href: "#" },
  ],
}

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-20">
        <div className="grid grid-cols-2 gap-12 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <div className="mb-6">
              <Link to="/" className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center border border-accent/30 bg-accent/5">
                  <Monitor className="h-4 w-4 text-accent-text" />
                </div>
                <span className="text-sm font-medium uppercase tracking-[0.2em] text-text">
                  Tech<b className="text-accent-text">Haven</b>
                </span>
              </Link>
            </div>
            <p className="mb-8 text-xs leading-relaxed text-text-tertiary max-w-xs">
              Hardware seleccionado con propósito. Para quienes entienden que
              cada componente importa.
            </p>
            <div className="flex gap-3">
              {["GH", "X", "IG"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="flex h-8 w-8 items-center justify-center border border-border text-[10px] font-bold uppercase tracking-wider text-text-tertiary transition-all duration-300 hover:border-accent/50 hover:text-accent-text"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="mb-6 text-[10px] font-semibold uppercase tracking-[0.2em] text-text-tertiary">
                {title}
              </h3>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-xs text-text-secondary transition-colors duration-300 hover:text-accent-text"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-20 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[10px] uppercase tracking-[0.15em] text-text-tertiary">
            &copy; 2025 TechHaven
          </p>
          <p className="text-[10px] uppercase tracking-[0.15em] text-text-tertiary">
            Hecho con propósito
          </p>
        </div>
      </div>
    </footer>
  )
}
