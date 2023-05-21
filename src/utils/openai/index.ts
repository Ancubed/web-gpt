import { Configuration, OpenAIApi } from "openai";
import { AxiosError } from "axios";
import { Choices } from "@/shared/types";

const OPENAI_TOKEN = process.env.OPENAI_TOKEN;
const ORGANISATION_ID = process.env.ORGANISATION_ID;

const openai = new OpenAIApi(
  new Configuration({
    organization: ORGANISATION_ID,
    apiKey: OPENAI_TOKEN,
  })
);

export async function ask(
  prompt: string,
  model = "text-davinci-003",
  timeout = 40000
): Promise<AskError | AskResult> {
  try {
    const response = await openai.createCompletion(
      {
        model,
        prompt,
        temperature: 0.7,
        max_tokens: 2048,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      },
      {
        timeout,
      }
    );

    return { success: true, choices: response.data.choices };
  } catch (err) {
    if (err instanceof Error) {
      console.error(err?.message);
      return {
        success: false,
        choices: null,
        status: 500,
        statusText: "Internal error",
        extendMessage: err?.message,
        message: "Внутренняя ошибка",
      };
    } else {
      const e = err as AxiosError;
      const status = e?.response?.status ?? 500;
      const statusText = e?.response?.statusText ?? "Internal error";
      const extendMessage = e?.response?.data?.error?.message;
      console.error(status, statusText, extendMessage, err);
      return {
        success: false,
        choices: null,
        status,
        statusText,
        extendMessage,
        message: "Ошибка при выполнении запроса на OpenApi",
      };
    }
  }
}

interface AskError {
  success: false;
  choices: Choices | null;
  status: number;
  statusText: string;
  extendMessage: string;
  message: string;
}

interface AskResult {
  success: true;
  choices: Choices;
}
