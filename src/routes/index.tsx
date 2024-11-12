import { FormCheckbox } from '@/components/form/checkbox'
import { FormCombobox } from '@/components/form/combobox'
import { FormDatePicker } from '@/components/form/date-picker'
import { FormFormatNumberInput } from '@/components/form/format-number-input'
import { FormImagePicker } from '@/components/form/img-picker'
import FormInput from '@/components/form/input'
import { FormMonthPicker } from '@/components/form/month-picker'
import { FormMultiCombobox } from '@/components/form/multi-combobox'
import { FormNumberInput } from '@/components/form/number-input'
import FormSelect from '@/components/form/select'
import { FormSlider } from '@/components/form/slider'
import FormTextarea from '@/components/form/textarea'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { createFileRoute } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export const Route = createFileRoute('/')({
  component: HomeComponent,
})

function HomeComponent() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data)
  }

  console.log(form.formState.errors)

  return (
    <div className='w-full'>
      <div className='w-full max-w-lg mx-auto mt-20'>
        <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4'>
          <FormImagePicker methods={form} name='photo' label='Image' />
          <FormInput methods={form} name='name' label='Name' />
          <FormTextarea methods={form} name='description' label='Description' />
          <FormNumberInput methods={form} name='age' label='Age' />
          <FormFormatNumberInput methods={form} name='phone_number' format='+998 ## ### ## ##' label='Phone number' />
          <FormCheckbox methods={form} name='is_active' label='Is active' />
          <FormDatePicker methods={form} name='birth_date' label='Birth date' captionLayout='dropdown-buttons' fromYear={1960} toYear={new Date().getFullYear()} />
          <FormDatePicker methods={form} name='plan_date' label='Plan date' />
          <FormSelect methods={form} name='gender' options={[{ name: 'Male', id: 1 }, { name: 'Female', id: 2 }]} label='Gender' />
          <FormCombobox methods={form} name='color' options={colors} label='Color' />
          <FormMultiCombobox methods={form} name='multi_colors' label='Colors' options={colors} />
          <FormMonthPicker methods={form} name='month' label='Pick a month' />
          <FormSlider methods={form} name='lang_val' label='Language level' step={1} min={1} max={5} />
          <Button>Submit</Button>
        </form>
      </div>
    </div>
  )
}

const formSchema = z.object({
  photo: z.instanceof(File).or(z.string({ message: "" }).min(1)),
  name: z.string({ message: 'Name is required' }).min(5, { message: 'Name length must be at least 5' }),
  age: z.string({ message: 'Age is required' }).min(1, 'Age must be at least 1').transform(t => +t),
  phone_number: z.string({ message: 'Phone number is required' }).length(9, 'Enter correct phone number'),
  is_active: z.boolean().default(false),
  plan_date: z.string({ message: 'Plan date is required' }).min(1),
  birth_date: z.string({ message: "Date is required" }).min(1, { message: "Date is required" }),
  gender: z.string({ message: 'Gender is required' }).transform(t => +t),
  color: z.number({ message: 'Color is required' }).min(1),
  month: z.string({ message: "Select a month" }).min(1),
  description: z.string({ message: "Write short description" }).min(1, { message: "Write short description" }),
  lang_val: z.number({ message: "Enter lanuage level" }).min(1),
  multi_colors: z.array(z.number({ message: "Select colors" })).min(1, { message: "Select colors" })
})

const colors = [
  {
    name: 'Red',
    id: 1
  },
  {
    name: 'Blue',
    id: 2
  },
  {
    name: 'Green',
    id: 3
  }
]