import { ApiClient } from "@/config/api"
import { endpoints } from "@/api/endpoints.ts";
import type { ApiResponse, PaginatedResult } from "@/models/Api";
import { mapListFromJson, type JsonList, type List, type ListFilters, type ListInclude } from "@/models/List";
import type { NewList } from "@/models/NewList";
import { buildQueryParams } from "@/utils/http";

type RepositoryResult<T> = { data?: T; error?: string }

export const questionSetRepository = {
  async getLists(param: ListFilters): Promise<RepositoryResult<PaginatedResult<List>>> {
    const query = buildQueryParams(param);

    try {
      const response = await ApiClient.get(`${endpoints.questionSets.base}?${query}`, null, false)
      const data = await response.data as ApiResponse<JsonList[]>
      if (!data.data) return { data: { items: [], pagination: data.pagination } }
      const lists = data.data.map(l => mapListFromJson(l));
      return { data: { items: lists, pagination: data.pagination } }
    } catch (err: unknown) {
      return { error: err instanceof Error ? err.message : String(err) }
    }
  },

  async getListById(id: number, include?: ListInclude[]): Promise<RepositoryResult<List>> {
    const query = buildQueryParams({ include });

    try {
      const response = await ApiClient.get(`${endpoints.questionSets.byId(id)}?${query}`, null, false)
      const data = await response.data as JsonList
      const list = mapListFromJson(data)
      return { data: list }
    } catch (err: unknown) {
      return { error: err instanceof Error ? err.message : String(err) }
    }
  },
  async sendQuestionSet(listData: NewList): Promise<RepositoryResult<List>> {
    try {
      return ApiClient.post(endpoints.questions.byIds, listData, false)
    } catch (err: unknown) {
      return { error: err instanceof Error ? err.message : String(err) }
    }
  }
}

