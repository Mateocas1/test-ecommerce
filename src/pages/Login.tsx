import { Link } from "react-router-dom"
import { Zap } from "lucide-react"
import LoginForm from "../components/Auth/LoginForm"

export default function Login() {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center px-4 pt-16">
      <div className="w-full max-w-sm">
        <div className="mb-10 text-center">
          <Link to="/" className="mx-auto mb-8 inline-flex items-center gap-2.5">
            <div className="relative flex h-7 w-7 items-center justify-center">
              <div className="absolute inset-0 bg-accent/10 animate-[breathe_3s_ease-in-out_infinite]" />
              <Zap className="relative h-3.5 w-3.5 text-accent-text" strokeWidth={2} />
            </div>
            <span className="text-sm font-semibold tracking-tight text-text">
              Tech<span className="text-accent-text">Haven</span>
            </span>
          </Link>
          <h1 className="font-display text-3xl text-text tracking-tighter">
            Bienvenido
          </h1>
          <p className="mt-2 text-xs text-text-tertiary">
            Ingresá a tu cuenta
          </p>
        </div>

        <div className="border border-border p-8">
          <LoginForm />
        </div>

        <p className="mt-6 text-center text-[10px] uppercase tracking-[0.2em] text-text-tertiary">
          ¿No tenés cuenta?{" "}
          <Link
            to="/register"
            className="text-accent-text hover:underline"
          >
            Registrate
          </Link>
        </p>
      </div>
    </div>
  )
}
