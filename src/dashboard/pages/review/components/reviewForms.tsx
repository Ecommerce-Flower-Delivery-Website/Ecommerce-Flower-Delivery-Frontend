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
import { Input } from "../../../components/input";
import { useReduxDispatch } from "../../../../store/store";
import {
  addReview,
  editReview,
  deleteReview,
  TReviewFromBackEnd,
} from "../../../../store/slices/reviewSlice";
import { CheckCheck } from "lucide-react";
import { Textarea } from "../../../components/textarea";

// Types for forms
type ReviewFormType = Omit<
  TReviewFromBackEnd,
  "createdAt" | "updatedAt" | "__v" | "_id"
>;

// Create Component
export const Create = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useReduxDispatch();

  const { register, handleSubmit, reset, formState } =
    useForm<ReviewFormType>();

  const onSubmit = (data: ReviewFormType) => {
    dispatch(addReview(data));
    reset();
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="flex justify-end">
          <Button>Create Review</Button>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="mb-5">
          <DialogTitle>Create Review</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register("name")}
            placeholder="Name"
            required
            className="dark:bg-gray-800 mb-5"
          />
  
          <Textarea
            {...register("text")}
            placeholder="Text"
            required
            className="dark:bg-gray-800 h-52 mb-5"
          />

          <div className="flex items-center gap-2 mb-4">
            <label htmlFor="shouldShow">should show </label>
            <Input
              id="shouldShow"
              type="checkbox"
              {...register("shouldShow")}
              className="h-4 w-4"
            />
          </div>
          <Button type="submit" disabled={formState.isSubmitting}>
            Submit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// Edit Component
export const Edit = ({ review }: { review: TReviewFromBackEnd }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useReduxDispatch();

  const { register, handleSubmit, reset, formState } =
    useForm<ReviewFormType>();

  const onSubmit = (data: ReviewFormType) => {
    dispatch(editReview({ reviewInfo: { ...data }, id: review._id }));
    reset();
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost">Edit</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Review</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register("name")}
            defaultValue={review.name}
            placeholder="Name"
            className="dark:bg-gray-800 mb-5"
            required
          />

          <Textarea
            {...register("text")}
            placeholder="Text"
            required
            className="dark:bg-gray-800 h-52 mb-5"
          />


          <div className="flex items-center gap-2 mb-4">
            <label htmlFor="shouldShow">should show </label>
            <Input
              id="shouldShow"
              type="checkbox"
              {...register("shouldShow")}
              className="h-4 w-4"
              defaultChecked={review.shouldShow ? true : false}
            />
          </div>
          <Button type="submit" disabled={formState.isSubmitting}>
            Submit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export const Remove = ({ reviewId }: { reviewId: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useReduxDispatch();

  const onConfirm = () => {
    dispatch(deleteReview(reviewId));
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost">Delete</Button>
      </DialogTrigger>
      <DialogContent>
         <DialogHeader>
          <DialogTitle>Delete Review</DialogTitle>
        </DialogHeader> 
        <p>Are you sure you want to delete this review?</p>
        <div className="flex justify-between">
          <Button variant="ghost" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={onConfirm} className=" text-white">
            Confirm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
