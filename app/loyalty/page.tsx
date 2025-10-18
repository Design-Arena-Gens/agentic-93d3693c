"use client"
import { useForm } from 'react-hook-form'

export default function LoyaltyPage() {
  const { register, handleSubmit, formState: { isSubmitting, isSubmitSuccessful } } = useForm<{ name: string, email: string }>()
  const onSubmit = async (v: { name: string, email: string }) => {
    await fetch('/api/loyalty', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(v) })
  }
  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <h1 className="text-xl font-semibold mb-4">Loyalty Program</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="card p-4 space-y-3">
        <div>
          <label className="block text-sm mb-1" htmlFor="name">Name</label>
          <input id="name" className="input" {...register('name', { required: true })} />
        </div>
        <div>
          <label className="block text-sm mb-1" htmlFor="email">Email</label>
          <input id="email" type="email" className="input" {...register('email', { required: true })} />
        </div>
        <button className="btn btn-primary" disabled={isSubmitting}>{isSubmitting ? 'Submitting…' : 'Join now'}</button>
        {isSubmitSuccessful && <p className="text-leaf">Thanks for joining! Check your inbox for a welcome gift.</p>}
      </form>
    </div>
  )
}
