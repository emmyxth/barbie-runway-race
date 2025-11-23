import { forwardRef } from "react";
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
            className="absolute w-32 h-32 rounded-full bg-barbie-pink border-2 border-white overflow-hidden shadow-lg"
            style={{
              left: `${emp.position.x}%`,
              top: `${emp.position.y}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <img 
              src={emp.image} 
              alt={emp.name}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    );
  }
);

BarbieBus.displayName = "BarbieBus";

