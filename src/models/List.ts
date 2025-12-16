import type { User } from "./User";

export interface JsonList {
  id: number,
  name: string,
  description: string,
  type: string,
  user: User,
  created_at: string,
  is_private: boolean
}

export interface List {
  id: number,
  name: string,
  description: string,
  type: string,
  user: User,
  createdAt: string,
  isPrivate: boolean
}

export function mapListFromJson(listJson: JsonList): List {
  return {
    id: listJson.id,
    name: listJson.name,
    description: listJson.description,
    type: listJson.type,
    user: listJson.user,
    createdAt: listJson.created_at,
    isPrivate: listJson.is_private,
  }
}

export type ListInclude = 'user' | 'questions';

export interface ListFilters {
  page?: number,
  perPage?: number,
  orderBy?: number,
  userId?: number,
  statement?: string,
  include?: ListInclude[]
}
