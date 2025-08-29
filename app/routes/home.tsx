import type { Route } from "./+types/home";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../lib/firebase-config";
import { Link } from "react-router";
import { useState } from "react";
import Pagination from "~/components/Pagination";

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

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;

  const currentPosts = items?.slice(firstPostIndex, lastPostIndex) || [];

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
        <>
          <ul className="space-y-4">
            {currentPosts?.map((item) => {
              const task = item as {
                id: string;
                title: string;
                description: string;
              };
              return (
                <li
                  key={item.id}
                  className="p-4 bg-cyan-50 rounded-md shadow-md"
                >
                  <Link to={`/home/${task.id}`}>
                    <h2 className="text-lg font-semibold text-cyan-600 underline underline-offset-2 hover:text-cyan-800 hover:no-underline transition">
                      {task.title}
                    </h2>
                  </Link>
                  <p className="text-gray-700">{task.description}</p>
                </li>
              );
            })}
          </ul>
          <button className="p-3 fixed rounded-full bottom-10 right-5 md:right-20 bg-cyan-500 text-white cursor-pointer shadow-md hover:shadow-none hover:bg-cyan-600 text-4xl flex items-center justify-center">
            <Link to="/new" className="">
              <svg
                className="w-5 h-5 md:w-7 md:h-7 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 12h14m-7 7V5"
                />
              </svg>
            </Link>
          </button>

          <Pagination
            totalPosts={items?.length || 0}
            postPerPage={postsPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </>
      )}
    </div>
  );
}
