import { useQuery } from "@tanstack/react-query"
import { supabase } from "../lib/supabase"
import type { Product, ProductCategory } from "../types"

async function fetchProducts(category?: ProductCategory): Promise<Product[]> {
  let query = supabase.from("products").select("*")

  if (category) {
    query = query.eq("category", category)
  }

  const { data, error } = await query.order("created_at", { ascending: false })

  if (error) throw new Error(error.message)
  return data ?? []
}

export function useProducts(category?: ProductCategory) {
  return useQuery({
    queryKey: ["products", category],
    queryFn: () => fetchProducts(category),
  })
}

export const SEED_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "AMD Ryzen 9 9950X",
    description:
      "16 cores, 32 threads. Zen 5 architecture. Hasta 5.7 GHz boost. La bestia para gaming y creación.",
    price: 799990,
    image_url: "/images/ryzen-9950x.jpg",
    category: "processors",
    specs: { Cores: "16", Threads: "32", "Boost Clock": "5.7 GHz", TDP: "170W" },
    in_stock: true,
    created_at: "2025-01-15",
  },
  {
    id: "2",
    name: "Intel Core Ultra 9 285K",
    description:
      "24 cores (8 P + 16 E). Arrow Lake. La nueva generación con NPU integrada.",
    price: 689990,
    image_url: "/images/intel-ultra-9.jpg",
    category: "processors",
    specs: { Cores: "24 (8P+16E)", Threads: "24", "Boost Clock": "5.5 GHz", TDP: "125W" },
    in_stock: true,
    created_at: "2025-02-01",
  },
  {
    id: "3",
    name: "NVIDIA RTX 5090",
    description:
      "24 GB GDDR7. Blackwell architecture. Trazado de patas en tiempo real. La GPU más rápida del planeta.",
    price: 2499990,
    image_url: "/images/rtx-5090.jpg",
    category: "graphics-cards",
    specs: { VRAM: "24 GB GDDR7", "CUDA Cores": "24576", "Boost Clock": "2.9 GHz", TDP: "600W" },
    in_stock: true,
    created_at: "2025-03-01",
  },
  {
    id: "4",
    name: "NVIDIA RTX 5080",
    description:
      "16 GB GDDR7. Perfecta para gaming 4K con DLSS 4. La mejor relación precio-rendimiento.",
    price: 1499990,
    image_url: "/images/rtx-5080.jpg",
    category: "graphics-cards",
    specs: { VRAM: "16 GB GDDR7", "CUDA Cores": "16384", "Boost Clock": "2.8 GHz", TDP: "450W" },
    in_stock: true,
    created_at: "2025-03-01",
  },
  {
    id: "5",
    name: "ASUS ROG Crosshair X870E Hero",
    description:
      "Chipset X870E para AMD. WiFi 7, PCIe 5.0, DDR5. La mother definitiva para Ryzen.",
    price: 699990,
    image_url: "/images/rog-crosshair.jpg",
    category: "motherboards",
    specs: { Chipset: "X870E", Socket: "AM5", RAM: "DDR5-8000+", "PCIe": "5.0" },
    in_stock: true,
    created_at: "2025-02-15",
  },
  {
    id: "6",
    name: "G.Skill Trident Z5 Royal 64GB",
    description:
      "64 GB DDR5-7200. RGB espectacular. Latencia CL34. Para builds que gritan lujo.",
    price: 399990,
    image_url: "/images/trident-z5.jpg",
    category: "memory",
    specs: { Capacity: "64 GB (2x32)", Speed: "DDR5-7200", Latency: "CL34", Voltage: "1.35V" },
    in_stock: true,
    created_at: "2025-01-20",
  },
  {
    id: "7",
    name: "Samsung 990 Pro 4TB NVMe",
    description:
      "PCIe 4.0. Lectura 7,450 MB/s. La velocidad que tu PC merece. Ideal para juegos y contenido.",
    price: 499990,
    image_url: "/images/samsung-990-pro.jpg",
    category: "storage",
    specs: { Capacity: "4 TB", Interface: "PCIe 4.0 x4", Read: "7,450 MB/s", Write: "6,900 MB/s" },
    in_stock: true,
    created_at: "2025-01-10",
  },
  {
    id: "8",
    name: "Logitech G Pro X Superlight 2",
    description:
      "60g. Sensor HERO 2. 2000 Hz. El mouse que usan los pros. Wireless con 95h de batería.",
    price: 179990,
    image_url: "/images/superlight-2.jpg",
    category: "peripherals",
    specs: { Weight: "60g", Sensor: "HERO 2", DPI: "44,000", Battery: "95h" },
    in_stock: true,
    created_at: "2025-02-20",
  },
  {
    id: "9",
    name: "Wooting 60HE+",
    description:
      "Switches magnéticos. Rapid Trigger. Actuación ajustable 0.1-4.0mm. El mejor teclado para gaming.",
    price: 249990,
    image_url: "/images/wooting-60he.jpg",
    category: "peripherals",
    specs: { Layout: "60%", Switches: "Lekker Magnetic", "Actuation": "0.1-4.0mm", Interface: "USB-C" },
    in_stock: true,
    created_at: "2025-03-05",
  },
  {
    id: "10",
    name: "NZXT Kraken Elite 360 RGB",
    description:
      "Refrigeración líquida AIO 360mm. Pantalla LCD 2.0\" personalizable. RGB infinito.",
    price: 329990,
    image_url: "/images/nzxt-kraken.jpg",
    category: "cooling",
    specs: { Size: "360mm", Fans: "3x 120mm RGB", Display: "2.0\" LCD", Socket: "LGA1851/AM5" },
    in_stock: true,
    created_at: "2025-02-10",
  },
  {
    id: "11",
    name: "Corsair HX1500i",
    description:
      "1500W 80+ Platinum. Totalmente modular. Silencioso. Para las builds más extremas.",
    price: 449990,
    image_url: "/images/corsair-hx1500i.jpg",
    category: "power-supplies",
    specs: { Wattage: "1500W", Efficiency: "80+ Platinum", Modular: "Full", Fan: "135mm" },
    in_stock: true,
    created_at: "2025-01-25",
  },
  {
    id: "12",
    name: "LG 32GS95UE OLED",
    description:
      "32\" 4K OLED 240Hz. 0.03ms. HDR True Black 1000. La experiencia visual definitiva.",
    price: 1899990,
    image_url: "/images/lg-oled.jpg",
    category: "monitors",
    specs: { Size: '32"', Resolution: "4K (3840x2160)", Refresh: "240Hz", Panel: "OLED" },
    in_stock: true,
    created_at: "2025-03-10",
  },
]
