import type { Pagination } from "./Pagination"
import type { User } from "./User"

export interface JsonQuestion {
  id: number
  statement: string
  created_at: string
  updated_at: string | null
  subject: Subject | null
  user: User | null
  answers: Answer[] | null
  source: Source | null
}

export interface GetQuestionsResult {
  questions: Question[];
  pagination: Pagination;
}

export type QuestionInclude = 'user' | 'subject' | 'answers' | 'source';

export interface QuestionFilters {
  page?: number;
  perPage?: number;
  search?: string;
  orderBy?: string;
  include?: QuestionInclude[];
  statement?: string;
  subject?: number;
  source?: number;
  year?: number;
  list?: number;
}

export interface Question {
  id: number
  statement: string
  createdAt: string
  updatedAt: string | null
  source: Source | null
  subject: Subject | null
  user: User | null
  answers: Answer[] | null
}

export const mapQuestionFromJson = (data: JsonQuestion): Question => {
  return {
      id: data.id,
      statement: data.statement,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
      subject: data.subject,
      user: data.user,
      answers: data.answers,
      source: data.source
  }
}

export interface Answer {
  id: number
  text: string
  is_correct: boolean
  question_id: number
}

export interface Subject {
  id: number,
  name: string
}

export interface Topic {
  ID: number,
  Name: string,
  SubjectID: number
}

export interface Source {
  id: number,
  name: string,
  type: string,
  metadata: ExamInstance
}

export interface ExamInstance {
  year: number
  phase: number
  edition: number
}
