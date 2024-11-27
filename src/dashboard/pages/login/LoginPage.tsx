import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../../components/input";
import { Button } from "../../components/button";

export const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(data);
    setIsLoading(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center from-primary to-secondary bg-gradient-to-tr ">
      <div className="w-full max-w-md relative  ">
        <div className=" border-[8px] absolute  border-transparent border-t-primary border-r-primary   size-40 -top-4 -right-4 rounded-tr-lg " />
        <div className=" border-[8px] absolute border-transparent border-b-secondary border-l-secondary    size-40 -bottom-4 -left-4 rounded-bl-lg " />
        <div className="w-full relative  px-8 bg-card/40 outline-1 outline -outline-offset-4  outline-card  rounded-lg shadow-lg">
          <div className=" size-24 absolute left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center  bg-card/80 outline outline-1 outline-card outline-offset-4 rounded-full">
            <h2 className=" text-3xl font-bold text-foreground">login</h2>
          </div>
          <form className=" space-y-6 py-10" onSubmit={handleSubmit(onSubmit)}>
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
                <p className="mt-1 text-xs text-destructive">
                  {errors.email.message}
                </p>
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
                <p className="mt-1 text-xs text-destructive">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};
