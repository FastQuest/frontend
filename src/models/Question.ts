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
  ID: number
  Text: string
  Is_correct: boolean
  QuestionID: number
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
