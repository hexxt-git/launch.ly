import Faqs from '@/features/home/components/faqs'
import Footer from '@/features/home/components/Footer'
import { Hero } from '@/features/home/components/hero'
import WhtWeoffer from '@/features/home/components/whtWeoffer'
import { WhyChooseUs } from '@/features/home/components/whychooseus'
import { createFileRoute, Link } from '@tanstack/react-router'
import Heaers from '@/features/home/components/header'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Heaers/>
      <Hero/>
      <WhtWeoffer/>
      <WhyChooseUs/>
      <Faqs/>
      <Footer/>
    </div>
  )
}
