"use server";

import { db } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const CreateOrder = async (data: Prisma.OrderCreateInput) => {
    await db.order.create({ data });
    revalidatePath("/myOrders");
}