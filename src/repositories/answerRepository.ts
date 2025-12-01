import { API_BASE_URL } from "@/config/api";
import type { Answer } from "@/models/Question";

type RepositoryResult<T> = { data?: T; error?: string }

export const answerRepository = {
  async getListById(ids: number[]): Promise<RepositoryResult<Answer[]>> {
    try {
      const res = await fetch(`${API_BASE_URL}/answers/by-ids`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          answer_ids: ids
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
