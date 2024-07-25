// import { LoginLink } from "@kinde-oss/kinde-auth-nextjs";
// import Image from "next/image";
// import React from 'react'; // Ensure React is imported
'use client'
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs";
import { Check, Star } from "lucide-react";

export default function Home() {
  console.log(process.env.NODE_ENV )
  console.log(process.env.API_URL);

  // Client-side (only if prefixed with NEXT_PUBLIC_)
  console.log(process.env.NEXT_PUBLIC_API_URL);
  return (
    <div className='bg-slate-50 grainy-light'>
      <section>
        <MaxWidthWrapper className='pb-24 pt-10 sm:pb-32 lg:gap-x-0 xl:gap-x-8 lg:pt-24 xl:pt-32 lg:pb-52'>
          <div className='col-span-2 px-6 lg:px-0 lg:pt-4'>
            <div className='relative mx-auto text-center  flex flex-col items-center '>
              <div className='absolute w-28 left-0 -top-20 hidden lg:block'>
                {/* i forgot this div right here in the video, it's purely visual gradient and looks nice */}
                <div className='absolute inset-x-0 bottom-0 bg-gradient-to-t via-slate-50/50 from-slate-50 h-28' />
                {/* <img src='/snake-1.png' className='w-full' /> */}
              </div>
              <h1 className=' relative w-fit tracking-tight text-balance mt-16 font-bold !leading-tight text-gray-900 text-5xl md:text-6xl lg:text-7xl'>
                JPI <span className='text-[#ff5c57]'>Storeroom</span>
              </h1>
              <p className='mt-8 text-lg lg:pr-10 max-w-prose text-center  text-balance md:text-wrap'>
              <span className="text-[#ff5c57] font-bold">Welcome to JPI Storeroom! </span>  
              At JPI Storeroom, we believe in providing top-notch storage solutions tailored to meet your needs. Whether you’re looking to organize your inventory, secure your important documents, or streamline your supplies, our state-of-the-art facilities are here to ensure your items are stored safely and efficiently.
              </p>
            </div>
          </div>

        
        </MaxWidthWrapper>
      </section>
    </div>
  );
}
