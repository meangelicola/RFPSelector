import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const documentSections = pgTable("document_sections", {
  id: serial("id").primaryKey(),
  sectionId: text("section_id").notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  isHighlighted: boolean("is_highlighted").default(false),
  tabCategory: text("tab_category").notNull(),
  pageNumber: integer("page_number").notNull(),
});

export const documentHighlights = pgTable("document_highlights", {
  id: serial("id").primaryKey(),
  sectionId: text("section_id").notNull(),
  tabCategory: text("tab_category").notNull(),
  highlightedParagraphs: jsonb("highlighted_paragraphs").notNull().$type<string[]>(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertDocumentSectionSchema = createInsertSchema(documentSections).omit({
  id: true,
});

export const insertDocumentHighlightSchema = createInsertSchema(documentHighlights).omit({
  id: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertDocumentSection = z.infer<typeof insertDocumentSectionSchema>;
export type DocumentSection = typeof documentSections.$inferSelect;

export type InsertDocumentHighlight = z.infer<typeof insertDocumentHighlightSchema>;
export type DocumentHighlight = typeof documentHighlights.$inferSelect;
