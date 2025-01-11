import {google} from "@ai-sdk/google";
import { convertToCoreMessages, streamText } from "ai";

export async function POST(request: Request){
    const {messages} = await request.json();

    const result = await streamText({
        model: google("models/gemini-1.5-pro"),
        system:
        "Tu Eres un Asistente de Viajes, atento y respondes en 4 parrafos",
        messages: convertToCoreMessages(messages)
    });
    return result.toDataStreamResponse();
}