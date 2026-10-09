import { useQuery, useMutation } from "@tanstack/react-query";

interface User {
  id: number;
  name: string;
  email: string;
}

interface UsersResponse {
  success: boolean;
  users: User[];
}

async function fetchUsers(): Promise<User[]> {
  const response = await fetch("/api/users");

  if (!response.ok) {
    throw new Error("Unable to fetch users");
  }

  const data: UsersResponse = await response.json();
  return data.users;
}

async function updateUserName({
  id,
  name,
}: {
  id: number;
  name: string;
}): Promise<User> {
  const response = await fetch(`/api/users/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });

  if (!response.ok) {
    throw new Error("Unable to update user");
  }

  const data: { success: boolean; user: User } = await response.json();
  return data.user;
}

function ProblemComponent() {
  const {
    data: users,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const mutation = useMutation({
    mutationFn: updateUserName,
    // BUG: The users query cache is not invalidated or updated.
  });

  if (isLoading) {
    return <p className="p-4">Loading users...</p>;
  }

  if (isError) {
    return (
      <p className="p-4 text-red-600">
        {error instanceof Error ? error.message : "Something went wrong"}
      </p>
    );
  }

  return (
    <div className="rounded-xl border border-red-300 bg-white p-6 shadow">
      <h2 className="mb-2 text-xl font-bold text-red-600">
        Problem: Stale React Query Cache
      </h2>

      <p className="mb-4 text-sm text-gray-600">
        Update a user's name. The backend changes, but the list may still show
        the old name.
      </p>

      <div className="space-y-4">
        {users?.map((user) => (
          <div
            key={user.id}
            className="flex flex-col gap-3 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="font-semibold text-gray-800">{user.name}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>

            <button
              onClick={() =>
                mutation.mutate({
                  id: user.id,
                  name: `${user.name} Updated`,
                })
              }
              disabled={mutation.isPending}
              className="rounded-lg bg-red-600 px-4 py-2 text-white disabled:opacity-50"
            >
              Update Name
            </button>
          </div>
        ))}
      </div>

      {mutation.isSuccess && (
        <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
          Backend updated successfully, but the cached list was not refreshed.
        </p>
      )}

      {mutation.isError && (
        <p className="mt-4 text-sm text-red-600">
          {mutation.error.message}
        </p>
      )}
    </div>
  );
}

export default ProblemComponent;