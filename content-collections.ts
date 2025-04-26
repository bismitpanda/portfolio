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
  parser: "json",
  schema: (z) => ({
    name: z.string(),
    slug: z.string(),
    description: z.string(),
  }),
  transform: (data, context) => {
    const count = context
      .documents(blogs)
      .filter((blog) => blog.category === data.slug).length;
    return { ...data, count };
  },
});

const blogs = defineCollection({
  name: "blogs",
  directory: "content/blogs",
  include: "*.mdx",
  schema: (z) => ({
    title: z.string(),
    excerpt: z.string(),
    date: z.coerce.date(),
    category: z.string(),
    slug: z.string(),
    image: z.string(),
  }),
  transform: async (data, context) => {
    const html = await compileMDX(context, data, {
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
    return {
      ...data,
      html,
      categorySlug: slugify(data.category, { lower: true }),
    };
  },
});

const snippets = defineCollection({
  name: "snippets",
  directory: "content/snippets",
  include: "*.json",
  parser: "json",
  schema: (z) => ({
    name: z.string(),
    description: z.string(),
    code: z.string(),
    language: z.string(),
    date: z.coerce.date(),
  }),
});

export default defineConfig({
  collections: [blogs, categories, snippets],
});
