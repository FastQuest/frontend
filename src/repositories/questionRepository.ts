import { API_BASE_URL } from "@/config/api"
import type { DetailQuestion } from "@/models/DetailQuestion"
import type { Question } from "@/models/Question";

type RepositoryResult<T> = { data?: T; error?: string }

export const questionRepository = {
  async getQuestionDetail(id: number): Promise<RepositoryResult<DetailQuestion>> {
    try {
      const res = await fetch(`${API_BASE_URL}/question/${id}?detail=full`)
      if (!res.ok) throw new Error(`Erro ao buscar questão: ${res.status}`)
      const data = await res.json()
      return { data }
    } catch (err: unknown) {
      return { error: err instanceof Error ? err.message : String(err) }
    }
  },

  async getQuestionsByArray(idArray: number[]): Promise<RepositoryResult<Question[]>> {
    try {
      const res = await fetch(`${API_BASE_URL}/questions/array`, {
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
  }
}

