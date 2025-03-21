import useSWR, { SWRResponse } from "swr";
import {
  getCsrf,
  requestLogin,
  requestLogOut,
  requestMe,
} from "@/services/authService";
import { FormLoginData, UserLoggedType } from "@/types/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export type useAuthProps = {
  middleware: string;
  redirectIfAuthenticated: string;
};

export const useAuth = ({
  middleware,
  redirectIfAuthenticated,
}: useAuthProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const router = useRouter();

  const meTest = async (): Promise<UserLoggedType> => {
    return requestMe()
      .then((resp) => resp)
      .catch((err) => err);
  };

  const login = async (data: FormLoginData): Promise<void> => {
    setIsLoading(true);
    setErrors({});

    await getCsrf();

    try {
      const response = await requestLogin(data);
      mutate();
      setIsLogged(true);
    } catch (err: any) {
      if (err.status === 422) setErrors(err.data.errors);

      throw err.data.errors;
    } finally {
      setIsLoading(false);
    }
  };

  const logOut = async (): Promise<void> => {
    if (!errorLogin) {
      try {
        await requestLogOut();
        window.location.href = "/login";
      } catch (err) {
        throw err;
      } finally {
        setIsLogged(false);
      }
    }
  };

  const {
    data: userLogged,
    error: errorLogin,
    mutate,
    isLoading: isFetchingUser,
  }: SWRResponse<UserLoggedType, Error> = useSWR<UserLoggedType, Error>(
    "user/me",
    meTest,
    {
      // refreshInterval: 5000,
      // onSuccess: (data, key, config) => {
      // 	setIsMounted(true);
      // },
      // onError: (err, key, config) => {
      // 	console.log("Error", err);
      // 	setIsMounted(true);
      // },
    }
  );

  useEffect(() => {
    if (middleware == "guest" && redirectIfAuthenticated && userLogged)
      router.push(redirectIfAuthenticated);

    if (middleware == "auth" && redirectIfAuthenticated && errorLogin)
      router.push(redirectIfAuthenticated);

    if (middleware === "auth" && errorLogin) logOut();
  }, [errorLogin, userLogged, isFetchingUser]);

  return {
    isFetchingUser,
    userLogged,
    errorLogin,
    isMounted,
    isLoading,
    errors,
    login,
    logOut,
  };
};
