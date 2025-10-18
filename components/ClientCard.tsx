"use client"
import { products } from '../data/products'
import { useCart } from '../store/cart'
import ProductCard from './ProductCard'

export default function ClientCard({ id }: { id: string }) {
  const { add } = useCart()
  const product = products.find(p => p.id === id)!
  return (
    <ProductCard product={product} onAdd={() => add({ id: product.id, name: product.name, price: product.price, image: product.image })} />
  )
}
