import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { inngest } from "./client";
import { generateText } from "ai";
import { createOpenAI } from "@ai-sdk/openai"

const google = createGoogleGenerativeAI()
const openai = createOpenAI()

export const execute = inngest.createFunction(
  { id: "execute-ai" },
  { event: "execute/ai" },
  async ({ event, step }) => {
    await step.sleep("pretend", "5s")

    const {steps: geminiSteps} = await step.ai.wrap(
      "using-gemini-ai",
      generateText, 
      {
        model: google("gemini-2.5-flash"),
        system: "You are a helpful assistant",
        prompt: "What is 2 / 10"
      }
    )

    const {steps: openaiSteps} = await step.ai.wrap(
      "using-apen-ai",
      generateText, 
      {
        model: openai("gpt-4.1-mini"),
        system: "You are a helpful assistant",
        prompt: "What is 2 / 10"
      }
    )
    
    return {
      openaiSteps,
      geminiSteps
    }
  },
);