import { products } from '../../data/products'
import ProductGrid from '../../components/ProductGrid'

export const dynamic = 'force-static'

export default function ShopPage({ searchParams }: { searchParams: { category?: string } }) {
  const category = searchParams?.category
  const filtered = category ? products.filter(p => p.category === category) : products
  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <h1 className="text-xl font-semibold mb-4">Shop {category ? `- ${category}` : ''}</h1>
      <ProductGrid ids={filtered.map(p => p.id)} />
    </div>
  )
}
