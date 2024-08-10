"use client";

import { Article, Destination } from "@/components";
import {
  Banner,
  Customize,
  Email,
  Exclusive,
  Facebook,
  Facility,
  HamburgerMenu,
  Instagram,
  Itinerary,
  Logo1,
  Logo2,
  Separator1,
} from "@/public";
import Image from "next/image";

const Page = () => {
  return (
    <main className="max-w-[1440px] min-h-dvh min-w-full">
      <header className="bg-[#FAF9F5] h-24 px-4 py-6 fixed top-0 w-full z-10 lg:bg-transparent">
        <div className="flex items-center justify-between max-w-[1096px] mx-auto">
          <Image
            alt="Logo 1"
            className="lg:hidden"
            height={50}
            src={Logo1}
            width={135}
          />
          <Image
            alt="Logo 2"
            className="hidden lg:block"
            height={50}
            src={Logo2}
            width={135}
          />
          <button className="lg:hidden">
            <Image
              alt="Hamburger Menu"
              height={50}
              src={HamburgerMenu}
              width={50}
            />
          </button>
          <div className="hidden gap-x-6 items-center lg:flex">
            <button className="hover:border-b-[2px] hover:border-b-[#FAF9F5] hover:border-solid px-4 py-[18px]">
              <span className="font-bold leading-5 text-[#FAF9F5] text-[16px]">
                Homepage
              </span>
            </button>
            <button className="hover:border-b-[2px] hover:border-b-[#FAF9F5] hover:border-solid px-4 py-[18px]">
              <span className="font-bold leading-5 text-[#FAF9F5] text-[16px]">
                Customize Your Trip
              </span>
            </button>
            <button className="hover:border-b-[2px] hover:border-b-[#FAF9F5] hover:border-solid px-4 py-[18px]">
              <span className="font-bold leading-5 text-[#FAF9F5] text-[16px]">
                Destination
              </span>
            </button>
            <button className="hover:border-b-[2px] hover:border-b-[#FAF9F5] hover:border-solid px-4 py-[18px]">
              <span className="font-bold leading-5 text-[#FAF9F5] text-[16px]">
                Article
              </span>
            </button>
            <button
              className="border-[2px] border-[#FAF9F5] border-solid px-6 py-2.5 rounded-full"
              type="button"
            >
              <span className="font-bold leading-5 text-[#FAF9F5] text-[16px]">
                Need Assitance?
              </span>
            </button>
          </div>
        </div>
      </header>
      <section className="flex mt-24 place-items-center relative lg:mt-0">
        <img
          alt="Banner"
          className="object-center object-cover"
          src={Banner.src}
        />
        <div className="absolute inset-x-0 flex flex-col items-center gap-y-2 mx-auto px-4 w-full lg:items-start lg:max-w-7xl">
          <span className="font-bold leading-[30px] text-[#FAF9F5] text-[24px] text-center lg:leading-[68px] lg:text-left lg:text-[54px]">
            Beyond Expectation
          </span>
          <div className="flex flex-col gap-y-6 items-center w-full lg:items-start lg:max-w-[708px]">
            <span className="leading-5 text-center text-[#FAF9F5] text-[16px] lg:leading-[30px] lg:text-left lg:text-[24px]">
              Experience the finest that Indonesia has to offer with our curated
              selection of premium trips, ensuring comfort every step of the way
            </span>
            <button className="border-[2px] border-[#FAF9F5] border-solid px-6 py-2.5 rounded-full w-fit">
              <span className="font-bold leading-5 text-[#FAF9F5] text-[16px]">
                Take me there
              </span>
            </button>
          </div>
        </div>
      </section>
      <div className="flex flex-col gap-y-4 max-w-[1096px] mx-auto px-4 py-4 w-full lg:gap-y-[72px] lg:py-[72px]">
        <div className="flex flex-col">
          <span className="font-bold leading-10 text-[#004040] text-[32px] text-center uppercase">
            Elevate Your Experience
          </span>
        </div>
        <div className="gap-6 grid lg:grid-cols-3">
          <div className="flex flex-col items-center lg:gap-y-6">
            <img alt="Personal Itineraries" src={Itinerary.src} />
            <div className="flex flex-col gap-y-2 items-center">
              <span className="font-bold leading-7 text-[#0B7373] text-[24px]">
                PERSONAL ITINERARIES
              </span>
              <span className="leading-5 text-[16px] text-black text-center">
                Our premium travel services offer tailor-made itineraries
                crafted to suit your unique preferences and desires.
              </span>
            </div>
          </div>
          <div className="flex flex-col items-center lg:gap-y-6">
            <img alt="Exclusive Experience" src={Exclusive.src} />
            <div className="flex flex-col gap-y-2 items-center">
              <span className="font-bold leading-7 text-[#0B7373] text-[24px]">
                EXCLUSIVE EXPERIENCES
              </span>
              <span className="leading-5 text-[16px] text-black text-center">
                From private charters to behind-the-scenes tours, we offer
                access to unique opportunities that are designed to elevate your
                trip to the next level.
              </span>
            </div>
          </div>
          <div className="flex flex-col items-center lg:gap-y-6">
            <img alt="Best Facilities" src={Facility.src} />
            <div className="flex flex-col gap-y-2 items-center">
              <span className="font-bold leading-7 text-[#0B7373] text-[24px]">
                BEST FACILITIES
              </span>
              <span className="leading-5 text-[16px] text-black text-center">
                Experience the epitome of with our premium facility, designed to
                provide an unparalleled level of comfort and indulgence.
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-y-4 items-center max-w-[952px] mx-auto px-4 py-4 mt-[54px] lg:flex-row lg:gap-x-6 lg:py-[72px] lg:mt-0">
        <img
          alt="Customize"
          className="w-[200px] lg:w-[400px]"
          src={Customize.src}
        />
        <div className="flex flex-col gap-y-4 items-center lg:items-start">
          <span className="font-bold leading-10 text-[#004040] text-[32px] text-center">
            Discover Tailored Experiences
          </span>
          <span className="leading-5 text-[16px] text-black text-center lg:text-start">
            Create your own journey, personalized to suit your preferences and
            interests, ensuring a once-in-a-lifetime adventure awaits.
          </span>
          <button
            className="bg-[#004040] px-6 py-[18px] rounded-full w-full lg:py-2.5 lg:w-fit"
            type="button"
          >
            <span className="font-bold leading-5 text-[16px] text-[#FAF9F5]">
              Customize Your Trip
            </span>
          </button>
        </div>
      </div>
      <img
        alt="Separator 1"
        className="max-w-[1096px] mx-auto px-4 w-full"
        src={Separator1.src}
      />
      <Destination />
      <Article />
      <footer className="bg-[#004040] px-4 py-6">
        <div className="flex flex-col gap-y-4 items-center max-w-[1096px] mx-auto lg:flex-row lg:justify-between">
          <span className="leading-5 text-[16px] text-white">
            © 2023 Zamrood by PT Teknologi Pandu Wisata
          </span>
          <div className="flex gap-x-6 items-center">
            <Image alt="Facebook" height={24} src={Facebook} width={24} />
            <Image alt="Instagram" height={24} src={Instagram} width={24} />
            <Image alt="Email" height={24} src={Email} width={24} />
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Page;
