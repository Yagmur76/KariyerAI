-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MatchingScore" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "score" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    "jobId" INTEGER NOT NULL,
    CONSTRAINT "MatchingScore_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "MatchingScore_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_MatchingScore" ("createdAt", "id", "jobId", "score", "userId") SELECT "createdAt", "id", "jobId", "score", "userId" FROM "MatchingScore";
DROP TABLE "MatchingScore";
ALTER TABLE "new_MatchingScore" RENAME TO "MatchingScore";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
