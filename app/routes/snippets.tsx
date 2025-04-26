import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { CodeSnippetDialog } from "@/components/code-snippet-dialog";
import { Badge } from "@/components/ui/badge";
import { allSnippets } from "content-collections";

export const Route = createFileRoute("/snippets")({
  component: Page,
});

function Page() {
  return (
    <div className="pt-20">
      <section className="container-custom section-spacing">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="heading-xl mb-6">Code Snippets</h1>
          <p className="body-lg text-muted-foreground">
            A collection of useful code snippets and patterns I frequently use
            in my projects.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allSnippets.map((snippet) => (
            <CodeSnippetDialog key={snippet.title} snippet={snippet}>
              <div className="group bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full flex flex-col">
                <div className="p-6 flex-grow">
                  <div className="flex justify-between items-start mb-3">
                    <Badge variant="outline" className="bg-muted/50">
                      {snippet.language}
                    </Badge>
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {snippet.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {snippet.description}
                  </p>
                </div>
                <div className="px-6 pb-6">
                  <Button
                    variant="outline"
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                  >
                    View Snippet
                  </Button>
                </div>
              </div>
            </CodeSnippetDialog>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-6">
            Looking for more code examples? Check out my projects and blog
            posts.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild variant="outline">
              <Link to="/projects">View Projects</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/blog">Read Blog</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
