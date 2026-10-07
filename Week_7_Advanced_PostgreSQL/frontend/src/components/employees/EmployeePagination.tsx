import { useEffect, useState } from "react";
import { getEmployeesPaginated, type Employee } from "../../api/employeeApi";

const EmployeePagination = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(0);

  const [totalRecords, setTotalRecords] = useState(0);

  const limit = 3;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEmployees = async () => {
      try {
        setLoading(true);

        const result = await getEmployeesPaginated(page, limit);

        setEmployees(result.data);

        setTotalPages(result.pagination.totalPages);

        setTotalRecords(result.pagination.totalRecords);
      } catch (error) {
        console.error("Failed to load paginated employees:", error);
      } finally {
        setLoading(false);
      }
    };

    loadEmployees();
  }, [page]);

  return (
    <section className="mt-8">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-800">
          Employee Pagination
        </h2>

        <p className="text-sm text-gray-500">LIMIT + OFFSET demonstration</p>
      </div>

      <div className="mb-4 rounded-lg bg-blue-50 p-4 text-sm text-blue-800">
        <p>
          <strong>Page:</strong> {page} of {totalPages}
        </p>

        <p>
          <strong>Total Records:</strong> {totalRecords}
        </p>

        <p>
          <strong>Records Per Page:</strong> {limit}
        </p>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading employees...</p>
      ) : (
        <>
          <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    ID
                  </th>

                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Employee
                  </th>

                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Email
                  </th>

                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Salary
                  </th>

                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Department ID
                  </th>
                </tr>
              </thead>

              <tbody>
                {employees.map((employee) => (
                  <tr
                    key={employee.employee_id}
                    className="border-t hover:bg-gray-50"
                  >
                    <td className="px-4 py-3 text-sm">
                      {employee.employee_id}
                    </td>

                    <td className="px-4 py-3 text-sm font-medium">
                      {employee.employee_name}
                    </td>

                    <td className="px-4 py-3 text-sm">{employee.email}</td>

                    <td className="px-4 py-3 text-sm">
                      ₹{Number(employee.salary).toLocaleString()}
                    </td>

                    <td className="px-4 py-3 text-sm">
                      {employee.department_id}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setPage((currentPage) => currentPage - 1)}
              disabled={page === 1}
              className="rounded-md bg-gray-800 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Previous
            </button>

            <span className="text-sm font-medium text-gray-700">
              Page {page} of {totalPages}
            </span>

            <button
              type="button"
              onClick={() => setPage((currentPage) => currentPage + 1)}
              disabled={page === totalPages}
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default EmployeePagination;
