export interface Employee {
  id: number;
  name: string;
  role: string;
  monthlyCost: number;
  color: string;
}

export interface DroppedEmployee extends Employee {
  position: { x: number; y: number };
}

export const EMPLOYEE_POOL: Employee[] = [
  { id: 1, name: "Alex", role: "SWE Intern", monthlyCost: 3, color: "bg-blue-400" },
  { id: 2, name: "Sam", role: "Senior Engineer", monthlyCost: 6, color: "bg-green-400" },
  { id: 3, name: "Jordan", role: "Designer", monthlyCost: 4, color: "bg-purple-400" },
  { id: 4, name: "Taylor", role: "Product Manager", monthlyCost: 5, color: "bg-orange-400" },
  { id: 5, name: "Morgan", role: "Marketing", monthlyCost: 4, color: "bg-pink-400" },
  { id: 6, name: "Casey", role: "SWE Intern", monthlyCost: 3, color: "bg-cyan-400" },
  { id: 7, name: "Riley", role: "Data Scientist", monthlyCost: 6, color: "bg-red-400" },
  { id: 8, name: "Avery", role: "DevOps", monthlyCost: 5, color: "bg-yellow-400" },
];

