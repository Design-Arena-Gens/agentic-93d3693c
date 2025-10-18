"use client"
import { useRouter } from 'next/navigation'
import SearchBar from './SearchBar'

export default function SearchBox() {
  const router = useRouter()
  return <SearchBar onSelect={(id)=> router.push(`/shop/${id}`)} />
}
