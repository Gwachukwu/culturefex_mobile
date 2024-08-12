import { IDBQuiz } from "./quizzes";
import { IDBRecipe } from "./recipes";

export type RootStackParamList = {
    ViewRecipe: { recipe: IDBRecipe };
    AttemptQuiz: { quiz: IDBQuiz };
  };