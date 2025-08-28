import type { Route } from "./+types/home";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../lib/firebase-config";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Task App" },
    {
      name: "description",
      content:
        "Life is too short ;). Stop procrastinating. Add your Task and get things done!",
    },
  ];
}

export async function loader() {
  try {
    const tasksCollectionRef = collection(db, "tasks");
    const data = await getDocs(tasksCollectionRef);
    return { items: data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) };
  } catch (error) {
    return { error: "Failed to Load tasks" };
  }
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { error, items } = loaderData;
  return (
    <div className="">
      {error && (
        <p className="text-red-500 bg-red-200 p-2 rounded-md mb-4">{error}</p>
      )}
      <h1 className="my-5 text-xl font-bold text-center text-cyan-500">
        List of your Tasks
      </h1>

      {items && items.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📝</div>
          <h2 className="text-xl font-semibold text-gray-600 mb-2">
            No tasks yet!
          </h2>
          <p className="text-gray-500 mb-4">
            Stop procrastinating & get some work done.
          </p>
          <Link to="/new" className="btn">
            Add Your First Task
          </Link>
        </div>
      ) : (
        <ul className="space-y-4">
          {items?.map((item) => {
            const task = item as {
              id: string;
              title: string;
              description: string;
            };
            return (
              <li key={item.id} className="p-4 bg-cyan-50 rounded-md shadow-md">
                <Link to={`/home/${task.id}`}>
                  <h2 className="text-lg font-semibold text-cyan-600 underline underline-offset-2 hover:text-cyan-800 transition">
                    {task.title}
                  </h2>
                </Link>
                <p className="text-gray-700">{task.description}</p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
