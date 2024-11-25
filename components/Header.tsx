import { HyperhireDark } from '@/public';
import Image from 'next/image';

export const Header = () => {
  return (
    <header className="flex items-center justify-between py-3 sticky top-0 w-full z-20 lg:h-auto">
      <Image alt="Hyperhire" className="bg-transparent" height={20} priority src={HyperhireDark} width={114} />
      <button className="bg-white font-black px-6 py-[6px] rounded-lg text-[#4A77FF] text-base">문의하기</button>
    </header>
  );
};
