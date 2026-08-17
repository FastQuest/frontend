import { API_BASE_URL, ApiClient } from "@/config/api";
import type { ApiResponse, PaginatedResult, RepositoryResult } from "@/models/Api";
import type { DetailQuestion } from "@/models/DetailQuestion"
import { mapQuestionFromJson, type JsonQuestion, type Question, type QuestionFilters, type QuestionInclude } from "@/models/Question";
import { buildQueryParams } from "@/utils/http";



export const questionRepository = {
  async getQuestion(id: number, include?: QuestionInclude[]): Promise<RepositoryResult<Question>> {
    const query = buildQueryParams({include});
    try {
      /*const res = await fetch(`${API_BASE_URL}/questions/${id}?${query}`)
      if (!res.ok) throw new Error(`Erro ao buscar questão: ${res.status}`)

      const data = await res.json() as JsonQuestion*/
      const response = await ApiClient.get(`questions/${id}?${query}`, null, false)
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
      /*const res = await fetch(`${API_BASE_URL}/questions?${query}`)
      if (!res.ok) throw new Error(`Erro ao buscar questão: ${res.status}`)*/
      const response = await ApiClient.get(`questions?${query}`, null, false)
      const data = response.data as ApiResponse<JsonQuestion[]>
      if (!data.data) return { data: {items: [], pagination: data.pagination} }
      const questions = data.data.map(q => mapQuestionFromJson(q));
      return { data: {items: questions, pagination: data.pagination} }
    } catch (err: unknown) {
      return { error: err instanceof Error ? err.message : String(err) }
    }
  },

  async getQuestionDetail(id: number): Promise<RepositoryResult<DetailQuestion>> {
    try {
      /*const res = await fetch(`${API_BASE_URL}/questions/${id}?detail=full`)
      if (!res.ok) throw new Error(`Erro ao buscar questão: ${res.status}`)
      const data = await res.json()*/
      return await ApiClient.get(`questions/${id}?detail=full`, null, false)
    } catch (err: unknown) {
      return { error: err instanceof Error ? err.message : String(err) }
    }
  },

  async getQuestionsByQuestionSetId(id: number): Promise<RepositoryResult<number[]>> {
    try {
      /*const res = await fetch(`${API_BASE_URL}/question-sets/${id}/questions?fields=id`)
      if (!res.ok) throw new Error(`Erro ao buscar questão: ${res.status}`)
      const data = await res.json()*/
      return await ApiClient.get(`question-sets/${id}/questions?fields=id`, null, false)
    } catch (err: unknown) {
      return { error: err instanceof Error ? err.message : String(err) }
    }
  },

  async getQuestionsByArray(idArray: number[]): Promise<RepositoryResult<Question[]>> {
    try {
      /*const res = await fetch(`${API_BASE_URL}/questions/by-ids`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          IDs: idArray
        })
      })


      if (!res.ok) throw new Error(`Erro ao buscar questão: ${res.status}`)
      const data = await res.json()
      return { data }*/
      return await ApiClient.post("questions/by-ids", {IDs: idArray}, false)
    } catch (err: unknown) {
      return { error: err instanceof Error ? err.message : String(err) }
    }
  },

  async getQuestionsBySet(idSet: number): Promise<RepositoryResult<Question[]>> {
    try {
      /*const res = await fetch(`${API_BASE_URL}/question-sets/${idSet}/questions`)
      if (!res.ok) throw new Error(`Erro ao buscar questão: ${res.status}`)
      const data = await res.json()
      return { data }*/
      return await ApiClient.get(`question-sets/${idSet}/questions`, null, false)
    } catch (err: unknown) {
      return { error: err instanceof Error ? err.message : String(err) }
    }
  },
  async getQuestionFilters(): Promise<RepositoryResult<QuestionFilters>> {
    try {
      /*const res = await fetch(`${API_BASE_URL}/questions/filters`)
      if (!res.ok) throw new Error(`Erro ao buscar questão filtros: ${res.status}`)
      const data = await res.json()
      return { data }*/
      return await ApiClient.get(`/questions/filters`, null, false)
    } catch (err: unknown) {
      return { error: err instanceof Error ? err.message : String(err) }
    }
  }
}

