import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Road } from "@/components/game";
import barbieBus from "@/assets/barbie-bus.png";
import barbieLogo from "@/assets/barbie-logo.svg";
import backgroundImage from "@/assets/background.webp";

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
              <h2 className="text-4xl md:text-5xl font-bold text-foreground text-barbie-pink">
                Startup Dream Team
              </h2>
              <p className="text-xl text-foreground pt-4">
              Barbie has a <span className="font-bold">super important</span> pitch tonight for her dazzling new startup, and she NEEDS the perfect dream team by her side. 
              </p>    
              <p className="text-xl text-foreground pt-4">
              Her iconic Dream Bus is ready to roll but there’s one catch: Barbie only has so much headcount runway left, and every hire counts. 
              </p>
              <p className="text-xl text-foreground pt-4">
              <span className="font-bold">Your Mission: </span>Build Barbie’s Dream Team before the headcount runway hits zero!
              </p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="runway" className="text-lg font-semibold text-foreground">
                  Enter your runway ($)
                </Label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-muted-foreground">$</span>
                  <Input
                    id="runway"
                    type="number"
                    min="1"
                    placeholder="1000000"
                    value={runway}
                    onChange={(e) => setRunway(e.target.value)}
                    className="h-14 text-lg pl-8 border-2 border-primary/30 focus:border-primary transition-colors"
                  />
                </div>
              </div>
              <Button
                onClick={handleStart}
                disabled={!runway || parseInt(runway) <= 0}
                className="w-full h-14 text-xl font-bold bg-black text-white hover:opacity-90 transition-opacity shadow-barbie"
                size="lg"
              >
                Start
              </Button>
            </div>
          </div>
        </Card>

        {/* Right Side - Barbie Car Preview */}
        <div 
          className="hidden md:flex h-full items-end justify-center animate-bounce-in animation-delay-200 px-12 pb-6 bg-cover bg-center bg-no-repeat relative"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div className="relative w-full z-10">
            <div className="absolute inset-0 rounded-full translate-y-60" />
            <img
              src={barbieBus}
              alt="Barbie Car"
              className="relative w-full drop-shadow-2xl"
            />
          </div>
          <Road isSlowingDown={false} />
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
