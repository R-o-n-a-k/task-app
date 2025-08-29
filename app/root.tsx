import type { MetaFunction } from "react-router";
import {
  isRouteErrorResponse,
  Links,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <link rel="canonical" href="https://remix-task.netlify.app/" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Remix Task",
              url: "https://remix-task.netlify.app/",
              author: {
                "@type": "Person",
                name: "Ronak Patel",
                url: "https://ronakjpatel.in",
              },
              applicationCategory: "Productivity",
              operatingSystem: "Web",
              description:
                "Remix Task is a responsive daily task manager built with React Remix Router v7. It supports full CRUD operations to help users add, edit, and organize their tasks efficiently.",
              keywords: [
                "Remix Task",
                "React Remix CRUD App",
                "Task Manager",
                "Daily Planner",
                "To-Do List App",
                "Task Tracker",
                "Productivity Tool",
                "Remix Router v7",
                "Ronak Patel",
              ],
            }),
          }}
        />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export const meta: MetaFunction = () => {
  return [
    { charSet: "utf-8" },
    { name: "author", content: "Ronak Patel" },
    { title: "Task App" },
    {
      name: "description",
      content:
        "Life is too short ;). Stop procrastinating. Add your Task and get things done!",
    },
    {
      name: "keywords",
      content:
        "Remix Task, React Remix CRUD App, Task Manager, To-Do App, Daily Planner, Task Tracker, CRUD Operations, Remix Router v7, Productivity App, Ronak Patel, React Remix Project, Web Developer Portfolio",
    },

    // Open Graph
    {
      property: "og:title",
      content: "Remix Task | Daily Task Manager in Remix by Ronak Patel",
    },
    {
      property: "og:description",
      content:
        "Manage your daily tasks with Remix Task — a responsive CRUD app built using React Remix Router v7. Add, update, and delete tasks with ease.",
    },
    { property: "og:url", content: "https://remix-task.netlify.app/" },
    { property: "og:site_name", content: "Remix Task" },
    { property: "og:type", content: "website" },
    {
      property: "og:image",
      content: "https://remix-task.netlify.app/task.png",
    },
    { property: "og:locale", content: "en_US" },

    // Twitter
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: "Remix Task | Simple Daily Task App by Ronak Patel",
    },
    {
      name: "twitter:description",
      content:
        "A responsive daily task manager built with React Remix. Perform full CRUD operations with clean UI & modern routing. Created by Ronak Patel.",
    },
    {
      name: "twitter:image",
      content: "https://remix-task.netlify.app/task.png",
    },
  ];
};

export default function App() {
  return (
    <>
      <nav className="bg-white flex items-center justify-between p-2 md:p-4 shadow px-5 md:px-40">
        <NavLink to="/">
          <div className="inline-flex gap-1 md:gap-2 font-bold text-lg md:text-xl text-center justify-center">
            <img className="h-5 w-5 self-center" src="/task.png" alt="logo" />
            Task App
          </div>
        </NavLink>
        <div className="flex gap-4 md:gap-6 font-semibold">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-cyan-500"
                : "text-gray-600 hover:scale-105 transition"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/new"
            className={({ isActive }) =>
              isActive
                ? "text-cyan-500"
                : "text-gray-600 hover:scale-105 transition"
            }
          >
            New Task
          </NavLink>
        </div>
      </nav>
      <div className="max-w-[90%] md:max-w-[70%] mx-auto">
        <Outlet />
      </div>
    </>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
