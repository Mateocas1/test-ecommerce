# TechHaven

Ecommerce de hardware premium. Frontend en React + Vite, backend en Supabase.

## Stack

- **Frontend:** React 19, TypeScript, Vite 8, Tailwind CSS v4, GSAP
- **Backend:** Supabase (Postgres + Auth + Row Level Security)
- **State:** Zustand (carrito persistido), TanStack Query (productos)
- **Routing:** React Router v7

## Arquitectura de deploy

```
┌─────────────┐     ┌─────────────────┐
│   Vercel    │────▶│  GitHub (repo)  │
│  (Frontend) │     │   CI/CD auto    │
└─────────────┘     └─────────────────┘
         │
         │ REST / Auth
         ▼
┌──────────────────────────────────────┐
│            Supabase Cloud            │
│  Postgres + Auth + Storage + Edge   │
│  Region: sa-east-1 (São Paulo)       │
└──────────────────────────────────────┘
```

## Estructura del proyecto

```
src/
  components/
    ui/           # Button, Input, Badge, Card
    layout/       # Header, Footer
    Landing/      # Hero, Categories, FeaturedProducts, CTA
    Auth/         # LoginForm, RegisterForm
    Product/      # ProductCard
    Cart/         # CartDrawer
  hooks/          # useAuth, useProducts
  store/          # Cart store (Zustand + persist)
  types/          # TypeScript interfaces
  lib/            # Supabase client, utils
  pages/          # Home, Products, Login, Register
supabase/
  schema.sql      # DDL: products, profiles, RLS, trigger
  seed.sql        # 12 productos de ejemplo
```

## Desarrollo local

```bash
npm install
# Copiar .env.example a .env y completar credenciales de Supabase
npm run dev
```

## Deploy a Vercel

1. Andá a [vercel.com](https://vercel.com) y logueate con GitHub
2. Click en **Add New Project**
3. Importá `Mateocas1/test-ecommerce`
4. Framework preset: **Vite**
5. Build command: `npm run build`
6. Output directory: `dist`
7. Agregá las environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
8. Click **Deploy**

## Supabase

Dashboard: `https://supabase.com/dashboard/project/nnyjgrkithfhkvsrodrd`

Schema aplicado vía CLI:
```bash
npx supabase db query --linked -f supabase/schema.sql
npx supabase db query --linked -f supabase/seed.sql
```
