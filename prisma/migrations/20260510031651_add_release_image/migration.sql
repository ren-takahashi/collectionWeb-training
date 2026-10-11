-- CreateTable
CREATE TABLE "release_image" (
    "id" SERIAL NOT NULL,
    "release_id" INTEGER NOT NULL,
    "image_path" TEXT NOT NULL,
    "display_order" INTEGER NOT NULL,
    "alt_text" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "release_image_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "release_image_release_id_idx" ON "release_image"("release_id");

-- AddForeignKey
ALTER TABLE "release_image" ADD CONSTRAINT "release_image_release_id_fkey" FOREIGN KEY ("release_id") REFERENCES "release"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
