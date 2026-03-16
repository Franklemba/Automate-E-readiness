import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import AssessmentQuiz from "@/components/AssessmentQuiz";
import ResultsPage from "@/components/ResultsPage";
import Footer from "@/components/Footer";
import { updateLeadScore } from "@/lib/leadStorage";
import { getResultLevel } from "@/data/assessmentQuestions";

type Step = "hero" | "form" | "quiz" | "results";

const Index = () => {
  const [step, setStep] = useState<Step>("hero");
  const [leadId, setLeadId] = useState("");
  const [score, setScore] = useState(0);

  const handleStart = () => {
    setStep("form");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFormSubmit = (id: string) => {
    setLeadId(id);
    setStep("quiz");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleQuizComplete = async (totalScore: number) => {
    setScore(totalScore);
    const level = getResultLevel(totalScore);
    await updateLeadScore(leadId, totalScore, level.title);
    setStep("results");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleRestart = () => {
    setStep("hero");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      {step === "hero" && (
        <>
          <HeroSection onStart={handleStart} />
          <Footer />
        </>
      )}
      {step === "form" && (
        <>
          <LeadCaptureForm onSubmit={handleFormSubmit} />
          <Footer />
        </>
      )}
      {step === "quiz" && <AssessmentQuiz onComplete={handleQuizComplete} />}
      {step === "results" && <ResultsPage score={score} onRestart={handleRestart} />}
    </div>
  );
};

export default Index;
