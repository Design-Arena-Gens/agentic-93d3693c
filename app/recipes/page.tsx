import Link from 'next/link'

const recipes = [
  {
    id: 'avocado-toast',
    title: 'Avocado Toast with Eggs',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1200&auto=format&fit=crop',
    ingredients: [
      { name: 'Sourdough Bread', productId: 'bread-sourdough' },
      { name: 'Large Eggs', productId: 'eggs-12' },
    ],
  },
  {
    id: 'banana-split',
    title: 'Banana Split',
    image: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=1200&auto=format&fit=crop',
    ingredients: [
      { name: 'Bananas', productId: 'bananas' },
      { name: 'Vanilla Ice Cream', productId: 'ice-cream-vanilla' },
    ],
  },
]

export default function RecipesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6 space-y-6">
      <h1 className="text-xl font-semibold">Recipes</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {recipes.map(r => (
          <article key={r.id} className="card overflow-hidden">
            <img src={r.image} alt="" className="h-48 w-full object-cover" />
            <div className="p-4 space-y-2">
              <h2 className="font-semibold">{r.title}</h2>
              <ul className="list-disc pl-5 text-sm">
                {r.ingredients.map((ing, i) => (
                  <li key={i}><Link className="underline" href={`/shop/${ing.productId}`}>{ing.name}</Link></li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
