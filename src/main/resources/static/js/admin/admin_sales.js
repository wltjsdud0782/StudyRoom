//바로 실행시키기
getChartData();

//월매출 차트 호출
function getChartData() {
    //2번째 fetch
    fetch('/admin/getChart', { //요청경로
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
        new Chart(document.querySelector('#bar-chart'), {
            type: 'bar',
            data: {
                labels: [
                    '1월', '2월', '3월', '4월', '5월', '6월',
                    '7월', '8월', '9월', '10월', '11월', '12월'],
                datasets: [
                    {
                        label: "월 매출",
                        backgroundColor: "#3CB371",
                        data: [
                            10.5, 11.5, 15.7, 8.5, 13.0, 10.5
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
                        max: 30
                    }
                }
            }
        });

    })
    //fetch 통신 실패 시 실행 영역
    .catch(err=>{
        alert('fetch error!\nthen 구문에서 오류가 발생했습니다.\n콘솔창을 확인하세요!');
        console.log(err);
    });
}