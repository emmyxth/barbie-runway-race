import { Card } from "@/components/ui/card";
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
      <Card className="p-2 bg-card hover:shadow-barbie transition-shadow w-40">
        <div className="w-32 h-32 mx-auto rounded-full border-2 bg-barbie-pink overflow-hidden mb-3">
          <img 
            src={employee.image} 
            alt={employee.name}
            className="w-full h-full object-cover"
          />
        </div>
        <p className="text-center font-semibold text-base">{employee.name}</p>
        <p className="text-center text-md text-muted-foreground">{employee.role}</p>
        <p className="text-center text-md font-bold text-primary">
          ${(employee.salaryPerYear / 1000).toFixed(0)}K/year
        </p>
      </Card>
    </div>
  );
};

