import type { Comment } from "./Comment.ts";
import type { QuestionOption, Source, Subject, Topic } from "./Question.ts";
import type { User } from "./User.ts";

export interface DetailQuestion {
  ID: number,
  id?: number,
  created_at: string,
  updated_at: string,
  statement: string,
  subject: Subject,
  topic: Topic,
  user: User,
  source: Source,
  question_options: Array<QuestionOption>,
  comments: Array<Comment>
}
