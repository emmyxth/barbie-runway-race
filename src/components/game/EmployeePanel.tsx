import { FallingEmployee } from "./FallingEmployee";
import { Employee } from "@/types/game";

interface EmployeePanelProps {
  fallingEmployees: (Employee & { top: number })[];
  onDragStart: (employee: Employee) => void;
}

export const EmployeePanel = ({ fallingEmployees, onDragStart }: EmployeePanelProps) => {
  return (
    <div className="w-1/4 bg-card/50 backdrop-blur-sm border-l-4 border-primary/20 relative overflow-hidden">
      <div className="p-4 bg-gradient-barbie">
        <h3 className="text-xl font-bold text-white text-center">
          Available Employees
        </h3>
      </div>

      {/* Falling Employees */}
      <div className="relative h-full">
        {fallingEmployees.map((emp) => (
          <FallingEmployee
            key={emp.id}
            employee={emp}
            onDragStart={onDragStart}
          />
        ))}
      </div>

      {/* Instructions */}
      <div className="absolute bottom-4 left-4 right-4 p-3 bg-primary/10 rounded-lg border border-primary/20">
        <p className="text-xs text-center text-foreground">
          💡 Drag employees onto the bus to hire them!
        </p>
      </div>
    </div>
  );
};

