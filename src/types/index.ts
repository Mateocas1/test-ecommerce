export interface Product {
  id: string
  name: string
  description: string
  price: number
  image_url: string
  category: ProductCategory
  specs?: Record<string, string>
  in_stock: boolean
  created_at: string
}

export type ProductCategory =
  | "processors"
  | "graphics-cards"
  | "motherboards"
  | "memory"
  | "storage"
  | "peripherals"
  | "cooling"
  | "power-supplies"
  | "monitors"

export interface CartItem {
  product: Product
  quantity: number
}

export interface Profile {
  id: string
  email: string
  name: string | null
  avatar_url: string | null
  created_at: string
}
