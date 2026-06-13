import Hero from '@/components/home/Hero'
import FeaturedListings from '@/components/home/FeaturedListings'
import CategoryGrid from '@/components/home/CategoryGrid'
import WhyWorkWithMe from '@/components/home/WhyWorkWithMe'
import StatsCounter from '@/components/home/StatsCounter'
import Testimonials from '@/components/home/Testimonials'
import CTASection from '@/components/home/CTASection'

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedListings />
      <CategoryGrid />
      <StatsCounter />
      <WhyWorkWithMe />
      <Testimonials />
      <CTASection />
    </>
  )
}
