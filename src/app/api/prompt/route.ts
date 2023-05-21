import { NextResponse } from "next/server";

import { ask } from "@/utils/openai";

export async function POST(request: Request) {
  const text: string | undefined = (await request.json())?.text;

  if (text) {
    const data = await ask(text);

    if (data.success) {
      return NextResponse.json(data);
    }

    return new NextResponse(JSON.stringify(data), {
      status: data.status,
      headers: { "content-type": "application/json" },
    });
  }
}
