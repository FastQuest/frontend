import { API_BASE_URL } from "@/config/api"
import type { DetailQuestion } from "@/models/DetailQuestion"
import type { Pagination } from "@/models/Pagination";
import { mapQuestionFromJson, type JsonQuestion, type Question, type QuestionFilters } from "@/models/Question";
import { buildQueryParams } from "@/utils/http";

type RepositoryResult<T> = { data?: T; error?: string }
type ApiResponse<T> = { data: T; pagination: Pagination }
type PaginatedResult<T> = { items: T[]; pagination: Pagination }

export const questionRepository = {
  async getQuestion(id: number, includes: string[]): Promise<RepositoryResult<Question>> {
    try {
      const res = await fetch(`${API_BASE_URL}/questions?include=${includes.join(',')}`)

      if (!res.ok) throw new Error(`Erro ao buscar questão: ${res.status}`)

      const data = await res.json() as JsonQuestion

      const question = mapQuestionFromJson(data)

      return { data: question }
    } catch (err: unknown) {
      return { error: err instanceof Error ? err.message : String(err) }
    }
  },

  async getQuestions(param: QuestionFilters): Promise<RepositoryResult<PaginatedResult<Question>>> {
    const query = buildQueryParams(param);

    try {
      const res = await fetch(`${API_BASE_URL}/questions?${query}`)

      if (!res.ok) throw new Error(`Erro ao buscar questão: ${res.status}`)

      const data = await res.json() as ApiResponse<JsonQuestion[]>

      if (!data.data) return { data: {items: [], pagination: data.pagination} }

      const questions = data.data.map(q => mapQuestionFromJson(q));

      return { data: {items: questions, pagination: data.pagination} }
    } catch (err: unknown) {
      return { error: err instanceof Error ? err.message : String(err) }
    }
  },

  async getQuestionDetail(id: number): Promise<RepositoryResult<DetailQuestion>> {
    try {
      const res = await fetch(`${API_BASE_URL}/questions/${id}?detail=full`)
      if (!res.ok) throw new Error(`Erro ao buscar questão: ${res.status}`)
      const data = await res.json()
      return { data }
    } catch (err: unknown) {
      return { error: err instanceof Error ? err.message : String(err) }
    }
  },

  async getQuestionsByQuestionSetId(id: number): Promise<RepositoryResult<number[]>> {
    try {
      const res = await fetch(`${API_BASE_URL}/question-sets/${id}/questions?fields=id`)
      if (!res.ok) throw new Error(`Erro ao buscar questão: ${res.status}`)
      const data = await res.json()
      return { data }
    } catch (err: unknown) {
      return { error: err instanceof Error ? err.message : String(err) }
    }
  },

  async getQuestionsByArray(idArray: number[]): Promise<RepositoryResult<Question[]>> {
    try {
      const res = await fetch(`${API_BASE_URL}/questions/by-ids`, {
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
      return { data }
    } catch (err: unknown) {
      return { error: err instanceof Error ? err.message : String(err) }
    }
  },

  async getQuestionsBySet(idSet: number): Promise<RepositoryResult<Question[]>> {
    try {
      const res = await fetch(`${API_BASE_URL}/question-sets/${idSet}/questions`)
      if (!res.ok) throw new Error(`Erro ao buscar questão: ${res.status}`)
      const data = await res.json()
      return { data }
    } catch (err: unknown) {
      return { error: err instanceof Error ? err.message : String(err) }
    }
  }
}

