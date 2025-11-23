import { FallingEmployee } from "./FallingEmployee";
import { Employee } from "@/types/game";

interface EmployeePanelProps {
  fallingEmployees: (Employee & { top: number })[];
  onDragStart: (employee: Employee) => void;
}

export const EmployeePanel = ({ fallingEmployees, onDragStart }: EmployeePanelProps) => {
  return (
    <div className="w-1/4 bg-card/50 backdrop-blur-sm border-l-4 border-primary/20 relative overflow-hidden">
      {/* Falling Employees - positioned relative to contain absolute children */}
      <div className="relative h-full overflow-hidden">
        {fallingEmployees.map((emp) => (
          <FallingEmployee
            key={emp.id}
            employee={emp}
            onDragStart={onDragStart}
          />
        ))}
      </div>

      {/* Instructions */}
      <div className="absolute bottom-4 left-4 right-4 p-3 bg-primary/10 rounded-lg border border-primary/20 z-10">
        <p className="text-xs text-center text-foreground">
          💡 Drag employees onto the bus to hire them!
        </p>
      </div>
    </div>
  );
};

