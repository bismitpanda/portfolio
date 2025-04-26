import type { PropsWithChildren } from "react";
import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import appCss from "@/styles/app.css?url";
import "@fontsource-variable/fustat";
import "@fontsource-variable/playfair";
import "@fontsource-variable/jetbrains-mono";
import "katex/dist/katex.css";
import { Footer } from "@/components/footer";
import { Navigation } from "@/components/navigation";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "Bismit Panda's Portfolio",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "icon",
        href: "/logo.svg",
      },
    ],
  }),
  component: RootComponent,
  notFoundComponent: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: PropsWithChildren) {
  return (
    <html className="dark" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="font-sans antialiased">
        <Navigation />
        {children}
        <Scripts />
        <Footer />
      </body>
    </html>
  );
}
