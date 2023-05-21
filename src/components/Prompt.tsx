"use client";

import { useState } from "react";
import { twMerge } from "tailwind-merge";

import PromptInput from "@/components/PromptInput";
import PromptResult from "@/components/PromptResult";

import type {
  DefaultProps,
  Submit,
  TextAreaChange,
  Choices,
} from "@/shared/types";

export default function Prompt({ className }: DefaultProps) {
  const [filter, setFilter] = useState({
    text: "",
  });
  const [choices, setChoices] = useState<Choices | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const onTextChange: TextAreaChange = (e) => {
    setFilter({
      ...filter,
      text: e.target.value,
    });
  };

  const onSubmit: Submit = async (e) => {
    setIsLoading(true);

    try {
      const res = await fetch("/api/prompt", {
        method: "POST",
        body: JSON.stringify({
          text: filter.text.trim(),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setChoices(data?.choices);
        setError(null);
      } else {
        setError(data.message);
      }
    } catch (err) {
      if (err instanceof Error) {
        setError("Ошибка при выполнении запроса");
      }
    }

    setIsLoading(false);
  };

  return (
    <div
      className={twMerge(
        "flex flex-col md:flex-row gap-2 md:gap-4 h-full",
        className
      )}
    >
      <PromptResult
        isLoading={isLoading}
        choices={choices}
        className="md:w-1/2"
      />
      <PromptInput
        error={error}
        text={filter.text}
        onTextChange={onTextChange}
        onSubmit={onSubmit}
        className="md:w-1/2 md:h-full"
      />
    </div>
  );
}
