import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import { BASE_URL } from "../global";

const prisma = new PrismaClient({ errorFormat: "pretty" });

export const getMenu = async (request: Request, response: Response) => {
  try {
    const { search } = request.query;
    const allMenus = await prisma.menu.findMany({
      where: { name: { contains: search?.toString() || "" } },
    });

    return response
      .json({
        status: true,
        data: allMenus,
        message: "Menus has retrieved successfully",
      })
      .status(200);
  } catch (error) {
    return response
      .json({ status: false, message: `There is an error. ${error}` })
      .status(400);
  }
};

export const getMenuID = async (request: Request, response: Response) => {
  try {
    const { idMenu } = request.params;
    const findMenu = await prisma.menu.findFirst({
      where: { idMenu: Number(idMenu) },
    });
    if (!findMenu) {
      return response.json({ status: false, message: "Menu not found" });
    }

    return response
      .json({
        status: true,
        data: findMenu,
        message: "Menu has retrieved successfully",
      })
      .status(200);
  } catch (error) {
    return response
      .json({ status: false, message: `There is an error. ${error}` })
      .status(400);
  }
};

export const createMenu = async (request: Request, response: Response) => {
  try {
    const { name, price, category, description } = request.body;
    const uuid = uuidv4();
    const newMenu = await prisma.menu.create({
      data: {
        uuid,
        name,
        price: Number(price),
        category,
        description,
      },
    });

    return response
      .json({
        status: true,
        data: newMenu,
        message: "Menu has created successfully",
      })
      .status(201);
  } catch (error) {
    return response
      .json({ status: false, message: `There is an error. ${error}` })
      .status(400);
  }
};

export const updateMenu = async (request: Request, response: Response) => {
  try {
    const { idMenu } = request.params;
    const { name, price, category, description } = request.body;
    const findMenu = await prisma.menu.findFirst({
      where: { idMenu: Number(idMenu) },
    });
    if (!findMenu) {
      return response.json({ status: false, message: "Menu not found" });
    }
    const updatedMenu = await prisma.menu.update({
      where: { idMenu: Number(idMenu) },
      data: {
        name: name || findMenu.name,
        price: Number(price) ? price : findMenu.price,
        category: category || findMenu.category,
        description: description || findMenu.description,
      },
    });

    return response
      .json({
        status: true,
        data: updatedMenu,
        message: "Menu has updated successfully",
      })
      .status(200);
  } catch (error) {
    return response
      .json({ status: false, message: `There is an error. ${error}` })
      .status(400);
  }
};

export const deleteMenu = async (request: Request, response: Response) => {
  try {
    const { idMenu } = request.params;
    const findMenu = await prisma.menu.findFirst({
      where: { idMenu: Number(idMenu) },
    });
    if (!findMenu) {
      return response.json({ status: false, message: "Menu not found" });
    }
    let path = `${BASE_URL}/public/menu-picture/${findMenu.image}`;
    let exist = fs.existsSync(path);
    if (findMenu.image !== ``) {
      fs.unlinkSync(path);
    }

    await prisma.menu.delete({ where: { idMenu: Number(idMenu) } });

    return response
      .json({
        status: true,
        message: "Menu has deleted successfully",
        exist: exist,
        path: path,
      })
      .status(200);
  } catch (error) {
    return response
      .json({ status: false, message: `There is an error. ${error}` })
      .status(400);
  }
};

export const changePicture = async (request: Request, response: Response) => {
  try {
    const { idMenu } = request.params;
    const findMenu = await prisma.menu.findFirst({
      where: { idMenu: Number(idMenu) },
    });
    if (!findMenu) {
      return response.json({ status: false, message: "Menu not found" });
    }
    let filename = findMenu.image;

    if (request.file) {
      filename = request.file.filename;
      let path = `${BASE_URL}/../public/menu-picture/${filename}`;
      let exist = fs.existsSync(path);
      // Filter if file not exist
      if (exist && findMenu.image !== ``) {
        fs.unlinkSync(path);
      }
    }

    const updatedMenu = await prisma.menu.update({
      where: { idMenu: Number(idMenu) },
      data: {
        image: filename,
      },
    });

    return response
      .json({
        status: true,
        data: updatedMenu,
        message: "Menu picture has updated successfully",
      })
      .status(200);
  } catch (error) {
    return response
      .json({ status: false, message: `There is an error. ${error}` })
      .status(400);
  }
};
