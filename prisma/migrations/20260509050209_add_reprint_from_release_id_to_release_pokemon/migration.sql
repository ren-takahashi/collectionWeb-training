-- AlterTable
ALTER TABLE "release_pokemon" ADD COLUMN     "reprint_from_release_id" INTEGER;

-- AddForeignKey
ALTER TABLE "release_pokemon" ADD CONSTRAINT "release_pokemon_reprint_from_release_id_fkey" FOREIGN KEY ("reprint_from_release_id") REFERENCES "release"("id") ON DELETE SET NULL ON UPDATE CASCADE;
