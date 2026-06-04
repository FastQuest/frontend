import { API_BASE_URL } from "@/config/api";
import type { QuestionOption } from "@/models/Question";

type RepositoryResult<T> = { data?: T; error?: string }

export const questionOptionRepository = {
  async getListById(ids: number[]): Promise<RepositoryResult<QuestionOption[]>> {
    try {
      const res = await fetch(`${API_BASE_URL}/question-options/by-ids`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          question_option_ids: ids
        })
      })
      if (!res.ok) throw new Error(`Erro ao buscar alternativas: ${res.status}`)
      const data = await res.json()
      return { data }
    } catch (err: unknown) {
      return { error: err instanceof Error ? err.message : String(err) }
    }
  },
}

// Keep answerRepository as alias for backwards compatibility
export const answerRepository = questionOptionRepository
