import { Form, type ActionFunctionArgs, redirect } from "react-router";
import type { Route } from "./+types/task";
import { db } from "../lib/firebase-config";
import { getDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Edit Task | Task App" },
    {
      name: "description",
      content: "Edit your existing task item",
    },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  const { id } = params;

  if (!id) {
    return { error: "No Task Found" };
  }
  try {
    const taskDocRef = doc(db, "tasks", id);
    const taskDoc = await getDoc(taskDocRef);

    if (!taskDoc.exists()) {
      return { error: "Task not found" };
    }

    const taskData = taskDoc.data() as { title: string; description: string };
    return {
      task: {
        id: taskDoc.id,
        ...taskData,
      },
    };
  } catch (error) {
    return { error: "Failed to load task" };
  }
}

export async function action({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData();
  const title = formData.get("title");
  const description = formData.get("description");
  const intent = formData.get("intent");

  try {
    const taskDocRef = doc(db, "tasks", params.id!);

    if (intent === "delete") {
      await deleteDoc(taskDocRef);
      return redirect("/");
    } else if (intent === "update") {
      if (!title || !description) {
        return { error: "Title and description are required" };
      }
      await updateDoc(taskDocRef, {
        title: title.toString(),
        description: description.toString(),
        updatedAt: new Date(),
      });
      return { updated: true };
    }
  } catch (error) {
    return { error: "Failed to perform operation" };
  }

  return null;
}

export default function NewItem({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  const { task, error } = loaderData;

  return (
    <div className="">
      <h1 className="mt-5 text-xl font-bold text-center text-cyan-500">
        Edit your Task
      </h1>

      {error && <div className="text-red-500">{error}</div>}

      {actionData?.updated && (
        <div className="md:w-[48%] mx-auto bg-green-200 px-2 py-1 rounded-md text-green-500 my-2">
          Task updated successfully!
        </div>
      )}

      <Form method="post" className="md:w-[50%] mx-auto flex flex-col">
        <div className="form-input">
          <label htmlFor="" className="font-bold text-cyan-500">
            Edit Task Title
          </label>
          <input
            className="border focus:outline-none focus:border-neutral-600 hover:border-neutral-500 p-1 placeholder:text-sm shadow-md rounded-md"
            type="text"
            name="title"
            placeholder="Edit Task Title"
            defaultValue={task?.title}
          />
        </div>
        <div className="form-input">
          <label htmlFor="" className="font-bold text-cyan-500">
            Edit Description
          </label>
          <textarea
            className="border resize-none focus:outline-none p-1 placeholder:text-sm shadow-md rounded-md"
            name="description"
            placeholder="Edit Task Description..."
            rows={7}
            defaultValue={task?.description}
          />
        </div>
        <div className="flex gap-5 my-4 mx-auto text-center">
          <button
            type="submit"
            name="intent"
            value="update"
            className="btn bg-cyan-500 hover:bg-cyan-600"
          >
            Update Task
          </button>
          <button
            type="submit"
            name="intent"
            value="delete"
            className="btn bg-red-500 hover:bg-red-600"
          >
            Delete Task
          </button>
        </div>
      </Form>
    </div>
  );
}
