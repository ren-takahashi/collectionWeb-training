-- CreateTable
CREATE TABLE "search_log" (
    "id" SERIAL NOT NULL,
    "query" TEXT NOT NULL,
    "hit_count" INTEGER NOT NULL,
    "searched_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "search_log_pkey" PRIMARY KEY ("id")
);
