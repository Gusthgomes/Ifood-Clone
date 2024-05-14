import Header from "@/components/Header";
import OrderItem from "@/components/OrderItem";
import { authOption } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const MyOrdersPage = async () => {
    const session = await getServerSession(authOption);

    if (!session) {
        return redirect("/");
    };

    const orders = await db.order.findMany({
        where: {
            userId: session.user.id,
        },
        include: {
            restaurant: true,
            products: {
                include: {
                    product: true,
                }
            },
        },
    });

    return ( 
        <>
            <Header/>
            <div className="py-6 px-5 space-y-2">
                <h2 className="font-semibold">Meus pedidos</h2>
                <div className="space-y-4">
                    {orders.map((order) => (
                        <OrderItem key={order.id} order={order}/>
                    ))}
                </div>
            </div>
        </>
     );
}
 
export default MyOrdersPage;