import type { Route } from "./+types/newItem";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New Item - Task App" },
    {
      name: "description",
      content: "Add a new task item to your list",
    },
  ];
}

export default function NewItem() {
  return (
    <div className="text-cyan-800">
      <h1>Add New Item</h1>
      <p>Create a new task here.</p>
    </div>
  );
}
