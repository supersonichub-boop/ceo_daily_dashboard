import TimeListCard from './TimeListCard'

export default function TodaySchedule() {
  return (
    <TimeListCard
      table="schedule_items"
      title="TODAY SCHEDULE"
      icon="fa-regular fa-clock"
      headerBg="bg-[#0B1E36]"
      dotColor="bg-[#0B1E36]"
      emptyText="- ไม่มีตารางวันนี้ -"
    />
  )
}
