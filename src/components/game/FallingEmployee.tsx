import { Card } from "@/components/ui/card";
import { User } from "lucide-react";
import { Employee } from "@/types/game";
import { useMemo } from "react";

interface FallingEmployeeProps {
  employee: Employee & { top: number };
  onDragStart: (employee: Employee) => void;
}

export const FallingEmployee = ({ employee, onDragStart }: FallingEmployeeProps) => {
  // Generate random position and speed once when component mounts
  const fallConfig = useMemo(() => ({
    left: Math.random() * 70 + 15, // Random position between 15% and 85%
    duration: Math.random() * 3 + 3, // Random duration between 5s and 8s
  }), []);

  return (
    <div
      draggable
      onDragStart={() => onDragStart(employee)}
      className="absolute cursor-move animate-fall-smooth"
      style={{
        left: `${fallConfig.left}%`,
        transform: "translateX(-50%)",
        animationDuration: `${fallConfig.duration}s`,
      }}
    >
      <Card className="p-4 bg-card hover:shadow-barbie transition-shadow">
        <div className={`w-16 h-16 mx-auto rounded-full ${employee.color} border-2 border-white flex items-center justify-center mb-2`}>
          <User className="w-8 h-8 text-white" />
        </div>
        <p className="text-center font-semibold text-sm">{employee.name}</p>
        <p className="text-center text-xs text-muted-foreground">{employee.role}</p>
        <p className="text-center text-xs font-bold text-primary mt-1">
          {employee.monthlyCost} months
        </p>
      </Card>
    </div>
  );
};

