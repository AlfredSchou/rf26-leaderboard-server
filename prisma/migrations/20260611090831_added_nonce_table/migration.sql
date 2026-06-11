-- CreateTable
CREATE TABLE "Score" (
    "id" SERIAL NOT NULL,
    "tag" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Score_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Nonce" (
    "nonce" TEXT NOT NULL,

    CONSTRAINT "Nonce_pkey" PRIMARY KEY ("nonce")
);
