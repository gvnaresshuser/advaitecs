import { useState } from "react";
import {
  explainEmployeeNameSearch,
  type ExplainResult,
} from "../../api/employeeApi";

const EmployeeNameExplain = () => {
  const [name, setName] = useState("");

  const [plan, setPlan] = useState<ExplainResult[]>([]);

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  const handleAnalyze = async () => {
    if (!name.trim()) {
      setMessage("Please enter an employee name.");
      setPlan([]);
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const result = await explainEmployeeNameSearch(name.trim());

      setPlan(result);
    } catch (error) {
      console.error("Failed to execute EXPLAIN ANALYZE:", error);

      setPlan([]);
      setMessage("Failed to execute EXPLAIN ANALYZE.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mt-8">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-800">
          Employee Name Search
        </h2>

        <p className="text-sm text-gray-500">
          INDEX + EXPLAIN ANALYZE demonstration
        </p>
      </div>

      <div className="mb-4 rounded-lg bg-gray-50 p-4">
        <p className="mb-2 text-sm font-semibold text-gray-700">SQL Query</p>

        <pre className="overflow-x-auto rounded-md bg-gray-900 p-4 text-sm text-white">
          {`EXPLAIN ANALYZE
SELECT
    employee_id,
    employee_name,
    email,
    salary
FROM employees_advaitecs_advpgsql
WHERE employee_name = 'Ravi';`}
        </pre>
      </div>

      <div className="flex max-w-xl gap-3">
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Enter employee name"
          className="flex-1 rounded-md border border-gray-300 px-4 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />

        <button
          type="button"
          onClick={handleAnalyze}
          disabled={loading}
          className="rounded-md bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Analyzing..." : "Run EXPLAIN"}
        </button>
      </div>

      {message && <p className="mt-4 text-sm text-red-600">{message}</p>}

      {plan.length > 0 && (
        <div className="mt-6">
          <h3 className="mb-2 text-lg font-semibold text-gray-800">
            Execution Plan
          </h3>

          <div className="overflow-x-auto rounded-lg bg-gray-900 p-4">
            <pre className="whitespace-pre-wrap text-sm text-white">
              {plan.map((item) => item["QUERY PLAN"]).join("\n")}
            </pre>
          </div>
        </div>
      )}
    </section>
  );
};

export default EmployeeNameExplain;
