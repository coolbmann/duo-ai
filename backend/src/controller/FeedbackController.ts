import { Body, JsonController, Post } from "routing-controllers";
import { supabase } from "../lib/supabase";

@JsonController("/feedback")
export class FeedbackController {
  constructor() {}

  @Post("/")
  public async createFeedback(
    @Body()
    body: {
      name: string | null;
      email: string | null;
      message: string;
    },
  ) {
    return await supabase
      .from("feedback")
      .insert({ name: body.name, email: body.email, message: body.message })
      .select();
  }
}
