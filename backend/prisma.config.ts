import { defineConfig } from "prisma/config";
import Database from "better-sqlite3";

export default defineConfig({
  earlyAccess: true,
  schema: "prisma/schema.prisma",
  migrate: {
    async adapter() {
      const { PrismaBetterSQLite3 } = await import("@prisma/adapter-better-sqlite3");
      const db = new Database("./dev.db");
      return new PrismaBetterSQLite3(db);
    },
  },
});
