const clock = document.querySelector(".clock")
const today = document.querySelector(".day")

function getClock(){
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    clock.innerText = `${hours}:${minutes}`

    console.log(1111)
}

getClock();
setInterval(getClock, 1000); 

function getToday(){
    const todayDate = new Date();

    // 요일별 배열
    const days = [
        '일요일' , '월요일', '화요일' , '수요일' , '목요일' , '금요일' , '토요일' 
    ]

    const days_num = todayDate.getDay();

    // 년도 구하기
    const year = todayDate.getFullYear();
    // month 구하기
    const month = todayDate.getMonth() + 1;
    // 날짜 구하기
    const date = todayDate.getDate();
    // 요일 구하기
    const day = days[days_num]

    today.innerText = `${year}년 ${month}월 ${date}일 ${day}`;
}

getToday();