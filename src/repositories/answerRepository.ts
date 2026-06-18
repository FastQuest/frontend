import { API_BASE_URL } from "@/config/api";
import type { PerformanceJson, UserPerformance } from "@/models/Answer";
import type { QuestionOption, Subject } from "@/models/Question";
import { authService } from "@/services/authService";

type RepositoryResult<T> = { data?: T; error?: string }

export const questionOptionRepository = {
  async getListById(ids: number[]): Promise<RepositoryResult<QuestionOption[]>> {
    try {
      const res = await fetch(`${API_BASE_URL}/question-options/by-ids`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          question_option_ids: ids
        })
      })
      if (!res.ok) throw new Error(`Erro ao buscar alternativas: ${res.status}`)
      const data = await res.json()
      return { data }
    } catch (err: unknown) {
      return { error: err instanceof Error ? err.message : String(err) }
    }
  },

  async getPerformance(): Promise<RepositoryResult<UserPerformance[]>> {
    try {
      const accessToken = authService.getAccessToken();
      if (!accessToken) throw new Error('Não autenticado');

      const res = await fetch(`${API_BASE_URL}/answers/performance`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      })
      if (!res.ok) throw new Error(`Erro ao buscar performance: ${res.status}`)
      const jsonData = await res.json()
      const data = jsonData.map((json: PerformanceJson): UserPerformance => {
        return {
          subject: json.subject as Subject,
          totalAnswers: json.total_answers,
          totalCorrect: json.total_correct,
          percentualCorrect: json.percentual_correct
        }
      })
      return { data }
    } catch (err: unknown) {
      return { error: err instanceof Error ? err.message : String(err) }
    }
  },
}

// Keep answerRepository as alias for backwards compatibility
export const answerRepository = questionOptionRepository
