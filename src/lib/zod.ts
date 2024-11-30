import { z } from "zod";

const passwordZodSchema = (name = "password") =>
  z
    .string({
      invalid_type_error: `${name} must be a string`,
      required_error: `${name} is required`,
    })
    .min(8, `${name} cannot be less then 8 charecter `)
    .max(24, `${name} cannot be more then 24 charecter `)
    .refine((value) => {
      return /(?=.*[A-Z])(?=.*\d)/.test(value);
    }, `${name} must have at least one capital and one number`);

const UserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long."),
  email: z.string().email("Invalid email address."),
  subscriptions: z.string().nullable().default(null),
  verified: z.boolean().optional().default(false),
  createdAt: z.date().optional().default(new Date()),
  password: passwordZodSchema("password"),
  password_confirmation: passwordZodSchema("password_confirmation"),
});
const CartSchema = z.object({
  _id: z.string(),
  discount: z.coerce
    .number()
    .min(0, { message: "Discount must be a non-negative number." })
    .max(100, { message: "Discount cannot exceed 100." }),
  status: z.enum(["active", "complete"], {
    required_error:
      "Status is required and must be either 'active' or 'complete'.",
  }),
  totalAmount: z.coerce
    .number()
    .min(0, { message: "Total amount must be a positive number." }),
  products: z
    .array(
      z.string({
        required_error: "Products must be an array of strings.",
      })
    )
    .nonempty({ message: "Products array must contain at least one product." }),
  user_id: z
    .string({
      required_error: "User ID is required.",
    })
    .min(1),
});

const CreateUserSchema = UserSchema.refine(
  (data) => data.password === data.password_confirmation,
  {
    message: "Passwords don't match",
    path: ["password_confirmation"],
  }
);

const EditUserSchema = UserSchema.partial();
const CreateCartSchema = CartSchema.omit({
  _id: true,
});

const EditCartSchema = CartSchema.partial();

const OrderSchema = z.object({
  _id: z.string({
    required_error: "Order ID is required.",
  }),
  cart_id: z.string({
    required_error: "Cart ID is required.",
  }),
  products: z.array(
    z.string({
      required_error: "Products are required.",
    })
  ),
  total: z.coerce
    .number()
    .min(0, { message: "Total must be a positive number." }),
  address: z.string({
    required_error: "Address is required and must be a string.",
  }),
  isDone: z.boolean().optional().default(false),
});

const CreateOrderSchema = OrderSchema.omit({
  _id: true,
});

const EditOrderSchema = OrderSchema.partial();

export const validateSchemas = {
  user: UserSchema,
  createUser: CreateUserSchema,
  editUser: EditUserSchema,
  cart: CartSchema,
  createCart: CreateCartSchema,
  editCart: EditCartSchema,
  order: OrderSchema,
  createOrder: CreateOrderSchema,
  editOrder: EditOrderSchema,
};
