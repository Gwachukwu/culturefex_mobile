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
  