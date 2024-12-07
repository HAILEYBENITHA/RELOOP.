import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Welcome to RELOOP</h1>
      <p className="text-xl mb-8">
        Turn your waste into valuable products. Schedule a pickup, track the recycling process, and receive your recycled items - all while helping the environment!
      </p>
      <Link href="/schedule-pickup">
        <Button size="lg">Schedule a Pickup</Button>
      </Link>
    </div>
  )
}

