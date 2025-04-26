import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { allBlogs } from "content-collections";
import { Button } from "@/components/ui/button";
import { formatDate } from "date-fns";

export const Route = createFileRoute("/blog/")({
  component: Page,
});

function Page() {
  return (
    <div className="pt-20">
      <section className="container-custom section-spacing">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="heading-xl mb-6">Blog</h1>
          <p className="body-lg text-zinc-600">
            Thoughts, insights, and perspectives on design, development, and the
            digital landscape.
          </p>
        </div>

        <div className="mb-20">
          <Link
            to="/blog/$slug"
            params={{ slug: allBlogs[0].slug }}
            className="group block"
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <div className="text-sm font-medium text-zinc-500 mb-2">
                  <Link
                    to={`/categories/$slug`}
                    params={{ slug: allBlogs[0].categorySlug }}
                  >
                    {allBlogs[0].category}
                  </Link>{" "}
                  • {formatDate(allBlogs[0].date, "MMMM do, yyyy")}
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-4 group-hover:text-zinc-600 transition-colors">
                  {allBlogs[0].title}
                </h2>
                <p className="text-xl text-zinc-600 mb-6">
                  {allBlogs[0].excerpt}
                </p>
                <Button
                  variant="outline"
                  size="lg"
                  className="group-hover:bg-zinc-900 group-hover:text-white transition-colors"
                >
                  Read Article
                </Button>
              </div>
              <div className="order-1 md:order-2 overflow-hidden rounded-lg">
                <div className="aspect-video bg-zinc-200 rounded-lg overflow-hidden">
                  <img
                    src={allBlogs[0].image || "/placeholder.svg"}
                    alt={allBlogs[0].title}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
                  />
                </div>
              </div>
            </div>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allBlogs.slice(1).map((blog) => (
            <Link
              key={blog.slug}
              to="/blog/$slug"
              params={{ slug: blog.slug }}
              className="group block bg-white rounded-lg overflow-hidden border border-zinc-200 hover:shadow-lg transition-shadow"
            >
              <div className="aspect-video bg-zinc-100 overflow-hidden">
                <img
                  src={blog.image || "/placeholder.svg"}
                  alt={blog.title}
                  width={400}
                  height={200}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
                />
              </div>
              <div className="p-6">
                <div className="text-sm font-medium text-zinc-500 mb-2">
                  <Link
                    to={`/categories/$slug`}
                    params={{ slug: blog.categorySlug }}
                  >
                    {blog.category}
                  </Link>{" "}
                  • {formatDate(blog.date, "MMMM do, yyyy")}
                </div>
                <h3 className="text-2xl font-bold mb-2 group-hover:text-zinc-600 transition-colors">
                  {blog.title}
                </h3>
                <p className="text-zinc-600">{blog.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
