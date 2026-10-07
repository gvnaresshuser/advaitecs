import { useEffect, useState } from "react";
import {
  getEmployeesWithProjects,
  type EmployeeWithProject,
} from "../../api/projectApi";

const EmployeeProjectList = () => {
  const [data, setData] = useState<EmployeeWithProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await getEmployeesWithProjects();
        setData(result);
      } catch (error) {
        console.error("Failed to load employee projects:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <section className="mt-8">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-800">
          Employees with Projects
        </h2>

        <p className="text-sm text-gray-500">
          Many-to-Many relationship demonstration
        </p>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading employee projects...</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold">
                  Employee ID
                </th>

                <th className="px-4 py-3 text-left text-sm font-semibold">
                  Employee
                </th>

                <th className="px-4 py-3 text-left text-sm font-semibold">
                  Project ID
                </th>

                <th className="px-4 py-3 text-left text-sm font-semibold">
                  Project
                </th>

                <th className="px-4 py-3 text-left text-sm font-semibold">
                  Budget
                </th>
              </tr>
            </thead>

            <tbody>
              {data.map((item) => (
                <tr
                  key={`${item.employee_id}-${item.project_id}`}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="px-4 py-3 text-sm">{item.employee_id}</td>

                  <td className="px-4 py-3 text-sm font-medium">
                    {item.employee_name}
                  </td>

                  <td className="px-4 py-3 text-sm">{item.project_id}</td>

                  <td className="px-4 py-3 text-sm">{item.project_name}</td>

                  <td className="px-4 py-3 text-sm">
                    ₹{Number(item.budget).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default EmployeeProjectList;
