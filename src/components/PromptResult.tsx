"use client";

import { memo } from "react";
import { twMerge } from "tailwind-merge";

import Choice from "@/components/Choice";

import type { DefaultProps, Choices } from "@/shared/types";

export default memo(function PromptInput({
  isLoading,
  choices,
  className,
}: PromptResultProps) {
  return (
    <div className={twMerge("flex flex-col grow overflow-y-hidden", className)}>
      <div className="flex justify-between mb-2">
        <h2 className="text-xl">Ответ</h2>
      </div>
      <div className="overflow-y-scroll flex flex-col grow gap-2 border rounded-l">
        {(isLoading || choices == null || choices?.length === 0) && (
          <div className="h-full w-full flex items-center justify-center text-3xl">
            {isLoading
              ? "Думаем..."
              : choices == null
              ? "Введите ваш запрос"
              : "Нейросеть ничего не сгенерировала :("}
          </div>
        )}
        {!isLoading &&
          choices &&
          choices.length !== 0 &&
          choices.map(
            ({ text, index }) =>
              text && <Choice key={index} index={index} text={text} />
          )}
      </div>
    </div>
  );
});

interface PromptResultProps extends DefaultProps {
  isLoading: boolean;
  choices: Choices | null;
}
