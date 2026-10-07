interface JoinButtonsProps {
  selectedJoin: string;
  onSelect: (joinType: string) => void;
}

const joins = [
  { key: "inner", label: "INNER JOIN" },
  { key: "left", label: "LEFT JOIN" },
  { key: "right", label: "RIGHT JOIN" },
  { key: "full", label: "FULL OUTER JOIN" },
  { key: "cross", label: "CROSS JOIN" },
  { key: "natural", label: "NATURAL JOIN" },
  { key: "self", label: "SELF JOIN" },
  {
    key: "employees-without-department",
    label: "Employees Without Department",
  },
  {
    key: "departments-without-employees",
    label: "Departments Without Employees",
  },
  {
    key: "employee-projects",
    label: "Employee + Projects",
  },
  {
    key: "employee-department-projects",
    label: "Employee + Department + Projects",
  },
];

const JoinButtons = ({ selectedJoin, onSelect }: JoinButtonsProps) => {
  return (
    <div className="flex flex-wrap gap-3">
      {joins.map((join) => (
        <button
          key={join.key}
          type="button"
          onClick={() => onSelect(join.key)}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
            selectedJoin === join.key
              ? "bg-blue-600 text-white shadow"
              : "bg-white text-gray-700 ring-1 ring-gray-300 hover:bg-gray-100"
          }`}
        >
          {join.label}
        </button>
      ))}
    </div>
  );
};

export default JoinButtons;
