import Categories from '@/app/_components/Categories';
import HeroSection from '@/app/_components/HeroSection';
import CountdownTimer from '@/app/_components/CountdowTimer';
export default function Home() {
  return (
    <div >
      <HeroSection />
      <Categories />
      <CountdownTimer />
    </div>
  );
}
