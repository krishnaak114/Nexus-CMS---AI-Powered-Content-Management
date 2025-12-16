"use server"

import { prisma } from "@/lib/db"
import { auth } from "@/lib/auth"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export async function createContent(formData: FormData) {
  const session = await auth()
  if (!session?.user) {
    return { error: "Unauthorized" }
  }

  const title = formData.get("title") as string
  const body = formData.get("body") as string
  const excerpt = formData.get("excerpt") as string
  const status = formData.get("status") as "DRAFT" | "PUBLISHED"

  if (!title || !body) {
    return { error: "Title and body are required" }
  }

  const slug = generateSlug(title)

  const content = await prisma.content.create({
    data: {
      title,
      slug,
      body,
      excerpt,
      status,
      authorId: session.user.id,
    }
  })

  revalidatePath("/dashboard/content")
  redirect(`/dashboard/content/${content.id}`)
}

export async function updateContent(id: string, formData: FormData) {
  const session = await auth()
  if (!session?.user) {
    return { error: "Unauthorized" }
  }

  const title = formData.get("title") as string
  const body = formData.get("body") as string
  const excerpt = formData.get("excerpt") as string
  const status = formData.get("status") as "DRAFT" | "PUBLISHED"

  const slug = generateSlug(title)

  await prisma.content.update({
    where: { id },
    data: {
      title,
      slug,
      body,
      excerpt,
      status,
      updatedAt: new Date(),
    }
  })

  revalidatePath("/dashboard/content")
  revalidatePath(`/dashboard/content/${id}`)
  redirect(`/dashboard/content/${id}`)
}

export async function deleteContent(id: string) {
  const session = await auth()
  if (!session?.user) {
    throw new Error("Unauthorized")
  }

  await prisma.content.update({
    where: { id },
    data: { status: "ARCHIVED" }
  })

  revalidatePath("/dashboard/content")
  redirect("/dashboard/content")
}

export async function publishContent(id: string) {
  const session = await auth()
  if (!session?.user) {
    throw new Error("Unauthorized")
  }

  await prisma.content.update({
    where: { id },
    data: {
      status: "PUBLISHED",
      publishedAt: new Date(),
    }
  })

  revalidatePath("/dashboard/content")
  revalidatePath(`/dashboard/content/${id}`)
}
