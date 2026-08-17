import { API_BASE_URL, ApiClient } from '@/config/api';
import { authService } from '@/services/authService';

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
      /*const accessToken = authService.getAccessToken();
      if (!accessToken) {
        throw new Error('Não autenticado');
      }

      const res = await fetch(`${API_BASE_URL}/submissions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(request),
      });

      if (!res.ok) {
        throw new Error(`Erro ao enviar submissão: ${res.status}`);
      }

      const data = await res.json();
      return { data };*/
      return ApiClient.post("submissions", request, true)
    } catch (err: unknown) {
      return { error: err instanceof Error ? err.message : String(err) };
    }
  },

  async getSubmissions(
    questionSetId: number,
    page: number = 1,
    perPage: number = 10
  ): Promise<RepositoryResult<{ data: Submission[]; pagination: any }>> {
    try {
      /*const accessToken = authService.getAccessToken();
      if (!accessToken) {
        throw new Error('Não autenticado');
      }

      const params = new URLSearchParams({
        question_set_id: String(questionSetId),
        page: String(page),
        perPage: String(perPage),
      });

      const res = await fetch(`${API_BASE_URL}/submissions?${params}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!res.ok) {
        throw new Error(`Erro ao buscar submissões: ${res.status}`);
      }

      const data = await res.json();
      return { data };*/
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

  // Novo método baseado na documentação: GET /submissions/{id}
  async getSubmissionById(
    id: number,
    include: string = 'answers' // Pede para a API trazer as respostas junto
  ): Promise<RepositoryResult<Submission>> {
    try {
      /*const accessToken = authService.getAccessToken();
      if (!accessToken) throw new Error('Não autenticado');

      const params = new URLSearchParams();
      if (include) params.append('include', include);

      const res = await fetch(`${API_BASE_URL}/submissions/${id}?${params}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!res.ok) throw new Error(`Erro ao buscar submissão: ${res.status}`);

      const data = await res.json();
      return { data };*/
      const params = new URLSearchParams();
      if (include) params.append('include', include);

      return await ApiClient.get(`submissions/${id}?${params}`, null, true)
    } catch (err: unknown) {
      return { error: err instanceof Error ? err.message : String(err) };
    }
  },
};

