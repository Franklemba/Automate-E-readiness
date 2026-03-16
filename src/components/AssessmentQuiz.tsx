import { useState } from "react";
import { questions } from "@/data/assessmentQuestions";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import logo from "@/assets/automate-e-logo.png";

interface Props {
  onComplete: (score: number) => void;
}

export default function AssessmentQuiz({ onComplete }: Props) {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const question = questions[currentQ];
  const progress = ((currentQ + 1) / questions.length) * 100;
  const allAnswered = Object.keys(answers).length === questions.length;

  const selectAnswer = (questionId: number, score: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: score }));
  };

  const next = () => {
    if (currentQ < questions.length - 1) setCurrentQ((p) => p + 1);
  };

  const prev = () => {
    if (currentQ > 0) setCurrentQ((p) => p - 1);
  };

  const submit = () => {
    const total = Object.values(answers).reduce((sum, s) => sum + s, 0);
    onComplete(total);
  };

  return (
    <section className="min-h-screen flex flex-col py-8 px-4">
      {/* Header */}
      <div className="container mx-auto max-w-3xl">
        <div className="flex items-center justify-between mb-8">
          <img src={logo} alt="Automate E" className="h-8" />
          <span className="text-sm font-medium text-muted-foreground">
            Question {currentQ + 1} of {questions.length}
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full h-2 bg-muted rounded-full mb-10 overflow-hidden">
          <div
            className="h-full hero-gradient rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 flex items-center justify-center">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
            {question.question}
          </h2>

          <div className="space-y-3">
            {question.options.map((opt) => {
              const selected = answers[question.id] === opt.score;
              return (
                <button
                  key={opt.label}
                  onClick={() => selectAnswer(question.id, opt.score)}
                  className={`w-full text-left p-4 md:p-5 rounded-xl border-2 transition-all duration-200 flex items-center gap-4 group
                    ${selected
                      ? "border-primary bg-accent shadow-card"
                      : "border-border bg-card hover:border-primary/40 hover:shadow-card"
                    }`}
                >
                  <span
                    className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm transition-colors
                      ${selected ? "hero-gradient text-primary-foreground" : "bg-muted text-muted-foreground group-hover:bg-accent"}`}
                  >
                    {opt.label}
                  </span>
                  <span className={`font-medium ${selected ? "text-accent-foreground" : "text-foreground"}`}>
                    {opt.text}
                  </span>
                  {selected && <CheckCircle2 className="ml-auto w-5 h-5 text-primary flex-shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-10">
            <Button variant="ghost" onClick={prev} disabled={currentQ === 0} className="gap-2">
              <ArrowLeft className="w-4 h-4" /> Previous
            </Button>

            {currentQ < questions.length - 1 ? (
              <Button onClick={next} disabled={!answers[question.id]} className="gap-2 hero-gradient text-primary-foreground px-6">
                Next <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                onClick={submit}
                disabled={!allAnswered}
                className="gap-2 accent-gradient text-foreground font-bold px-8 hover:scale-105 transition-transform"
              >
                View Results <ArrowRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
