"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { signIn } from "@/lib/auth";
import { redirect } from "next/navigation";

const RegisterSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export async function registerUser(formData: FormData) {
  const parsed = RegisterSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const { name, email, password } = parsed.data;

  // Check if user already exists
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { error: "Email already in use" };
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 12);

  // Create user + store
  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      store: {
        create: {
          name: `${name}'s Store`,
          slug: email.split("@")[0].toLowerCase().replace(/[^a-z0-9]/g, "") + 
                Math.floor(Math.random() * 1000),
        },
      },
    },
  });

  // Auto sign in after register
  await signIn("credentials", {
    email,
    password,
    redirectTo: "/dashboard",
  });
}

export async function loginUser(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Please fill in all fields" };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/dashboard",
    });
  } catch {
    return { error: "Invalid email or password" };
  }
}