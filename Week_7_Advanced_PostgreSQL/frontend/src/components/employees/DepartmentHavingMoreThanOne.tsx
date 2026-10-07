import { useEffect, useState } from "react";
import {
  getDepartmentsHavingMoreThanOneEmployee,
  type DepartmentHavingMoreThanOneEmployee,
} from "../../api/employeeApi";

const DepartmentHavingMoreThanOne = () => {
  const [data, setData] = useState<DepartmentHavingMoreThanOneEmployee[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await getDepartmentsHavingMoreThanOneEmployee();

        setData(result);
      } catch (error) {
        console.error("Failed to load HAVING report:", error);
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
          Departments with More Than One Employee
        </h2>

        <p className="text-sm text-gray-500">GROUP BY + HAVING demonstration</p>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading department report...</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold">
                  Department
                </th>

                <th className="px-4 py-3 text-left text-sm font-semibold">
                  Employee Count
                </th>
              </tr>
            </thead>

            <tbody>
              {data.map((item) => (
                <tr
                  key={item.department_name}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="px-4 py-3 text-sm font-medium">
                    {item.department_name}
                  </td>

                  <td className="px-4 py-3 text-sm">{item.employee_count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default DepartmentHavingMoreThanOne;
