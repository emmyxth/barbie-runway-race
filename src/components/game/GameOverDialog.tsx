import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DroppedEmployee } from "@/types/game";
import { Twitter, Share2 } from "lucide-react";
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
  // Prioritize mentioning interns or janitors, otherwise use any role
  const getPriorityRole = () => {
    const intern = employees.find(e => e.role.toLowerCase().includes('intern'));
    if (intern) return intern.role;
    
    const janitor = employees.find(e => e.role.toLowerCase().includes('janitor'));
    if (janitor) return janitor.role;
    
    return employees[0]?.role || 'employee';
  };

  const priorityRole = getPriorityRole();

  const handleShareTwitter = () => {
    const text = priorityRole ? `I just bankrupted Barbie's startup by hiring too many ${priorityRole}s` : `I just bankrupted Barbie's startup by hiring too many employees!`;
    const url = window.location.origin;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, '_blank', 'width=600,height=400');
  };

  const handleShare = async () => {
    const shareData = {
      title: "Barbie's Runway Race",
      text: `I just bankrupted Barbie's startup by hiring too many ${priorityRole}s`,
      url: window.location.origin,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // Fallback to Twitter if native share fails
        handleShareTwitter();
      }
    } else {
      // Fallback to Twitter if Web Share API not supported
      handleShareTwitter();
    }
  };

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
            Oh no, you bankrupted Barbie's startup after you hired too many {priorityRole}s!
            </p>
            <p className="text-base">
              You hired <span className="font-bold">{employees.length}</span> employee{employees.length !== 1 ? 's' : ''} total.
            </p>
            <div className="flex gap-3">
              <Button
                onClick={handleShareTwitter}
                className="flex-1 h-12 text-lg bg-black text-white hover:bg-black/90 flex items-center justify-center gap-2"
              >
                <Twitter className="w-5 h-5" />
                Tweet Result
              </Button>
              <Button
                onClick={handleShare}
                className="flex-1 h-12 text-lg bg-white text-primary hover:bg-white/90 flex items-center justify-center gap-2"
              >
                <Share2 className="w-5 h-5" />
                Share
              </Button>
            </div>
            <Button
              onClick={onRestart}
              className="w-full h-12 text-lg bg-white text-primary hover:bg-white/90 border-2 border-white"
            >
              Try Again
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

