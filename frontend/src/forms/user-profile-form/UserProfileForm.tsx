import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { User } from "@/types";
import { useEffect } from "react";



const formSchema = z.object({
    email: z.string().optional(),
    name: z.string().trim().min(1, "Name is required"),
    addressLine1: z.string().trim().min(1, "Address Line 1 is required"),
    city: z.string().trim().min(1, "City is required"),
    country: z.string().trim().min(1, "Country is required"),
});

type UserFormData = z.infer<typeof formSchema>;



type Props = {
    currentUser:User,
    onSave: (userProfileData: UserFormData) => void;
    isLoading: boolean;
}


const UserProfileForm = ({ currentUser, onSave, isLoading }: Props) => {
    
    const form = useForm<UserFormData>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            email:currentUser.email,
            name:currentUser.name || "",
            addressLine1:currentUser.addressLine1 || "",
            city:currentUser.city || "",
            country:currentUser.country || "",
        },
    });

    useEffect(()=>{
        form.reset(currentUser);
    },[currentUser,form])


    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSave)}
                className="space-y-4 bg-gray-50 rounded-lg p-5 md:p-10"
            >
                <div>
                    <h2 className="text-2xl font-bold">User Profile Form</h2>
                    <FormDescription>
                        View and change your profile information here
                    </FormDescription>
                </div>
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input {...field} disabled className="bg-white"/>
                            </FormControl>
                        </FormItem>
                    )} />

                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input {...field} className="bg-white" />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )} />

                <div className="flex flex-col md:flex-row gap-4">
                    <FormField
                        control={form.control}
                        name="addressLine1"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel>Address Line 1</FormLabel>
                                <FormControl>
                                    <Input {...field} className="bg-white" />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )} />

                    <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel>City</FormLabel>
                                <FormControl>
                                    <Input {...field} className="bg-white" />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )} />

                    <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel>Country</FormLabel>
                                <FormControl>
                                    <Input {...field} className="bg-white" />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )} />
                </div>

                {isLoading ? (
                    <LoadingButton />
                ) : (
                    <Button type="submit" className="bg-orange-500">
                        Submit
                    </Button>
                )}

            </form>
        </Form>
    )
}


export default UserProfileForm