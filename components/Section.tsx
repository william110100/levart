'use client';

import { FullPart1, FullPart2 } from '@/public';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Header } from './Header';
import { IconBox, IconPhoneCall, IconPhoto, IconScreenShare, IconTarget } from '@tabler/icons-react';

export const Section = () => {
  const [slideIdx, setSlideIdx] = useState<number>(0);

  useEffect(() => {
    const intervalId = setInterval(() => setSlideIdx((prevIdx) => (prevIdx + 1) % 5), 5000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className="bg-center bg-cover bg-hyperhire place-items-center">
      <div className="max-w-7xl px-4 w-full pb-[60px]">
        <Header />
        <div className="flex items-center justify-between pt-9 lg:pt-[100px]">
          <div className="flex flex-col gap-y-[60px]">
            <div className="flex flex-col gap-y-5">
              <motion.img
                alt=""
                animate="visible"
                className="hidden lg:block"
                initial="hidden"
                height={48}
                src={FullPart1.src}
                variants={{
                  hidden: {
                    opacity: 0,
                  },
                  visible: {
                    opacity: 1,
                    transition: {
                      duration: 0.5,
                    },
                  },
                }}
                width={150}
              />
              <motion.img
                alt=""
                animate="visible"
                className="block lg:hidden"
                initial="hidden"
                height={48}
                src={FullPart2.src}
                variants={{
                  hidden: {
                    opacity: 0,
                  },
                  visible: {
                    opacity: 1,
                    transition: {
                      duration: 0.5,
                    },
                  },
                }}
                width={150}
              />
              <motion.div
                animate="visible"
                className="flex flex-col gap-y-1"
                initial="hidden"
                variants={{
                  hidden: {
                    opacity: 0,
                  },
                  visible: {
                    opacity: 1,
                    transition: {
                      duration: 0.5,
                    },
                  },
                }}>
                <span className="font-black text-4xl text-white lg:text-5xl">최고의 실력을 가진</span>
                <span className="font-black text-4xl text-white lg:text-5xl">외국인 인재를 찾고 계신가요?</span>
              </motion.div>
              <motion.div
                animate="visible"
                className="flex flex-col gap-y-1"
                initial="hidden"
                variants={{
                  hidden: {
                    opacity: 0,
                  },
                  visible: {
                    opacity: 1,
                    transition: {
                      duration: 0.5,
                    },
                  },
                }}>
                <span className="font-black text-lg text-white/90 lg:text-2xl">법률 및 인사관리 부담없이</span>
                <span className="font-black text-lg text-white/90 lg:text-2xl">
                  1주일 이내에 원격으로 채용해보세요.
                </span>
              </motion.div>
              <span className="font-black mt-2 text-[#FBFF23] text-lg md:text-white">개발자가 필요하신가요?</span>
            </div>
            <div className="hidden gap-x-12 grid-cols-3 md:grid">
              <div className="flex flex-col gap-y-2 w-40">
                <hr className="text-white w-[120px]" />
                <span className="font-black text-lg text-white">평균 월 120만원</span>
                <span className="font-black text-lg text-white/80">임금을 해당 국가를 기준으로 계산합니다.</span>
              </div>
              <div className="flex flex-col gap-y-2 w-40">
                <hr className="text-white w-[120px]" />
                <span className="font-black text-lg text-white">최대 3회 인력교체</span>
                <span className="font-black text-lg text-white/80">막상 채용해보니 맞지 않아도 걱정하지 마세요. </span>
              </div>
              <div className="flex flex-col gap-y-2 w-40">
                <hr className="text-white w-[120px]" />
                <span className="font-black text-lg text-white">평균 3일, 최대 10일</span>
                <span className="font-black text-lg text-white/80">
                  급하게 사람이 필요한 경우에도 빠른 채용이 가능합니다.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden relative w-full lg:block">
        <motion.div
          animate="visible"
          className="flex gap-x-2.5 items-end justify-end overflow-x-scroll pb-[60px] lg:pb-[100px]"
          exit="exit"
          initial="hidden"
          key={slideIdx}
          variants={{
            exit: { opacity: 0, x: '-100%' },
            hidden: { opacity: 0, x: '100%' },
            visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
          }}>
          <div className="bg-white/20 flex gap-x-6 items-center p-4 rounded-lg w-80">
            <div className="bg-white/40 p-3 rounded-lg">
              <IconScreenShare color="#FFFFFF" size={28} />
            </div>
            <span className="font-black text-2xl text-white">해외 마케팅</span>
          </div>
          <div className="bg-white/20 flex gap-x-6 items-center p-4 rounded-lg w-80">
            <div className="bg-white/40 p-3 rounded-lg">
              <IconPhoto color="#FFFFFF" size={28} />
            </div>
            <span className="font-black text-2xl text-white">퍼블리셔</span>
          </div>
          <div className="bg-white/20 flex gap-x-6 items-center p-4 rounded-lg w-80">
            <div className="bg-white/40 p-3 rounded-lg">
              <IconBox color="#FFFFFF" size={28} />
            </div>
            <span className="font-black text-2xl text-white">캐드원(제도사)</span>
          </div>
          <div className="bg-white/20 flex gap-x-6 items-center p-4 rounded-lg w-80">
            <div className="bg-white/40 p-3 rounded-lg">
              <IconTarget color="#FFFFFF" size={28} />
            </div>
            <span className="font-black text-2xl text-white">해외 세일즈</span>
          </div>
          <div className="bg-white/20 flex gap-x-6 items-center p-4 rounded-lg w-80">
            <div className="bg-white/40 p-3 rounded-lg">
              <IconPhoneCall color="#FFFFFF" size={28} />
            </div>
            <span className="font-black text-2xl text-white">해외 CS</span>
          </div>
        </motion.div>
      </div>
      {/* <div className="flex flex-col gap-y-[60px] h-fit"></div> */}
    </section>
  );
};
