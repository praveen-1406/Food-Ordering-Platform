import { User } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


export const useGetMyUser=()=>{

    const {getAccessTokenSilently}=useAuth0();

    const getMyUserRequest=async():Promise<User>=>{
        const accessToken = await getAccessTokenSilently();
        const response=await fetch(`${API_BASE_URL}/api/my/user`,{
            method:"GET",
            headers:{
                Authorization:`Bearer ${accessToken}`,
                "Content-type":"application/json",
            }
        })

        if(!response.ok){
            throw new Error("Failed to fetch user");
        }

        return response.json();
    }

    const {
        data:currentUser,
        error,
        isPending,
    }=useQuery({
        queryKey:["fetchCurrentUser"],
        queryFn:getMyUserRequest,
    })

    if(error){
        toast.error(error.toString());
    }

    return {
        currentUser,
        error,
        isPending,
    }
};


type CreateUserRequest = {
    auth0Id: string;
    email: string;
};

export const useCreateMyUser = () => {

    const { getAccessTokenSilently } = useAuth0();

    const createMyUserRequest = async (user: CreateUserRequest) => {
        const accesToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/my/user`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accesToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        })
        if (!response.ok) {
            throw new Error("Failed to create user");
        }
    }

    const {
        mutateAsync: createUser,
        isError,
        isSuccess,
        isPending,
    } = useMutation<void, Error, CreateUserRequest>({ mutationFn: createMyUserRequest });

    // const isLoading = status === "loading";

    return {
        createUser,
        // isLoading,
        isPending,
        isError,
        isSuccess,
    }

};


type UpdateMyUserRequest = {
    name: string;
    addressLine1: string;
    city: string;
    country: string;
};

export const useUpdateMyUser = () => {

    const { getAccessTokenSilently } = useAuth0();

    const updateMyUserRequest = async (formData: UpdateMyUserRequest) => {
        const accesToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/my/user`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${accesToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            throw new Error("Failed to update user")
        }

        return response.json();
    };

    const {
        mutateAsync: updateUser,
        isPending,
        error,
        isSuccess,
        reset,
    } = useMutation({ mutationFn: updateMyUserRequest });

    if(isSuccess){
        toast.success("User Pofile Updated!");
    }

    if(error){
        toast.error(error.toString());
        reset();
    }

    return {
        updateUser,
        isPending,
    }

};

