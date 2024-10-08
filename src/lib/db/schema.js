import {
  pgTable,
  integer,
  pgEnum,
  text,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
export const userSystemEnum = pgEnum("user_system_enum", ["system", "user"]);

export const chats = pgTable("chats", {
  id: serial("id").primaryKey(),
  pdfName: text("pdf_name").notNull(),
  pdfUrl: text("pdf_url").notNull(),
  userId: varchar("user_id", { length: 256 }).notNull(),
  fileKey: text("file_key").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  chatId: integer("chat_id")
    .references(() => chats.id, { onDelete: "cascade" }) // foreign key reference to chats table with cascade delete on delete
    .notNull(),
  content: text("content").notNull(),
  role: userSystemEnum("role").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
