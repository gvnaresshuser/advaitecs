import { useEffect, useState } from "react";

import DataTable from "../common/DataTable";

import {
  getInnerJoin,
  getLeftJoin,
  getRightJoin,
  getFullOuterJoin,
  getCrossJoin,
  getNaturalJoin,
  getSelfJoin,
  getEmployeesWithoutDepartment,
  getDepartmentsWithoutEmployees,
  getEmployeeProjects,
  getEmployeeDepartmentProjects,
} from "../../api/joinApi";

interface JoinResultProps {
  selectedJoin: string;
}

interface ApiResponse {
  join: string;
  count: number;
  data: Record<string, unknown>[];
}

const JoinResult = ({ selectedJoin }: JoinResultProps) => {
  const [result, setResult] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadJoinResult = async () => {
      setLoading(true);
      setError("");

      try {
        let response: ApiResponse;

        switch (selectedJoin) {
          case "inner":
            response = await getInnerJoin();
            break;

          case "left":
            response = await getLeftJoin();
            break;

          case "right":
            response = await getRightJoin();
            break;

          case "full":
            response = await getFullOuterJoin();
            break;

          case "cross":
            response = await getCrossJoin();
            break;

          case "natural":
            response = await getNaturalJoin();
            break;

          case "self":
            response = await getSelfJoin();
            break;

          case "employees-without-department":
            response = await getEmployeesWithoutDepartment();
            break;

          case "departments-without-employees":
            response = await getDepartmentsWithoutEmployees();
            break;

          case "employee-projects":
            response = await getEmployeeProjects();
            break;

          case "employee-department-projects":
            response = await getEmployeeDepartmentProjects();
            break;

          default:
            throw new Error("Invalid JOIN selected");
        }

        setResult(response);
      } catch (err) {
        console.error(err);
        setError("Unable to load JOIN results.");
      } finally {
        setLoading(false);
      }
    };

    loadJoinResult();
  }, [selectedJoin]);

  if (loading) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-6 text-center text-gray-500">
        Loading JOIN results...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center text-red-600">
        {error}
      </div>
    );
  }

  if (!result) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">{result.join}</h2>

        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
          {result.count} records
        </span>
      </div>

      <DataTable data={result.data} />
    </div>
  );
};

export default JoinResult;
