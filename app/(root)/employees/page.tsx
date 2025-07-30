"use client"

import { Button } from "@/components/ui/button"
import { EmployeesTable } from "@/components/employees-table"
import { useRouter } from "next/navigation"

// Employee interface matching the database schema
interface Employee {
  id: string
  arabicName: string
  nickName: string
  profession: string
  birthDate: Date
  nationalId: string
  maritalStatus: string
  residenceLocation: string
  hiringDate: Date
  hiringType: string
  email: string | null
  administration: string
  actualWork: string
  phoneNumber: string
  notes: string | null
  createdAt: Date
  updatedAt: Date
}

// Convert mock data to match the expected format
const convertedEmployees: Employee[] = [
  {
    id: "1",
    arabicName: "أحمد محمد علي حسن",
    nickName: "أحمد",
    profession: "مهندس برمجيات",
    birthDate: new Date("1990-05-15"),
    nationalId: "1234567890",
    maritalStatus: "متزوج",
    residenceLocation: "الرياض، حي النرجس، شارع الملك فهد",
    hiringDate: new Date("2022-01-15"),
    hiringType: "دوام كامل",
    email: "ahmed.hassan@company.com",
    administration: "تقنية المعلومات",
    actualWork: "تطوير التطبيقات",
    phoneNumber: "+966501234567",
    notes: "موظف متميز",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    arabicName: "فاطمة عبدالله محمد الزهراني",
    nickName: "فاطمة",
    profession: "محاسبة",
    birthDate: new Date("1988-12-20"),
    nationalId: "0987654321",
    maritalStatus: "عزباء",
    residenceLocation: "جدة، حي الروضة، شارع التحلية",
    hiringDate: new Date("2021-03-10"),
    hiringType: "دوام كامل",
    email: "fatima.alzahrani@company.com",
    administration: "المالية",
    actualWork: "مراجعة الحسابات",
    phoneNumber: "+966507654321",
    notes: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    arabicName: "خالد سعد عبدالعزيز القحطاني",
    nickName: "خالد",
    profession: "مدير مشاريع",
    birthDate: new Date("1985-08-10"),
    nationalId: "1122334455",
    maritalStatus: "متزوج",
    residenceLocation: "الدمام، حي الفيصلية، شارع الأمير محمد",
    hiringDate: new Date("2020-06-01"),
    hiringType: "دوام كامل",
    email: "khalid.alqahtani@company.com",
    administration: "العمليات",
    actualWork: "إدارة المشاريع التقنية",
    phoneNumber: "+966551122334",
    notes: "خبرة 10 سنوات",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "4",
    arabicName: "نورا أحمد سالم العتيبي",
    nickName: "نورا",
    profession: "مختصة تسويق",
    birthDate: new Date("1992-03-25"),
    nationalId: "5566778899",
    maritalStatus: "عزباء",
    residenceLocation: "الرياض، حي العليا، شارع العروبة",
    hiringDate: new Date("2023-02-20"),
    hiringType: "دوام جزئي",
    email: "nora.alotaibi@company.com",
    administration: "التسويق",
    actualWork: "التسويق الرقمي",
    phoneNumber: "+966555667788",
    notes: "متخصصة في وسائل التواصل الاجتماعي",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "5",
    arabicName: "عبدالرحمن يوسف إبراهيم الشهري",
    nickName: "عبدالرحمن",
    profession: "مستشار قانوني",
    birthDate: new Date("1983-11-12"),
    nationalId: "9988776655",
    maritalStatus: "متزوج",
    residenceLocation: "أبها، حي المنهل، شارع الملك عبدالعزيز",
    hiringDate: new Date("2019-09-15"),
    hiringType: "دوام كامل",
    email: "abdulrahman.alshehri@company.com",
    administration: "القانونية",
    actualWork: "الاستشارات القانونية",
    phoneNumber: "+966509988776",
    notes: "خبرة في القانون التجاري",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]




const page = () => {

  const router = useRouter()

  return (
    <div className='min-h-screen bg-gray-50 py-8'>
      <div className='container mx-auto px-4 space-y-6'>
        {/* Title and add button */}
        <div className='flex flex-col md:flex-row items-start md:items-center justify-between bg-white p-6 rounded-lg shadow-sm'>
          <div className='mb-4 md:mb-0'>
            <h1 className='text-3xl font-bold text-gray-900'>إدارة الموظفين</h1>
            <p className='text-gray-600 mt-1'>إدارة وعرض بيانات الموظفين في المؤسسة</p>
          </div>
          <Button variant="default" onClick={() => { router.push('/employees/create') }} size="lg" className='bg-blue-600 hover:bg-blue-700'>
            إضافة موظف جديد
          </Button>
        </div>
        
        {/* Employees table */}
        <EmployeesTable employees={convertedEmployees} />
      </div>
    </div>
  )
}

export default page
