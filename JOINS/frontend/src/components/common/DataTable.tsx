interface DataTableProps {
  data: Record<string, unknown>[];
}

const DataTable = ({ data }: DataTableProps) => {
  if (data.length === 0) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-6 text-center text-gray-500">
        No records found.
      </div>
    );
  }

  const columns = Object.keys(data[0]);

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((column) => (
              <th
                key={column}
                className="whitespace-nowrap px-4 py-3 text-left text-sm font-semibold text-gray-700"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-50">
              {columns.map((column) => (
                <td
                  key={column}
                  className="whitespace-nowrap px-4 py-3 text-sm text-gray-600"
                >
                  {row[column] === null ? "NULL" : String(row[column])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
