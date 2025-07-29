"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { createEmployee, type EmployeeFormInput } from "@/lib/actions/employee.actions"

interface EmployeeFormProps {
  onSuccess?: () => void
}

export function EmployeeForm({ onSuccess }: EmployeeFormProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    const formData = new FormData(event.currentTarget)
    
    const employeeData = {
      arabicName: formData.get("arabicName") as string,
      nickName: formData.get("nickName") as string,
      profession: formData.get("profession") as string,
      birthDate: formData.get("birthDate") as string,
      nationalId: formData.get("nationalId") as string,
      maritalStatus: formData.get("maritalStatus") as "متزوج" | "أعزب" | "مطلق" | "أرمل",
      residenceLocation: formData.get("residenceLocation") as string,
      hiringDate: formData.get("hiringDate") as string,
      hiringType: formData.get("hiringType") as "دوام كامل" | "دوام جزئي" | "عقد",
      email: formData.get("email") as string,
      administration: formData.get("administration") as string,
      actualWork: formData.get("actualWork") as string,
      phoneNumber: formData.get("phoneNumber") as string,
      notes: formData.get("notes") as string,
    }

    try {
      const result = await createEmployee(employeeData)
      
      if (result.success) {
        setSuccess(true)
        event.currentTarget.reset()
        onSuccess?.()
      } else {
        setError(result.error || "حدث خطأ غير متوقع")
      }
    } catch (err) {
      setError("حدث خطأ أثناء إرسال البيانات")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">إضافة موظف جديد</CardTitle>
        <CardDescription className="text-center">
          يرجى ملء جميع البيانات المطلوبة لإضافة موظف جديد
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">البيانات الأساسية</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="arabicName">الاسم (رباعي) *</Label>
                <Input
                  id="arabicName"
                  name="arabicName"
                  required
                  placeholder="أدخل الاسم الرباعي"
                  dir="rtl"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="nickName">اسم الشهرة *</Label>
                <Input
                  id="nickName"
                  name="nickName"
                  required
                  placeholder="أدخل اسم الشهرة"
                  dir="rtl"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="profession">المهنة *</Label>
                <Input
                  id="profession"
                  name="profession"
                  required
                  placeholder="أدخل المهنة"
                  dir="rtl"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="birthDate">تاريخ الميلاد *</Label>
                <Input
                  id="birthDate"
                  name="birthDate"
                  type="date"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="nationalId">رقم الهوية الوطنية *</Label>
                <Input
                  id="nationalId"
                  name="nationalId"
                  required
                  placeholder="أدخل رقم الهوية الوطنية"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="maritalStatus">الحالة الاجتماعية *</Label>
                <select
                  id="maritalStatus"
                  name="maritalStatus"
                  required
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                >
                  <option value="">اختر الحالة الاجتماعية</option>
                  <option value="أعزب">أعزب</option>
                  <option value="متزوج">متزوج</option>
                  <option value="مطلق">مطلق</option>
                  <option value="أرمل">أرمل</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="residenceLocation">العنوان التفصيلي *</Label>
              <Input
                id="residenceLocation"
                name="residenceLocation"
                required
                placeholder="أدخل العنوان التفصيلي"
                dir="rtl"
              />
            </div>
          </div>

          {/* Work Information Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">بيانات العمل</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="hiringDate">تاريخ التعيين *</Label>
                <Input
                  id="hiringDate"
                  name="hiringDate"
                  type="date"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="hiringType">نوع التعيين *</Label>
                <select
                  id="hiringType"
                  name="hiringType"
                  required
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                >
                  <option value="">اختر نوع التعيين</option>
                  <option value="دوام كامل">دوام كامل</option>
                  <option value="دوام جزئي">دوام جزئي</option>
                  <option value="عقد">عقد</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="administration">الإدارة *</Label>
                <Input
                  id="administration"
                  name="administration"
                  required
                  placeholder="أدخل الإدارة"
                  dir="rtl"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="actualWork">العمل الفعلي *</Label>
                <Input
                  id="actualWork"
                  name="actualWork"
                  required
                  placeholder="أدخل العمل الفعلي"
                  dir="rtl"
                />
              </div>
            </div>
          </div>

          {/* Contact Information Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">بيانات الاتصال</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="أدخل البريد الإلكتروني"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">رقم الهاتف *</Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  required
                  placeholder="أدخل رقم الهاتف"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="notes">ملاحظات</Label>
              <textarea
                id="notes"
                name="notes"
                rows={3}
                className="flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                placeholder="أدخل أي ملاحظات إضافية"
                dir="rtl"
              />
            </div>
          </div>

          {/* Error and Success Messages */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}
          
          {success && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-md">
              <p className="text-green-600 text-sm">تم إضافة الموظف بنجاح!</p>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-center pt-4">
            <Button
              type="submit"
              disabled={loading}
              className="w-full md:w-auto px-8"
            >
              {loading ? "جاري الحفظ..." : "حفظ البيانات"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
