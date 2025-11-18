import { API_BASE_URL } from "@/config/api"
import type { List } from "@/models/List";
import type { NewList } from "@/models/NewList";

type RepositoryResult<T> = { data?: T; error?: string }

export const questionSetRepository = {
  async getListById(id: number): Promise<RepositoryResult<List>> {
    try {
      const res = await fetch(`${API_BASE_URL}/question-sets/${id}`)
      if (!res.ok) throw new Error(`Erro ao buscar lista: ${res.status}`)
      const data = await res.json()
      return { data }
    } catch (err: unknown) {
      return { error: err instanceof Error ? err.message : String(err) }
    }
  },
  async sendQuestionSet(listData: NewList): Promise<RepositoryResult<List>> {
    try {
      const res = await fetch(`${API_BASE_URL}/question-sets`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(listData)
      })
      if (!res.ok) throw new Error(`Erro ao buscar listas: ${res.status}`)
      const data = await res.json()
      return { data }
    } catch (err: unknown) {
      return { error: err instanceof Error ? err.message : String(err) }
    }
  }
}

