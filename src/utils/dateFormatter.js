import moment from 'moment'

// With moment
export const dateToYear = date => moment(date).format('YYYY')
export const dateToMonth = date => moment(date).format('MMM YYYY')
export const dateToWeek = date => moment(date).format('GGGG-[W]WW')
export const dateToDay = date => moment(date).format('YYYY-MM-DD')
export const dateToMySQL = date => moment(date).format('YYYY-MM-DD HH:mm:ss')
export const dateBeautify = date => moment(date).format('Do MMMM YYYY')
export const dateMin = date => moment(date).utcOffset(+3).format('MM/DD/YYYY, h:mm a')

// My Functions
export const dateLabelsToHoursList = data => {
  let tmp = data.map(entry => {
    let date = new Date(entry)
    let tmp = ((date.toLocaleString('ru-RU')).split(',')[1]).split(':').slice(0, 2)
    return tmp.join(':').trim()
  })
  return tmp
}
