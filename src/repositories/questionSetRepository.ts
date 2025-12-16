import { API_BASE_URL } from "@/config/api"
import type { ApiResponse, PaginatedResult } from "@/models/Api";
import { mapListFromJson, type JsonList, type List, type ListFilters } from "@/models/List";
import type { NewList } from "@/models/NewList";
import { buildQueryParams } from "@/utils/http";

type RepositoryResult<T> = { data?: T; error?: string }

export const questionSetRepository = {
  async getLists(param: ListFilters): Promise<RepositoryResult<PaginatedResult<List>>> {
      const query = buildQueryParams(param);

      try {
        const res = await fetch(`${API_BASE_URL}/question-sets?${query}`)

        if (!res.ok) throw new Error(`Erro ao buscar lista: ${res.status}`)

        const data = await res.json() as ApiResponse<JsonList[]>

        if (!data.data) return { data: {items: [], pagination: data.pagination} }

        const lists = data.data.map(l => mapListFromJson(l));

        return { data: {items: lists, pagination: data.pagination} }
      } catch (err: unknown) {
        return { error: err instanceof Error ? err.message : String(err) }
      }
  },

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

