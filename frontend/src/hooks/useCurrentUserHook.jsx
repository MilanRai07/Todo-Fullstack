import { useQuery } from "@tanstack/react-query";
import { authCheck } from "../service/users/authCheck";

export const useCurrentUser = () => {
    return useQuery({
        queryKey: ["currentUser"],
        queryFn: authCheck,
    });
};