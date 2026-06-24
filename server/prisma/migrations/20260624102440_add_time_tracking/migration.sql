-- CreateTable
CREATE TABLE "TimeLog" (
    "id" TEXT NOT NULL,
    "description" TEXT,
    "minutes" INTEGER NOT NULL,
    "taskId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TimeLog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TimeLog" ADD CONSTRAINT "TimeLog_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimeLog" ADD CONSTRAINT "TimeLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
