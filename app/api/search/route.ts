import { NextRequest } from 'next/server'
import { products } from '../../../data/products'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const q = (searchParams.get('q') || '').toLowerCase()
  const results = q ? products.filter(p => p.name.toLowerCase().includes(q)).slice(0, 8).map(p => ({ id: p.id, name: p.name })) : []
  return new Response(JSON.stringify(results), { headers: { 'Content-Type': 'application/json' } })
}
