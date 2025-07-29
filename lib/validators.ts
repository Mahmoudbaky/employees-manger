import z from 'zod';


export const signInSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});


export const createEmployeeSchema = z.object({
  arabicName: z.string().min(1, 'الاسم مطلوب'),
  nickName: z.string().min(1, 'اسم الشهرة مطلوب'),
  profession: z.string().min(1, 'المهنة مطلوبة'),
  birthDate: z.string().transform((str) => new Date(str)),
  nationalId: z.string().min(1, 'رقم الهوية الوطنية مطلوب'),
  maritalStatus: z.enum(['متزوج', 'أعزب', 'مطلق', 'أرمل']),
  residenceLocation: z.string().min(1, 'العنوان التفصيلي مطلوب'),  
  hiringDate: z.string().transform((str) => new Date(str)),
  hiringType: z.enum(['دوام كامل', 'دوام جزئي', 'عقد']),
  email: z.string().email('البريد الإلكتروني غير صحيح').optional().or(z.literal('')),
  administration: z.string().min(1, 'الإدارة مطلوبة'),
  actualWork: z.string().min(1, 'العمل الفعلي مطلوب'),
  phoneNumber: z.string().min(1, 'رقم الهاتف مطلوب'),
  notes: z.string().optional(),
});