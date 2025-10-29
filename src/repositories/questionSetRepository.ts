import { API_BASE_URL } from "@/config/api"
import type { List } from "@/models/List";
import type { NewList } from "@/models/NewList";

type RepositoryResult<T> = { data?: T; error?: string }

export const questionSetRepository = {
  async sendQuestionSet(listData: NewList): Promise<RepositoryResult<List>> {
    try {
      const res = await fetch(`${API_BASE_URL}/question-set`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(listData)
      })
      if (!res.ok) throw new Error(`Erro ao buscar questão: ${res.status}`)
      const data = await res.json()
      return { data }
    } catch (err: unknown) {
      return { error: err instanceof Error ? err.message : String(err) }
    }
  }
}

