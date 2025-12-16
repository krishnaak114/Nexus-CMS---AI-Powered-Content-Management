"use server"

import { prisma } from "@/lib/db"
import { signIn } from "@/lib/auth"
import bcrypt from "bcryptjs"
import { redirect } from "next/navigation"

export async function registerUser(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!name || !email || !password) {
    throw new Error("All fields are required")
  }

  if (password.length < 8) {
    throw new Error("Password must be at least 8 characters")
  }

  const existingUser = await prisma.user.findUnique({
    where: { email }
  })

  if (existingUser) {
    throw new Error("Email already registered")
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: "EDITOR"
    }
  })

  redirect("/login")
}

export async function loginUser(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!email || !password) {
    throw new Error("All fields are required")
  }

  await signIn("credentials", {
    email,
    password,
    redirectTo: "/dashboard"
  })
}
