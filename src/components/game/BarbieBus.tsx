import { forwardRef } from "react";
import { User } from "lucide-react";
import barbieBus from "@/assets/barbie-bus.png";
import { DroppedEmployee } from "@/types/game";

interface BarbieBusProps {
  employees: DroppedEmployee[];
  isSlowingDown: boolean;
}

export const BarbieBus = forwardRef<HTMLDivElement, BarbieBusProps>(
  ({ employees, isSlowingDown }, ref) => {
    return (
      <div
        ref={ref}
        className="absolute bottom-32 top-8 w-full h-full"
      >
        <img
          src={barbieBus}
          alt="Barbie Bus"
          className="w-full h-full object-contain drop-shadow-2xl"
        />
        {/* Employees on Bus */}
        {employees.map((emp) => (
          <div
            key={emp.id}
            className={`absolute w-12 h-12 rounded-full ${emp.color} border-2 border-white flex items-center justify-center shadow-lg`}
            style={{
              left: `${emp.position.x}%`,
              top: `${emp.position.y}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <User className="w-6 h-6 text-white" />
          </div>
        ))}
      </div>
    );
  }
);

BarbieBus.displayName = "BarbieBus";

