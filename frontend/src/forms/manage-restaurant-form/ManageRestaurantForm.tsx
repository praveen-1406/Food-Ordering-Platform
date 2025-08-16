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
    imageFile: z.instanceof(File, { message: "Image is required" }),
})

type RestaurantFormData = z.infer<typeof formSchema>;


type Props = {
    onSave: (restaurantFormData: RestaurantFormData) => void;
    isLoading: boolean;
};

const ManageRestaurantForm = ({ onSave, isLoading }: Props) => {

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            restaurantName:"",
            city:"",
            country: "",
            deliveryPrice:"",
            estimatedDeliveryTime:"",
            cuisines: [],
            menuItems: [{ name: "", price: 0 }],
        }
    })

    const onSubmit = (formDataJson: RestaurantFormData) => {
        // TODP convert formDataJson to a new FormData object.
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 bg-gray-50 p-10 rounded-lg "
            >
                <DetailsSection />
                <Separator/>
                <CuisinesSection/>
                <Separator/>
                <MenuSection/>
                <Separator/>
                <ImageSection/>

                {isLoading ? <LoadingButton/>:<Button type="submit">Submit</Button>}
            </form>
        </Form>
    )


};

export default ManageRestaurantForm;
