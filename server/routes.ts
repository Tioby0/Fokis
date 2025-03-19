import type { Express } from "express";
import { createServer, type Server } from "http";
import { db } from "./db";
import { posts, insertPostSchema, type Post } from "@shared/schema";
import { eq } from "drizzle-orm";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all posts
  app.get("/api/posts", async (_req, res) => {
    try {
      const allPosts = await db.select().from(posts);
      res.json(allPosts);
    } catch (error) {
      res.status(500).json({ message: "Error fetching posts" });
    }
  });

  // Get posts by category
  app.get("/api/posts/:category", async (req, res) => {
    try {
      const category = req.params.category;
      const categoryPosts = await db
        .select()
        .from(posts)
        .where(eq(posts.category, category));
      res.json(categoryPosts);
    } catch (error) {
      res.status(500).json({ message: "Error fetching category posts" });
    }
  });

  // Create new post
  app.post("/api/posts", async (req, res) => {
    try {
      const postData = insertPostSchema.parse(req.body);
      const [newPost] = await db.insert(posts).values(postData).returning();
      res.status(201).json(newPost);
    } catch (error) {
      res.status(400).json({ message: error instanceof Error ? error.message : "Invalid post data" });
    }
  });

  // Update post
  app.patch("/api/posts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const postData = insertPostSchema.partial().parse(req.body);
      const [updatedPost] = await db
        .update(posts)
        .set(postData)
        .where(eq(posts.id, id))
        .returning();
      res.json(updatedPost);
    } catch (error) {
      res.status(400).json({ message: error instanceof Error ? error.message : "Invalid post data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}