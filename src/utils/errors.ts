export enum ErrorCode {
    NOT_FOUND = "404",
    QUESTION_ID_NOT_FOUND = "QID404",
    QUESTIONSET_ID_NOT_FOUND = "QSID404",
    ID_INVALID = "ID400",
}

export const ErrorMessages: Record<ErrorCode, string> = {
    [ErrorCode.NOT_FOUND]: '',
    [ErrorCode.QUESTION_ID_NOT_FOUND]: 'Questão não encontrada.',
    [ErrorCode.QUESTIONSET_ID_NOT_FOUND]: 'Pasta não encontrada.',
    [ErrorCode.ID_INVALID]: `ID invalido`
}
