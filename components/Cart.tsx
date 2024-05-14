"use client";

import { CartContext } from "@/context/cart";
import { useContext, useState } from "react";
import CartItem from "./CartItem";
import { Card, CardContent } from "./ui/card";
import { formatCurrency } from "@/helpers/price";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { CreateOrder } from "@/actions/order";
import { OrderStatus } from "@prisma/client";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";
import { 
    AlertDialog, 
    AlertDialogAction, 
    AlertDialogCancel, 
    AlertDialogContent, 
    AlertDialogDescription, 
    AlertDialogFooter, 
    AlertDialogHeader, 
    AlertDialogTitle 
} from "./ui/alert-dialog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface CartProps {
    setIsOpen: (isOpen: boolean) => void;
};

const Cart = ({setIsOpen}: CartProps) => {

    const router = useRouter();

    const [isSubmitLoading, setIsSubmitLoading] = useState(false);

    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

    const {data} = useSession();

    const { products, subtotalPrice, totalDiscount, totalPrice, clearCart } = useContext(CartContext);

    const handleFinishOrderClick = async () => {
        if (!data?.user) return;

        const restaurant = products[0].restaurant;

        try {
            setIsSubmitLoading(true);

            await CreateOrder({
                subtotalPrice,
                totalDiscount,
                totalPrice,
                deliveryFee: restaurant.deliveryFee,
                deliveryTimeMinutes: restaurant.deliveryTimeMinutes,
                restaurant: {
                  connect: { id: restaurant.id },
                },
                status: OrderStatus.CONFIRMED,
                user: {
                  connect: { id: data.user.id },
                },
                products: {
                    createMany: {
                        data: products.map((product) => ({
                            productId: product.id,
                            quantity: product.quantity,
                        })),
                    },
                },
            });

            clearCart();
            setIsOpen(false);

            toast("Pedido finalizado com sucesso! 🎉", {
                description: "Acompanhar o status do pedido na aba de pedidos.",
                action: {
                    label: "Meus pedidos",
                    onClick: () => {
                        router.push("/myOrders");
                    },
                },
            });
        } catch (error) {
            console.log(error);
        } finally {
            setIsSubmitLoading(false);
        };
    };

    return ( 
        <>
            <div className="flex h-full flex-col py-5">
                <>
                    { products.length > 0 && (
                        <div className="flex-auto space-y-4">
                            { products.map( product => (
                                <CartItem
                                    key={product.id}
                                    cartProduct={product}
                                />
                            ))}
                        </div>
                    )}
                </>

                <div className="mt-6">
                    <>
                        {products.length > 0 ? (
                            <Card>
                            <CardContent className="p-5 space-y-4">
                                <div className="flex justify-between items-center text-xs">
                                    <span className="text-xs text-muted-foreground">Subtotal</span>
                                    <span>{ formatCurrency(subtotalPrice)}</span>
                                </div>
        
                                <Separator/>
                                
                                <div className="flex justify-between items-center text-xs">
                                    <span className="text-xs text-muted-foreground">Entrega</span>
                                    <span>
                                        {products.length > 0 && products[0]?.restaurant ? (
                                            Number(products[0].restaurant.deliveryFee) === 0 ? (
                                                <span className="uppercase text-primary">Grátis</span>
                                            ) : (
                                                formatCurrency(Number(products[0].restaurant.deliveryFee))
                                            )
                                        ) : (
                                            <span className="text-xs text-muted-foreground">N/A</span>
                                        )}
                                    </span>
                                </div>
        
                                <Separator/>
        
                                <div className="flex justify-between items-center text-xs">
                                    <span className="text-xs text-muted-foreground">Desconto</span>
                                    <span>{ formatCurrency(totalDiscount)}</span>
                                </div>
        
                                <Separator/>
        
                                <div className="flex justify-between items-center text-xs font-semibold">
                                    <span className="text-xs">Total</span>
                                    <span>{ formatCurrency(totalPrice)}</span>
                                </div>
        
                                <Separator/>
                            </CardContent>
                        </Card>
                        ) : (
                            <p>Sua sacola está vazia 😭</p>
                        ) }
                    </>
                </div>

                {products.length > 0 && (
                    <Button 
                        className="w-full mt-6" 
                        onClick={() => setIsConfirmDialogOpen(true)}
                        disabled={isSubmitLoading}
                    >
                        Finalizar pedido
                    </Button>
                )}
            </div>

            <AlertDialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle>Deseja finalizar o seu pedido?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Ao finalizar o pedido você concorda com os termos e condições do estabelecimento.
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                        onClick={handleFinishOrderClick}
                        disabled={isSubmitLoading}
                        >
                        {isSubmitLoading && (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Finalizar
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

        </>
    );
}

export default Cart;