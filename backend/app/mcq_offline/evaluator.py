def evaluate_answer(mcq, selected_option):
    """
    mcq: one MCQ dict from generate_mcqs() — has 'question', 'options',
         'correct_answer', 'explanation'
    selected_option: the option string the learner picked
    """
    is_correct = selected_option.strip().lower() == mcq["correct_answer"].strip().lower()

    if is_correct:
        feedback = "Correct! " + mcq["explanation"]
    else:
        feedback = (
            f"Not quite. The correct answer is '{mcq['correct_answer']}'. "
            + mcq["explanation"]
        )

    return {
        "is_correct": is_correct,
        "correct_answer": mcq["correct_answer"],
        "feedback": feedback,
    }
