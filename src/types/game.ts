export interface Employee {
  id: number;
  name: string;
  role: string;
  salaryPerYear: number;
  color: string;
  image: string;
}

export interface DroppedEmployee extends Employee {
  position: { x: number; y: number };
}

export const EMPLOYEE_POOL: Employee[] = [
  { id: 1, name: "Alex", role: "SWE Intern", salaryPerYear: 50000, color: "bg-blue-400", image: "/src/assets/characters/2.png" },
  { id: 2, name: "Sam", role: "Senior Engineer", salaryPerYear: 180000, color: "bg-green-400", image: "/src/assets/characters/3.png" },
  { id: 3, name: "Jordan", role: "Designer", salaryPerYear: 110000, color: "bg-purple-400", image: "/src/assets/characters/4.png" },
  { id: 4, name: "Taylor", role: "Product Manager", salaryPerYear: 150000, color: "bg-orange-400", image: "/src/assets/characters/5.png" },
  { id: 5, name: "Morgan", role: "Marketing", salaryPerYear: 95000, color: "bg-pink-400", image: "/src/assets/characters/6.png" },
  { id: 6, name: "Casey", role: "SWE Intern", salaryPerYear: 75000, color: "bg-cyan-400", image: "/src/assets/characters/7.png" },
  { id: 7, name: "Riley", role: "Data Scientist", salaryPerYear: 170000, color: "bg-red-400", image: "/src/assets/characters/8.png" },
  { id: 8, name: "Avery", role: "DevOps", salaryPerYear: 140000, color: "bg-yellow-400", image: "/src/assets/characters/9.png" },
];

