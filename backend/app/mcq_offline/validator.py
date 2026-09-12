def validate_mcq(mcq):
    """
    Runs the platform's 5-point validation gate on one MCQ dict.
    Returns (is_valid: bool, failures: list[str])
    """
    failures = []

    if len(mcq.get("options", [])) != 4:
        failures.append("does not have exactly 4 options")

    correct = mcq.get("correct_answer", "")
    options = mcq.get("options", [])
    matches = [o for o in options if o.strip().lower() == correct.strip().lower()]
    if len(matches) != 1:
        failures.append("correct answer is missing from options or appears more than once")

    if not mcq.get("explanation", "").strip():
        failures.append("missing explanation")

    if not mcq.get("source_excerpt", "").strip():
        failures.append("missing source excerpt")

    if not mcq.get("competency"):
        failures.append("no competency detected")

    return (len(failures) == 0, failures)


def validate_mcqs(mcqs):
    """
    Filters a list of MCQs, keeping only ones that pass all 5 checks.
    Returns (valid_mcqs, rejected_with_reasons)
    """
    valid = []
    rejected = []
    for mcq in mcqs:
        is_valid, failures = validate_mcq(mcq)
        if is_valid:
            valid.append(mcq)
        else:
            rejected.append({"mcq": mcq, "failures": failures})
    return valid, rejected
