"use server"

import { prisma } from "@/db/prisma"
import { revalidatePath } from "next/cache"
import { z } from "zod"

// Employee validation schema
const employeeSchema = z.object({
  arabicName: z.string().min(1, "الاسم مطلوب"),
  nickName: z.string().min(1, "اسم الشهرة مطلوب"),
  profession: z.string().min(1, "المهنة مطلوبة"),
  birthDate: z.string().transform((str) => new Date(str)),
  nationalId: z.string().min(1, "رقم الهوية الوطنية مطلوب"),
  maritalStatus: z.enum(["متزوج", "أعزب", "مطلق", "أرمل"]),
  residenceLocation: z.string().min(1, "العنوان التفصيلي مطلوب"),
  hiringDate: z.string().transform((str) => new Date(str)),
  hiringType: z.enum(["دوام كامل", "دوام جزئي", "عقد"]),
  email: z.string().email("البريد الإلكتروني غير صحيح").optional().or(z.literal("")),
  administration: z.string().min(1, "الإدارة مطلوبة"),
  actualWork: z.string().min(1, "العمل الفعلي مطلوب"),
  phoneNumber: z.string().min(1, "رقم الهاتف مطلوب"),
  notes: z.string().optional(),
})

// Input type for forms (with string dates)
export type EmployeeFormInput = {
  arabicName: string
  nickName: string
  profession: string
  birthDate: string
  nationalId: string
  maritalStatus: "متزوج" | "أعزب" | "مطلق" | "أرمل"
  residenceLocation: string
  hiringDate: string
  hiringType: "دوام كامل" | "دوام جزئي" | "عقد"
  email?: string
  administration: string
  actualWork: string
  phoneNumber: string
  notes?: string
}

export type EmployeeFormData = z.infer<typeof employeeSchema>

export async function createEmployee(data: EmployeeFormInput) {
  try {
    const validatedData = employeeSchema.parse(data)
    
    const employee = await prisma.employee.create({
      data: {
        ...validatedData,
        email: validatedData.email || null,
      }
    })
    
    revalidatePath('/employees')
    return { success: true, employee }
  } catch (error) {
    console.error("Error creating employee:", error)
    if (error instanceof z.ZodError) {
      return { success: false, error: "بيانات غير صحيحة" }
    }
    return { success: false, error: "حدث خطأ أثناء إنشاء الموظف" }
  }
}

export async function getEmployees() {
  try {
    const employees = await prisma.employee.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        spouse: true,
        children: true,
        father: true,
        mother: true,
        siblings: true,
      }
    })
    
    return { success: true, employees }
  } catch (error) {
    console.error("Error fetching employees:", error)
    return { success: false, error: "حدث خطأ أثناء جلب البيانات" }
  }
}

export async function deleteEmployee(id: string) {
  try {
    await prisma.employee.delete({
      where: { id }
    })
    
    revalidatePath('/employees')
    return { success: true }
  } catch (error) {
    console.error("Error deleting employee:", error)
    return { success: false, error: "حدث خطأ أثناء حذف الموظف" }
  }
}

export async function updateEmployee(id: string, data: Partial<EmployeeFormInput>) {
  try {
    const validatedData = employeeSchema.partial().parse(data)
    
    const employee = await prisma.employee.update({
      where: { id },
      data: {
        ...validatedData,
        email: validatedData.email || null,
      }
    })
    
    revalidatePath('/employees')
    return { success: true, employee }
  } catch (error) {
    console.error("Error updating employee:", error)
    if (error instanceof z.ZodError) {
      return { success: false, error: "بيانات غير صحيحة" }
    }
    return { success: false, error: "حدث خطأ أثناء تحديث الموظف" }
  }
}
