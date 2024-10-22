'use client'

import React, {} from "react";

const InfoProduct: React.FC = () => {
  return (
    <section className="w-full p-0 bg-[#F1F2EE]">
      <div className="container mx-auto px-4 lg:px-0 py-20">
        <div className="flex flex-col lg:flex-row lg:items-center">
          <div className="bg-[#e2e3de] lg:w-[40%] h-[330px] lg:mt-20">
            <img className="w-full h-full object-cover" src="" alt="Product info" />
          </div>
          <div className="lg:w-[60%] md:pl-20 pt-10 lg:pt-0">
            <div>
              <h1 className="text-[39px] md:text-[59px] leading-tight">More Story,</h1>
              <h1 className="text-[39px] md:text-[59px] leading-tight">More MOHEIM.</h1>
            </div>
            <div className="pt-[29px] pl-[35px]">
              <p className="text-sm font-light leading-loose">The common denominator in MOHEIM’s designs is minimalism and simplicity, and a desire to fit smoothly into people’s lives. We use traditional techniques and advanced technology to give shape to our products with an ethical approach in line with the times. MOHEIM is a brand that creates “new standards” to enrich the lives of those who own our products.</p>
              <div className="pt-8 flex items-start">
                <a className="gap-2 flex items-center group" href="">
                  <span className="text-[19px] font-light">Visit to brand site</span>
                  <span className="lnr lnr-arrow-right relative group-hover:right-[-10px] right-0 ease delay-50 transition-[right]"></span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default InfoProduct;