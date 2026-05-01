import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Hero from "../components/Landing/Hero"
import Categories from "../components/Landing/Categories"
import FeaturedProducts from "../components/Landing/FeaturedProducts"
import CTA from "../components/Landing/CTA"

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to("html", { scrollBehavior: "smooth" })
    }, mainRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={mainRef}>
      <Hero />
      <Categories />
      <FeaturedProducts />
      <CTA />
    </div>
  )
}
