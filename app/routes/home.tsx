import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Task App" },
    {
      name: "description",
      content:
        "Life is too short ;).Stop procrastinating. Add your Task and get things done!",
    },
  ];
}

export default function Home() {
  return <div className="text-cyan-800">Hi There</div>;
}
