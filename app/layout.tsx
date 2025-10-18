import './globals.css'
import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
import Link from 'next/link'

const openSans = Open_Sans({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: 'FreshCart Market',
  description: 'Your neighborhood supermarket — fresh, friendly, and fast.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={openSans.variable}>
      <body>
        <a href="#content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:bg-white focus:px-3 focus:py-2 focus:rounded-md">Skip to content</a>
        <header className="sticky top-0 z-40 bg-cream/80 backdrop-blur border-b border-gray-200">
          <div className="mx-auto max-w-7xl px-4 py-3 flex items-center gap-4">
            <Link href="/" className="text-lg font-bold text-leaf">FreshCart</Link>
            <nav aria-label="Main" className="hidden md:flex items-center gap-6 text-sm">
              <Link href="/shop" className="hover:underline">Shop</Link>
              <Link href="/recipes" className="hover:underline">Recipes</Link>
              <Link href="/locator" className="hover:underline">Store Locator</Link>
              <Link href="/loyalty" className="hover:underline">Loyalty</Link>
            </nav>
            <div className="ml-auto flex items-center gap-3">
              <Link href="/cart" className="btn btn-secondary" aria-label="View cart">Cart</Link>
              <Link href="/account" className="btn btn-primary" aria-label="Account">Account</Link>
            </div>
          </div>
        </header>
        <main id="content" className="min-h-screen pb-20">{children}</main>
        <div className="md:hidden bottom-nav">
          <nav aria-label="Bottom">
            <ul className="grid grid-cols-4 text-center">
              <li><Link className="block p-3" href="/">Home</Link></li>
              <li><Link className="block p-3" href="/shop">Shop</Link></li>
              <li><Link className="block p-3" href="/cart">Cart</Link></li>
              <li><Link className="block p-3" href="/account">Account</Link></li>
            </ul>
          </nav>
        </div>
      </body>
    </html>
  )
}
