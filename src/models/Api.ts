import type { Pagination } from "./Pagination";

export type RepositoryResult<T> = { data?: T; error?: string }
export type ApiResponse<T> = { data: T; pagination: Pagination }
export type PaginatedResult<T> = { items: T[]; pagination: Pagination }
