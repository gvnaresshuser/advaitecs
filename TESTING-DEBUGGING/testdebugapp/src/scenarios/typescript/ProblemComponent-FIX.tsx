interface User {
  id: number;
  name: string;
  age: number;
  email: string;//FIX
}

function ProblemComponent() {
  // BUG 1: Assigning string to number
  const user: User = {
    id: 1,
    name: "Rahul Sharma",
    //age: "25",
    age: 25,//FIX
    email: "rahul@example.com",//FIX
  };

  // BUG 2: Incorrect function argument type
  const calculateNextAge = (age: number): number => {
    return age + 1;
  };

  //const nextAge = calculateNextAge("25");
  const nextAge = calculateNextAge(25);//FIX

  return (
    <div className="rounded-xl border border-red-300 bg-white p-6 shadow">
      <h2 className="mb-4 text-xl font-bold text-red-600">
        Problem: TypeScript Errors
      </h2>

      <p className="mb-2 text-gray-700">Name: {user.name}</p>

      {/* BUG 3: Property does not exist */}
      <p className="mb-2 text-gray-700">Email: {user.email}</p>

      <p className="text-gray-700">Next Age: {nextAge}</p>
    </div>
  );
}

export default ProblemComponent;
