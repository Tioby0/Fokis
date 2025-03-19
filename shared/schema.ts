import { pgTable, text, serial, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  category: varchar("category", { length: 50 }).notNull(),
  imageUrl: text("image_url"),
  videoUrl: text("video_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const admins = pgTable("admins", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  uid: text("uid").notNull().unique(),
});

export const insertPostSchema = createInsertSchema(posts).omit({ 
  id: true,
  createdAt: true 
});

export const insertAdminSchema = createInsertSchema(admins).omit({ 
  id: true 
});

export type Post = typeof posts.$inferSelect;
export type InsertPost = z.infer<typeof insertPostSchema>;
export type Admin = typeof admins.$inferSelect;
export type InsertAdmin = z.infer<typeof insertAdminSchema>;
