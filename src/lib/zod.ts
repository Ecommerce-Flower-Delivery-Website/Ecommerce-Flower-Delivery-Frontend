import { z } from "zod";

// const ProductSchema = z.object({
//   title: z.string({
//     required_error: "Product title is required.",
//   }),
//   image: z.string({
//     required_error: "Product image URL is required.",
//   }),
//   stock: z.number().min(0, { message: "Stock must be a non-negative number." }),
//   price: z.number().min(0, { message: "Price must be a positive number." }),
//   category_id: z.string({
//     required_error: "Category ID is required.",
//   }),
//   description: z.string({
//     required_error: "Product description is required.",
//   }),
//   accessory_array: z
//     .array(z.string(), {
//       required_error: "Accessory array must be an array of strings.",
//     })
//     .nullable(),
// });

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
    required_error: "Address is required and must be a number.",
  }),
  isDone: z.boolean().optional().default(false),
});

const CreateOrderSchema = OrderSchema.omit({
  _id: true,
});

const EditOrderSchema = OrderSchema.partial();

export const validateSchemas = {
  createOrder: CreateOrderSchema,
  editOrder: EditOrderSchema,
};
