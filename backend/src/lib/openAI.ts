import { ChatOpenAI } from "@langchain/openai";

class LLMService {
  private static instance: LLMService;
  private llm: ChatOpenAI;

  private constructor() {
    this.llm = new ChatOpenAI({
      model: "gpt-4o-mini",
      maxTokens: 1000,
      apiKey: process.env.OPENAI_API_KEY,
      temperature: 0,
    });
  }

  static getInstance(): LLMService {
    if (!LLMService.instance) {
      LLMService.instance = new LLMService();
    }
    return LLMService.instance;
  }

  invoke(messages: any[]) {
    return this.llm.invoke(messages);
  }

  stream(messages: any[]) {
    return this.llm.stream(messages);
  }

  withStructuredOutput(
    schema: any,
    options?: { name?: string; strict?: boolean },
  ) {
    return this.llm.withStructuredOutput(schema, options);
  }
}

export const openAIService = LLMService.getInstance();
