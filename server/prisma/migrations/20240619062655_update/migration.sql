/*
  Warnings:

  - The primary key for the `document` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "document" DROP CONSTRAINT "document_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "document_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "document_id_seq";
