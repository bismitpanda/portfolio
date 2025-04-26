import slugify from "slugify";
import { writeFile } from "fs/promises";
import { formatDate } from "date-fns";
import prompts from "prompts";

async function createBlog() {
  const response = await prompts([
    {
      type: "text",
      name: "title",
      message: "Enter blog title:",
    },
    {
      type: "text",
      name: "excerpt",
      message: "Enter blog excerpt:",
      initial: "This is an excerpt from the blog.",
    },
    {
      type: "text",
      name: "category",
      message: "Enter blog category:",
      initial: "Tech",
    },
    {
      type: "text",
      name: "image",
      message: "Enter image URL:",
      initial: "https://example.com/sample-image.jpg",
    },
  ]);

  const slug = slugify(response.title, { lower: true, remove: /\./ });

  const frontmatter = `---
title: "${response.title}"
excerpt: "${response.excerpt}"
date: "${formatDate(new Date(), "yyyy-MM-dd")}"
category: "${response.category}"
image: "${response.image}"
---`;

  await writeFile(`content/blogs/${slug}.mdx`, frontmatter);
  console.log(`✅ Blog created: content/blogs/${slug}.mdx`);
}

createBlog().catch((error: Error) => {
  console.error("Error creating blog:", error.message);
  process.exit(1);
});
