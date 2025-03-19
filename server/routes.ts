import type { Express } from "express";
import { createServer, type Server } from "http";
import { db } from "./db";
import { posts, type Post } from "@shared/schema";
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

  const httpServer = createServer(app);
  return httpServer;
}