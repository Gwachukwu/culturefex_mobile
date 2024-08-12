import { IQuiz } from "../interfaces/quizzes";

export const areAllFieldsFilled = (quiz: IQuiz): boolean => {
    // Check if the title is filled
    if (!quiz.title.trim()) {
        return false;
    }

    // Iterate over each question
    for (const question of quiz.questions) {
        // Check if the question text is filled
        if (!question.questionText.trim()) {
            return false;
        }

        // Iterate over each option within the question
        for (const option of question.options) {
            // Check if the option text is filled
            if (!option.option.trim()) {
                return false;
            }
        }
    }

    // If all checks passed, return true
    return true;
};

export function shuffleArray<T>(array: T[]): T[] {
    // Create a copy of the array to avoid mutating the original array
    const shuffledArray = [...array];

    // Loop through the array from the last element to the first
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        // Generate a random index between 0 and i
        const j = Math.floor(Math.random() * (i + 1));

        // Swap the elements at index i and j
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }

    return shuffledArray;
}

