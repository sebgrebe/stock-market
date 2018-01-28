const dateToStr = (date) => {
    let year = date.getFullYear()
    let month = (date.getMonth() < 9) ? '0'+ (date.getMonth()+1).toString() : (date.getMonth()+1).toString()
    let day = (date.getDate() < 10) ? '0'+ date.getDate().toString() : date.getDate().toString()
    return year+"-"+month+"-"+day
}

export default dateToStr