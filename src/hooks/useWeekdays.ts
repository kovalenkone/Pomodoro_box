import moment from "moment"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Periods } from "../redux/slices/selectSlice"
import { RootState } from "../redux/store"

interface IWeekDay {
  date: string
  day: string
  active: boolean
  workTime: number
}

export function useWeekdays() {
  const [weekdays, setWeekdays] = useState<IWeekDay[]>([])
  const { selectedPeriod, selectedDate } = useSelector((state: RootState) => state.select)
  const statItems = useSelector((state: RootState) => state.stat)


  useEffect(() => {
    let weekdays = []
    let subtractDays = 0

    switch (selectedPeriod) {
      case Periods.CurrentWeek:
        subtractDays = 0
        break
      case Periods.LastWeek:
        subtractDays = 7
        break
      case Periods.TwoWeeksAgo:
        subtractDays = 14
        break
    }

    for (let day = 0; day < 7; day++) {
      const weekDayDate = moment().subtract(subtractDays, 'days').weekday(day).format('YYYY.MM.DD');
      const weekDayDay = moment().subtract(subtractDays, 'days').weekday(day).format('ddd');
      const workTime = statItems.find(item => item.date === weekDayDate)?.workTime

      weekdays.push({
        date: weekDayDate,
        day: weekDayDay[0].toUpperCase() + weekDayDay.slice(1),
        active: selectedDate === weekDayDate,
        workTime: workTime ? workTime : 0,
      })
    }

    setWeekdays(weekdays)
  }, [selectedPeriod, selectedDate])

  return [weekdays]
}