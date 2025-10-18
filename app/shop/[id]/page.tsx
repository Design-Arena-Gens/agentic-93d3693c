import { products } from '../../../data/products'
import { notFound } from 'next/navigation'
import ProductDetailClient from '../../../components/ProductDetailClient'

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find(p => p.id === params.id)
  if (!product) return notFound()
  return (
    <div className="mx-auto max-w-5xl px-4 py-6 grid md:grid-cols-2 gap-8">
      <div className="card overflow-hidden">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
      </div>
      <ProductDetailClient product={product} />
    </div>
  )
}
