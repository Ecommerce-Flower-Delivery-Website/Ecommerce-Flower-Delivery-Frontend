import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { validateSchemas } from "../../../../lib/zod";
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
  deleteUser,
  updateUser,
  addUser,
} from "../../../../store/slices/userSlice";
import { useReduxDispatch } from "../../../../store/store";

// Types for forms
type CreateUserFormType = z.infer<typeof validateSchemas.createUser>;
type EditUserFormType = z.infer<typeof validateSchemas.editUser>;

// Create Component
export const Create = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useReduxDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateUserFormType>({
    resolver: zodResolver(validateSchemas.createUser),
    mode: "onBlur", // Added mode on blur
  });

  const onSubmit = (data: CreateUserFormType) => {
    dispatch(addUser(data));
    setIsOpen(false);
  };

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
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <InputField
            label="Name"
            id="name"
            register={register}
            errors={errors}
          />
          <InputField
            label="Email"
            id="email"
            type="email"
            register={register}
            errors={errors}
          />
          <InputField
            label="Phone"
            id="phone"
            type="tel"
            register={register}
            errors={errors}
          />

          <InputField
            label="Password"
            id="password"
            type="password"
            register={register}
            errors={errors}
          />
          <div className="flex items-center gap-2 mb-4">
            <label htmlFor="isAdmin">Is Admin</label>
            <Input
              id="isAdmin"
              type="checkbox"
              {...register("isAdmin")}
              className="h-4 w-4"
            />
          </div>
          <Button type="submit" disabled={isSubmitting}>
            Create User
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// Edit Component
export const Edit = ({ user }: { user: TUserFromBackend }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useReduxDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EditUserFormType>({
    resolver: zodResolver(validateSchemas.editUser),
    defaultValues: user,
    mode: "onBlur", // Added mode on blur
  });

  const onSubmit = (data: EditUserFormType) => {
    dispatch(updateUser({ userId: user._id, userData: data }));
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost">Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <InputField
            label="Name"
            id="name"
            register={register}
            errors={errors}
          />
          <InputField
            label="Email"
            id="email"
            type="email"
            register={register}
            errors={errors}
          />
          <InputField
            label="Phone"
            id="phone"
            type="tel"
            register={register}
            errors={errors}
          />
          <div className="flex items-center gap-2 mb-4">
            <label htmlFor="isAdmin">Is Admin</label>
            <Input
              id="isAdmin"
              type="checkbox"
              {...register("isAdmin")}
              className="h-4 w-4"
            />
          </div>
          <Button type="submit" disabled={isSubmitting}>
            Save Changes
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// Remove Component
export const Remove = ({ userId }: { userId: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useReduxDispatch();

  const onConfirm = () => {
    dispatch(deleteUser(userId));
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost">Remove</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete User</DialogTitle>
        </DialogHeader>
        <p>Are you sure you want to delete this user?</p>
        <div className="flex justify-between">
          <Button variant="ghost" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={onConfirm}>Confirm</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Helper Component for Input Fields
const InputField = ({
  label,
  id,
  type = "text",
  register,
  errors,
}: {
  label: string;
  id: string;
  type?: string;
  register: any;
  errors: any;
}) => (
  <div>
    <label htmlFor={id}>{label}</label>
    <Input id={id} type={type} {...register(id)} />
    <ErrorMessage message={errors[id]?.message} />
  </div>
);
