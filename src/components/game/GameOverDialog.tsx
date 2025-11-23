import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DroppedEmployee } from "@/types/game";
import barbieGrave from "@/assets/barbie-grave.png";

interface GameOverDialogProps {
  open: boolean;
  monthsLeft: number;
  employees: DroppedEmployee[];
  onRestart: () => void;
}

export const GameOverDialog = ({ 
  open, 
  monthsLeft, 
  employees, 
  onRestart 
}: GameOverDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="bg-gradient-barbie border-4 border-white">
        <DialogHeader>
          <img src={barbieGrave} alt="Barbie Logo" className="h-64 md:h-64 mx-auto" />
          <DialogTitle className="text-4xl font-bold text-white text-center mb-4">
            Game Over!
          </DialogTitle>
          <DialogDescription className="text-lg text-white text-center space-y-4">
            <p>
            You bankrupted Barbie's startup after you hired too many {employees.filter(e => e.role.includes("Intern")).length > 0 ? "SWE interns" : "team members"}!
            </p>
            <Button
              onClick={onRestart}
              className="w-full h-12 text-lg bg-white text-primary hover:bg-white/90"
            >
              Try Again
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

