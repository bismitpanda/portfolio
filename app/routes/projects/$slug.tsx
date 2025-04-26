import { createFileRoute, notFound } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  FolderClosed,
  Home,
  Github,
  ExternalLink,
} from "lucide-react";
import { allProjects } from "content-collections";

export const Route = createFileRoute("/projects/$slug")({
  component: Page,
  notFoundComponent: NotFound,
  beforeLoad: ({ params }) => {
    const project = allProjects.find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    return { project };
  },
});

function Page() {
  const { project } = Route.useRouteContext();

  return (
    <div className="pt-20">
      <article className="container-custom section-spacing">
        <div className="mb-10">
          <Button asChild variant="ghost" className="group">
            <Link to="/projects" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Projects</span>
            </Link>
          </Button>
        </div>

        <div className="max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            {project.title}
          </h1>
          <p className="text-xl text-zinc-600 mb-8">{project.description}</p>
          <div className="flex flex-wrap gap-6">
            {project.meta.type === "hosted" && (
              <Button asChild size="lg" className="gap-2">
                <a
                  href={project.meta.hostedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>View Live Site</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            )}
            {project.githubUrl && (
              <Button asChild variant="outline" size="lg" className="gap-2">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-4 w-4" />
                  <span>View Code</span>
                </a>
              </Button>
            )}
          </div>
        </div>

        <div className="mb-16">
          <div className="aspect-video bg-zinc-100 rounded-lg overflow-hidden">
            <img
              src={project.featuredImage || "/placeholder.svg"}
              alt={project.title}
              width={1600}
              height={800}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-bold mb-6">Project Details</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm text-zinc-500 uppercase">Client</h3>
                <p className="text-lg">{project.client}</p>
              </div>
              <div>
                <h3 className="text-sm text-zinc-500 uppercase">Year</h3>
                <p className="text-lg">{project.year}</p>
              </div>
              <div>
                <h3 className="text-sm text-zinc-500 uppercase">Role</h3>
                <p className="text-lg">{project.role}</p>
              </div>
              <div>
                <h3 className="text-sm text-zinc-500 uppercase">
                  Technologies
                </h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-zinc-100 text-zinc-700 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">The Challenge</h2>
                <p className="text-lg text-zinc-600">{project.challenge}</p>
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-4">The Solution</h2>
                <p className="text-lg text-zinc-600">{project.solution}</p>
              </div>
            </div>
          </div>
        </div>

        {project.meta.type === "hosted" && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8">Project Gallery</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {project.meta.gallery.map((image, index) => (
                <div
                  key={index}
                  className="aspect-video bg-zinc-100 rounded-lg overflow-hidden"
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${project.title} - Image ${index + 1}`}
                    width={800}
                    height={600}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}

function NotFound() {
  return (
    <div className="pt-20">
      <div className="container-custom min-h-[70vh] flex items-center justify-center">
        <div className="max-w-2xl mx-auto text-center">
          <div className="relative mb-8 mx-auto w-40 h-40">
            <div className="absolute inset-0 bg-muted/30 rounded-full animate-pulse opacity-25"></div>
            <div className="relative bg-muted/50 rounded-full w-full h-full flex items-center justify-center">
              <FolderClosed className="h-20 w-20 text-muted-foreground" />
            </div>
          </div>

          <h1 className="heading-xl mb-4">404</h1>
          <h2 className="heading-md mb-6">Project Not Found</h2>

          <p className="body-lg text-muted-foreground mb-8">
            This project seems to be missing from our portfolio. It might be
            under development, archived, or perhaps it never existed in the
            first place.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/projects" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                <span>All Projects</span>
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                <span>Go Home</span>
              </Link>
            </Button>
          </div>

          <div className="mt-16 grid md:grid-cols-2 gap-6">
            <div className="bg-card border border-border p-6 rounded-lg text-left">
              <h3 className="text-xl font-bold mb-4">Featured Project</h3>
              <p className="text-muted-foreground mb-4">Typography Portfolio</p>
              <Button asChild variant="outline" size="sm" className="w-full">
                <Link
                  to="/projects/$slug"
                  params={{ slug: "typography-portfolio" }} // TODO: change this to something other
                >
                  View Project
                </Link>
              </Button>
            </div>

            <div className="bg-card border border-border p-6 rounded-lg text-left">
              <h3 className="text-xl font-bold mb-4">GitHub Projects</h3>
              <p className="text-muted-foreground mb-4">
                Check out my open source work
              </p>
              <Button asChild variant="outline" size="sm" className="w-full">
                <a href="#" className="flex items-center justify-center gap-2">
                  <Github className="h-4 w-4" />
                  <span>GitHub Profile</span>
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
