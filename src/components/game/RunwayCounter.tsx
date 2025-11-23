import { Card } from "@/components/ui/card";

interface RunwayCounterProps {
  runwayDollars: number;
  monthsLeft: number;
}

export const RunwayCounter = ({ runwayDollars, monthsLeft }: RunwayCounterProps) => {
  const formattedDollars = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(runwayDollars);
  
  const isLowRunway = monthsLeft < 12 && monthsLeft !== Infinity;
  
  return (
    <Card className="absolute top-4 left-4 px-6 py-3 bg-card/95 backdrop-blur-sm shadow-barbie border-2 border-primary/20 z-10">
      <div className="text-center">
        <p className="text-sm font-semibold text-muted-foreground">Runway Left</p>
        <p className={`text-3xl font-bold ${isLowRunway ? 'text-destructive animate-pulse' : 'text-primary'}`}>
          {formattedDollars}
        </p>
        {monthsLeft !== Infinity && (
          <p className="text-sm font-medium text-muted-foreground mt-1">
            ({monthsLeft} months)
          </p>
        )}
      </div>
    </Card>
  );
};

