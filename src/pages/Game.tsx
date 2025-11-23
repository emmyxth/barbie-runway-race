import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { User } from "lucide-react";
import barbieBus from "@/assets/barbie-bus.png";
import roadTexture from "@/assets/road-texture.png";

interface Employee {
  id: number;
  name: string;
  role: string;
  monthlyCost: number;
  color: string;
}

interface DroppedEmployee extends Employee {
  position: { x: number; y: number };
}

const EMPLOYEE_POOL: Employee[] = [
  { id: 1, name: "Alex", role: "SWE Intern", monthlyCost: 3, color: "bg-blue-400" },
  { id: 2, name: "Sam", role: "Senior Engineer", monthlyCost: 6, color: "bg-green-400" },
  { id: 3, name: "Jordan", role: "Designer", monthlyCost: 4, color: "bg-purple-400" },
  { id: 4, name: "Taylor", role: "Product Manager", monthlyCost: 5, color: "bg-orange-400" },
  { id: 5, name: "Morgan", role: "Marketing", monthlyCost: 4, color: "bg-pink-400" },
  { id: 6, name: "Casey", role: "SWE Intern", monthlyCost: 3, color: "bg-cyan-400" },
  { id: 7, name: "Riley", role: "Data Scientist", monthlyCost: 6, color: "bg-red-400" },
  { id: 8, name: "Avery", role: "DevOps", monthlyCost: 5, color: "bg-yellow-400" },
];

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
    if (!draggedEmployee || !busRef.current || !gameAreaRef.current) return;

    const busRect = busRef.current.getBoundingClientRect();
    const gameRect = gameAreaRef.current.getBoundingClientRect();

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
      {/* Runway Counter */}
      <Card className="absolute top-4 left-4 px-6 py-3 bg-card/95 backdrop-blur-sm shadow-barbie border-2 border-primary/20 z-10">
        <div className="text-center">
          <p className="text-sm font-semibold text-muted-foreground">Runway Left</p>
          <p className={`text-3xl font-bold ${runway < 12 ? 'text-destructive animate-pulse' : 'text-primary'}`}>
            {monthsLeft} months
          </p>
        </div>
      </Card>

      {/* Logo Display */}
      {logo && (
        <div className="absolute top-4 right-4 z-10">
          <img src={logo} alt="Logo" className="h-16 object-contain drop-shadow-lg" />
        </div>
      )}

      {/* Game Area */}
      <div className="flex h-screen">
        {/* Main Game Area - 75% */}
        <div className="flex-1 relative">
          {/* Animated Road */}
          <div className="absolute bottom-0 left-0 right-0 h-64 overflow-hidden">
            <div 
              className={`h-full ${isSlowingDown ? 'animate-slide-right-slow' : 'animate-slide-right'}`}
              style={{
                backgroundImage: `url(${roadTexture})`,
                backgroundRepeat: "repeat-x",
                backgroundSize: "auto 100%",
                width: "200%",
              }}
            />
          </div>

          {/* Barbie Bus */}
          <div
            ref={busRef}
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

          {/* Bottom Text */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
            <p className="text-2xl font-bold text-foreground drop-shadow-lg">
              Can you drag your crew onto the Barbie bus?
            </p>
          </div>
        </div>

        {/* Employee Panel - 25% */}
        <div className="w-1/4 bg-card/50 backdrop-blur-sm border-l-4 border-primary/20 relative overflow-hidden">
          <div className="p-4 bg-gradient-barbie">
            <h3 className="text-xl font-bold text-white text-center">
              Available Employees
            </h3>
          </div>

          {/* Falling Employees */}
          <div className="relative h-full">
            {fallingEmployees.map((emp) => (
              <div
                key={emp.id}
                draggable
                onDragStart={() => handleDragStart(emp)}
                className="absolute left-1/2 transform -translate-x-1/2 cursor-move animate-fall-down"
                style={{
                  animationDelay: `${Math.random() * 2}s`,
                }}
              >
                <Card className="p-4 bg-card hover:shadow-barbie transition-shadow">
                  <div className={`w-16 h-16 mx-auto rounded-full ${emp.color} border-2 border-white flex items-center justify-center mb-2`}>
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-center font-semibold text-sm">{emp.name}</p>
                  <p className="text-center text-xs text-muted-foreground">{emp.role}</p>
                  <p className="text-center text-xs font-bold text-primary mt-1">
                    {emp.monthlyCost} months
                  </p>
                </Card>
              </div>
            ))}
          </div>

          {/* Instructions */}
          <div className="absolute bottom-4 left-4 right-4 p-3 bg-primary/10 rounded-lg border border-primary/20">
            <p className="text-xs text-center text-foreground">
              💡 Drag employees onto the bus to hire them!
            </p>
          </div>
        </div>
      </div>

      {/* Game Over Dialog */}
      <Dialog open={gameOver} onOpenChange={() => {}}>
        <DialogContent className="bg-gradient-barbie border-4 border-white">
          <DialogHeader>
            <DialogTitle className="text-4xl font-bold text-white text-center mb-4">
              Game Over! 💸
            </DialogTitle>
            <DialogDescription className="text-lg text-white text-center space-y-4">
              <p>
                Your Barbie bus broke down after <span className="font-bold text-2xl">{monthsLeft}</span> months!
              </p>
              <p>
                You hired <span className="font-bold">{employees.length}</span> employees,
                including too many {employees.filter(e => e.role.includes("Intern")).length > 0 ? "SWE interns" : "team members"}!
              </p>
              <Button
                onClick={handleRestart}
                className="w-full h-12 text-lg bg-white text-primary hover:bg-white/90"
              >
                Try Again
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Game;
