"use server"

import { prisma } from "@/db/prisma"
import { revalidatePath } from "next/cache"
import { z } from "zod"
import { createEmployeeApiSchema } from "../validators"

interface Relationship {
  relationshipType: string;
  name: string;
  nationalId: string;
  birthDate: Date;
  birthPlace?: string;
  profession?: string;
  spouseName?: string;
  residenceLocation: string;
  notes?: string;
}


export async function createEmployee(data: z.infer<typeof createEmployeeApiSchema>) {
  try {
    const validatedData = createEmployeeApiSchema.parse(data)

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

    let relationships: Relationship[] = []
    if (validatedData.relationships && validatedData.relationships.length > 0) {
      relationships = validatedData.relationships.map(rel => ({
        relationshipType: rel.relationshipType,
        name: rel.name,
        nationalId: rel.nationalId,
        birthDate: new Date(rel.birthDate),
        birthPlace: rel.birthPlace || undefined,
        profession: rel.profession || undefined,
        spouseName: rel.spouseName || undefined,
        residenceLocation: rel.residenceLocation,
        notes: rel.notes || undefined,
      }))
    }

    

    const employee = await prisma.employee.create({
      data: empData,
    })

    if (relationships.length > 0) {
      await prisma.relationship.createMany({
        data: relationships.map((rel: Relationship) => ({
          employeeId: employee.id,
          ...rel,
        }))
      })
    }
    
    revalidatePath('/employees')
    console.log("revalidatePath reached")
    return { success: true, employee }
  } catch (error) {
    console.error("Error creating employee:", error)
    if (error instanceof z.ZodError) {
      return { success: false, error: "بيانات غير صحيحة" }
    }
    return { success: false, error: "حدث خطأ أثناء إنشاء الموظف" }
  }
}

export const getEmployees = async () => {
  try {
    const employees = await prisma.employee.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        relationships: true,
      }
    })


    return { success: true, employees }
  } catch (error) {
    console.error("Error fetching employees:", error)
    return { success: false, error: "حدث خطأ أثناء جلب البيانات" }
  }
}
export const deleteEmployee = async (id: string) => {
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



export const getEmployeeById = async (id: string) => {
  try {
    const employee = await prisma.employee.findUnique({
      where: { id },
      include: {
        relationships: true,
      }
    })

    if (!employee) {
      return { success: false, error: "الموظف غير موجود" }
    }

    return { success: true, employee }
  } catch (error) {
    console.error("Error fetching employee:", error)
    return { success: false, error: "حدث خطأ أثناء جلب البيانات" }
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
