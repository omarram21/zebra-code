// import { LoginLink } from "@kinde-oss/kinde-auth-nextjs";
// import Image from "next/image";
// import React from 'react'; // Ensure React is imported
'use client'
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p>homarl </p>
        <LoginLink>Sign in</LoginLink>
        <p>hello all11111 </p>

      </div>
    </main>
  );
}
