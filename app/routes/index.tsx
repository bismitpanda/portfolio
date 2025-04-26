import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Github, Linkedin, Mail, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { allBlogs } from "content-collections";
import { useEffect, useState } from "react";
import { formatDate } from "date-fns";

export const Route = createFileRoute("/")({
  component: Page,
});

function Page() {
  const [currIdx, setCurrIdx] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const names = [
    "Full Stack Developer",
    "Systems Engineer",
    "Cyber Security Enthusiast",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrIdx((idx) => (idx + 1) % 3);
        setIsAnimating(false);
      }, 300);
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="pt-20">
      <section className="container-custom section-spacing flex flex-col justify-center min-h-[90vh]">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div>
              <p className="text-muted-foreground text-lg mb-2 font-medium">
                Hello, I'm
              </p>
              <h1 className="heading-xl mb-4">Bismit Panda</h1>
              <h2
                className={`heading-md font-light leading-none text-muted-foreground transition-opacity duration-300 ease-in-out ${
                  isAnimating ? "opacity-0" : "opacity-100"
                }`}
              >
                {names[currIdx]}
              </h2>
            </div>
            <p className="body-lg text-muted-foreground max-w-md">
              I create beautiful, functional websites and applications with a
              focus on typography and user experience.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="text-lg px-8">
                <Link
                  to="/"
                  hash="contact"
                  hashScrollIntoView={{
                    behavior: "smooth",
                  }}
                >
                  Contact Me
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="text-lg px-8"
              >
                <Link to="/projects">View Projects</Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-muted rounded-full opacity-50 animate-float"></div>
            <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-muted rounded-full opacity-50 animate-float"></div>
            <div className="relative z-10 aspect-square bg-muted rounded-2xl overflow-hidden border border-border">
              <img
                src="/placeholder.svg?height=600&width=600"
                alt="Bismit Panda"
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-16">
          <Link
            to="/"
            hash="about"
            hashScrollIntoView={{ behavior: "smooth" }}
            className="animate-bounce"
          >
            <ArrowRight className="h-10 w-10 rotate-90 text-muted-foreground" />
          </Link>
        </div>
      </section>

      <section id="about" className="container-custom section-spacing">
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <h2 className="heading-lg mb-6 relative">About</h2>
          </div>
          <div className="md:col-span-2">
            <p className="body-lg mb-6">
              I'm a passionate developer with over 5 years of experience
              building web applications. I specialize in React, Next.js, and
              Node.js, creating responsive and accessible websites.
            </p>
            <p className="body-lg mb-6">
              When I'm not coding, you can find me hiking, reading, or
              experimenting with new technologies. I believe in clean, minimal
              design that puts the focus on content and user experience.
            </p>
          </div>
        </div>
      </section>

      <section className="container-custom section-spacing">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-16">
          <h2 className="heading-lg relative">Featured Projects</h2>
          <Link
            to="/projects"
            className="link-underline text-lg text-muted-foreground mt-4 md:mt-0"
          >
            View All Projects
          </Link>
        </div>

        <div className="grid gap-24">
          {[1, 2, 3].map((project) => (
            <div key={project} className="group">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <span className="text-8xl font-bold text-muted/30 group-hover:text-muted transition-colors">
                    0{project}
                  </span>
                  <h3 className="text-4xl font-bold mb-6 -mt-8 group-hover:translate-y-0.5 transition-transform">
                    Project {project}
                  </h3>
                  <p className="text-xl text-muted-foreground mb-8">
                    A detailed description of this project, including the
                    problem it solves, the technologies used, and the challenges
                    overcome during development.
                  </p>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                  >
                    <Link
                      to="/projects/$slug"
                      params={{
                        slug: project.toString(), // TODO: fix this thing here
                      }}
                    >
                      View Project
                    </Link>
                  </Button>
                </div>
                <div className="overflow-hidden rounded-lg">
                  <div className="aspect-video bg-muted rounded-lg overflow-hidden transition-transform group-hover:scale-105 duration-500">
                    <img
                      src="/placeholder.svg?height=270&width=480"
                      alt={`Project ${project}`}
                      width={480}
                      height={270}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container-custom section-spacing">
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <h2 className="heading-lg mb-6 relative">Skills</h2>
          </div>
          <div className="md:col-span-2">
            <div className="grid grid-cols-2 gap-y-8 gap-x-16">
              {[
                "React",
                "Next.js",
                "TypeScript",
                "Node.js",
                "Tailwind CSS",
                "GraphQL",
                "MongoDB",
                "AWS",
              ].map((skill, index) => (
                <div key={skill} className="border-b border-border pb-2 group">
                  <div className="flex items-baseline">
                    <span className="text-sm text-muted-foreground mr-4 group-hover:text-foreground transition-colors">
                      {(index + 1).toString().padStart(2, "0")}
                    </span>
                    <span className="text-2xl group-hover:translate-x-2 transition-transform">
                      {skill}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container-custom section-spacing">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-16">
          <h2 className="heading-lg relative">Recent Articles</h2>
          <Link
            to="/blog"
            className="link-underline text-lg text-muted-foreground mt-4 md:mt-0"
          >
            View All Articles
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allBlogs.map((blog) => (
            <Link
              key={blog.slug}
              to="/blog/$slug"
              params={{
                slug: blog.slug,
              }}
              className="group block bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow"
            >
              <div className="aspect-video bg-muted overflow-hidden">
                <img
                  src="/placeholder.svg?height=200&width=400"
                  alt={blog.title}
                  width={400}
                  height={200}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
                />
              </div>
              <div className="p-6">
                <div className="text-sm text-muted-foreground mb-2">
                  {formatDate(blog.date, "MMMM do, yyyy")}
                </div>
                <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {blog.title}
                </h3>
                <p className="text-muted-foreground">{blog.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section id="contact" className="container-custom section-spacing">
        <h2 className="heading-lg mb-16 relative text-center">
          Get In Touch
          <span className="absolute -z-10 text-[10rem] font-bold text-muted/20 -top-20 left-1/2 -translate-x-1/2 opacity-80">
            06
          </span>
        </h2>

        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <p className="text-2xl leading-relaxed mb-10">
              I'm always open to new opportunities and collaborations. Feel free
              to reach out!
            </p>
            <div className="flex flex-col gap-6">
              <a
                href="#"
                className="flex items-center gap-4 text-xl text-muted-foreground hover:text-foreground group"
              >
                <Mail className="h-6 w-6 group-hover:scale-110 transition-transform" />
                <span className="link-underline">bismitpanda@gmail.com</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-4 text-xl text-muted-foreground hover:text-foreground group"
              >
                <Linkedin className="h-6 w-6 group-hover:scale-110 transition-transform" />
                <span className="link-underline">
                  linkedin.com/in/bismit-panda-5432a824a
                </span>
              </a>
              <a
                href="#"
                className="flex items-center gap-4 text-xl text-muted-foreground hover:text-foreground group"
              >
                <Github className="h-6 w-6 group-hover:scale-110 transition-transform" />
                <span className="link-underline">github.com/bismitpanda</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-4 text-xl text-muted-foreground hover:text-foreground group"
              >
                <Twitter className="h-6 w-6 group-hover:scale-110 transition-transform" />
                <span className="link-underline">x.com/bismitpanda</span>
              </a>
            </div>
          </div>
          <div>
            <form className="flex flex-col gap-8">
              <div>
                <label
                  htmlFor="name"
                  className="block text-lg mb-2 font-medium"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  className="w-full border-b-2 border-input py-3 text-xl bg-transparent focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-lg mb-2 font-medium"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full border-b-2 border-input py-3 text-xl bg-transparent focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-lg mb-2 font-medium"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full border-b-2 border-input py-3 text-xl bg-transparent focus:outline-none focus:border-primary transition-colors"
                ></textarea>
              </div>
              <div>
                <Button size="lg" className="text-lg px-8 w-full md:w-auto">
                  Send Message
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
