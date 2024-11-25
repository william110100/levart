import { Hyperhire, IconKor } from '@/public';
import { IconCode, IconSettingsFilled, IconSquareArrowRight, IconUserFilled } from '@tabler/icons-react';
import Image from 'next/image';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#FBFBFB] place-items-center px-4 py-16 md:px-8 lg:px-16">
      <div className="flex flex-col gap-y-12 max-w-7xl w-full">
        <div className="flex flex-col gap-[18px] lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-y-[18px] w-[248px]">
            <div className="flex flex-col gap-y-4">
              <Image alt="Hyperhire" height={34} priority src={Hyperhire} width={188} />
              <span className="font-black text-[#343741] text-sm">
                우리는 국가의 장벽을 넘어 최고의 인재를 매칭해드립니다.
              </span>
            </div>
            <div className="flex flex-col gap-y-2.5">
              <span className="font-black text-[#5E626F] text-xs">010-0000-0000</span>
              <span className="font-black text-[#5E626F] text-xs">aaaaa@naver.com</span>
            </div>
          </div>
          <div className="gap-2 grid grid-cols-2 md:flex md:gap-x-4">
            <div className="bg-white flex flex-col gap-y-4 p-4 rounded-xl w-full lg:w-[188px]">
              <div className="flex flex-col gap-y-3">
                <div className="bg-[#EFF1F6] p-2 rounded w-fit">
                  <IconCode color="#7388A9" />
                </div>
                <span className="font-black text-[#343741] text-sm">해외 개발자 원격 채용</span>
              </div>
              <div className="flex gap-x-1 items-center">
                <span className="font-black text-[#5E626F] text-xs">바로가기</span>
                <IconSquareArrowRight color="#5E626F" radius={32} />
              </div>
            </div>
            <div className="bg-white flex flex-col gap-y-4 p-4 rounded-xl w-full lg:w-[188px]">
              <div className="flex flex-col gap-y-3">
                <div className="bg-[#EFF1F6] p-2 rounded w-fit">
                  <IconUserFilled color="#7388A9" />
                </div>
                <span className="font-black text-[#343741] text-sm">해외 개발자 원격 채용</span>
              </div>
              <div className="flex gap-x-1 items-center">
                <span className="font-black text-[#5E626F] text-xs">바로가기</span>
                <IconSquareArrowRight color="#5E626F" radius={32} />
              </div>
            </div>
            <div className="bg-white flex flex-col gap-y-4 p-4 rounded-xl w-full lg:w-[188px]">
              <div className="flex flex-col gap-y-3">
                <div className="bg-[#EFF1F6] p-2 rounded w-fit">
                  <Image alt="Korea" height={24} src={IconKor} width={24} />
                </div>
                <span className="font-black text-[#343741] text-sm">해외 개발자 원격 채용</span>
              </div>
              <div className="flex gap-x-1 items-center">
                <span className="font-black text-[#5E626F] text-xs">바로가기</span>
                <IconSquareArrowRight color="#5E626F" radius={32} />
              </div>
            </div>
            <div className="bg-white flex flex-col gap-y-4 p-4 rounded-xl w-full lg:w-[188px]">
              <div className="flex flex-col gap-y-3">
                <div className="bg-[#EFF1F6] p-2 rounded w-fit">
                  <IconSettingsFilled color="#7388A9" />
                </div>
                <span className="font-black text-[#343741] text-sm">해외 개발자 원격 채용</span>
              </div>
              <div className="flex gap-x-1 items-center">
                <span className="font-black text-[#5E626F] text-xs">바로가기</span>
                <IconSquareArrowRight color="#5E626F" radius={32} />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-9">
          <div className="flex flex-col gap-y-2.5">
            <span className="font-black text-[#343741] text-xs">상호명</span>
            <span className="font-black text-[#343741] text-xs">하이퍼하이어</span>
            <span className="font-black text-[#343741] text-xs">Hyperhire India Private Limited</span>
          </div>
          <div className="flex flex-col gap-y-2.5">
            <span className="font-black text-[#343741] text-xs">대표 CEO</span>
            <span className="font-black text-[#343741] text-xs">김주현</span>
            <span className="font-black text-[#343741] text-xs">Juhyun Kim</span>
          </div>
          <div className="flex flex-col gap-y-2.5">
            <span className="font-black text-[#343741] text-xs">사업자등록번호 CIN</span>
            <span className="font-black text-[#343741] text-xs">427-86-01187</span>
            <span className="font-black text-[#343741] text-xs">U74110DL2016PTC290812</span>
          </div>
          <div className="flex flex-col gap-y-2.5">
            <span className="font-black text-[#343741] text-xs">주소 ADDRESS</span>
            <span className="font-black text-[#343741] text-xs">서울특별시 강남대로 479, 지하 1층 238호 </span>
            <span className="font-black text-[#343741] text-xs">
              D-138, Street number 11, Jagjeet Nagar, North East Delhi, New Delhi, 110053 India
            </span>
          </div>
        </div>
        <span className="font-black self-start text-[#5E626F] text-xs">&copy; {currentYear} HyperHire</span>
      </div>
    </footer>
  );
};
