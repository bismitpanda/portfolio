"use client";

import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const routes = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "Snippets", path: "/snippets" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/#contact" },
  ];

  const {
    location: { pathname },
  } = useRouterState();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="container-custom flex items-center justify-between h-20">
        <Link to="/">
          <img src="/logo.svg" alt="Logo" className="size-12" />
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          {routes.map((route) => (
            <Link
              key={route.path}
              to={route.path}
              className={cn(
                "link-underline text-lg transition-colors",
                pathname === route.path
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {route.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
            }}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 top-20 bg-background z-40 p-6">
          <nav className="flex flex-col space-y-6 text-center">
            {routes.map((route) => (
              <Link
                key={route.path}
                to={route.path}
                className={cn(
                  "text-2xl py-2 transition-colors",
                  pathname === route.path
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
                onClick={() => {
                  setIsMenuOpen(false);
                }}
              >
                {route.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
