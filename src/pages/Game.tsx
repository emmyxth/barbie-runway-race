import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  RunwayCounter,
  LogoDisplay,
  Road,
  BarbieBus,
  EmployeePanel,
  GameOverDialog,
} from "@/components/game";
import { Employee, DroppedEmployee, EMPLOYEE_POOL } from "@/types/game";

const Game = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { runway: initialRunway, logo } = location.state || { runway: 24, logo: null };
  
  const [runway, setRunway] = useState(initialRunway);
  const [employees, setEmployees] = useState<DroppedEmployee[]>([]);
  const [fallingEmployees, setFallingEmployees] = useState<(Employee & { top: number })[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [draggedEmployee, setDraggedEmployee] = useState<Employee | null>(null);
  const busRef = useRef<HTMLDivElement>(null);
  const gameAreaRef = useRef<HTMLDivElement>(null);

  // Generate falling employees
  useEffect(() => {
    if (gameOver) return;

    const interval = setInterval(() => {
      const randomEmployee = EMPLOYEE_POOL[Math.floor(Math.random() * EMPLOYEE_POOL.length)];
      const newEmployee = {
        ...randomEmployee,
        id: Date.now() + Math.random(),
        top: -100,
      };
      
      setFallingEmployees((prev) => [...prev, newEmployee]);

      // Remove employee after it falls off screen
      setTimeout(() => {
        setFallingEmployees((prev) => prev.filter((e) => e.id !== newEmployee.id));
      }, 8000);
    }, 2000);

    return () => clearInterval(interval);
  }, [gameOver]);

  // Check game over
  useEffect(() => {
    if (runway <= 0 && !gameOver) {
      setGameOver(true);
    }
  }, [runway, gameOver]);

  const handleDragStart = (employee: Employee) => {
    setDraggedEmployee(employee);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (!draggedEmployee || !busRef.current) return;

    const busRect = busRef.current.getBoundingClientRect();

    // Check if dropped on the bus
    if (
      e.clientX >= busRect.left &&
      e.clientX <= busRect.right &&
      e.clientY >= busRect.top &&
      e.clientY <= busRect.bottom
    ) {
      const newEmployee: DroppedEmployee = {
        ...draggedEmployee,
        position: {
          x: (e.clientX - busRect.left) / busRect.width * 100,
          y: (e.clientY - busRect.top) / busRect.height * 100,
        },
      };

      setEmployees((prev) => [...prev, newEmployee]);
      setRunway((prev) => Math.max(0, prev - draggedEmployee.monthlyCost));
      
      // Remove from falling employees
      setFallingEmployees((prev) => 
        prev.filter((e) => !(e.name === draggedEmployee.name && e.role === draggedEmployee.role))
      );
    }

    setDraggedEmployee(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleRestart = () => {
    navigate("/");
  };

  const monthsLeft = Math.floor(runway);
  const isSlowingDown = runway < 12;

  return (
    <div 
      ref={gameAreaRef}
      className="min-h-screen bg-gradient-sky overflow-hidden relative"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <RunwayCounter runway={runway} />
      <LogoDisplay logo={logo} />

      {/* Game Area */}
      <div className="flex h-screen">
        {/* Main Game Area - 75% */}
        <div className="flex-1 relative">
          <Road isSlowingDown={isSlowingDown} />
          <BarbieBus 
            ref={busRef} 
            employees={employees} 
            isSlowingDown={isSlowingDown} 
          />

          {/* Bottom Text */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
            <p className="text-2xl font-bold text-foreground drop-shadow-lg">
              Can you drag your crew onto the Barbie bus?
            </p>
          </div>
        </div>

        <EmployeePanel 
          fallingEmployees={fallingEmployees} 
          onDragStart={handleDragStart} 
        />
      </div>

      <GameOverDialog 
        open={gameOver}
        monthsLeft={monthsLeft}
        employees={employees}
        onRestart={handleRestart}
      />
    </div>
  );
};

export default Game;
