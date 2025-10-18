import Carousel from '../components/Carousel'
import SearchBox from '../components/SearchBox'
import Link from 'next/link'
import { products, categories } from '../data/products'
import ClientCard from '../components/ClientCard'

export default function HomePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6 space-y-8">
      <section className="grid gap-6 md:grid-cols-3 items-start">
        <div className="md:col-span-2"><Carousel /></div>
        <div className="card p-4">
          <h2 className="font-semibold mb-2">Search products</h2>
          <SearchBox />
          <p className="text-xs text-gray-600 mt-2">Tip: Try "milk", "apples", or "pasta"</p>
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Shop by category</h2>
          <Link href="/shop" className="text-sm underline">View all</Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {categories.map((c)=> (
            <Link key={c.id} href={`/shop?category=${encodeURIComponent(c.id)}`} className="card p-3 hover:shadow-md transition-shadow">
              <div className="aspect-[4/3] w-full overflow-hidden rounded-md">
                <img src={c.image} alt={c.name} className="h-full w-full object-cover" />
              </div>
              <div className="mt-2 text-center text-sm font-medium">{c.name}</div>
            </Link>
          ))}
        </div>
      </section>

      <FeaturedGrid />
    </div>
  )
}

function FeaturedGrid() {
  const featured = products.slice(0, 8)
  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">This week’s picks</h2>
        <Link href="/shop" className="text-sm underline">Shop more</Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {featured.map((p) => (
          <ClientCard key={p.id} id={p.id} />
        ))}
      </div>
    </section>
  )
}
