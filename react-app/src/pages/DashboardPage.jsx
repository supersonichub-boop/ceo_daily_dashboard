import Header from '../components/Header'
import CashLiquidity from '../components/CashLiquidity'
import CompaniesOverview from '../components/CompaniesOverview'
import TodaySchedule from '../components/TodaySchedule'
import Appointments from '../components/Appointments'
import TasksCard from '../components/TasksCard'
import Decisions from '../components/Decisions'
import Risk from '../components/Risk'
import KpiFooter from '../components/KpiFooter'

export default function DashboardPage() {
  return (
    <div className="dash-wrapper">
      <div className="dash-card animate-fade-in">
        <Header />

        <div className="dash-main">
          <div className="dash-col">
            <CashLiquidity />
            <CompaniesOverview />
            <TodaySchedule />
            <Appointments />
          </div>

          <div className="dash-col">
            <TasksCard />
          </div>

          <div className="dash-col" style={{ gap: 6 }}>
            <Decisions />
            <Risk />
          </div>
        </div>

        <div className="dash-footer">
          <KpiFooter />
        </div>
      </div>
    </div>
  )
}
