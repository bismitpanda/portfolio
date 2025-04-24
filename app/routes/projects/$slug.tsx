import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/projects/$slug")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/projects/$slug"!</div>;
}
