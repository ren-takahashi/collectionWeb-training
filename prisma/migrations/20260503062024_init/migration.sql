-- CreateTable
CREATE TABLE "series" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "sort_order" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "series_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "release" (
    "id" SERIAL NOT NULL,
    "series_id" INTEGER NOT NULL,
    "number_in_series" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "release_year" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "release_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pokemon" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pokemon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "release_pokemon" (
    "id" SERIAL NOT NULL,
    "release_id" INTEGER NOT NULL,
    "pokemon_id" INTEGER NOT NULL,
    "display_order" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "release_pokemon_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "series_name_key" ON "series"("name");

-- CreateIndex
CREATE UNIQUE INDEX "release_series_id_number_in_series_key" ON "release"("series_id", "number_in_series");

-- CreateIndex
CREATE UNIQUE INDEX "pokemon_name_key" ON "pokemon"("name");

-- CreateIndex
CREATE INDEX "release_pokemon_release_id_idx" ON "release_pokemon"("release_id");

-- CreateIndex
CREATE INDEX "release_pokemon_pokemon_id_idx" ON "release_pokemon"("pokemon_id");

-- CreateIndex
CREATE UNIQUE INDEX "release_pokemon_release_id_pokemon_id_key" ON "release_pokemon"("release_id", "pokemon_id");

-- AddForeignKey
ALTER TABLE "release" ADD CONSTRAINT "release_series_id_fkey" FOREIGN KEY ("series_id") REFERENCES "series"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "release_pokemon" ADD CONSTRAINT "release_pokemon_release_id_fkey" FOREIGN KEY ("release_id") REFERENCES "release"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "release_pokemon" ADD CONSTRAINT "release_pokemon_pokemon_id_fkey" FOREIGN KEY ("pokemon_id") REFERENCES "pokemon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
