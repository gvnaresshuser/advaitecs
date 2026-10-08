// ========================================
// USER TYPES
// ========================================
export type Occupation =
  | "Software Engineer"
  | "Frontend Developer"
  | "Backend Developer"
  | "Full Stack Developer"
  | "DevOps Engineer"
  | "Data Engineer"
  | "Data Scientist"
  | "QA Engineer"
  | "UI/UX Designer"
  | "Project Manager"
  | "Business Analyst"
  | "Technical Lead"
  | "Engineering Manager"
  | "Product Manager"
  | "Other";
// ========================================
// USER
// ========================================
export interface User {
  id: number;
  name: string;
  email: string;
  mobile: string;
  city: string;
  occupation: Occupation;
  salary: number | null;
}
// ========================================
// USER FORM
// ========================================
export interface UserForm {
  name: string;
  email: string;
  mobile: string;
  city: string;
  occupation: Occupation | "";
  salary: string;
}