import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod"
import DetailsSection from "./DetailsSection";
import { Separator } from "@/components/ui/separator";
import CuisinesSection from "./CuisinesSection";
import MenuSection from "./MenuSection";
import ImageSection from "./ImageSection";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { Restaurant } from "@/types";
import { useEffect } from "react";


const formSchema = z.object({
    restaurantName: z.string().trim().min(1, "Restaurant name is required"),
    city: z.string().trim().min(1, "City is required"),
    country: z.string().trim().min(1, "Restaurant name is required"),
    deliveryPrice: z.coerce.number({
        error: (issue) =>
            issue.input === undefined
                ? "Delviery Price is required"
                : issue.code === "invalid_type"
                    ? "Must be a valid number"
                    : undefined
    }),
    estimatedDeliveryTime: z.coerce.number({
        error: (issue) =>
            issue.input === undefined
                ? "Estimated Delivery Time is required"
                : issue.code === "invalid_type"
                    ? "Must be a vlid number"
                    : undefined
    }),
    cuisines: z.array(z.string()).nonempty({ message: "Please selecet atleast one items" }),
    menuItems: z.array(z.object({
        name: z.string().trim().min(1, "Name is required"),
        price: z.coerce.number().min(1, "Price is required"),
    })),
    imageUrl:z.string().optional(),
    imageFile: z.instanceof(File, { message: "Image is required" }).optional(),
}).refine((data)=>data.imageUrl || data.imageFile,{
    message:"Either image URL or image file must bew provided",
    path:["imageFile"],
})

type RestaurantFormData = z.infer<typeof formSchema>;


type Props = {
    restaurant?: Restaurant;
    onSave: (restaurantFormData: FormData) => void;
    isLoading: boolean;
};

const ManageRestaurantForm = ({ onSave, isLoading, restaurant }: Props) => {

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            restaurantName: "",
            city: "",
            country: "",
            deliveryPrice: "",
            estimatedDeliveryTime: "",
            cuisines: [],
            menuItems: [{ name: "", price: 0 }],
        }
    })

    useEffect(() => {
        if (!restaurant) {
            return;
        }

        const deliveryPriceFormatted = parseInt((restaurant.deliveryPrice / 100).toFixed(2));
        const menuItemsFormatted = restaurant.menuItems.map((item) => ({
            ...item,
            price: parseInt((item.price / 100).toFixed(2)),
        }));

        const updatedRestaurant = {
            ...restaurant,
            deliveryPrice: deliveryPriceFormatted,
            menuItems: menuItemsFormatted,
        }

        form.reset(updatedRestaurant);

    }, [form, restaurant])


    const onSubmit = (formDataJson: RestaurantFormData) => {
        const formData = new FormData();

        formData.append("restaurantName", formDataJson.restaurantName);
        formData.append("city", formDataJson.city);
        formData.append("country", formDataJson.country);
        formData.append("deliveryPrice", (formDataJson.deliveryPrice * 100).toString());
        formData.append("estimatedDeliveryTime", formDataJson.estimatedDeliveryTime.toString());
        formDataJson.cuisines.forEach((cuisine, index) => {
            formData.append(`cuisines[${index}]`, cuisine);
        });
        formDataJson.menuItems.forEach((menuItem, index) => {
            formData.append(`menuItems[${index}][name]`, menuItem.name)
            formData.append(`menuItems[${index}][price]`, (menuItem.price * 100).toString())
        });

        if(formDataJson.imageFile){
            formData.append("imageFile", formDataJson.imageFile);
        }

        onSave(formData);

    };


    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 bg-gray-50 p-10 rounded-lg mx-9"
            >

                <DetailsSection />
                <Separator />
                <CuisinesSection />
                <Separator />
                <MenuSection />
                <Separator />
                <ImageSection />

                {isLoading ? <LoadingButton /> : <Button type="submit">Submit</Button>}

            </form>
        </Form>
    )


};

export default ManageRestaurantForm;
