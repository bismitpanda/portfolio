import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createFileRoute } from "@tanstack/react-router";
import { allCategories } from "content-collections";

export const Route = createFileRoute("/categories/")({
  component: Page,
});

function Page() {
  return (
    <div className="pt-20">
      <section className="container-custom section-spacing">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="heading-xl mb-6">Categories</h1>
          <p className="body-lg text-muted-foreground">
            Browse articles by topic to find exactly what you're looking for.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allCategories.map((category) => (
            <Card
              key={category.slug}
              className="group border border-border bg-card hover:shadow-lg transition-shadow"
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                  {category.name}
                </CardTitle>
                <CardDescription className="text-sm">
                  {category.count} articles
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-3">
                <p className="text-muted-foreground">{category.description}</p>
              </CardContent>
              <CardFooter>
                <Button
                  asChild
                  variant="outline"
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                >
                  <Link to="/categories/$slug" params={{ slug: category.slug }}>
                    View Articles
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
