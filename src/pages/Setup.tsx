import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Upload } from "lucide-react";
import barbieBus from "@/assets/barbie-bus.png";

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
    <div className="min-h-screen bg-gradient-sky flex items-center justify-center p-4">
      <div className="w-full max-w-7xl grid md:grid-cols-2 gap-8 items-center">
        {/* Left Side - Setup Form */}
        <Card className="p-8 md:p-12 bg-card/95 backdrop-blur-sm shadow-barbie border-2 border-primary/20 animate-bounce-in">
          <div className="space-y-8">
            <div className="space-y-3">
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-barbie bg-clip-text text-transparent">
                Barbie's
              </h1>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                Headcount Planner
              </h2>
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

              <div className="space-y-2">
                <Label htmlFor="logo" className="text-lg font-semibold text-foreground">
                  Your startup logo (optional)
                </Label>
                <div className="relative">
                  <Input
                    id="logo"
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                  />
                  <label
                    htmlFor="logo"
                    className="flex items-center justify-center gap-3 h-32 border-2 border-dashed border-primary/30 rounded-lg cursor-pointer hover:border-primary transition-colors bg-muted/50 hover:bg-muted"
                  >
                    {logo ? (
                      <img src={logo} alt="Logo" className="h-24 object-contain" />
                    ) : (
                      <div className="text-center">
                        <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">
                          Click to upload PNG/JPG
                        </p>
                      </div>
                    )}
                  </label>
                </div>
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
        <div className="hidden md:flex items-center justify-center animate-bounce-in animation-delay-200">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full animate-pulse-glow" />
            <img
              src={barbieBus}
              alt="Barbie Car"
              className="relative w-full max-w-2xl drop-shadow-2xl animate-[float_3s_ease-in-out_infinite]"
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
