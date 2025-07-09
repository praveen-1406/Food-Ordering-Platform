import { useMutation } from "@tanstack/react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type CreateUserRequest = {
    auth0Id: string;
    email: string;
};

export const useCreateMyUser = () => {
    const createMyUserRequest = async (user: CreateUserRequest) => {
        const response = await fetch(`${API_BASE_URL}/api/my/user`, {
            method: "POST",
            headers: {
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
    } = useMutation<void, Error, CreateUserRequest>({mutationFn:createMyUserRequest})

    // const isLoading = status === "loading";

    return {
        createUser,
        // isLoading,
        isPending,
        isError,
        isSuccess,
    }

}