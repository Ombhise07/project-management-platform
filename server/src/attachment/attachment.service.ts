import { prisma } from "../config/prisma.js";

export const createAttachment = async (
  userId: string,
  taskId: string,
  file: Express.Multer.File
) => {
  return prisma.attachment.create({
    data: {
      fileName: file.filename,

      originalName: file.originalname,

      mimeType: file.mimetype,

      fileSize: file.size,

      filePath: file.path,

      taskId,

      uploadedById: userId,
    },
  });
};

export const getTaskAttachments = async (taskId: string) => {
  return prisma.attachment.findMany({
    where: {
      taskId,
    },

    orderBy: {
      createdAt: "desc",
    },
  });
};
