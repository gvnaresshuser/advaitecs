
export type ScenarioCategory =
  | "Console"
  | "Network"
  | "Elements"
  | "Sources"
  | "React DevTools"
  | "Hooks"
  | "Responsive Design"
  | "Forms"
  | "React Query"
  | "TypeScript";

export interface DebugScenario {
  id: string;
  title: string;
  description: string;
  category: ScenarioCategory;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  tools: string[];
}
