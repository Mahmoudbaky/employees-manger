"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Plus, Trash2, ArrowLeft } from "lucide-react"
import { useState } from "react"
// import { useUsers } from "./user-context"
import type { User, FamilyMember, Sibling } from "@/types"

export default function EmployeesPage() {
  // const { addUser, updateUser } = useUsers()

  // Add form state for all fields
  const [formData, setFormData] = useState({
    fullName: "",
    monthName: "",
    birthDate: "",
    workAddress: "",
    appointmentDate: "",
    currentWork: "",
    email: "",
    mobile: "",
    fatherName: "",
    fatherIdNumber: "",
    fatherBirthInfo: "",
    fatherProfession: "",
    fatherResidence: "",
    motherName: "",
    motherIdNumber: "",
    motherBirthInfo: "",
    motherProfession: "",
    motherResidence: "",
    signature: "",
    declarationDate: "",
  })

  const [spouseInfo, setSpouseInfo] = useState<FamilyMember[]>([
    { id: "1", name: "", profession: "", birthDate: "", birthPlace: "", idNumber: "", notes: "" },
  ])

  const [children, setChildren] = useState<FamilyMember[]>([
    { id: "1", name: "", profession: "", birthDate: "", birthPlace: "", idNumber: "", notes: "" },
  ])

  const [siblings, setSiblings] = useState<Sibling[]>([
    { id: "1", name: "", profession: "", birthDate: "", residence: "" },
  ])

  const addSpouse = () => {
    const newId = (spouseInfo.length + 1).toString()
    setSpouseInfo([
      ...spouseInfo,
      { id: newId, name: "", profession: "", birthDate: "", birthPlace: "", idNumber: "", notes: "" },
    ])
  }

  const removeSpouse = (id: string) => {
    setSpouseInfo(spouseInfo.filter((spouse) => spouse.id !== id))
  }

  const updateSpouse = (id: string, field: keyof FamilyMember, value: string) => {
    setSpouseInfo(spouseInfo.map((spouse) => (spouse.id === id ? { ...spouse, [field]: value } : spouse)))
  }

  const addChild = () => {
    const newId = (children.length + 1).toString()
    setChildren([
      ...children,
      { id: newId, name: "", profession: "", birthDate: "", birthPlace: "", idNumber: "", notes: "" },
    ])
  }

  const removeChild = (id: string) => {
    setChildren(children.filter((child) => child.id !== id))
  }

  const updateChild = (id: string, field: keyof FamilyMember, value: string) => {
    setChildren(children.map((child) => (child.id === id ? { ...child, [field]: value } : child)))
  }

  const addSibling = () => {
    const newId = (siblings.length + 1).toString()
    setSiblings([...siblings, { id: newId, name: "", profession: "", birthDate: "", residence: "" }])
  }

  const removeSibling = (id: string) => {
    setSiblings(siblings.filter((sibling) => sibling.id !== id))
  }

  const updateSibling = (id: string, field: keyof Sibling, value: string) => {
    setSiblings(siblings.map((sibling) => (sibling.id === id ? { ...sibling, [field]: value } : sibling)))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const userData: User = {
      id: Date.now().toString(),
      ...formData,
      spouseInfo,
      children,
      siblings,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    console.log(userData);

    // Here you would save the user data
    // For now, just logging to console
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            وثيقة تعارف - Personal Information Form
          </CardTitle>
          <CardDescription className="text-center">
            Ministry of Housing and Urban Communities - وزارة الإسكان والمجتمعات العمرانية
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">Personal Information - المعلومات الشخصية</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name (رباعي) - الاسم رباعي</Label>
                  <Input
                    id="fullName"
                    placeholder="Enter full name"
                    value={formData.fullName}
                    onChange={(e) => setFormData((prev) => ({ ...prev, fullName: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="monthName">Month Name - اسم الشهر</Label>
                  <Input
                    id="monthName"
                    placeholder="Enter month name"
                    value={formData.monthName}
                    onChange={(e) => setFormData((prev) => ({ ...prev, monthName: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="birthDate">Birth Date - تاريخ الميلاد</Label>
                  <Input
                    id="birthDate"
                    type="date"
                    value={formData.birthDate}
                    onChange={(e) => setFormData((prev) => ({ ...prev, birthDate: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="workAddress">Work Address - العنوان الوظيفي</Label>
                  <Input
                    id="workAddress"
                    placeholder="Enter work address"
                    value={formData.workAddress}
                    onChange={(e) => setFormData((prev) => ({ ...prev, workAddress: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="appointmentDate">Appointment Date - تاريخ التعيين</Label>
                  <Input
                    id="appointmentDate"
                    type="date"
                    value={formData.appointmentDate}
                    onChange={(e) => setFormData((prev) => ({ ...prev, appointmentDate: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currentWork">Current Work - العمل الحالي</Label>
                  <Input
                    id="currentWork"
                    placeholder="Enter current work"
                    value={formData.currentWork}
                    onChange={(e) => setFormData((prev) => ({ ...prev, currentWork: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email - البريد الالكتروني</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter email address"
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mobile">Mobile Number - رقم الموبايل</Label>
                  <Input
                    id="mobile"
                    placeholder="Enter mobile number"
                    value={formData.mobile}
                    onChange={(e) => setFormData((prev) => ({ ...prev, mobile: e.target.value }))}
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Spouse Information Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Spouse Information - بيانات الزوج/الزوجة</h3>
                <Button type="button" onClick={addSpouse} size="sm" variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Spouse
                </Button>
              </div>
              {spouseInfo.map((spouse, index) => (
                <Card key={spouse.id} className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium">Spouse {index + 1}</h4>
                    {spouseInfo.length > 1 && (
                      <Button type="button" onClick={() => removeSpouse(spouse.id)} size="sm" variant="destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Name - اسم الزوج/الزوجة</Label>
                      <Input
                        placeholder="Enter spouse name"
                        value={spouse.name}
                        onChange={(e) => updateSpouse(spouse.id, "name", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Profession - المهنة</Label>
                      <Input
                        placeholder="Enter profession"
                        value={spouse.profession}
                        onChange={(e) => updateSpouse(spouse.id, "profession", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Birth Date & Place - تاريخ و محل الميلاد</Label>
                      <Input
                        placeholder="Enter birth date and place"
                        value={spouse.birthPlace}
                        onChange={(e) => updateSpouse(spouse.id, "birthPlace", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>ID Number - رقم البطاقة</Label>
                      <Input
                        placeholder="Enter ID number"
                        value={spouse.idNumber}
                        onChange={(e) => updateSpouse(spouse.id, "idNumber", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label>Notes - ملاحظات</Label>
                      <Input
                        placeholder="Enter notes"
                        value={spouse.notes}
                        onChange={(e) => updateSpouse(spouse.id, "notes", e.target.value)}
                      />
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <Separator />

            {/* Children Information Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Children Information - الأبناء</h3>
                <Button type="button" onClick={addChild} size="sm" variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Child
                </Button>
              </div>
              {children.map((child, index) => (
                <Card key={child.id} className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium">Child {index + 1}</h4>
                    {children.length > 1 && (
                      <Button type="button" onClick={() => removeChild(child.id)} size="sm" variant="destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Name - الاسم رباعي</Label>
                      <Input
                        placeholder="Enter child name"
                        value={child.name}
                        onChange={(e) => updateChild(child.id, "name", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Profession - المهنة</Label>
                      <Input
                        placeholder="Enter profession"
                        value={child.profession}
                        onChange={(e) => updateChild(child.id, "profession", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Birth Date - تاريخ الميلاد</Label>
                      <Input
                        type="date"
                        value={child.birthDate}
                        onChange={(e) => updateChild(child.id, "birthDate", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Birth Place - محل الإقامة تفصيلا</Label>
                      <Input
                        placeholder="Enter birth place"
                        value={child.birthPlace}
                        onChange={(e) => updateChild(child.id, "birthPlace", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>ID Number - رقم البطاقة</Label>
                      <Input
                        placeholder="Enter ID number"
                        value={child.idNumber}
                        onChange={(e) => updateChild(child.id, "idNumber", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Notes - ملاحظات</Label>
                      <Input
                        placeholder="Enter notes"
                        value={child.notes}
                        onChange={(e) => updateChild(child.id, "notes", e.target.value)}
                      />
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <Separator />

            {/* Parents Information Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Parents Information - بيانات الوالدين</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Father Information */}
                <Card className="p-4">
                  <h4 className="font-medium mb-4">Father Information - بيانات الوالد</h4>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Father&apos;s Name - اسم الوالد رباعي</Label>
                      <Input
                        placeholder="Enter father&apos;s name"
                        value={formData.fatherName}
                        onChange={(e) => setFormData((prev) => ({ ...prev, fatherName: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>ID Number - رقم البطاقة</Label>
                      <Input
                        placeholder="Enter ID number"
                        value={formData.fatherIdNumber}
                        onChange={(e) => setFormData((prev) => ({ ...prev, fatherIdNumber: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Birth Date & Place - تاريخ و محل الميلاد</Label>
                      <Input
                        placeholder="Enter birth date and place"
                        value={formData.fatherBirthInfo}
                        onChange={(e) => setFormData((prev) => ({ ...prev, fatherBirthInfo: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Profession - المهنة</Label>
                      <Input
                        placeholder="Enter profession"
                        value={formData.fatherProfession}
                        onChange={(e) => setFormData((prev) => ({ ...prev, fatherProfession: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Residence Details - محل الإقامة تفصيلا</Label>
                      <Textarea
                        placeholder="Enter residence details"
                        value={formData.fatherResidence}
                        onChange={(e) => setFormData((prev) => ({ ...prev, fatherResidence: e.target.value }))}
                      />
                    </div>
                  </div>
                </Card>

                {/* Mother Information */}
                <Card className="p-4">
                  <h4 className="font-medium mb-4">Mother Information - بيانات الوالدة</h4>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Mother&apos;s Name - اسم الوالدة رباعي</Label>
                      <Input
                        placeholder="Enter mother&apos;s name"
                        value={formData.motherName}
                        onChange={(e) => setFormData((prev) => ({ ...prev, motherName: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>ID Number - رقم البطاقة</Label>
                      <Input
                        placeholder="Enter ID number"
                        value={formData.motherIdNumber}
                        onChange={(e) => setFormData((prev) => ({ ...prev, motherIdNumber: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Birth Date & Place - تاريخ و محل الميلاد</Label>
                      <Input
                        placeholder="Enter birth date and place"
                        value={formData.motherBirthInfo}
                        onChange={(e) => setFormData((prev) => ({ ...prev, motherBirthInfo: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Profession - المهنة</Label>
                      <Input
                        placeholder="Enter profession"
                        value={formData.motherProfession}
                        onChange={(e) => setFormData((prev) => ({ ...prev, motherProfession: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Residence Details - محل الإقامة تفصيلا</Label>
                      <Textarea
                        placeholder="Enter residence details"
                        value={formData.motherResidence}
                        onChange={(e) => setFormData((prev) => ({ ...prev, motherResidence: e.target.value }))}
                      />
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            <Separator />

            {/* Siblings Information Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Siblings Information - الأخوة و الأخوات</h3>
                <Button type="button" onClick={addSibling} size="sm" variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Sibling
                </Button>
              </div>
              {siblings.map((sibling, index) => (
                <Card key={sibling.id} className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium">Sibling {index + 1}</h4>
                    {siblings.length > 1 && (
                      <Button type="button" onClick={() => removeSibling(sibling.id)} size="sm" variant="destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label>Name - الاسم رباعي</Label>
                      <Input
                        placeholder="Enter sibling name"
                        value={sibling.name}
                        onChange={(e) => updateSibling(sibling.id, "name", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Profession - المهنة</Label>
                      <Input
                        placeholder="Enter profession"
                        value={sibling.profession}
                        onChange={(e) => updateSibling(sibling.id, "profession", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Birth Date - تاريخ الميلاد</Label>
                      <Input
                        type="date"
                        value={sibling.birthDate}
                        onChange={(e) => updateSibling(sibling.id, "birthDate", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Residence - محل الإقامة تفصيلا</Label>
                      <Input
                        placeholder="Enter residence"
                        value={sibling.residence}
                        onChange={(e) => updateSibling(sibling.id, "residence", e.target.value)}
                      />
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <Separator />

            {/* Declaration Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Declaration - إقرار</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm mb-4">
                  أقر أنا / I declare that all the information provided above is true and accurate to the best of my
                  knowledge.
                  <br />
                  بأن جميع البيانات صحيحة و تحت مسئوليتي
                  <br />و هذا إقرار مني بذلك
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Signature - التوقيع</Label>
                    <Input
                      placeholder="Digital signature or name"
                      value={formData.signature}
                      onChange={(e) => setFormData((prev) => ({ ...prev, signature: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Date - التاريخ</Label>
                    <Input
                      type="date"
                      value={formData.declarationDate}
                      onChange={(e) => setFormData((prev) => ({ ...prev, declarationDate: e.target.value }))}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-6">
              <Button type="submit" size="lg" className="px-8">
                Submit Form - إرسال النموذج
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
