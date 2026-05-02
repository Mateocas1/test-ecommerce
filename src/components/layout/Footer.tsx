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
      <div className="mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-12 py-20">
        <div className="grid grid-cols-2 gap-12 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <div className="mb-6">
              <Link to="/" className="flex items-center gap-2.5">
                <div className="relative flex h-7 w-7 items-center justify-center">
                  <div className="absolute inset-0 bg-accent/10 animate-[breathe_3s_ease-in-out_infinite]" />
                  <Monitor className="relative h-3.5 w-3.5 text-accent-text" strokeWidth={2} />
                </div>
                <span className="text-sm font-semibold tracking-tight text-text">
                  Tech<span className="text-accent-text">Haven</span>
                </span>
              </Link>
            </div>
            <p className="mb-8 text-xs leading-relaxed text-text-tertiary max-w-xs">
              Hardware seleccionado con propósito. Para quienes entienden que
              cada componente importa.
            </p>
            <div className="flex gap-2">
              {["GH", "X", "IG"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="flex h-8 w-8 items-center justify-center border border-border text-[10px] font-bold text-text-tertiary transition-all duration-300 hover:border-accent/30 hover:text-accent-text"
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
              <ul className="space-y-3">
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
