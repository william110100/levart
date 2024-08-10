import { ArrowRight } from "@/public";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

export const Destination = () => {
  const { data } = useQuery({
    queryKey: ["destination"],
    queryFn: () =>
      fetch("https://pandooin.com/api/zamrood/itinerary?highlight=true").then(
        (res) => res?.json()
      ),
  });

  return (
    <section className="max-w-[1096px] mx-auto px-4 py-[54px] lg:py-[72px]">
      <div className="flex flex-col">
        <div className="flex flex-col gap-x-6 gap-y-4 items-start lg:flex-row lg:items-center">
          <span className="font-bold leading-[44px] text-[#004040] text-[36px]">
            Destinations
          </span>
          <button className="flex gap-x-4 items-center">
            <Image alt="Arrow Right" height={44} src={ArrowRight} width={44} />
            <span className="font-bold leading-5 text-[#004040] text-[16px] uppercase lg:font-normal">
              Explore More
            </span>
          </button>
        </div>
        {data?.data?.map((destination: any, index: number) => (
          <div
            className="gap-x-6 gap-y-4 grid grid-cols-1 px-4 py-6 lg:grid-cols-2 lg:py-[72px]"
            key={destination?.itinerary_id}
          >
            <img
              alt=""
              className={`${
                index % 2 === 0 ? "order-last" : ""
              } max-h-[374px] w-full`}
              src={destination?.related_galleries?.[0]?.src}
            />
            <div className="flex flex-col gap-y-4 justify-between">
              <div className="flex flex-col gap-y-2">
                <span className="leading-[14px] text-[#004040] text-[12px] uppercase lg:leading-5 lg:text-[16px]">
                  {destination?.itinerary_day} days{" "}
                  {destination?.itinerary_day - 1} nights
                </span>
                <span className="font-bold leading-5 text-[#0B7373] text-[16px] lg:leading-[44px] lg:text-[36px]">
                  {destination?.itinerary_name}
                </span>
                <span className="font-bold leading-5 text-[#004040] text-[16px]">
                  Organized by {destination?.partner_name}
                </span>
                <span className="leading-5 text-[#004040] text-[16px] truncate">
                  {destination?.itinerary_short_description}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-y-2 lg:gap-y-0">
                  <span className="leading-5 text-[#004040] text-[16px]">
                    Start from
                  </span>
                  <span className="hidden font-medium leading-5 text-[#B8B8B8] text-[16px] lg:block">
                    IDR 9999999
                  </span>
                  <span className="font-medium leading-[2px] text-[#004040] text-[18px] lg:leading-7 lg:text-[#0B7373] lg:text-[34px]">
                    IDR{" "}
                    {destination?.related_variant?.itinerary_variant_pub_price}
                  </span>
                </div>
                <button className="border-[2px] border-[#004040] border-solid px-4 py-2 rounded-full lg:py-[18px]">
                  <span className="font-bold leading-5 text-[#004040] text-[16px]">
                    See Details
                  </span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
