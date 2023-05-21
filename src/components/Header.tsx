import { twMerge } from "tailwind-merge";
import Link from "next/link";

import { DefaultProps } from "@/shared/types";

export default function Header({ className }: DefaultProps) {
  return (
    <header
      className={twMerge("flex items-center h-14 rounded-b-sm", className)}
    >
      <nav className="w-full flex justify-between items-center">
        <Link href="/" className="text-2xl">
          Web GPT
        </Link>
        <div className="flex flex-grow mx-6">
          <Link href="/about" className="text-md">
            Описание
          </Link>
        </div>
        <Link
          href="https://github.com/ancubed"
          className="hidden sm:block text-xl"
        >
          Ancubed
        </Link>
      </nav>
    </header>
  );
}
