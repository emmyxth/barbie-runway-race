import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import barbieBus from "@/assets/barbie-bus.png";
import barbieLogo from "@/assets/barbie-logo.svg";

const Setup = () => {
  const navigate = useNavigate();
  const [runway, setRunway] = useState("");
  const [logo, setLogo] = useState<string | null>(null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setLogo(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStart = () => {
    if (runway && parseInt(runway) > 0) {
      navigate("/game", { state: { runway: parseInt(runway), logo } });
    }
  };

  return (
    <div className="h-screen w-screen bg-gradient-sky flex items-center justify-center overflow-hidden">
      <div className="w-full h-full grid md:grid-cols-2 items-center">
        {/* Left Side - Setup Form */}
        <Card className="h-full rounded-none p-8 md:p-12 shadow-barbie border-2 border-primary/20 animate-bounce-in flex items-center justify-center">
          <div className="space-y-8 w-full max-w-2xl">
            <div className="space-y-3 flex flex-col items-start justify-start">
              <img src={barbieLogo} alt="Barbie Logo" className="h-20 md:h-24" />
              <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                Startup Dream Team
              </h2>
              <p className="text-lg text-foreground">
              Barbie has a super-important pitch tonight for her dazzling new startup, and she NEEDS the perfect dream team by her side. Her iconic Dream Bus is ready to roll but there’s one catch: Barbie only has so much headcount runway left, and every hire counts. 
              </p>
              <p className="text-lg text-foreground">
              <span className="font-bold">Your Mission:</span>Build Barbie’s Dream Team before the headcount runway hits zero!
              </p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="runway" className="text-lg font-semibold text-foreground">
                  Enter your runway (months)
                </Label>
                <Input
                  id="runway"
                  type="number"
                  min="1"
                  placeholder="24"
                  value={runway}
                  onChange={(e) => setRunway(e.target.value)}
                  className="h-14 text-lg border-2 border-primary/30 focus:border-primary transition-colors"
                />
              </div>
              <Button
                onClick={handleStart}
                disabled={!runway || parseInt(runway) <= 0}
                className="w-full h-14 text-xl font-bold bg-gradient-barbie hover:opacity-90 transition-opacity shadow-barbie"
                size="lg"
              >
                Start
              </Button>
            </div>
          </div>
        </Card>

        {/* Right Side - Barbie Car Preview */}
        <div className="hidden md:flex h-full items-center justify-center animate-bounce-in animation-delay-200 px-12">
          <div className="relative w-full">
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full animate-pulse-glow" />
            <img
              src={barbieBus}
              alt="Barbie Car"
              className="relative w-full drop-shadow-2xl animate-[float_3s_ease-in-out_infinite]"
              style={{
                animation: "float 3s ease-in-out infinite",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Add float animation
const style = document.createElement("style");
style.textContent = `
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }
  .animation-delay-200 {
    animation-delay: 0.2s;
  }
`;
document.head.appendChild(style);

export default Setup;
