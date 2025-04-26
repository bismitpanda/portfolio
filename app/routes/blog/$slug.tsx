import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { allBlogs } from "content-collections";
import { Mdx } from "@/components/mdx";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { formatDate } from "date-fns";

export const Route = createFileRoute("/blog/$slug")({
  component: Page,
  notFoundComponent: NotFound,
  beforeLoad: ({ params }) => {
    const blog = allBlogs.find((blog) => blog.slug === params.slug);
    if (!blog) throw notFound();
    return { blog };
  },
});

function Page() {
  const { blog } = Route.useRouteContext();

  return (
    <div>
      <article className="container-custom section-spacing">
        <div className="mb-10">
          <Button asChild variant="ghost" className="group">
            <Link to="/blog" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Blog</span>
            </Link>
          </Button>
        </div>

        <div className="max-w-3xl mx-auto mb-10">
          <div className="text-sm font-medium text-zinc-500 mb-4">
            <Link to={`/categories/$slug`} params={{ slug: blog.categorySlug }}>
              {blog.category}
            </Link>{" "}
            • {formatDate(blog.date, "MMMM do, yyyy")}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            {blog.title}
          </h1>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-zinc-200 overflow-hidden">
              <img
                src="/placeholder.svg?height=40&width=40"
                alt="Bismit Panda"
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-zinc-600">
              By{" "}
              <HoverCard>
                <HoverCardTrigger asChild>
                  <span>Bismit Panda</span>
                </HoverCardTrigger>
                <HoverCardContent asChild>
                  <div className="w-200 mx-auto p-8 rounded-lg">
                    <div className="flex items-center gap-6">
                      <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
                        <img
                          src="/placeholder.svg?height=80&width=80"
                          alt="Bismit Panda"
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2">Bismit Panda</h3>
                        <p className="text-zinc-600">
                          Full Stack Developer with a passion for typography and
                          user experience. Writing about web development,
                          design, and the intersection of technology and
                          creativity.
                        </p>
                      </div>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mb-12">
          <div className="aspect-[16/9] bg-zinc-100 rounded-lg overflow-hidden">
            <img
              src={blog.image || "/placeholder.svg"}
              alt={blog.title}
              width={1200}
              height={600}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <article className="prose prose-lg max-w-3xl mx-auto py-8">
          <Mdx code={blog.html} />
        </article>

        <div className="max-w-3xl mx-auto mt-16">
          <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {allBlogs
              .filter(
                (blog) =>
                  blog.category === blog.category && blog.slug != blog.slug,
              )
              .map((relatedBlogs) => (
                <Link
                  key={relatedBlogs.slug}
                  to="/blog/$slug"
                  params={{ slug: relatedBlogs.slug }}
                  className="group block hover:scale-[1.01] bg-white rounded-lg overflow-hidden border border-zinc-200 transition-transform"
                >
                  <div className="aspect-video bg-zinc-100 overflow-hidden">
                    <img
                      src={relatedBlogs.image || "/placeholder.svg"}
                      alt={relatedBlogs.title}
                      width={300}
                      height={200}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-zinc-600">
                      {relatedBlogs.title}
                    </h3>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </article>
    </div>
  );
}

function NotFound() {
  return (
    <div className="pt-20">
      <div className="container-custom min-h-[80vh] flex items-center justify-center">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="heading-xl mb-4">404</h1>
          <h2 className="heading-md mb-6">Article Not Found</h2>

          <p className="body-lg text-muted-foreground mb-8">
            The blog post you're looking for seems to have vanished into the
            digital ether. Perhaps it was moved, renamed, or is still being
            written.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/blog" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Blog</span>
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                <span>Go Home</span>
              </Link>
            </Button>
          </div>

          <div className="mt-16">
            <h3 className="text-xl font-bold mb-4">Popular Articles</h3>
            <ul className="space-y-2">
              {allBlogs.slice(0, 3).map((blog) => (
                <li key={blog.slug}>
                  <Link
                    to="/blog/$slug"
                    params={{ slug: blog.slug }}
                    className="link-underline text-lg"
                  >
                    {blog.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
