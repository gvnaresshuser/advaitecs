import { useEffect, useState } from "react";
import {
  getDepartmentsWithEmployees,
  type DepartmentWithEmployee,
} from "../../api/employeeApi";

const EmployeeDepartmentLeftJoin = () => {
  const [data, setData] = useState<DepartmentWithEmployee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await getDepartmentsWithEmployees();

        setData(result);
      } catch (error) {
        console.error(error);
        setError("Failed to load department employee data");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return <p className="text-gray-600">Loading LEFT JOIN data...</p>;
  }

  if (error) {
    return <p className="rounded-lg bg-red-100 p-4 text-red-700">{error}</p>;
  }

  return (
    <div className="mt-8 overflow-hidden rounded-xl bg-white shadow">
      <div className="border-b px-6 py-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Departments with Employees
        </h2>

        <p className="mt-1 text-sm text-gray-500">LEFT JOIN demonstration</p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Department ID
              </th>

              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Department
              </th>

              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Employee ID
              </th>

              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Employee
              </th>

              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Salary
              </th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {data.map((item, index) => (
              <tr
                key={`${item.department_id}-${item.employee_id}-${index}`}
                className="hover:bg-gray-50"
              >
                <td className="px-6 py-4 text-sm">{item.department_id}</td>

                <td className="px-6 py-4 font-medium text-gray-800">
                  {item.department_name}
                </td>

                <td className="px-6 py-4 text-sm">{item.employee_id ?? "-"}</td>

                <td className="px-6 py-4">
                  {item.employee_name ?? (
                    <span className="italic text-gray-400">No employee</span>
                  )}
                </td>

                <td className="px-6 py-4 text-sm">
                  {item.salary !== null
                    ? `₹${Number(item.salary).toLocaleString()}`
                    : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeDepartmentLeftJoin;
