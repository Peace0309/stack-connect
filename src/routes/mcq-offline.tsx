import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/mcq-offline")({
  component: OfflineMcqPage,
});

type MCQ = {
  question: string;
  options: string[];
  correct_answer: string;
  explanation: string;
  source_excerpt: string;
  competency: string | null;
};

function OfflineMcqPage() {
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [count, setCount] = useState(3);
  const [mcqs, setMcqs] = useState<MCQ[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedAnswers, setSelectedAnswers] =
    useState<Record<number, string>>({});
  const [submitted, setSubmitted] =
    useState<Record<number, boolean>>({});

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const selectedFile = event.target.files?.[0] ?? null;

    if (!selectedFile) {
      setFile(null);
      return;
    }

    const allowedTypes = [".pdf", ".pptx", ".txt"];
    const extension =
      "." + selectedFile.name.split(".").pop()?.toLowerCase();

    if (!allowedTypes.includes(extension)) {
      setError("Only PDF, PPTX and TXT files are supported.");
      setFile(null);
      return;
    }

    setError("");
    setFile(selectedFile);
  };

  const generateOffline = async () => {
    if (!text.trim() && !file) {
      setError("Please enter learning material or upload a file.");
      return;
    }

    setLoading(true);
    setError("");
    setMcqs([]);
    setSelectedAnswers({});
    setSubmitted({});

    try {
      let response: Response;

      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("num_questions", String(count));

        response = await fetch(
          "http://localhost:8000/api/mcqs/offline/generate-from-file",
          {
            method: "POST",
            body: formData,
          },
        );
      } else {
        response = await fetch(
          "http://localhost:8000/api/mcqs/offline/generate-from-text",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              text,
              num_questions: count,
            }),
          },
        );
      }

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      setMcqs(data.mcqs ?? []);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Offline MCQ generation failed.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-4xl space-y-6">

        <div>
          <h1 className="text-2xl font-bold">
            Offline MCQ Generator
          </h1>
          <p className="text-muted-foreground">
            Generate MCQs locally without internet.
          </p>
        </div>

        <div className="rounded-lg border p-5 space-y-5">

          <div className="space-y-2">
            <label className="font-medium">
              Paste Learning Material
            </label>

            <textarea
              className="min-h-40 w-full rounded-md border p-3"
              placeholder="Paste learning material here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="font-medium">
              Or Upload File
            </label>

            <input
              type="file"
              accept=".pdf,.pptx,.txt"
              onChange={handleFileChange}
              className="block w-full rounded-md border p-2"
            />

            <p className="text-xs text-muted-foreground">
              Supported formats: PDF, PPTX, TXT
            </p>

            {file && (
              <p className="text-sm">
                Selected file: <strong>{file.name}</strong>
              </p>
            )}
          </div>

          <div className="flex items-center gap-3">
            <label>Questions:</label>

            <select
              className="rounded-md border p-2"
              value={count}
              onChange={(e) =>
                setCount(Number(e.target.value))
              }
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={5}>5</option>
            </select>

            <button
              className="rounded-md bg-primary px-4 py-2 text-primary-foreground"
              onClick={generateOffline}
              disabled={loading}
            >
              {loading
                ? "Generating..."
                : "Generate Offline MCQs"}
            </button>
          </div>

          {error && (
            <p className="text-sm text-red-600">
              {error}
            </p>
          )}
        </div>

        {mcqs.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">
              Test
            </h2>

            {mcqs.map((mcq, index) => {
              const isSubmitted = submitted[index];
              const selected = selectedAnswers[index];
              const isCorrect =
                selected === mcq.correct_answer;

              return (
                <div
                  key={index}
                  className="rounded-lg border p-5 space-y-4"
                >
                  <p className="font-medium">
                    {index + 1}. {mcq.question}
                  </p>

                  <div className="space-y-2">
                    {mcq.options.map(
                      (option, optionIndex) => (
                        <button
                          key={optionIndex}
                          type="button"
                          className={`w-full rounded-md border p-3 text-left ${
                            selected === option
                              ? "border-primary bg-primary/10"
                              : ""
                          }`}
                          onClick={() =>
                            setSelectedAnswers((prev) => ({
                              ...prev,
                              [index]: option,
                            }))
                          }
                          disabled={isSubmitted}
                        >
                          {String.fromCharCode(
                            65 + optionIndex,
                          )}. {option}
                        </button>
                      ),
                    )}
                  </div>

                  <button
                    type="button"
                    className="rounded-md bg-primary px-4 py-2 text-primary-foreground"
                    onClick={() =>
                      setSubmitted((prev) => ({
                        ...prev,
                        [index]: true,
                      }))
                    }
                    disabled={!selected || isSubmitted}
                  >
                    Submit Answer
                  </button>

                  {isSubmitted && (
                    <div className="space-y-2">
                      <p
                        className={
                          isCorrect
                            ? "font-semibold text-green-600"
                            : "font-semibold text-red-600"
                        }
                      >
                        {isCorrect
                          ? "✓ Correct!"
                          : "✗ Incorrect"}
                      </p>

                      {!isCorrect && (
                        <p className="text-sm">
                          <strong>
                            Correct Answer:
                          </strong>{" "}
                          {mcq.correct_answer}
                        </p>
                      )}

                      <p className="text-sm text-muted-foreground">
                        <strong>Explanation:</strong>{" "}
                        {mcq.explanation}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        <strong>Competency:</strong>{" "}
                        {mcq.competency ?? "Not detected"}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}