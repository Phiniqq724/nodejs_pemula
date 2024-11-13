import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { v4 } from "uuid";

const prisma = new PrismaClient({ errorFormat: "pretty" });

export const getOrders = async (request: Request, response: Response) => {
  try {
    const { search } = request.query;

    const allOrders = await prisma.order.findMany({
      where: {
        OR: [
          { customer: { contains: search?.toString() || "" } },
          { table_number: parseInt(search?.toString() || "0") },
        ],
      },
      orderBy: {
        createdAt: "desc",
      },
      include: { orderLists: true },
    });
    return response
      .json({
        status: true,
        data: allOrders,
        message: "Orders has retrieved successfully",
      })
      .status(200);
  } catch (error) {
    return response
      .json({
        status: false,
        message: `There is an error. ${error}`,
      })
      .status(400);
  }
};

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { customer, table_number, payment_method, status, orderlists } =
      req.body;
    const user = req.body.user;
    const uuid = v4();
    /**
     * assume that "orderlists" is an array of object that has keys:
     * menuId, quantity, note
     * */

    /** loop details of order to check menu and count the total price */
    let total_price = 0;
    for (let index = 0; index < orderlists.length; index++) {
      const { menuId } = orderlists[index];
      const detailMenu = await prisma.menu.findFirst({
        where: {
          idMenu: menuId,
        },
      });
      if (!detailMenu)
        return res.status(200).json({
          status: false,
          message: `Menu with id ${menuId} is not found`,
        });
      total_price += detailMenu.price * orderlists[index].quantity;
    }
    const newOrder = await prisma.order.create({
      data: {
        uuid,
        customer,
        table_number,
        total_price,
        payment_method,
        status,
        idUser: user.idUser,
      },
    });

    /** loop details of Order to save in database */
    for (let index = 0; index < orderlists.length; index++) {
      const uuid = v4();
      const { menuId, quantity, note } = orderlists[index];
      await prisma.orderList.create({
        data: {
          uuid,
          idOrder: newOrder.idOrder,
          idMenu: Number(menuId),
          quantity: Number(quantity),
          note,
        },
      });
    }
    return res
      .json({
        status: true,
        data: newOrder,
        message: `New Order has created`,
      })
      .status(200);
  } catch (error) {
    return res
      .json({
        status: false,
        message: `There is an error. ${error}`,
      })
      .status(400);
  }
};

export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const { idOrder } = req.params;
    const findOrder = await prisma.order.findFirst({
      where: { idOrder: Number(idOrder) },
    });
    if (!findOrder) {
      return res.json({ status: false, message: "Order not found" });
    }

    let deleteOrderList = await prisma.orderList.deleteMany({
      where: {
        idOrder: Number(idOrder),
      },
    });

    let deleteOrder = await prisma.order.delete({
      where: {
        idOrder: Number(idOrder),
      },
    });

    return res
      .json({
        status: true,
        data: { deleteOrder, deleteOrderList },
        message: "Order has deleted successfully",
      })
      .status(200);
  } catch (error) {
    return res
      .json({
        status: false,
        message: `There is an error. ${error}`,
      })
      .status(400);
  }
};

export const statusOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const findOrder = await prisma.order.findFirst({
      where: { idOrder: Number(id) },
    });
    if (!findOrder) {
      return res.json({ status: false, message: "Order not found" });
    }

    let updateOrder = await prisma.order.update({
      where: { idOrder: Number(id) },
      data: {
        status: status,
      },
    });

    return res
      .json({
        status: true,
        data: updateOrder,
        message: "Order status has updated successfully",
      })
      .status(200);
  } catch (error) {
    return res
      .json({
        status: false,
        message: `There is an error. ${error}`,
      })
      .status(400);
  }
};
