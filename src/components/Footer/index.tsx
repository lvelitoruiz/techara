'use client'

import React, {} from "react";

const InfoProduct: React.FC = () => {
  return (
    <section className="w-full p-0 bg-[#7e807c]">
      <div className="container mx-auto px-4 lg:px-0 py-20">
        <div className="flex flex-col lg:flex-row gap-14 lg:gap-40">
          <div className="w-full">
            <div className="flex flex-col items-start gap-5">
              <h3 className="text-white text-xl uppercase font-light tracking-widest">Newsletter</h3>
              <p className="text-white text-sm font-light">Please enter your e-mail address to subscribe to the newsletter and click the Subscribe button.</p>
              <div className="w-full">
                <input className="border outline-none font-light text-white border-white bg-transparent px-[12px] py-[10px] w-full placeholder:text-white" type="text" placeholder="E-mail" name="" id="" />
              </div>
              <a className="g-button left" href="">
                <span className="font-light tracking-widest">Subscribe</span>
              </a>
            </div>
          </div>
          <div className="w-full">
            <div className="flex flex-col items-start gap-5">
              <h3 className="text-white text-xl uppercase font-light tracking-widest">USER GUIDE</h3>
              <ul className="flex flex-col gap-4">
                <li>
                  <a className="text-sm font-light text-white hover:text-[#1a1311]" href="">About Shipping</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full">
            <div className="flex flex-col items-start gap-5">
              <h3 className="text-white text-xl uppercase font-light tracking-widest">MENU</h3>
              <ul className="flex flex-col gap-4">
                <li>
                  <a className="text-sm font-light text-white hover:text-[#1a1311]" href="">Privacy policy</a>
                </li>
                <li>
                  <a className="text-sm font-light text-white hover:text-[#1a1311]" href="">Terms and Conditions</a>
                </li>
                <li>
                  <a className="text-sm font-light text-white hover:text-[#1a1311]" href="">Contact</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default InfoProduct;