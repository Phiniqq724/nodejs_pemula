import { Request } from "express";
import multer from "multer";
import { BASE_URL } from "../global";

const storage = multer.diskStorage({
  destination: (
    request: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ) => {
    cb(null, `${BASE_URL}/public/menu-picture`);
  },
  filename: (
    request: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void
  ) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const uploadFile = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
});

export default uploadFile;
