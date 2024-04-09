// 바차트
new Chart(document.querySelector('#bar-chart'), {
    type: 'bar',
    data: {
        labels: ['1일', '2일', '3일', '4일', '5일'],
        datasets: [
            {
                label: "매출",
                backgroundColor: "#3CB371",
                data: [10.5, 11.5, 15.7, 8.5, 13.0]
            }
        ]
    },
    options: {
        maxBarThickness: 35,
        legend: { display: true },
        title: {
            display: true,
            text: '관리자 권한 매출 관리'
        },
        scales: {
            y: {
                min: 0,
                max: 20
            }
        }
    }
});