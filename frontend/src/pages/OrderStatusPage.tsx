import { useGetMyOrders } from "@/api/OrderApi"
import OrderStatusDetails from "@/components/OrderStatusDetails";
import OrderStatusHeader from "@/components/OrderStatusHeader";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const OrderStatusPage = () => {

    const { orders, isPending } = useGetMyOrders();

    if (isPending) {
        return "Loading...";
    }

    if (!orders || orders.length === 0) {
        return "No Orders found";
    }

    return (
        <div className="space-y-10 mx-4 md:mx-20">
            {orders.reverse().map((order) => (
                <div className="space-y-10 bg-gray-50 p-10 rounded-lg">
                    <OrderStatusHeader order={order} />
                    <div className="grid gap-10 md:grid-cols-2">
                        <OrderStatusDetails order={order} />
                        <AspectRatio ratio={16 / 5}>
                            <img
                                src={order.restaurant.imageUrl}
                                className="rounded-md object-cover h-full w-full"
                            />
                        </AspectRatio>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default OrderStatusPage
