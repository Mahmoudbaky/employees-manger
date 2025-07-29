"use client"

import { useState, useEffect } from 'react'
import { EmployeeForm } from '@/components/employee-form'
import { EmployeesTable } from '@/components/employees-table'
import { getEmployees } from '@/lib/actions/employee.actions'

type Employee = {
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

export default function EmployeesPageClient() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [loading, setLoading] = useState(true)

  const fetchEmployees = async () => {
    setLoading(true)
    try {
      const result = await getEmployees()
      if (result.success && result.employees) {
        setEmployees(result.employees as Employee[])
      }
    } catch (error) {
      console.error('Error fetching employees:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEmployees()
  }, [])

  const handleEmployeeAdded = () => {
    fetchEmployees()
  }

  const handleEmployeeDeleted = () => {
    fetchEmployees()
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="space-y-8">
        {/* Page Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">إدارة الموظفين</h1>
          <p className="text-gray-600">نظام إدارة بيانات الموظفين</p>
        </div>

        {/* Employee Form */}
        <EmployeeForm onSuccess={handleEmployeeAdded} />

        {/* Employees Table */}
        {loading ? (
          <div className="text-center py-8">
            <p>جاري تحميل البيانات...</p>
          </div>
        ) : (
          <EmployeesTable 
            employees={employees} 
            onEmployeeDeleted={handleEmployeeDeleted}
          />
        )}
      </div>
    </div>
  )
}
