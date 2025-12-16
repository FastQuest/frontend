export enum ErrorCode {
    NOT_FOUND = "404",
    QUESTION_ID_NOT_FOUND = "QID404"
}

export const ErrorMessages: Record<ErrorCode, string> = {
    [ErrorCode.NOT_FOUND]: '',
    [ErrorCode.QUESTION_ID_NOT_FOUND]: 'Questão não encontrada.',
}
