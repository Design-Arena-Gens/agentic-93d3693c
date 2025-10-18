"use client"
import { useCart } from '../../store/cart'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { addDays, format } from 'date-fns'

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  address: z.string().min(5).optional(),
  method: z.enum(['delivery', 'pickup']),
  slot: z.string().min(1),
  payment: z.enum(['card', 'apple', 'google', 'cash']),
  cardNumber: z.string().min(12).max(19).optional(),
})

type FormValues = z.infer<typeof schema>

export default function CheckoutPage() {
  const { items, clear } = useCart()
  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0)
  const total = subtotal * 1.07
  const { register, handleSubmit, watch, formState: { errors, isSubmitting, isSubmitSuccessful } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { method: 'delivery', payment: 'card' }
  })
  const method = watch('method')
  const payment = watch('payment')

  const onSubmit = async (values: FormValues) => {
    await new Promise(r => setTimeout(r, 800))
    clear()
    window.location.href = '/checkout/success'
  }

  const slots = Array.from({ length: 5 }).map((_, i) => ({
    id: String(i),
    label: `${format(addDays(new Date(), i), 'EEE MMM d')} 4–6pm`
  }))

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 grid md:grid-cols-3 gap-6">
      <form onSubmit={handleSubmit(onSubmit)} className="md:col-span-2 space-y-4">
        <h1 className="text-xl font-semibold">Checkout</h1>
        <section className="card p-4 grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1" htmlFor="name">Full name</label>
            <input id="name" className="input" {...register('name')} aria-invalid={!!errors.name} />
            {errors.name && <p className="text-sm text-red-600 mt-1">Name is required</p>}
          </div>
          <div>
            <label className="block text-sm mb-1" htmlFor="email">Email</label>
            <input id="email" className="input" {...register('email')} aria-invalid={!!errors.email} />
            {errors.email && <p className="text-sm text-red-600 mt-1">Valid email required</p>}
          </div>
          {method === 'delivery' && (
            <div className="sm:col-span-2">
              <label className="block text-sm mb-1" htmlFor="address">Delivery address</label>
              <input id="address" className="input" {...register('address')} />
            </div>
          )}
        </section>

        <section className="card p-4 grid sm:grid-cols-2 gap-4">
          <fieldset>
            <legend className="font-medium mb-2">Fulfillment</legend>
            <div className="flex gap-3">
              <label className="inline-flex items-center gap-2"><input type="radio" value="delivery" {...register('method')} /> Delivery</label>
              <label className="inline-flex items-center gap-2"><input type="radio" value="pickup" {...register('method')} /> Pickup</label>
            </div>
          </fieldset>
          <div>
            <label className="block text-sm mb-1" htmlFor="slot">Time slot</label>
            <select id="slot" className="input" {...register('slot')}>
              <option value="">Select…</option>
              {slots.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
            </select>
          </div>
        </section>

        <section className="card p-4 grid sm:grid-cols-2 gap-4">
          <fieldset>
            <legend className="font-medium mb-2">Payment</legend>
            <div className="grid gap-2">
              <label className="inline-flex items-center gap-2"><input type="radio" value="card" {...register('payment')} /> Credit/Debit Card</label>
              <label className="inline-flex items-center gap-2"><input type="radio" value="apple" {...register('payment')} /> Apple Pay</label>
              <label className="inline-flex items-center gap-2"><input type="radio" value="google" {...register('payment')} /> Google Pay</label>
              <label className="inline-flex items-center gap-2"><input type="radio" value="cash" {...register('payment')} /> Cash on Delivery</label>
            </div>
          </fieldset>
          {payment === 'card' && (
            <div>
              <label className="block text-sm mb-1" htmlFor="cardNumber">Card number</label>
              <input id="cardNumber" className="input" inputMode="numeric" placeholder="4242 4242 4242 4242" {...register('cardNumber')} />
            </div>
          )}
        </section>

        <button className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting ? 'Processing…' : 'Place order'}
        </button>
      </form>

      <aside className="card p-4 h-fit space-y-2">
        <h2 className="font-medium">Order Summary</h2>
        <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
        <div className="flex justify-between"><span>Estimated tax</span><span>${(subtotal*0.07).toFixed(2)}</span></div>
        <div className="flex justify-between font-semibold"><span>Total</span><span>${total.toFixed(2)}</span></div>
      </aside>
    </div>
  )
}
