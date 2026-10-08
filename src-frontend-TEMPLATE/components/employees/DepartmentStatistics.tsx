import { useEffect, useState } from "react";
import {
  getDepartmentStatistics,
  type DepartmentStatistics as DepartmentStatisticsType,
} from "../../api/employeeApi";

const DepartmentStatistics = () => {
  const [data, setData] = useState<DepartmentStatisticsType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await getDepartmentStatistics();

        setData(result);
      } catch (error) {
        console.error("Failed to load department statistics:", error);
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
          Department Statistics
        </h2>

        <p className="text-sm text-gray-500">
          COUNT, AVG, MIN, MAX + GROUP BY demonstration
        </p>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading department statistics...</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold">
                  Department ID
                </th>

                <th className="px-4 py-3 text-left text-sm font-semibold">
                  Department
                </th>

                <th className="px-4 py-3 text-left text-sm font-semibold">
                  Employees
                </th>

                <th className="px-4 py-3 text-left text-sm font-semibold">
                  Average Salary
                </th>

                <th className="px-4 py-3 text-left text-sm font-semibold">
                  Minimum Salary
                </th>

                <th className="px-4 py-3 text-left text-sm font-semibold">
                  Maximum Salary
                </th>
              </tr>
            </thead>

            <tbody>
              {data.map((item) => (
                <tr
                  key={item.department_id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="px-4 py-3 text-sm">{item.department_id}</td>

                  <td className="px-4 py-3 text-sm font-medium">
                    {item.department_name}
                  </td>

                  <td className="px-4 py-3 text-sm">{item.employee_count}</td>

                  <td className="px-4 py-3 text-sm">
                    ₹{Number(item.average_salary).toLocaleString()}
                  </td>

                  <td className="px-4 py-3 text-sm">
                    ₹{Number(item.minimum_salary).toLocaleString()}
                  </td>

                  <td className="px-4 py-3 text-sm">
                    ₹{Number(item.maximum_salary).toLocaleString()}
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

export default DepartmentStatistics;
