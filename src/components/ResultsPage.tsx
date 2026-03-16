import { getResultLevel } from "@/data/assessmentQuestions";
import { Button } from "@/components/ui/button";
import { Calendar, Download, RotateCcw, TrendingUp } from "lucide-react";
import logo from "@/assets/automate-e-logo.png";
import mascot from "@/assets/automate-e-mascot.png";
import idLogo from "@/assets/innovative-dynamics-logo.png";

interface Props {
  score: number;
  onRestart: () => void;
}

const levelColors: Record<number, string> = {
  1: "from-red-500 to-orange-500",
  2: "from-orange-400 to-yellow-400",
  3: "from-blue-400 to-cyan-400",
  4: "from-emerald-400 to-green-500",
};

export default function ResultsPage({ score, onRestart }: Props) {
  const result = getResultLevel(score);
  const percentage = Math.round((score / 48) * 100);

  return (
    <section className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-3xl">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-14 h-14 rounded-full bg-card flex items-center justify-center mx-auto mb-6 shadow-lg border border-border">
            <img src={logo} alt="Automate E" className="h-9 w-9 object-contain" />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-2">
            Your Digital Readiness Results
          </h1>
          <p className="text-muted-foreground">Assessment Complete</p>
        </div>

        {/* Score Card */}
        <div className="bg-card rounded-2xl shadow-elevated p-8 md:p-10 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Score circle */}
            <div className="relative w-40 h-40 flex-shrink-0">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="52" fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
                <circle
                  cx="60" cy="60" r="52" fill="none"
                  stroke="url(#scoreGrad)" strokeWidth="8" strokeLinecap="round"
                  strokeDasharray={`${percentage * 3.27} 327`}
                  className="transition-all duration-1000 ease-out"
                />
                <defs>
                  <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="hsl(207, 90%, 54%)" />
                    <stop offset="100%" stopColor="hsl(45, 95%, 58%)" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-extrabold text-foreground">{score}</span>
                <span className="text-sm text-muted-foreground">/48</span>
              </div>
            </div>

            {/* Level info */}
            <div className="text-center md:text-left flex-1">
              <div className={`inline-block px-4 py-1.5 rounded-full text-sm font-bold mb-3 bg-gradient-to-r ${levelColors[result.level]} text-white`}>
                Level {result.level}
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-1">
                {result.title}
              </h2>
              <p className="text-muted-foreground text-sm">
                Score: {result.scoreRange[0]}–{result.scoreRange[1]} range
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Results */}
        <div className="space-y-6 mb-8">
          <div className="bg-card rounded-2xl shadow-card p-6 md:p-8">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-bold text-foreground">Assessment Overview</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{result.message}</p>
          </div>

          <div className="bg-accent rounded-2xl p-6 md:p-8 border border-primary/20">
            <h3 className="text-lg font-bold text-accent-foreground mb-4">💡 Our Recommendation</h3>
            <p className="text-accent-foreground/80 leading-relaxed">{result.recommendation}</p>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-card rounded-2xl shadow-elevated p-8 text-center mb-8">
          <img src={mascot} alt="Automate E Mascot" className="w-24 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-foreground mb-2">
            Ready to Transform Your Business?
          </h3>
          <p className="text-muted-foreground mb-6">
            Our team can help you implement the right digital solutions for your business needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              size="lg"
              className="accent-gradient text-foreground font-bold px-8 py-6 rounded-xl hover:scale-105 transition-transform"
              onClick={() => window.open("mailto:info@innovativedynamics.com?subject=Book%20Automate%20E%20Consultation", "_blank")}
            >
              <Calendar className="mr-2 w-5 h-5" />
              Book a Free Automate E Consultation
            </Button>
            <Button variant="outline" size="lg" onClick={onRestart} className="gap-2 py-6 rounded-xl">
              <RotateCcw className="w-4 h-4" /> Retake Assessment
            </Button>
          </div>
        </div>

        {/* Download / Share */}
        <div className="text-center mb-12">
          <Button
            variant="ghost"
            className="text-muted-foreground gap-2"
            onClick={() => {
              const text = `Automate E Digital Readiness Assessment\n\nScore: ${score}/48\nLevel: ${result.title}\n\n${result.message}\n\nRecommendation:\n${result.recommendation}`;
              const blob = new Blob([text], { type: "text/plain" });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = "digital-readiness-report.txt";
              a.click();
            }}
          >
            <Download className="w-4 h-4" /> Download Report
          </Button>
        </div>

        {/* Footer */}
        <footer className="text-center border-t border-border pt-8 pb-4">
          <p className="text-sm text-muted-foreground mb-3">Powered by</p>
          <img src={idLogo} alt="Innovative Dynamics" className="h-10 mx-auto" />
        </footer>
      </div>
    </section>
  );
}
