//차트있? 기본값
let ifChart = null;

//월매출 바로 실행시키기
getMonthChart();

//월매출 차트 호출
function getMonthChart() {
    //2번째 fetch
    fetch('/admin/getMonthChart', { //요청경로
        method: 'POST',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        //컨트롤러로 전달할 데이터
        body: JSON.stringify({
            // 데이터명 : 데이터값
        })
    })
        .then((response) => {
            return response.json(); //나머지 경우에 사용
        })
        //fetch 통신 후 실행 영역
        .then((data) => {//data -> controller에서 리턴되는 데이터!
            console.log(data); //04

            //월별매출 차트 그림
            const monthChart = document.querySelector('#bar-chart');

            //기존의 차트를 파괴
            if (ifChart !== null) {
                ifChart.destroy();
            }

            const date = new Date();
            const currentYear = date.getFullYear();

            ifChart = new Chart(monthChart, {
                type: 'bar',
                data: {
                    labels: [
                        '1월', '2월', '3월', '4월', '5월', '6월',
                        '7월', '8월', '9월', '10월', '11월', '12월'],
                    datasets: [
                        {
                            label: "월 매출 ("+currentYear+"년)",
                            backgroundColor: "#3CB371",
                            data: [
                                data[0].salesFee, data[1].salesFee, data[2].salesFee, data[3].salesFee, 13.0, 10.5
                                , 11.5, 15.7, 8.5, 13.0, 12.3, 21.2]
                        }
                    ]
                },
                options: {
                    maxBarThickness: 20,
                    legend: { display: true },
                    title: {
                        display: true,
                        text: '관리자 권한 매출 관리'
                    },
                    scales: {
                        y: {
                            min: 0,
                            max: 50000000
                        }
                    }
                }
            });

            //월말 매출 데이터 테스트
            const month = document.querySelector('#testing')
            month.innerHTML = '';
            let str_month = '';
            str_month += `<div>`;
            for (let i = 0; i < data.length; i++) {
                str_month += `
                    <div>${data[i].monthSales}월 매출 : ${data[i].salesFee}원</div>
                `;
            }
            str_month += `</div>`;
            month.insertAdjacentHTML('afterbegin', str_month);
        })

        //fetch 통신 실패 시 실행 영역
        .catch(err => {
            alert('fetch error!\nthen 구문에서 오류가 발생했습니다.\n콘솔창을 확인하세요!');
            console.log(err);
        });
}

//연매출 차트 호출
function getYearChart() {
    //2번째 fetch
    fetch('/admin/getYearChart', { //요청경로
        method: 'POST',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        //컨트롤러로 전달할 데이터
        body: JSON.stringify({
            // 데이터명 : 데이터값
        })
    })
        .then((response) => {
            return response.json(); //나머지 경우에 사용
        })
        //fetch 통신 후 실행 영역
        .then((data) => {//data -> controller에서 리턴되는 데이터!
            console.log(data); //04

            //연간 매출 차트 그림
            const yearChart = document.querySelector('#bar-chart');

            //기존의 차트를 파괴
            if (ifChart !== null) {
                ifChart.destroy();
            }

            ifChart = new Chart(yearChart, {
                type: 'bar',
                data: {
                    labels: [data[0].yearSales-5+"년", data[0].yearSales-4+"년", data[0].yearSales-3+"년", 
                            data[0].yearSales-2+"년", data[0].yearSales-1+"년", data[0].yearSales+"년"],
                    datasets: [
                        {
                            label: "연 매출",
                            backgroundColor: "#3CB371",
                            data: [11.5, 15.7, 8.5, 13.0, data[1].salesFee, data[0].salesFee]
                        }
                    ]
                },
                options: {
                    maxBarThickness: 20,
                    legend: { display: true },
                    title: {
                        display: true,
                        text: '관리자 권한 매출 관리'
                    },
                    scales: {
                        y: {
                            min: 0,
                            max: 200000000
                        }
                    }
                }
            });

            //연말 매출 데이터 테스트
            const year = document.querySelector('#testing')
            year.innerHTML = '';
            let str_year = '';
            str_year += `<div>`;
            for (let i = 0; i < data.length; i++) {
                str_year += `
                    <div>${data[i].yearSales}년 매출 : ${data[i].salesFee}원</div>
                `;
            }
            str_year += `</div>`;
            year.insertAdjacentHTML('afterbegin', str_year);


        })
        //fetch 통신 실패 시 실행 영역
        .catch(err => {
            alert('fetch error!\nthen 구문에서 오류가 발생했습니다.\n콘솔창을 확인하세요!');
            console.log(err);
        });
}