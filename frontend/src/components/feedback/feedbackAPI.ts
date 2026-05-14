import { baseApi } from "../../store/baseApi";

export interface FeedbackPayloadType {
  name: string | null;
  email: string | null;
  message: string;
}

export const feedbackApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createFeedback: build.mutation<FeedbackPayloadType, FeedbackPayloadType>({
      query: (feedback) => ({
        url: "/feedback",
        method: "POST",
        body: feedback,
      }),
    }),
  }),
});

export const { useCreateFeedbackMutation } = feedbackApi;
