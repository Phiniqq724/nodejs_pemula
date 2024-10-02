import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import { BASE_URL } from "../global";
import path from "path";

const prisma = new PrismaClient({ errorFormat: "pretty" });

export const getUser = async (request: Request, response: Response) => {
  try {
    const { search } = request.query;
    const allUsers = await prisma.user.findMany({
      where: { name: { contains: search?.toString() || "" } },
    });

    return response
      .json({
        status: true,
        data: allUsers,
        message: "Users has retrieved successfully",
      })
      .status(200);
  } catch (error) {
    return response
      .json({ status: false, message: `There is an error. ${error}` })
      .status(400);
  }
};

export const getUserID = async (request: Request, response: Response) => {
  try {
    const { idUser } = request.params;
    const findUser = await prisma.user.findFirst({
      where: { idUser: Number(idUser) },
    });
    if (!findUser) {
      return response.json({ status: false, message: "User not found" });
    }

    return response
      .json({
        status: true,
        data: findUser,
        message: "User has retrieved successfully",
      })
      .status(200);
  } catch (error) {
    return response
      .json({ status: false, message: `There is an error. ${error}` })
      .status(400);
  }
};

export const createUser = async (request: Request, response: Response) => {
  try {
    const { name, email, password, role } = request.body;
    const uuid = uuidv4();
    const newUser = await prisma.user.create({
      data: {
        uuid,
        name,
        email,
        password,
        role,
      },
    });

    return response
      .json({
        status: true,
        data: newUser,
        message: "User has created successfully",
      })
      .status(201);
  } catch (error) {
    return response
      .json({ status: false, message: `There is an error. ${error}` })
      .status(400);
  }
};

export const updateUser = async (request: Request, response: Response) => {
  try {
    const { idUser } = request.params;
    const { name, email, password, role } = request.body;
    const updateUser = await prisma.user.update({
      where: { idUser: Number(idUser) },
      data: {
        name,
        email,
        password,
        role,
      },
    });

    return response
      .json({
        status: true,
        data: updateUser,
        message: "User has updated successfully",
      })
      .status(200);
  } catch (error) {
    return response
      .json({ status: false, message: `There is an error. ${error}` })
      .status(400);
  }
};

export const deleteUser = async (request: Request, response: Response) => {
  try {
    const { idUser } = request.params;
    const deleteUser = await prisma.user.delete({
      where: { idUser: Number(idUser) },
    });

    return response
      .json({
        status: true,
        data: deleteUser,
        message: "User has deleted successfully",
      })
      .status(200);
  } catch (error) {
    return response
      .json({ status: false, message: `There is an error. ${error}` })
      .status(400);
  }
};

export const profileUser = async (request: Request, response: Response) => {
  try {
    const { idUser } = request.params;
    const findUser = await prisma.user.findFirst({
      where: { idUser: Number(idUser) },
    });
    if (!findUser) {
      return response.json({ status: false, message: "User not found" });
    }

    let filename = findUser.profilePicture;

    if (request.file) {
      filename = request.file.filename;
      let path = `${BASE_URL}/public/profile-picture/${filename}`;
      let exist = fs.existsSync(path);
      if (exist && findUser.profilePicture !== ``) {
        fs.unlinkSync(path);
      }
    }

    const updateUser = await prisma.user.update({
      where: { idUser: Number(idUser) },
      data: {
        profilePicture: filename,
      },
    });

    return response
      .json({
        status: true,
        data: updateUser,
        message: "User has retrieved successfully",
      })
      .status(200);
  } catch (error) {
    return response
      .json({ status: false, message: `There is an error. ${error}` })
      .status(400);
  }
};
