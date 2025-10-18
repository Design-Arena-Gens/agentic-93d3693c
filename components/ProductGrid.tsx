"use client"
import { products } from '../data/products'
import ProductCard from './ProductCard'
import { useCart } from '../store/cart'

export default function ProductGrid({ ids }: { ids: string[] }) {
  const { add } = useCart()
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {ids.map((id) => {
        const p = products.find(x => x.id === id)!
        return (
          <ProductCard key={id} product={p} onAdd={() => add({ id: p.id, name: p.name, price: p.price, image: p.image })} />
        )
      })}
    </div>
  )
}
