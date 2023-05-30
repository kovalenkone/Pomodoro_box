import moment from "moment"
import { pluralTime } from "./pluralTime"

export enum SizeOptions {
  large,
  medium,
  short,
}

export const formatTime = (time: number, size: SizeOptions) => {
  const seconds = Number(moment(time * 1000).format('s'))
  const minutes = Number(moment(time * 1000).format('m'))
  const hours = Number(moment.utc(time * 1000).format('HH'))

  switch (size) {
    case SizeOptions.large:
      if (minutes === 0 && hours === 0) {
        return pluralTime(seconds, true, 'ss')
      } else if (minutes > 0 && hours === 0) {
        return `${pluralTime(minutes, true, 'mm')}`
      } else {
        return `${pluralTime(hours, true, 'hh')} ${pluralTime(minutes, true, 'mm')}`
      }

    case SizeOptions.medium:
      if (hours === 0) {
        return `${minutes} мин`
      } else {
        return `${hours} час ${minutes} мин`
      }
      
    case SizeOptions.short: 
      if (time === 0) {
        return `0м`
      } else if(hours === 0 && minutes === 0) {
        return `${seconds}с`
      } else {
        return `${minutes}м ${seconds}с`
      }
  }
}