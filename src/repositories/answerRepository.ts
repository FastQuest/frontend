import { ApiClient } from "@/config/api";
import { endpoints } from "@/api/endpoints.ts";
import type { PerformanceJson, UserOverallPerformanceJson, UserOverallPerformance, UserPerformance } from "@/models/Answer";
import type { QuestionOption, Subject } from "@/models/Question";

type RepositoryResult<T> = { data?: T; error?: string }

export const questionOptionRepository = {
  async getListById(ids: number[]): Promise<RepositoryResult<QuestionOption[]>> {
    try {
      return ApiClient.post(endpoints.questionOptions.byIds, { question_option_ids: ids }, false)
    } catch (err: unknown) {
      return { error: err instanceof Error ? err.message : String(err) }
    }
  },

  async getPerformance(): Promise<RepositoryResult<UserPerformance[]>> {
    try {
      const response = await ApiClient.get(endpoints.answers.performance, null, true)
      const jsonData = response.data as PerformanceJson[];

      const data = jsonData.map((json: PerformanceJson): UserPerformance => {
        return {
          subject: json.subject as Subject,
          totalAnswers: json.total_answers,
          totalCorrect: json.total_correct,
          percentualCorrect: json.percentual_correct
        }
      })
      return { data }
    } catch (err: unknown) {
      return { error: err instanceof Error ? err.message : String(err) }
    }
  },

  async getOverallPerformance(): Promise<RepositoryResult<UserOverallPerformance[]>> {
    try {
      const response = await ApiClient.get(endpoints.answers.overallPerformance, null, true)
      const jsonData = response.data as UserOverallPerformanceJson[];
      const data = jsonData.map((json: UserOverallPerformanceJson): UserOverallPerformance => {
        return {
          totalAnswers: json.total_answers,
          totalCorrect: json.total_correct,
          percentualCorrect: json.percentual_correct
        }
      })
      return { data }
    } catch (err: unknown) {
      return { error: err instanceof Error ? err.message : String(err) }
    }
  },
}

export const answerRepository = questionOptionRepository
