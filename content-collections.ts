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

const blogs = defineCollection({
  name: "blogs",
  directory: "content/blogs",
  include: "**/*.mdx",
  schema: (z) => ({
    title: z.string(),
    excerpt: z.string(),
    date: z.string().date(),
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
    return {
      ...document,
      html,
    };
  },
});

export default defineConfig({
  collections: [blogs],
});
