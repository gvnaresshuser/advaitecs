import { useEffect, useState } from "react";
import { getDepartments, type Department } from "../api/departmentApi";

import EmployeeList from "../components/employees/EmployeeList";
import EmployeeDepartmentLeftJoin from "../components/employees/EmployeeDepartmentLeftJoin";
import EmployeeProjectList from "../components/projects/EmployeeProjectList";
import DepartmentStatistics from "../components/employees/DepartmentStatistics";
import DepartmentHavingMoreThanOne from "../components/employees/DepartmentHavingMoreThanOne";
import EmployeePagination from "../components/employees/EmployeePagination";
import EmployeeSearch from "../components/employees/EmployeeSearch";
import EmployeeNameExplain from "../components/employees/EmployeeNameExplain";
const Dashboard = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDepartments = async () => {
      try {
        const data = await getDepartments();

        setDepartments(data);
      } catch (error) {
        console.error(error);

        setError("Failed to load departments");
      } finally {
        setLoading(false);
      }
    };

    loadDepartments();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-700 px-6 py-5 text-white shadow">
        <h1 className="text-2xl font-bold">Week 7 - Advanced PostgreSQL</h1>

        <p className="mt-1 text-blue-100">React + TypeScript + Tailwind CSS</p>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Departments</h2>

          <p className="mt-1 text-gray-600">
            Data loaded from PostgreSQL through the Express API.
          </p>
        </div>
        {loading && <p className="text-gray-600">Loading departments...</p>}
        {error && (
          <p className="rounded-lg bg-red-100 p-4 text-red-700">{error}</p>
        )}
        {!loading && !error && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {departments.map((department) => (
              <div
                key={department.department_id}
                className="rounded-xl bg-white p-5 shadow"
              >
                <p className="text-sm text-gray-500">
                  Department #{department.department_id}
                </p>

                <h3 className="mt-2 text-lg font-semibold text-gray-800">
                  {department.department_name}
                </h3>
              </div>
            ))}
          </div>
        )}
        {/* INNER JOIN */}
        <div className="mt-8">
          <EmployeeList />
        </div>
        <div className="mt-8">
          <EmployeeDepartmentLeftJoin />
        </div>
        <div className="mt-8">
          <EmployeeProjectList />
        </div>
        <div className="mt-8">
          <DepartmentStatistics />
        </div>
        <div className="mt-8">
          <DepartmentHavingMoreThanOne />
        </div>
        <div className="mt-8">
          <EmployeePagination />
        </div>
        <div className="mt-8">
          <EmployeeSearch />
        </div>
        <div className="mt-8">
          <EmployeeNameExplain />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
