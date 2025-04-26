import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import remarkGemoji from "remark-gemoji";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import {
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerNotationFocus,
} from "@shikijs/transformers";
import { visit } from "unist-util-visit";
import slugify from "slugify";

const categories = defineCollection({
  name: "categories",
  directory: "content/categories",
  include: "*.json",
  schema: (z) => ({
    name: z.string(),
    description: z.string(),
  }),
  parser: "json",
  transform: (data, context) => {
    const slug = slugify(data.name, { lower: true });
    const count = context
      .documents(blogs)
      .filter((blog) => blog.category === data.name).length;

    return {
      ...data,
      slug,
      count,
    };
  },
});

const blogs = defineCollection({
  name: "blogs",
  directory: "content/blogs",
  include: "**/*.mdx",
  schema: (z) => ({
    title: z.string(),
    excerpt: z.string(),
    date: z.coerce.date(),
    category: z.string(),
    slug: z.string(),
    image: z.string(),
  }),
  transform: async (document, context) => {
    const html = await compileMDX(context, document, {
      remarkPlugins: [remarkMath, remarkGemoji],
      rehypePlugins: [
        rehypeSlug,
        rehypeAutolinkHeadings,
        rehypeKatex,
        () => (tree) => {
          visit(tree, (node) => {
            if (node?.type === "element" && node?.tagName === "pre") {
              const [codeEl] = node.children;

              if (codeEl.tagName !== "code") return;

              node.raw = codeEl.children?.[0].value;
            }
          });
        },
        [
          rehypePrettyCode,
          {
            theme: "material-theme-darker",
            transformers: [
              transformerNotationDiff(),
              transformerNotationHighlight(),
              transformerNotationFocus(),
            ],
          },
        ],
      ],
    });

    const category = context
      .documents(categories)
      .find((category) => category.name === document.category);

    if (!category) {
      throw "Invalid category";
    }

    return {
      ...document,
      html,
      categorySlug: slugify(document.category, { lower: true }),
    };
  },
});

const snippets = defineCollection({
  name: "snippets",
  directory: "content/snippets",
  include: "**/*.json",
  parser: "json",
  schema: (z) => ({
    title: z.string(),
    description: z.string(),
    language: z.string(),
    code: z.string(),
  }),
});

const projects = defineCollection({
  name: "projects",
  directory: "content/projects",
  include: "**/*.json",
  parser: "json",
  schema: (z) => ({
    title: z.string(),
    client: z.string().optional(),
    year: z.string(),
    role: z.string().optional(),
    description: z.string(),
    challenge: z.string(),
    solution: z.string(),
    technologies: z.array(z.string()),
    featuredImage: z.string(),
    githubUrl: z.string(),
    meta: z.discriminatedUnion("type", [
      z.object({
        type: z.literal("hosted"),
        hostedUrl: z.string(),
        gallery: z.array(z.string()),
      }),
      z.object({
        type: z.literal("github"),
      }),
    ]),
  }),
  transform: async (data) => {
    const slug = slugify(data.title, { lower: true });
    return {
      ...data,
      slug,
    };
  },
});

export default defineConfig({
  collections: [blogs, categories, snippets, projects],
});
