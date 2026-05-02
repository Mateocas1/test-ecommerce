import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { signUp } from "../../hooks/use-auth"

export default function RegisterForm() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres")
      setLoading(false)
      return
    }

    const { error } = await signUp(email, password, name)
    setLoading(false)

    if (error) {
      setError(error.message)
      return
    }

    setSuccess(true)
  }

  if (success) {
    return (
      <div className="border border-emerald-900/30 bg-emerald-950/10 p-8 text-center">
        <h3 className="font-display text-lg text-emerald-400 tracking-tight">
          Registro exitoso
        </h3>
        <p className="mt-2 text-xs text-text-tertiary">
          Revisá tu email para confirmar la cuenta. Luego podés iniciar sesión.
        </p>
        <Button
          variant="outline"
          className="mt-6"
          onClick={() => navigate("/login")}
        >
          Ir a iniciar sesión
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <label className="text-[10px] font-medium uppercase tracking-[0.15em] text-text-tertiary">
          Nombre
        </label>
        <Input
          type="text"
          placeholder="Tu nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <label className="text-[10px] font-medium uppercase tracking-[0.15em] text-text-tertiary">
          Email
        </label>
        <Input
          type="email"
          placeholder="tucorreo@ejemplo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-[10px] font-medium uppercase tracking-[0.15em] text-text-tertiary">
          Contraseña
        </label>
        <Input
          type="password"
          placeholder="Mínimo 6 caracteres"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      {error && (
        <div className="border border-red-900/40 bg-red-950/20 px-4 py-3">
          <p className="text-[11px] text-red-400">
            {error}
          </p>
        </div>
      )}

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Creando cuenta..." : "Crear cuenta"}
      </Button>
    </form>
  )
}
