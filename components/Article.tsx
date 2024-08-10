import { useQuery } from "@tanstack/react-query";

export const Article = () => {
  const { data } = useQuery({
    queryKey: ["article"],
    queryFn: () =>
      fetch("https://pandooin.com/api/zamrood/article").then((res) =>
        res?.json()
      ),
  });

  return (
    <section className="max-w-[1096px] mx-auto p-4 lg:py-[72px]">
      <div className="flex flex-col gap-y-6">
        <div className="flex flex-col gap-y-2">
          <span className="font-bold leading-[44px] text-[#0B7373] text-[36px]">
            Articles
          </span>
          <span className="leading-7 text-[#0B7373] text-[24px]">
            Our curated writings, offering something for every reader.
          </span>
        </div>
        <div className="gap-6 grid grid-cols-1 lg:grid-cols-2">
          <div className="flex flex-col">
            <img
              alt={data?.data?.[0]?.title}
              className="h-full max-h-[650px]"
              src={data?.data?.[0]?.featured_image}
            />
            <span className="bg-[#0B7373] font-bold leading-5 px-4 py-[26px] text-[#FAF9F5] text-[16px]">
              {data?.data?.[0]?.title}
            </span>
          </div>
          <div className="gap-6 grid grid-cols-1 lg:grid-cols-2">
            {data?.data?.slice(1).map((article: any) => (
              <div className="flex flex-col" key={article.id}>
                <img
                  alt={article?.title}
                  className="h-full"
                  src={article?.featured_image}
                />
                <span className="bg-[#0B7373] font-bold leading-5 p-4 text-[#FAF9F5] text-[16px] truncate">
                  {article?.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
