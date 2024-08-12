import { IQuestion } from "../interfaces/quizzes";

export const screens = {
    login: 'Login',
    createAccount: 'CreateAccount',
    home: 'Home',
    quizList: 'Quizzes List',
    recipeList: 'Recipes List',
    homeTabs: 'HomeTabs',
    profile: 'Profile',
    createQuiz: 'Create Quiz',
    createRecipe: 'Create Recipe',
    viewRecipe:'View Recipe',
    recipeTabs: 'Recipes',
    viewQuiz:'View Quiz',
    quizTabs: 'Quizzes',
}

export const questionTemplate: IQuestion = {
    questionText: '',
    options: [
      {
        option: '',
        isTrue: true,
      },
      {
        option: '',
        isTrue: false,
      },
      {
        option: '',
        isTrue: false,
      },
      {
        option: '',
        isTrue: false,
      },
    ],
  };