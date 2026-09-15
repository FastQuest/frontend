import { ApiClient } from '@/config/api';
import type { Pagination } from '@/models/Pagination';


export interface SubmissionAnswer {
  question_id: number;
  option_id: number;
}

export interface CreateSubmissionRequest {
  question_set_id: number;
  answers: SubmissionAnswer[];
}

export interface Submission {
  id: number;
  user_id: number;
  question_set_id: number;
  answers: SubmissionAnswer[];
  created_at: string;
  updated_at: string;
}

type RepositoryResult<T> = { data?: T; error?: string };

export const submissionRepository = {
  async createSubmission(
    request: CreateSubmissionRequest
  ): Promise<RepositoryResult<Submission>> {
    try {
      return ApiClient.post("submissions", request, true)
    } catch (err: unknown) {
      return { error: err instanceof Error ? err.message : String(err) };
    }
  },

  async getSubmissions(
    questionSetId: number,
    page: number = 1,
    perPage: number = 10
  ): Promise<RepositoryResult<{ data: Submission[]; pagination: Pagination }>> {
    try {
      const params = new URLSearchParams({
        question_set_id: String(questionSetId),
        page: String(page),
        perPage: String(perPage),
      });

      return await ApiClient.get(`submissions?${params}`, null, true)
    } catch (err: unknown) {
      return { error: err instanceof Error ? err.message : String(err) };
    }
  },

  async getLastSubmission(
    questionSetId: number
  ): Promise<RepositoryResult<Submission>> {
    try {
      const result = await this.getSubmissions(questionSetId, 1, 1);
      if (result.error) {
        return { error: result.error };
      }

      if (result.data && result.data.data && result.data.data.length > 0) {
        return { data: result.data.data[0] };
      }

      return { error: 'Nenhuma submissão encontrada' };
    } catch (err: unknown) {
      return { error: err instanceof Error ? err.message : String(err) };
    }
  },

  async getSubmissionById(
    id: number,
    include: string = 'answers'
  ): Promise<RepositoryResult<Submission>> {
    try {
      const params = new URLSearchParams();
      if (include) params.append('include', include);

      return await ApiClient.get(`submissions/${id}?${params}`, null, true)
    } catch (err: unknown) {
      return { error: err instanceof Error ? err.message : String(err) };
    }
  },
};

