import { Form, type ActionFunctionArgs, redirect } from "react-router";
import type { Route } from "./+types/newTask";

import { addDoc, collection } from "firebase/firestore";
import { db } from "../lib/firebase-config";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New Task | Task App" },
    {
      name: "description",
      content: "Add a new task item to your list",
    },
  ];
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const title = formData.get("title");
  const description = formData.get("description");

  if (!title || !description) {
    return { error: "Title and description are required" };
  }
  try {
    const tasksCollectionRef = collection(db, "tasks");
    await addDoc(tasksCollectionRef, {
      title,
      description,
      createdAt: new Date(),
    });
    return redirect("/");
  } catch (error) {
    return { error: "Failed to create task" };
  }
}

export default function NewItem() {
  return (
    <div className="">
      <h1 className="mt-5 text-xl font-bold text-center text-cyan-500">
        Add your new Task
      </h1>
      <Form method="post" className="md:w-[50%] mx-auto flex flex-col">
        <div className="form-input">
          <label htmlFor="" className="font-bold text-cyan-500">
            Task Title
          </label>
          <input
            className="border focus:outline-none focus:border-neutral-600 hover:border-neutral-500 p-1 placeholder:text-sm shadow-md rounded-md"
            type="text"
            name="title"
            placeholder="Enter Task Title"
            required
          />
        </div>
        <div className="form-input">
          <label htmlFor="" className="font-bold text-cyan-500">
            Enter Description
          </label>
          <textarea
            className="border resize-none focus:outline-none p-1 placeholder:text-sm shadow-md rounded-md"
            name="description"
            placeholder="Enter Task Description..."
            rows={5}
            required
          />
        </div>
        <div className="flex gap-5 my-4 mx-auto text-center">
          <button type="submit" className="btn bg-cyan-500 hover:bg-cyan-600">
            Create Task
          </button>
        </div>
      </Form>
    </div>
  );
}
