import { Button } from "@/components/ui/button";
import { ErrorMessage } from "@/components/ui/error-message";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { OTPInput } from "@/components/ui/otp-input";
import { PasswordInput } from "@/components/ui/password-input";
import { useAuth } from "@/contexts/hooks/useAuth";
import { useAxiosPrivate } from "@/hooks/useAxiosPrivate";
import { toast } from "@/lib/hot-toast";
import { handleError } from "@/lib/utils";
import { ValidationSchemas } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Lock, Mail, Smartphone } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const AIBackgroundAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (canvasRef.current) {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
    };

    window.addEventListener("resize", updateDimensions);
    updateDimensions();

    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    const particlesArray: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      update: () => {};
      draw: () => {};
    }> = [];
    const numberOfParticles = 100;
    const connectDistance = 100;

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        else if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        else if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        //@ts-expect-error
        ctx.beginPath();
        //@ts-expect-error
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        //@ts-expect-error
        ctx.fillStyle = "rgba(190, 75, 255, 0.9)"; // Neon purple with increased opacity
        //@ts-expect-error
        ctx.fill();
      }
    }

    const init = () => {
      for (let i = 0; i < numberOfParticles; i++) {
        //@ts-expect-error
        particlesArray.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particlesArray.length; i++) {
        const itemI = particlesArray[i];
        if (itemI === undefined) return;
        itemI.update();
        itemI.draw();

        for (let j = i; j < particlesArray.length; j++) {
          const itemJ = particlesArray[j];
          if (itemJ === undefined) return;
          const dx = itemI.x - itemJ.x;
          const dy = itemI.y - itemJ.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectDistance) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(190, 75, 255, ${
              1 - distance / connectDistance + 0.1
            })`; // Increased base opacity
            ctx.lineWidth = 1;
            ctx.moveTo(itemI.x, itemI.y);
            ctx.lineTo(itemJ.x, itemJ.y);
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(animate);
    };

    init();
    animate();

    return () => {
      cancelAnimationFrame(animate as unknown as number);
    };
  }, [dimensions]);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />;
};
type LoginFormType = z.infer<typeof ValidationSchemas.login>;
export const LoginPage = () => {
  const navigate = useNavigate();
  const { api } = useAxiosPrivate();
  const { setAuth } = useAuth();
  const [isOTPOpen, setIsOTPOpen] = useState(false);
  const {
    mutate,
    isPending,
    data: user,
  } = useMutation({
    mutationFn: async (values: LoginFormType) => {
      return await api.post("/auth/login_admin", values);
    },
    onSuccess: (data) => {
      toast.success({ message: "success" });
      console.log(data.data);
      setAuth(data.data);
      // setIsOTPOpen(true)
    },
    onError: (error) => {
      console.log(error.message);
      toast.error({ message: handleError(error) });
    },
  });
  const {
    register,
    handleSubmit,

    formState: { errors, isLoading },
  } = useForm<LoginFormType>({
    resolver: zodResolver(ValidationSchemas.login),
  });
  console.log(user);
  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-900">
      {/* Background Image with Overlay */}
      <img
        className="absolute inset-0 size-full object-cover object-center"
        src="/super-admin-register-bg.jpg"
        style={{
          filter: "brightness(0.7)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/50 to-purple-600/50 mix-blend-multiply" />

      <AIBackgroundAnimation />

      {/* Content */}
      <div className="relative flex min-h-screen items-center justify-center">
        {isOTPOpen ? (
          <OTPInput
            onClose={() => setIsOTPOpen(false)}
            onSuccess={(val: string) => {
              if (val === user?.data?.otpCode) {
                setAuth(user.data);
                navigate("/overview");
              } else {
                toast.error({ message: "wrong otp" });
              }
            }}
          />
        ) : (
          <section className="relative w-[400px] overflow-hidden rounded-lg border bg-white/10 text-card-foreground shadow-sm backdrop-blur-xl">
            <div className="animate-gradient-slow absolute inset-0 bg-gradient-to-r from-purple-600/30 to-purple-800/30" />
            <div className="relative flex flex-col space-y-1.5 p-6">
              <div className="mb-4 text-center">
                <div className="relative mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-500/20">
                  <div className="absolute inset-0 animate-ping rounded-full bg-purple-500/30 opacity-75"></div>
                  <Smartphone className="relative z-10 h-8 w-8 text-purple-400" />
                </div>
              </div>
              <h3 className="text-center text-2xl font-bold leading-none tracking-tight text-white">
                Super Admin Login
              </h3>
              <p className="w-full text-center text-sm text-purple-200">
                Enter your company email to log in.
              </p>
            </div>
            <div className="relative p-6 pt-0">
              <form
                onSubmit={handleSubmit((values) => mutate(values))}
                className=""
              >
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-purple-300" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="superadmin@yourcompany.com"
                      {...register("email")}
                      className="border-purple-500/50 bg-white/10 pl-10 text-white placeholder:text-purple-200"
                    />
                  </div>
                </div>
                <ErrorMessage message={errors.email?.message} />
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white">
                    Password
                  </Label>
                  <div className="relative">
                    <PasswordInput
                      id="password"
                      className="border-purple-500/50 bg-white/10 text-black"
                      {...register("password")}
                    />
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-purple-300" />
                  </div>
                </div>
                <ErrorMessage message={errors.password?.message} />
                {errors.root?.message && (
                  <div className="space-y-2">
                    <p className="text-sm text-rose-500">
                      {errors.root.message}
                    </p>
                  </div>
                )}
                <Button
                  disabled={isLoading || isPending}
                  className="w-full bg-purple-600 text-white hover:bg-purple-700"
                  type="submit"
                >
                  submit
                </Button>
              </form>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
