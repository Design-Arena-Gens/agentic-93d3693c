"use client"
import { useCart } from '../../store/cart'
import Link from 'next/link'

export default function CartPage() {
  const { items, setQty, remove } = useCart()
  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0)
  return (
    <div className="mx-auto max-w-4xl px-4 py-6 space-y-6">
      <h1 className="text-xl font-semibold">Your Cart</h1>
      {items.length === 0 ? (
        <div className="card p-6 text-center">
          <p>Your cart is empty.</p>
          <Link className="btn btn-primary mt-3" href="/shop">Browse products</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-3">
            {items.map((i) => (
              <div key={i.id} className="card p-3 flex items-center gap-3">
                <img src={i.image} alt="" className="h-16 w-16 rounded-md object-cover" />
                <div className="flex-1">
                  <div className="font-medium">{i.name}</div>
                  <div className="text-sm text-gray-600">${i.price.toFixed(2)}</div>
                </div>
                <label className="sr-only" htmlFor={`qty-${i.id}`}>Quantity</label>
                <input id={`qty-${i.id}`} className="input w-20" type="number" min={1} value={i.quantity} onChange={(e)=>setQty(i.id, Math.max(1, Number(e.target.value)))} />
                <button className="btn btn-secondary" onClick={()=>remove(i.id)}>Remove</button>
              </div>
            ))}
          </div>
          <aside className="card p-4 space-y-2 h-fit">
            <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between"><span>Estimated tax</span><span>${(subtotal*0.07).toFixed(2)}</span></div>
            <div className="flex justify-between font-semibold"><span>Total</span><span>${(subtotal*1.07).toFixed(2)}</span></div>
            <Link href="/checkout" className="btn btn-primary w-full mt-2">Checkout</Link>
          </aside>
        </div>
      )}
    </div>
  )
}
