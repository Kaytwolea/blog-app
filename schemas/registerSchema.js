import vine from "@vinejs/vine";

export const RegisterSchema = vine.object({
  user_name: vine.string(),
  email: vine.string().email(),
  password: vine.string().confirmed(),
});