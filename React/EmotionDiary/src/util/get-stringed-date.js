// 새 일기 쓰기 (new) 페이지에서 calender의 날짜를 오늘 날짜로 변경해주는 함수
export const getStringedDate = (targetDate) => {
    // 날짜 -> YYYY-MM-DD 로 반환해야하는 기능
    let year = targetDate.getFullYear()
    let month = targetDate.getMonth() + 1
    let date = targetDate.getDate()

    // 10월 또는 10일 미만일때는 앞에 0을 붙여주면서 반환 ex) 09, 08, 07...
    if (month < 10) {
        month = `0${month}`
    }

    if (date < 10) {
        date = `0${date}`
    }

    return `${year}-${month}-${date}`
}
