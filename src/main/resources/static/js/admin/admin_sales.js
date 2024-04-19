//차트 기본값
let ifChart = null;

//월매출 바로 실행시키기
getMonthChart();

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

            //리스트 만들기
            const yearList = [];
            const salesList = [];
            for (const each of data) {
                yearList.push(each.yearSales);
                salesList.push(each.salesFee);
            }

            //연간 매출 차트 그림
            const yearChart = document.querySelector('#bar-chart');

            //기존의 차트를 파괴
            if (ifChart !== null) {
                ifChart.destroy();
            }

            ifChart = new Chart(yearChart, {
                type: 'bar',
                data: {
                    labels: yearList,
                    datasets: [
                        {
                            label: "연 매출",
                            backgroundColor: "#A1CE5D",
                            data: salesList
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
                            max: 300000000
                        }
                    }
                }
            });
        })

        //fetch 통신 실패 시 실행 영역
        .catch(err => {
            alert('fetch error!\nthen 구문에서 오류가 발생했습니다.\n콘솔창을 확인하세요!');
            console.log(err);
        });
}

//월 매출 차트 호출
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

            //리스트 만들기
            const monthList = [];
            const salesList = [];
            for (const each of data) {
                monthList.push(each.monthSales);
                salesList.push(each.salesFee);
            }

            //월별매출 차트 그림
            const monthChart = document.querySelector('#bar-chart');

            //기존의 차트를 파괴
            if (ifChart !== null) {
                ifChart.destroy();
            }

            ifChart = new Chart(monthChart, {
                type: 'bar',
                data: {
                    labels: monthList,
                    datasets: [
                        {
                            label: "월 매출",
                            backgroundColor: "#4CC764",
                            data: salesList
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
                            // , ticks: { // y축 줄당 표시 값
                            //     stepSize: 1
                            // }
                        },
                        
                    }
                }
            });

        })

        //fetch 통신 실패 시 실행 영역
        .catch(err => {
            alert('fetch error!\nthen 구문에서 오류가 발생했습니다.\n콘솔창을 확인하세요!');
            console.log(err);
        });
}