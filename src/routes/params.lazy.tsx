import { ParamCombobox } from '@/components/param/combobox'
import ParamDatePicker from '@/components/param/date-picker'
import ParamMonthPicker from '@/components/param/month-picker'
import { ParamMultiCombobox } from '@/components/param/multi-combobox'
import ParamPagination from '@/components/param/pagination'
import ParamRadioGroup from '@/components/param/radio-group'
import { ParamSelect } from '@/components/param/select'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/params')({
  component: ParamComponent,
})

function ParamComponent() {
  return (
    <div className='w-full max-w-lg mx-auto pt-20 flex flex-col gap-4'>
      <ParamMonthPicker className='w-full' />
      <ParamDatePicker className='w-full' />
      <ParamCombobox paramName='color' options={colors} className='w-full' label='Select a color' />
      <ParamMultiCombobox paramName='colors' options={colors} className='w-full' label='Select colors' />
      <ParamSelect paramName='color-select' options={select_colors} className='w-full' label='Select a color ' />
      <ParamPagination totalPages={10} />
      <ParamRadioGroup paramName='color-radio' options={select_colors} className='w-full flex gap-4' />
    </div>
  )
}


const colors = [
  {
    name: "Green",
    id: 1
  },
  {
    name: "Red",
    id: 2
  },
  {
    name: "Blue",
    id: 3
  }
]

const select_colors = [
  {
    name: "All",
    id: 'all'
  },
  {
    name: "Green",
    id: 1
  },
  {
    name: "Red",
    id: 2
  },
  {
    name: "Blue",
    id: 3
  }
]