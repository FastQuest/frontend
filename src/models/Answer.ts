import type { Subject } from "./Question"

export interface UserPerformance {
    subject: Subject
    totalAnswers: number
    totalCorrect: number
    percentualCorrect: number
}

export interface PerformanceJson {
    subject: Subject
    total_answers: number
    total_correct: number
    percentual_correct: number
}

