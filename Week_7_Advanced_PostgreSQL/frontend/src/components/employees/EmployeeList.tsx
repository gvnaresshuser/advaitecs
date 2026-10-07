import { useEffect, useState } from "react";
import {
  getEmployeesWithDepartments,
  type EmployeeWithDepartment,
} from "../../api/employeeApi";

const EmployeeList = () => {
  const [employees, setEmployees] = useState<EmployeeWithDepartment[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const data = await getEmployeesWithDepartments();

        setEmployees(data);
      } catch (error) {
        console.error(error);

        setError("Failed to load employees");
      } finally {
        setLoading(false);
      }
    };

    loadEmployees();
  }, []);

  if (loading) {
    return <p className="text-gray-600">Loading employees...</p>;
  }

  if (error) {
    return <p className="rounded-lg bg-red-100 p-4 text-red-700">{error}</p>;
  }

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow">
      <div className="border-b px-6 py-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Employees with Departments
        </h2>

        <p className="mt-1 text-sm text-gray-500">INNER JOIN demonstration</p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                ID
              </th>

              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Employee
              </th>

              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Email
              </th>

              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Salary
              </th>

              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Department
              </th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {employees.map((employee) => (
              <tr key={employee.employee_id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm">{employee.employee_id}</td>

                <td className="px-6 py-4 font-medium text-gray-800">
                  {employee.employee_name}
                </td>

                <td className="px-6 py-4 text-sm text-gray-600">
                  {employee.email}
                </td>

                <td className="px-6 py-4 text-sm">
                  ₹{employee.salary.toLocaleString()}
                </td>

                <td className="px-6 py-4">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
                    {employee.department_name}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeList;
