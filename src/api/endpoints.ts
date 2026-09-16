export const endpoints = {
    auth: {
        login: 'api/auth/login',
        me: 'users/me',
    },
    questions: {
        base: 'questions',
        byId: (id: number | string) => `questions/${id}`,
        byIds: 'questions/by-ids',
        filters: 'questions/filters',
    },
    questionSets: {
        base: 'question-sets',
        byId: (id: number | string) => `question-sets/${id}`,
        questions: (id: number | string) => `question-sets/${id}/questions`,

        // Fallback/Legacy endpoints previously used in some views
        legacyById: (id: number | string) => `question-set/${id}`,
        legacyQuestions: (id: number | string) => `question-set/${id}/questions`,
    },
    questionOptions: {
        byIds: 'question-options/by-ids',
    },
    answers: {
        performance: 'answers/performance',
        overallPerformance: 'answers/overall-performance',
    },
    submissions: {
        base: 'submissions',
        byId: (id: number | string) => `submissions/${id}`,
    },
    ai: {
        genQuestionSet: 'ai/gen-questionset',
    }
};
