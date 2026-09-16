import { ApiClient } from "@/config/api";
import { endpoints } from "@/api/endpoints.ts";
import type { ApiResponse, PaginatedResult, RepositoryResult } from "@/models/Api";
import type { DetailQuestion } from "@/models/DetailQuestion"
import { mapQuestionFromJson, type JsonQuestion, type Question, type QuestionFilters, type QuestionInclude } from "@/models/Question";
import { buildQueryParams } from "@/utils/http";



export const questionRepository = {
  async getQuestion(id: number, include?: QuestionInclude[]): Promise<RepositoryResult<Question>> {
    const query = buildQueryParams({ include });
    try {
      const response = await ApiClient.get(`${endpoints.questions.byId(id)}?${query}`, null, false)
      const jsonData = response.data as JsonQuestion;
      const question = mapQuestionFromJson(jsonData)

      return { data: question }
    } catch (err: unknown) {
      return { error: err instanceof Error ? err.message : String(err) }
    }
  },

  async getQuestions(param: QuestionFilters): Promise<RepositoryResult<PaginatedResult<Question>>> {
    const query = buildQueryParams(param);

    try {
      const response = await ApiClient.get(`${endpoints.questions.base}?${query}`, null, false)
      const data = response.data as ApiResponse<JsonQuestion[]>
      if (!data.data) return { data: { items: [], pagination: data.pagination } }
      const questions = data.data.map(q => mapQuestionFromJson(q));
      return { data: { items: questions, pagination: data.pagination } }
    } catch (err: unknown) {
      return { error: err instanceof Error ? err.message : String(err) }
    }
  },

  async getQuestionDetail(id: number): Promise<RepositoryResult<DetailQuestion>> {
    try {
      return await ApiClient.get(`${endpoints.questions.byId(id)}?detail=full`, null, false)
    } catch (err: unknown) {
      return { error: err instanceof Error ? err.message : String(err) }
    }
  },

  async getQuestionsByQuestionSetId(id: number): Promise<RepositoryResult<number[]>> {
    try {
      return await ApiClient.get(`${endpoints.questionSets.questions(id)}?fields=id`, null, false)
    } catch (err: unknown) {
      return { error: err instanceof Error ? err.message : String(err) }
    }
  },

  async getQuestionsByArray(idArray: number[]): Promise<RepositoryResult<Question[]>> {
    try {
      return await ApiClient.post(endpoints.questions.byIds, { IDs: idArray }, false)
    } catch (err: unknown) {
      return { error: err instanceof Error ? err.message : String(err) }
    }
  },

  async getQuestionsBySet(idSet: number): Promise<RepositoryResult<Question[]>> {
    try {
      return await ApiClient.get(endpoints.questionSets.questions(idSet), null, false)
    } catch (err: unknown) {
      return { error: err instanceof Error ? err.message : String(err) }
    }
  },
  async getQuestionFilters(): Promise<RepositoryResult<QuestionFilters>> {
    try {
      return await ApiClient.get(endpoints.questions.filters, null, false)
    } catch (err: unknown) {
      return { error: err instanceof Error ? err.message : String(err) }
    }
  }
}

