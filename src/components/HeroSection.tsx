import { ArrowRight, BarChart3, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/automate-e-logo.png";
import mascot from "@/assets/automate-e-mascot.png";

interface HeroSectionProps {
  onStart: () => void;
}

const features = [
  { icon: BarChart3, title: "Accounting & Reporting" },
  { icon: Shield, title: "Tax Compliance" },
  { icon: Zap, title: "Operational Efficiency" },
];

export default function HeroSection({ onStart }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(45,95%,58%,0.15),transparent_60%)]" />

      <div className="relative z-10 container mx-auto px-4 py-12 lg:py-20 flex flex-col lg:flex-row items-center min-h-screen gap-12">
        {/* Left content */}
        <div className="flex-1 text-center lg:text-left max-w-2xl">
          <div className="w-16 h-16 rounded-full bg-primary-foreground flex items-center justify-center mb-8 mx-auto lg:mx-0 shadow-lg">
            <img src={logo} alt="Automate E" className="h-10 w-10 object-contain" />
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground leading-tight mb-6">
            Is Your Business Ready for{" "}
            <span className="text-secondary">Digital Transformation?</span>
          </h1>

          <p className="text-lg md:text-xl text-primary-foreground/80 mb-4 font-medium">
            Take the Automate E Digital Readiness Assessment to discover how
            technologically advanced your business operations are.
          </p>

          <p className="text-base text-primary-foreground/65 mb-8 leading-relaxed">
            This short assessment evaluates your company's systems across
            accounting, invoicing, reporting, inventory management, and
            operational integration. At the end, you will receive your digital
            readiness level along with recommendations for improving efficiency
            and preparing your business for modern digital compliance.
          </p>

          <div className="flex flex-wrap gap-4 mb-10 justify-center lg:justify-start">
            {features.map((f) => (
              <div
                key={f.title}
                className="flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full px-4 py-2 text-primary-foreground/90 text-sm font-medium"
              >
                <f.icon className="w-4 h-4" />
                {f.title}
              </div>
            ))}
          </div>

          <Button
            size="lg"
            onClick={onStart}
            className="accent-gradient text-foreground font-bold text-lg px-8 py-6 rounded-xl shadow-elevated hover:scale-105 transition-transform"
          >
            Start the Assessment
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>

        {/* Right mascot */}
        <div className="flex-1 flex justify-center lg:justify-end">
          <img
            src={mascot}
            alt="Automate E Mascot"
            className="w-64 md:w-80 lg:w-96 drop-shadow-2xl animate-float"
          />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-primary-foreground/50 animate-bounce">
        <ArrowRight className="w-6 h-6 rotate-90" />
      </div>
    </section>
  );
}
