const moment = require('moment-timezone')

module.exports = (time) => {
    let today = new Date()
    let time_diff = parseInt(moment(today).tz("America/Toronto").format('Z'))
    let time_NYC = new Date(time.setHours(time.getHours() + time_diff))
    return time_NYC
}