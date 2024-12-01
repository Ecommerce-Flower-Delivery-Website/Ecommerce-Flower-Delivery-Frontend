import { zodResolver } from "@hookform/resolvers/zod";
import { InfoIcon } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { validateSchemas } from "../../../lib/zod";
import { loginAdmin } from "../../../store/slices/authSlice";
import { useReduxDispatch, useReduxSelector } from "../../../store/store";
import { Button } from "../../components/button";
import { Input } from "../../components/input";
type LoginFormType = z.infer<typeof validateSchemas.login>;
export const LoginDashboardPage = () => {
  const token = useReduxSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const dispatch = useReduxDispatch();
  const { isPending } = useReduxSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate, token]);
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<LoginFormType>({
    resolver: zodResolver(validateSchemas.login),
  });

  const onSubmit = async (data: LoginFormType) => {
    console.log(data);
    await dispatch(loginAdmin(data));
  };

  return (
    <main className="min-h-screen  flex items-center  justify-center ">
      <div className="     absolute inset-0 bg-black isolate ">
        <div className=" bg-black w-full  absolute inset-0 " />
        <div className="dark:mix-blend-lighten absolute animate-[spin_3s_linear_infinite]   w-[200vw] -left-[50vw] -top-[50vh] h-[200vh]  from-primary to-secondary bg-gradient-to-tr" />
        <div className=" bg-white size-full dark:invert  dark:mix-blend-color-burn mix-blend-lighten dark:filter w-full absolute inset-0">
          <img
            className="mx-auto object-cover  h-full  max-h-full  "
            src="/login-page-background.jpg"
            alt="background"
          />
        </div>
      </div>
      <div className="w-full max-w-md relative  ">
        <div className="w-full relative py-10  px-8 bg-white/20  backdrop-blur-sm rounded-lg shadow-lg">
          <h2 className="  text-center pb-10 text-3xl font-bold text-foreground">
            Login
          </h2>
          <form className=" space-y-6 " onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm h-6 font-medium text-foreground"
              >
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="admain@gmail.com"
                required
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Invalid email address",
                  },
                })}
                className={errors.email ? "border-destructive" : ""}
              />
              {errors.email && (
                <div
                  className="flex min-h-6 items-center space-x-2 px-3 text-rose-500"
                  role="alert"
                >
                  {errors.email.message && (
                    <>
                      <InfoIcon className="h-4 w-4 flex-shrink-0" />
                      <p className="pb-1 text-sm font-medium">
                        {errors.email.message}
                      </p>
                    </>
                  )}
                </div>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm h-6 font-medium text-foreground"
              >
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="password"
                required
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
                className={errors.password ? "border-destructive" : ""}
              />
              {errors.password && (
                <div
                  className="flex min-h-6 items-center space-x-2 px-3 text-rose-500"
                  role="alert"
                >
                  {errors.password.message && (
                    <>
                      <InfoIcon className="h-4 w-4 flex-shrink-0" />
                      <p className="pb-1 text-sm font-medium">
                        {errors.password.message}
                      </p>
                    </>
                  )}
                </div>
              )}
            </div>

            <div className="">
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading || isPending}
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};
