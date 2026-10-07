import { useState } from "react";

import JoinButtons from "../components/joins/JoinButtons";
import JoinResult from "../components/joins/JoinResult";

const joinQueries: Record<string, string> = {
  inner: `SELECT
  e.employee_id,
  e.employee_name,
  d.department_id,
  d.department_name
FROM employees_advaitecs_joins e
INNER JOIN departments_advaitecs_joins d
  ON e.department_id = d.department_id
ORDER BY e.employee_id;`,

  left: `SELECT
  e.employee_id,
  e.employee_name,
  d.department_id,
  d.department_name
FROM employees_advaitecs_joins e
LEFT JOIN departments_advaitecs_joins d
  ON e.department_id = d.department_id
ORDER BY e.employee_id;`,

  right: `SELECT
  e.employee_id,
  e.employee_name,
  d.department_id,
  d.department_name
FROM employees_advaitecs_joins e
RIGHT JOIN departments_advaitecs_joins d
  ON e.department_id = d.department_id
ORDER BY d.department_id;`,

  full: `SELECT
  e.employee_id,
  e.employee_name,
  d.department_id,
  d.department_name
FROM employees_advaitecs_joins e
FULL OUTER JOIN departments_advaitecs_joins d
  ON e.department_id = d.department_id
ORDER BY
  d.department_id NULLS LAST,
  e.employee_id NULLS LAST;`,

  cross: `SELECT
  e.employee_name,
  d.department_name
FROM employees_advaitecs_joins e
CROSS JOIN departments_advaitecs_joins d
ORDER BY
  e.employee_id,
  d.department_id;`,

  natural: `SELECT
  employee_name,
  project_name
FROM employees_advaitecs_joins
NATURAL LEFT JOIN
  employee_project_assignment_advaitecs_joins
NATURAL LEFT JOIN
  projects_advaitecs_joins
ORDER BY employee_id;`,

  self: `SELECT
  e1.department_id,
  e1.employee_name AS employee,
  e2.employee_name AS colleague
FROM employees_advaitecs_joins e1
LEFT JOIN employees_advaitecs_joins e2
  ON e1.department_id = e2.department_id
  AND e1.employee_id != e2.employee_id
ORDER BY
  e1.department_id,
  e1.employee_id,
  e2.employee_id;`,

  "employees-without-department": `SELECT
  e.employee_id,
  e.employee_name,
  d.department_name
FROM employees_advaitecs_joins e
LEFT JOIN departments_advaitecs_joins d
  ON e.department_id = d.department_id
WHERE d.department_id IS NULL
ORDER BY e.employee_id;`,

  "departments-without-employees": `SELECT
  d.department_id,
  d.department_name,
  e.employee_name
FROM employees_advaitecs_joins e
RIGHT JOIN departments_advaitecs_joins d
  ON e.department_id = d.department_id
WHERE e.employee_id IS NULL
ORDER BY d.department_id;`,

  "employee-projects": `SELECT
  e.employee_id,
  e.employee_name,
  p.project_id,
  p.project_name,
  a.assignment_date
FROM employees_advaitecs_joins e
INNER JOIN employee_project_assignment_advaitecs_joins a
  ON e.employee_id = a.employee_id
INNER JOIN projects_advaitecs_joins p
  ON a.project_id = p.project_id
ORDER BY e.employee_id, p.project_id;`,

  "employee-department-projects": `SELECT
  e.employee_id,
  e.employee_name,
  d.department_name,
  p.project_name,
  a.assignment_date
FROM employees_advaitecs_joins e
LEFT JOIN departments_advaitecs_joins d
  ON e.department_id = d.department_id
LEFT JOIN employee_project_assignment_advaitecs_joins a
  ON e.employee_id = a.employee_id
LEFT JOIN projects_advaitecs_joins p
  ON a.project_id = p.project_id
ORDER BY e.employee_id, p.project_id;`,
};

const joinTitles: Record<string, string> = {
  inner: "INNER JOIN",
  left: "LEFT JOIN",
  right: "RIGHT JOIN",
  full: "FULL OUTER JOIN",
  cross: "CROSS JOIN",
  natural: "NATURAL JOIN",
  self: "SELF JOIN",
  "employees-without-department": "Employees Without Department",
  "departments-without-employees": "Departments Without Employees",
  "employee-projects": "Employee + Projects",
  "employee-department-projects": "Employee + Department + Projects",
};

const joinExplanations: Record<string, string> = {
  inner: "Returns only the employees that have a matching department.",

  left: "Returns all employees, including employees who do not belong to any department. Unmatched department columns appear as NULL.",

  right:
    "Returns all departments, including departments that do not have any employees. Unmatched employee columns appear as NULL.",

  full: "Returns all employees and all departments. Matching rows are combined, while unmatched rows contain NULL values for the missing side.",

  cross:
    "Returns every possible combination of employees and departments. This produces a Cartesian product.",

  natural:
    "Automatically joins tables using columns that have the same names. Here employee_id and project_id are used automatically.",

  self: "Joins the employees table with itself to find employees who belong to the same department.",

  "employees-without-department":
    "Uses LEFT JOIN with IS NULL to find employees who are not assigned to any department.",

  "departments-without-employees":
    "Uses RIGHT JOIN with IS NULL to find departments that currently have no employees.",

  "employee-projects":
    "Combines employees, assignments, and projects to show which projects are assigned to each employee.",

  "employee-department-projects":
    "Combines employees, departments, assignments, and projects to show an employee's department and project information together.",
};

const Joins = () => {
  const [selectedJoin, setSelectedJoin] = useState("inner");

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-6 py-5">
          <h1 className="text-3xl font-bold text-gray-800">
            PostgreSQL JOIN Demonstration
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            React + TypeScript + Tailwind CSS + Express + PostgreSQL
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-6 px-6 py-8">
        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-gray-800">
            Select JOIN Type
          </h2>

          <JoinButtons selectedJoin={selectedJoin} onSelect={setSelectedJoin} />

          {/* SQL Query */}
          <div className="mt-6">
            <h3 className="mb-3 text-base font-semibold text-gray-800">
              SQL Query — {joinTitles[selectedJoin]}
            </h3>

            <pre className="overflow-x-auto rounded-lg bg-gray-900 p-5 text-sm leading-6 text-gray-100 shadow-inner">
              <code>{joinQueries[selectedJoin]}</code>
            </pre>
            <div className="mt-4 rounded-lg border border-blue-200 bg-blue-50 p-4">
              <h3 className="mb-1 text-sm font-semibold text-blue-800">
                What this JOIN demonstrates
              </h3>

              <p className="text-sm leading-6 text-blue-700">
                {joinExplanations[selectedJoin]}
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <JoinResult selectedJoin={selectedJoin} />
        </section>
      </main>
    </div>
  );
};

export default Joins;
