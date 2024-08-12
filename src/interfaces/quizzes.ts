interface IQuiz {
    title: string;
    questions: IQuestion[];
}

interface IQuestion {
    questionText: string;
    options: { option: string, isTrue: boolean }[];
}
