"use client";
import { OrderStatus, Prisma } from "@prisma/client";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { formatCurrency } from "@/helpers/price";

interface OrderItemProps {
    order: Prisma.OrderGetPayload<{
        include: {
            restaurant: true,
            products: {
                include: {
                    product: true,
                }
            }
        };
    }>;
};

const getOrderStatusLabel = (status: OrderStatus) => {
    switch (status) {
      case "CANCELED":
        return "Cancelado";
      case "COMPLETED":
        return "Finalizado";
      case "CONFIRMED":
        return "Confirmado";
      case "DELIVERING":
        return "Em Transporte";
      case "PREPARING":
        return "Preparando";
    }
  };

const OrderItem = ({ order }: OrderItemProps) => {

    return ( 
        <Card>
            <CardContent className="p-5">
                <div
                className={`w-fit rounded-full bg-[#EEEEEE] px-2 py-1 text-muted-foreground ${order.status !== "COMPLETED" && "bg-green-500 text-white"}`}
                >
                <span className="block text-xs font-semibold">
                    {getOrderStatusLabel(order.status)}
                </span>
                </div>

                <div className="flex items-center justify-between pt-3">
                <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                    <AvatarImage src={order.restaurant.imageUrl} />
                    </Avatar>

                    <span className="text-sm font-semibold">
                    {order.restaurant.name}
                    </span>
                </div>

                <Button
                    variant="link"
                    size="icon"
                    className="h-5 w-5 text-black"
                    asChild
                >
                    <Link href={`/restaurants/${order.restaurantId}`}>
                    <ChevronRightIcon />
                    </Link>
                </Button>
                </div>

                <div className="py-3">
                <Separator />
                </div>

                <div className="space-y-2">
                {order.products.map((product) => (
                    <div key={product.id} className="flex items-center gap-2">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-muted-foreground">
                        <span className="block text-xs text-white">
                        {product.quantity}
                        </span>
                    </div>
                    <span className="block text-xs text-muted-foreground">
                        {product.product.name}
                    </span>
                    </div>
                ))}
                </div>

                <div className="py-3">
                <Separator />
                </div>

                <div className="flex items-center justify-between">
                <p className="text-sm">{formatCurrency(Number(order.totalPrice))}</p>
                </div>
            </CardContent>
        </Card>
     );
}
 
export default OrderItem;