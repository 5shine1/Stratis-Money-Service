import React from "react";

const mockData = [
  { title: "Lowest Fees", text: "asdf" },
  { title: "Fast & Safe", text: "asdf" },
  { title: "Direct Withdraw", text: "asdf" },
];

const FeatureSection = () => {
  return (
    <section className="px-16 py-80 lg:py-120 relative">
      <div className="g-effect absolute -top-[800px] -z-10 -right-[600px] w-[1200px] h-[1600px] scale-50 lg:scale-100"></div>
      <div className="relative w-full  max-w-600 lg:max-w-1440 mx-auto ">
        <h2 className="uppercase text-center">Why Stratis payment</h2>
        <p className="text-gray-400 text-center max-w-1000 mx-auto  mt-24 lg:mt-32">
          Lorem ipsum is a pseudo-Latin text used in web design, typography,
          layout, and printing in place of English to emphasise design elements
          over content. Its also called placeholder (or filler) text.
        </p>

        <div className="flex items-center lg:items-stretch justify-between flex-col lg:flex-row gap-32 mt-56 lg:mt-96">
          {mockData.map((item, i) => (
            <div
              key={i}
              className="rounded-32 w-full bg-primary-600 border border-primary-400 p-12 max-w-400"
            >
              <div className="overflow-hidden aspect-[4/3] rounded-24">
                <img
                  src="/assets/global/mock.png"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="py-24">
                <h6 className="g-button-text w-fit font-semibold text-24 lg:text-32">
                  {item.title}
                </h6>
                <p className="text-gray-400 mt-12">
                  Lorem ipsum is a pseudo-Latin text used in web design,
                  typography, layout, and printing in place of English to
                  emphasise design elements over content. Its also called
                  placeholder (or filler) text.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
