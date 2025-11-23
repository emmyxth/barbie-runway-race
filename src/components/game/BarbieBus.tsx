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
        className="absolute bottom-32 left-1/4 w-96 h-64"
      >
        <img
          src={barbieBus}
          alt="Barbie Bus"
          className="w-full h-full object-contain drop-shadow-2xl"
        />
        
        {/* Spinning Wheels */}
        <div className="absolute bottom-8 left-12 w-16 h-16 rounded-full border-8 border-gray-700 bg-gray-800">
          <div className={`w-full h-full rounded-full border-4 border-t-gray-300 ${isSlowingDown ? 'animate-wheel-spin-slow' : 'animate-wheel-spin'}`} />
        </div>
        <div className="absolute bottom-8 right-16 w-16 h-16 rounded-full border-8 border-gray-700 bg-gray-800">
          <div className={`w-full h-full rounded-full border-4 border-t-gray-300 ${isSlowingDown ? 'animate-wheel-spin-slow' : 'animate-wheel-spin'}`} />
        </div>

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

