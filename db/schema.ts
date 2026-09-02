import {
  integer,
  varchar,
  pgTable,
  serial,
  text,
  timestamp,
  jsonb,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name"),
  email: text("email").notNull().unique(),
  credits: integer("credits").default(3),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  projectId: varchar("projectId").notNull().unique(),
  projectName: varchar("projectName").notNull(),
  userEmail: varchar("userEmail").notNull(),
  thumbnail: text("thumbnail"),

  createdAt: timestamp("craeteed_at").defaultNow().notNull(),
});

export const WhiteBoardData = pgTable("whiteboardData", {
  id: serial("id").primaryKey(),
  projectId: varchar("projectid").notNull().unique().references(() => projects.projectId),
  elements: jsonb("elements"),
  appState: jsonb("appState"),
  files: jsonb("files"),

  updatedAt: timestamp("updatedAt").defaultNow().notNull()
})

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
