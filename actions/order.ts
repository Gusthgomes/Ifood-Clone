"use server";

import { db } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const CreateOrder = async (data: Prisma.OrderCreateInput) => {
    return db.order.create({ data });
}