export interface IQuiz {
    title: string;
    questions: IQuestion[];
}

export interface IQuestion {
    questionText: string;
    options: { option: string, isTrue: boolean }[];
}

export interface IDBQuiz extends IQuiz{
    id:string
  }