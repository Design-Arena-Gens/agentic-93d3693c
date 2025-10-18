import Image from 'next/image'
import Link from 'next/link'

export type Product = {
  id: string
  name: string
  price: number
  image: string
  category: string
}

export default function ProductCard({ product, onAdd }: { product: Product, onAdd?: () => void }) {
  return (
    <div className="card p-3 flex flex-col gap-3" role="group" aria-label={product.name}>
      <Link href={`/shop/${product.id}`} className="block">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={product.image} alt={product.name} className="h-40 w-full object-cover rounded-md" />
      </Link>
      <div className="flex-1">
        <h3 className="font-semibold text-sm line-clamp-2">{product.name}</h3>
        <p className="text-leaf font-bold mt-1">${product.price.toFixed(2)}</p>
      </div>
      <button onClick={onAdd} className="btn btn-primary w-full" aria-label={`Add ${product.name} to cart`}>Add to cart</button>
    </div>
  )
}
