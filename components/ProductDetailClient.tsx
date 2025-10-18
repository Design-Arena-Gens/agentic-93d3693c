"use client"
import { useCart } from '../store/cart'
import { Product } from '../data/products'

export default function ProductDetailClient({ product }: { product: Product }) {
  const { add } = useCart()
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <p className="text-leaf text-xl font-bold">${product.price.toFixed(2)}</p>
      <button className="btn btn-primary" onClick={()=>add({ id: product.id, name: product.name, price: product.price, image: product.image })}>Add to cart</button>
      <div>
        <h2 className="font-semibold mb-2">Details</h2>
        <p className="text-sm text-gray-700">Fresh and carefully sourced. Satisfaction guaranteed.</p>
      </div>
    </div>
  )
}
