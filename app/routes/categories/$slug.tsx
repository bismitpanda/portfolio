import { Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Home, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { createFileRoute } from "@tanstack/react-router";
import { allBlogs, allCategories } from "content-collections";
import { formatDate } from "date-fns";

export const Route = createFileRoute("/categories/$slug")({
  component: Page,
  notFoundComponent: NotFound,
  beforeLoad: ({ params }) => {
    const category = allCategories.find((c) => c.slug === params.slug);
    if (!category) throw notFound();
    return { category };
  },
});

function Page() {
  const { category } = Route.useRouteContext();
  const filteredBlogs = allBlogs.filter(
    (blog) => blog.category === category.name,
  );

  return (
    <div className="pt-20">
      <section className="container-custom section-spacing">
        <div className="mb-10">
          <Button asChild variant="ghost" className="group">
            <Link to="/categories" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              <span>All Categories</span>
            </Link>
          </Button>
        </div>

        <div className="max-w-3xl mx-auto mb-16">
          <h1 className="heading-lg mb-4">{category.name}</h1>
          <p className="body-lg text-muted-foreground">
            {category.description}
          </p>
        </div>

        {filteredBlogs.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog) => (
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
                    <Badge variant="outline">{blog.category}</Badge> •{" "}
                    {formatDate(blog.date, "MMMM do, yyyy")}
                  </div>
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-zinc-600 transition-colors">
                    {blog.title}
                  </h3>
                  <p className="text-zinc-600">{blog.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold mb-4">No articles found</h2>
            <p className="text-muted-foreground mb-8">
              There are no articles in this category yet.
            </p>
            <Button asChild>
              <Link to="/blog">Browse All Articles</Link>
            </Button>
          </div>
        )}
      </section>
    </div>
  );
}

function NotFound() {
  return (
    <div className="pt-20">
      <div className="container-custom min-h-[80vh] flex items-center justify-center">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="heading-xl mb-4">404</h1>
          <h2 className="heading-md mb-6">Category Not Found</h2>
          <p className="body-lg text-muted-foreground mb-8">
            We couldn't find the category you're looking for. It might have been
            renamed or removed, or perhaps you followed an outdated link.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/categories" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                <span>All Categories</span>
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
            <h3 className="text-xl font-bold mb-6">Popular Categories</h3>
            <div className="flex flex-wrap gap-3 justify-center">
              {allCategories
                .toSorted((a, b) =>
                  a.count > b.count ? -1 : a.count === b.count ? 0 : 1,
                )
                .slice(0, 5)
                .map((category) => (
                  <Button asChild variant="outline" className="rounded-full">
                    <Link
                      to="/categories/$slug"
                      params={{ slug: category.slug }}
                    >
                      {category.name}
                    </Link>
                  </Button>
                ))}
            </div>
          </div>
          <div className="mt-12 max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search for a category..."
                className="w-full pl-10 pr-4 py-3 rounded-full border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
