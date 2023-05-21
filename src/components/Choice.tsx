import { twMerge } from "tailwind-merge";
import { Montserrat } from "next/font/google";

import type { DefaultProps } from "@/shared/types";

const montserrat = Montserrat({ weight: "400", subsets: ["latin"] });

export default function Choice({ text, index, className }: ChoiceProps) {
  return (
    <div
      className={twMerge(
        "flex flex-col p-2 border-b whitespace-pre",
        className
      )}
    >
      <span className="text-md">№{index + 1}</span>
      <div className={twMerge("", montserrat.className)}>{text}</div>
    </div>
  );
}

export interface ChoiceProps extends DefaultProps {
  text: string;
  index: number;
}
