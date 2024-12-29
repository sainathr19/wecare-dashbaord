-- CreateTable
CREATE TABLE "Profiles" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "Profiles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profiles_email_key" ON "Profiles"("email");
