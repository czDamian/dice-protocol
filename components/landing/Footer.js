import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="border-t-2 w-full flex flex-col items-center lg:items-start justify-start p-12 gap-4">
      <Link href="./" className="">
        <Image src="/logo.png" alt="Logo" width={24} height={24} />
      </Link>
      <p>&copy; 2024. All rights reserved</p>
    </footer>
  );
}
