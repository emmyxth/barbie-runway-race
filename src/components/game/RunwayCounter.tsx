import { Card } from "@/components/ui/card";

interface RunwayCounterProps {
  runway: number;
}

export const RunwayCounter = ({ runway }: RunwayCounterProps) => {
  const monthsLeft = Math.floor(runway);
  
  return (
    <Card className="absolute top-4 left-4 px-6 py-3 bg-card/95 backdrop-blur-sm shadow-barbie border-2 border-primary/20 z-10">
      <div className="text-center">
        <p className="text-sm font-semibold text-muted-foreground">Runway Left</p>
        <p className={`text-3xl font-bold ${runway < 12 ? 'text-destructive animate-pulse' : 'text-primary'}`}>
          {monthsLeft} months
        </p>
      </div>
    </Card>
  );
};

