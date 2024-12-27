import { getAllUsers } from "./actions";

export default function Home() {
  const users = getAllUsers();
  console.log(users);
  



  return (
    <div className="grid items-center justify-items-center min-h-screen p-3 pb-20 gap-4 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="w-full max-w-md">
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              className="mt-1 p-2 w-full border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Age</label>
            <input
              type="number"
              className="mt-1 p-2 w-full border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              className="mt-1 p-2 w-full border rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded"
          >
            Add Person
          </button>
        </form>
      </div>

      <div className="w-full max-w-md mt-10">
        <h2 className="text-lg font-semibold">People List</h2>
        <table className="min-w-full mt-4 border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Name</th>
              <th className="px-4 py-2 border-b">Age</th>
              <th className="px-4 py-2 border-b">Email</th>
            </tr>
          </thead>
          

        </table>
      </div>
    </div>
  );
}
