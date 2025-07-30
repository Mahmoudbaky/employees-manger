"use client"

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { Plus, Trash2, User, Users } from 'lucide-react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { toast } from "sonner";
import { useRouter } from 'next/navigation'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { createEmployee } from '@/lib/actions/employee.actions'
import { createEmployeeFormSchema } from '@/lib/validators'


type FormData = z.infer<typeof createEmployeeFormSchema>;

const defaultValues: FormData = {
  name: "",
  nickName: "",
  profession: "",
  birthDate: "",
  nationalId: "",
  maritalStatus: "single",
  residenceLocation: "",
  hiringDate: "",
  hiringType: "full-time",
  email: "",
  administration: "",
  actualWork: "",
  phoneNumber: "",
  notes: "",
  relationships: []
};

const EmployeeForm = () => {
  const router = useRouter()

  // Form state management
  const form = useForm<FormData>({
    resolver: zodResolver(createEmployeeFormSchema),
    defaultValues
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "relationships"
  });

  // Handle form submission
  const onSubmit = async (values: FormData) => {
    try {
      // Transform form data to match the API schema
      const transformedData = {
        ...values,
        birthDate: new Date(values.birthDate),
        hiringDate: new Date(values.hiringDate),
        maritalStatus: (values.maritalStatus === 'single' ? 'أعزب' : 
                      values.maritalStatus === 'married' ? 'متزوج' :
                      values.maritalStatus === 'divorced' ? 'مطلق' : 'أرمل') as 'أعزب' | 'متزوج' | 'مطلق' | 'أرمل',
        hiringType: (values.hiringType === 'full-time' ? 'دوام كامل' :
                    values.hiringType === 'part-time' ? 'دوام جزئي' :
                    values.hiringType === 'contract' ? 'عقد' : 'مؤقت') as 'دوام كامل' | 'دوام جزئي' | 'عقد',
        relationships: values.relationships.map(rel => ({
          ...rel,
          birthDate: new Date(rel.birthDate)
        }))
      };


      console.log("Transformed Data:", transformedData);

      const result = await createEmployee(transformedData as any);   // for now
      
      if (result.success) {
        toast("تم إنشاء الموظف بنجاح");
        router.push("/employees");
      } else {
        toast(result.error || "حدث خطأ أثناء إنشاء الموظف");
      }
    } catch (error) {
      toast("حدث خطأ أثناء إنشاء الموظف");
    }
  };

  const addRelationship = () => {
    append({
      relationshipType: "",
      name: "",
      nationalId: "",
      birthDate: "",
      birthPlace: "",
      profession: "",
      spouseName: "",
      residenceLocation: "",
      notes: ""
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Basic Employee Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Basic Information (المعلومات الأساسية)
            </CardTitle>
            <CardDescription>Employee personal and professional details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name (الاسم رباعي) *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="nickName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nickname (اسم الشهرة) *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter nickname" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="profession"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profession (المهنة) *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter profession" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="birthDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Birth Date (تاريخ الميلاد) *</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="nationalId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>National ID (رقم الهوية الوطنية) *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter national ID" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="maritalStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Marital Status (الحالة الاجتماعية) *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select marital status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="single">أعزب</SelectItem>
                        <SelectItem value="married">متزوج</SelectItem>
                        <SelectItem value="divorced">مطلق</SelectItem>
                        <SelectItem value="widowed">أرمل</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="residenceLocation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Residence Address (العنوان التفصيلي) *</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter detailed address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="hiringDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hiring Date (تاريخ التعيين) *</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="hiringType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hiring Type (نوع التعيين) *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select hiring type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="full-time">Full Time (دوام كامل)</SelectItem>
                        <SelectItem value="part-time">Part Time (دوام جزئي)</SelectItem>
                        <SelectItem value="contract">Contract (عقد)</SelectItem>
                        <SelectItem value="temporary">Temporary (مؤقت)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="administration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Administration (الإدارة) *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select administration" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="human-resources">Human Resources (الموارد البشرية)</SelectItem>
                        <SelectItem value="finance">Finance (المالية)</SelectItem>
                        <SelectItem value="operations">Operations (العمليات)</SelectItem>
                        <SelectItem value="it">Information Technology (تقنية المعلومات)</SelectItem>
                        <SelectItem value="marketing">Marketing (التسويق)</SelectItem>
                        <SelectItem value="legal">Legal Affairs (الشؤون القانونية)</SelectItem>
                        <SelectItem value="procurement">Procurement (المشتريات)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="actualWork"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Actual Work (العمل الفعلي) *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter actual work" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email (البريد الإلكتروني)</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Enter email address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number (رقم الهاتف) *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes (ملاحظات)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter any additional notes" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Relationships Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Family Relationships (العلاقات العائلية)
            </CardTitle>
            <CardDescription>Add family members and their information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {fields.map((field, index) => (
              <div key={field.id} className="border rounded-lg p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">Relationship #{index + 1}</h4>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => remove(index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name={`relationships.${index}.relationshipType`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Relationship Type (نوع العلاقة) *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select relationship type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="father">Father (أب)</SelectItem>
                            <SelectItem value="mother">Mother (أم)</SelectItem>
                            <SelectItem value="spouse">Spouse (زوج/زوجة)</SelectItem>
                            <SelectItem value="son">Son (ابن)</SelectItem>
                            <SelectItem value="daughter">Daughter (ابنة)</SelectItem>
                            <SelectItem value="brother">Brother (أخ)</SelectItem>
                            <SelectItem value="sister">Sister (أخت)</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`relationships.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name (الاسم) *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name={`relationships.${index}.nationalId`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>National ID (رقم الهوية) *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter national ID" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`relationships.${index}.birthDate`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Birth Date (تاريخ الميلاد) *</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name={`relationships.${index}.birthPlace`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Birth Place (مكان الميلاد)</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter birth place" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`relationships.${index}.profession`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Profession (المهنة)</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter profession" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name={`relationships.${index}.spouseName`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Spouse Name (اسم الزوج/الزوجة)</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter spouse name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`relationships.${index}.residenceLocation`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Residence Location (محل الإقامة) *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter residence location" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name={`relationships.${index}.notes`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notes (ملاحظات)</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Enter any notes" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}

            <Button type="button" variant="outline" onClick={addRelationship} className="w-full bg-transparent">
              <Plus className="h-4 w-4 mr-2" />
              Add Relationship
            </Button>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={() => router.push("/employees")}>
            Cancel
          </Button>
          <Button type="submit">Register Employee</Button>
        </div>
      </form>
    </Form>
  )
}

export default EmployeeForm
