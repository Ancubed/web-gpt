"use client";

import { twMerge } from "tailwind-merge";
import { Montserrat } from "next/font/google";

import type { DefaultProps, TextAreaChange, Submit } from "@/shared/types";

const montserrat = Montserrat({ weight: "400", subsets: ["latin"] });

export default function PromptInput({
  error,
  text,
  onTextChange,
  onSubmit,
  className,
}: PromptInputProps) {
  return (
    <div className={twMerge("flex flex-col h-72", className)}>
      <h2 className="flex flex-col text-xl mb-2">Запрос</h2>
      <textarea
        className={twMerge(
          "w-full h-full rounded-sm p-2 text-sky-500 focus:outline-none",
          montserrat.className
        )}
        name="prompt-input"
        id="prompt-input"
        placeholder="Текст запроса..."
        minLength={0}
        maxLength={2048}
        value={text}
        onChange={onTextChange}
      />
      {error && (
        <span className="mt-2 text-red-500 text-center text-sm">{error}</span>
      )}
      <button
        className="mt-2 py-2 px-4 bg-blue-700 text-white rounded-md hover:bg-blue-900 focus:outline-none"
        onClick={onSubmit}
      >
        Отправить
      </button>
    </div>
  );
}

interface PromptInputProps extends DefaultProps {
  error: string | null;
  text: string;
  onTextChange: TextAreaChange;
  onSubmit: Submit;
}
