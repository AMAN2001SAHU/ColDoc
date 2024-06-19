-- CreateTable
CREATE TABLE "document" (
    "id" SERIAL NOT NULL,
    "data" JSONB NOT NULL,

    CONSTRAINT "document_pkey" PRIMARY KEY ("id")
);
