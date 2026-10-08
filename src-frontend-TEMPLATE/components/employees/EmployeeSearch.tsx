import { useState } from "react";
import { getEmployeeByEmail, type Employee } from "../../api/employeeApi";

const EmployeeSearch = () => {
  const [email, setEmail] = useState("");

  const [employee, setEmployee] = useState<Employee | null>(null);

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  const handleSearch = async () => {
    if (!email.trim()) {
      setMessage("Please enter an email address.");
      setEmployee(null);
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const result = await getEmployeeByEmail(email.trim());

      if (result.length === 0) {
        setEmployee(null);
        setMessage("Employee not found.");
      } else {
        setEmployee(result[0]);
      }
    } catch (error) {
      console.error("Failed to search employee:", error);

      setEmployee(null);
      setMessage("Failed to search employee.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mt-8">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Employee Search</h2>

        <p className="text-sm text-gray-500">
          WHERE condition + indexed search demonstration
        </p>
      </div>

      <div className="flex max-w-xl gap-3">
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter employee email"
          className="flex-1 rounded-md border border-gray-300 px-4 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />

        <button
          type="button"
          onClick={handleSearch}
          disabled={loading}
          className="rounded-md bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {message && <p className="mt-4 text-sm text-gray-600">{message}</p>}

      {employee && (
        <div className="mt-6 overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
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
              <tr className="border-t">
                <td className="px-4 py-3 text-sm">{employee.employee_id}</td>

                <td className="px-4 py-3 text-sm font-medium">
                  {employee.employee_name}
                </td>

                <td className="px-4 py-3 text-sm">{employee.email}</td>

                <td className="px-4 py-3 text-sm">
                  ₹{Number(employee.salary).toLocaleString()}
                </td>

                <td className="px-4 py-3 text-sm">{employee.department_id}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default EmployeeSearch;
