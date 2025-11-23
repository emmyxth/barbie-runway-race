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
  { id: 1, name: "Alex", role: "Freshman SWE Intern", salaryPerYear: 70000, color: "bg-blue-400", image: "/src/assets/characters/2.png" },
  { id: 2, name: "Sam", role: "Ex-FAANG Senior Engineer", salaryPerYear: 180000, color: "bg-green-400", image: "/src/assets/characters/3.png" },
  { id: 3, name: "Jordan", role: "Forward Deployed Engineer", salaryPerYear: 140000, color: "bg-purple-400", image: "/src/assets/characters/4.png" },
  { id: 4, name: "Taylor", role: "PM with a ZYN addiction", salaryPerYear: 150000, color: "bg-orange-400", image: "/src/assets/characters/5.png" },
  { id: 5, name: "Morgan", role: "Chief AI Officer", salaryPerYear: 300000, color: "bg-pink-400", image: "/src/assets/characters/6.png" },
  { id: 6, name: "Casey", role: "GenZ Social Media Manager", salaryPerYear: 80000, color: "bg-cyan-400", image: "/src/assets/characters/7.png" },
  { id: 7, name: "Riley", role: "Junior Designer", salaryPerYear: 90000, color: "bg-red-400", image: "/src/assets/characters/8.png" },
  { id: 8, name: "Avery", role: "Janitor", salaryPerYear: 70000, color: "bg-yellow-400", image: "/src/assets/characters/9.png" },
];

