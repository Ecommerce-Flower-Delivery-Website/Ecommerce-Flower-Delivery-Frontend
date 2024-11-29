import { DialogClose } from "@radix-ui/react-dialog";
import { Edit as EditIcon, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../../components/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/dialog";
import { ErrorMessage } from "../../../components/error-message";
import { Input } from "../../../components/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/select";

export const Create = () => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm();
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Create New User
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New User</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit((values) => console.log(values))}
          className="grid gap-4 py-4"
        >
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="name" className="text-right">
              User Name
            </label>
            <Input id="name" {...register("username")} className="col-span-3" />
          </div>
          <ErrorMessage message={errors.username?.message} />
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="email" className="text-right">
              Email
            </label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              className="col-span-3"
            />
          </div>
          <ErrorMessage message={errors.email?.message} />
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="password" className="text-right">
              Password
            </label>
            <Input
              id="password"
              type="password"
              {...register("password")}
              className="col-span-3"
            />
          </div>
          <ErrorMessage message={errors.password?.message} />
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="password_confirmation" className="text-right">
              Password confirmation
            </label>
            <Input
              id="password_confirmation"
              {...register("password_confirmation")}
              className="col-span-3"
            />
          </div>
          <ErrorMessage message={errors.password_confirmation?.message} />

          <Button
            type="submit"
            disabled={isLoading}
            className="hover:bg-primary-hover bg-primary text-white"
          >
            Create User
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export const Edit = ({ user }: { user: User }) => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isLoading },
  } = useForm({
    defaultValues: user,
  });
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <EditIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit((values) => console.log(values))}
          className="grid gap-4 py-4"
        >
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="name" className="text-right">
              User Name
            </label>
            <Input id="name" {...register("username")} className="col-span-3" />
          </div>
          <ErrorMessage message={errors.username?.message} />
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="email" className="text-right">
              Email
            </label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              className="col-span-3"
            />
          </div>
          <ErrorMessage message={errors.email?.message} />
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="points" className="text-right">
              Points
            </label>
            <Input
              id="points"
              type="number"
              {...register("points", {
                valueAsNumber: true,
              })}
              className="col-span-3"
            />
          </div>
          <ErrorMessage message={errors.points?.message} />

          <div className="flex items-center justify-center gap-4">
            <label htmlFor="status" className="text-right">
              status
            </label>
            <Select
              defaultValue={user.status}
              onValueChange={(value: "Active" | "In Active" | "Blocked") => {
                setValue("status", value);
              }}
            >
              <SelectTrigger className="w-[100px] bg-white dark:bg-gray-800">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="In Active">InActive</SelectItem>
                <SelectItem value="Blocked">Blocked</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="hover:bg-primary-hover bg-primary text-white"
          >
            Save
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export const Remove = ({
  userId,
  username,
}: {
  userId: string;
  username: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <Trash2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete User {username}</DialogTitle>
        </DialogHeader>
        <p>are you sure you want to delete the user {username}</p>
        <div className="flex w-full justify-between">
          <DialogClose asChild>
            <Button variant={"ghost"}>Close</Button>
          </DialogClose>
          <Button
            onClick={() => {}}
            className="hover:bg-primary-hover bg-primary text-white"
          >
            Confirm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
