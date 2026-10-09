interface User {
  id: number;
  name: string;
  age: number;
  email: string;
}

function SolutionComponent() {
  const user: User = {
    id: 1,
    name: "Rahul Sharma",
    age: 25,
    email: "rahul@example.com",
  };

  const calculateNextAge = (age: number): number => {
    return age + 1;
  };

  const nextAge = calculateNextAge(user.age);

  return (
    <div className="rounded-xl border border-green-300 bg-white p-6 shadow">
      <h2 className="mb-4 text-xl font-bold text-green-600">
        Solution: TypeScript Errors Fixed
      </h2>

      <p className="mb-2 text-gray-700">Name: {user.name}</p>

      <p className="mb-2 text-gray-700">Email: {user.email}</p>

      <p className="mb-2 text-gray-700">Age: {user.age}</p>

      <p className="text-gray-700">Next Age: {nextAge}</p>
    </div>
  );
}

export default SolutionComponent;
