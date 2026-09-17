import TimeListCard from './TimeListCard'

export default function Appointments() {
  return (
    <TimeListCard
      table="appointments"
      title="นัดหมายสำคัญ"
      icon="fa-regular fa-calendar-check"
      headerBg="bg-[#5A2A82]"
      dotColor="bg-purple-700"
      emptyText="- ไม่มีนัดหมายสำคัญ -"
    />
  )
}
