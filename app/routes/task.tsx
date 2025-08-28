import { Form } from "react-router";
import type { Route } from "./+types/task";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Edit Task | Task App" },
    {
      name: "description",
      content: "Edit your existing task item",
    },
  ];
}

export default function NewItem() {
  return (
    <div className="">
      <h1 className="mt-5 text-xl font-bold text-center text-cyan-500">
        Edit your Task
      </h1>
      <Form className="w-[50%] mx-auto flex flex-col">
        <div className="form-input">
          <label htmlFor="" className="font-bold text-cyan-500">
            Edit Task Title
          </label>
          <input
            className="border focus:outline-none focus:border-neutral-600 hover:border-neutral-500 p-1 placeholder:text-sm shadow-md rounded-md"
            type="text"
            name="title"
            placeholder="Edit Task Title"
          />
        </div>
        <div className="form-input">
          <label htmlFor="" className="font-bold text-cyan-500">
            Edit Description
          </label>
          <textarea
            className="border resize-none focus:outline-none p-1 placeholder:text-sm shadow-md rounded-md"
            name="desc"
            placeholder="Edit Task Description..."
            rows={7}
          />
        </div>
        <div className="flex gap-5 my-4 mx-auto text-center">
          <button className="btn bg-cyan-500 hover:bg-cyan-600">
            Update Task
          </button>
          <button className="btn bg-red-500 hover:bg-red-600">
            Delete Task
          </button>
        </div>
      </Form>
    </div>
  );
}
