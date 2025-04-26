import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { allBlogs, allCategories } from "content-collections";
import { formatDate } from "date-fns";

export const Route = createFileRoute("/category/$slug")({
  component: Page,
  notFoundComponent: NotFound,
  beforeLoad: ({ params }) => {
    const category = allCategories.find((c) => c.slug === params.slug);
    if (!category) {
      throw notFound();
    }
    return {
      category,
    };
  },
});

function Page() {
  const { category } = Route.useRouteContext();
  const filteredPosts = allBlogs.filter(
    (blog) => blog.category === category.name
  );

  return (
    <div className="pt-20">
      <section className="container-custom section-spacing">
        <div className="mb-10">
          <Button asChild variant="ghost" className="group">
            <Link to="/category" className="flex items-center gap-2">
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

        {filteredPosts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <Link
                key={post.slug}
                to="/blog/$slug"
                params={{ slug: post.slug }}
                className="group block rounded-lg overflow-hidden border bg-card hover:shadow-lg transition-shadow"
              >
                <div className="aspect-video bg-zinc-100 overflow-hidden">
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    width={400}
                    height={200}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="text-sm font-medium text-zinc-500 mb-2">
                    <Badge variant="outline">{post.category}</Badge> •{" "}
                    {formatDate(post.date, "MMMM do, yyyy")}
                  </div>
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-zinc-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground">{post.excerpt}</p>
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
      <div className="container-custom min-h-[70vh] flex items-center justify-center">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="heading-xl mb-4">404</h1>
          <h2 className="heading-md mb-6">Category Not Found</h2>

          <p className="body-lg text-muted-foreground mb-8">
            We couldn't find the category you're looking for. It might have been
            renamed or removed, or perhaps you followed an outdated link.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/category" className="flex items-center gap-2">
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
                .toSorted()
                .slice(0, 3)
                .map((category) => (
                  <Button asChild variant="outline" className="rounded-full">
                    <Link to="/category/$slug" params={{ slug: category.slug }}>
                      {category.name}
                    </Link>
                  </Button>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
