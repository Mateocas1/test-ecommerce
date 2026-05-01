import { Link } from "react-router-dom"
import { Monitor } from "lucide-react"
import LoginForm from "../components/Auth/LoginForm"

export default function Login() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 pt-16">
      <div className="w-full max-w-sm">
        <div className="mb-10 text-center">
          <Link to="/" className="mx-auto mb-8 flex w-fit items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center border border-accent/30 bg-accent/5">
              <Monitor className="h-4 w-4 text-accent-text" />
            </div>
            <span className="text-sm font-medium uppercase tracking-[0.2em] text-text">
              Tech<b className="text-accent-text">Haven</b>
            </span>
          </Link>
          <h1 className="font-display text-4xl text-text italic">
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
