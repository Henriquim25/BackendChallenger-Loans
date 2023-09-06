-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "age" INTEGER NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "income" INTEGER NOT NULL,
    "location" VARCHAR(2) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
