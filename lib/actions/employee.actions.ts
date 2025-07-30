"use server"

import { prisma } from "@/db/prisma"
import { revalidatePath } from "next/cache"
import { z } from "zod"
// import { createEmployeeSchema } from "../validators"
import { createEmployeeFormSchema } from "../validators"


const formSchema = z.object({
  name: z.string().min(2, 'الاسم مطلوب'),
  nickName: z.string().min(1, 'اسم الشهرة مطلوب'),
  profession: z.string().min(1, 'المهنة مطلوبة'),
  birthDate: z.string().min(1, 'تاريخ الميلاد مطلوب'),
  nationalId: z.string().min(1, 'رقم الهوية الوطنية مطلوب'),
  maritalStatus: z.enum(['single', 'married', 'divorced', 'widowed']),
  residenceLocation: z.string().min(1, 'العنوان التفصيلي مطلوب'),  
  hiringDate: z.string().min(1, 'تاريخ التعيين مطلوب'),
  hiringType: z.enum(['full-time', 'part-time', 'contract', 'temporary']),
  email: z.string().email('البريد الإلكتروني غير صحيح').optional().or(z.literal('')),
  administration: z.string().min(1, 'الإدارة مطلوبة'),
  actualWork: z.string().min(1, 'العمل الفعلي مطلوب'),
  phoneNumber: z.string().min(1, 'رقم الهاتف مطلوب'),
  notes: z.string().optional(),
  relationships: z.array(z.object({
    relationshipType: z.string().min(1, 'نوع العلاقة مطلوب'),
    name: z.string().min(1, 'الاسم مطلوب'),
    nationalId: z.string().min(1, 'رقم الهوية الوطنية مطلوب'),
    birthDate: z.string().min(1, 'تاريخ الميلاد مطلوب'),
    birthPlace: z.string().optional(),
    profession: z.string().optional(),
    spouseName: z.string().optional(),
    residenceLocation: z.string().min(1, 'محل الاقامة مطلوب'),
    notes: z.string().optional(),
  }))
});


export async function createEmployee(data: z.infer<typeof createEmployeeFormSchema>) {
  try {
    const validatedData = createEmployeeFormSchema.parse(data)

    const empData = {
      name: validatedData.name,
      nickName: validatedData.nickName,
      profession: validatedData.profession,
      birthDate: new Date(validatedData.birthDate),
      nationalId: validatedData.nationalId,
      maritalStatus: validatedData.maritalStatus,
      residenceLocation: validatedData.residenceLocation,
      hiringDate: new Date(validatedData.hiringDate),
      hiringType: validatedData.hiringType,
      email: validatedData.email || null,
      administration: validatedData.administration,
      actualWork: validatedData.actualWork,
      phoneNumber: validatedData.phoneNumber,
      notes: validatedData.notes || null,
    }

    const employee = await prisma.employee.create({
      data: empData,
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





// export async function getEmployees() {
//   try {
//     const employees = await prisma.employee.findMany({
//       orderBy: {
//         createdAt: 'desc'
//       },
//       include: {
//         spouse: true,
//         children: true,
//         father: true,
//         mother: true,
//         siblings: true,
//       }
//     })
    
//     return { success: true, employees }
//   } catch (error) {
//     console.error("Error fetching employees:", error)
//     return { success: false, error: "حدث خطأ أثناء جلب البيانات" }
//   }
// }

// export async function deleteEmployee(id: string) {
//   try {
//     await prisma.employee.delete({
//       where: { id }
//     })
    
//     revalidatePath('/employees')
//     return { success: true }
//   } catch (error) {
//     console.error("Error deleting employee:", error)
//     return { success: false, error: "حدث خطأ أثناء حذف الموظف" }
//   }
// }

// export async function updateEmployee(id: string, data: Partial<EmployeeFormInput>) {
//   try {
//     const validatedData = employeeSchema.partial().parse(data)
    
//     const employee = await prisma.employee.update({
//       where: { id },
//       data: {
//         ...validatedData,
//         email: validatedData.email || null,
//       }
//     })
    
//     revalidatePath('/employees')
//     return { success: true, employee }
//   } catch (error) {
//     console.error("Error updating employee:", error)
//     if (error instanceof z.ZodError) {
//       return { success: false, error: "بيانات غير صحيحة" }
//     }
//     return { success: false, error: "حدث خطأ أثناء تحديث الموظف" }
//   }
// }
