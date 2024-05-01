//바로 실행시키기
getMonthChart();
getYearChart();
getTableData();

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

            /////////////////////////////////////////////////////////////////////
            const date = new Date();
            let year = date.getFullYear();
            //let month = date.getMonth() + 1;
            const year1 = document.querySelector('.year1');
            year1.innerHTML = '';
            let str = '';
            str += `
                <h4>올해 (${year}년)</h4>
            `;
            year1.insertAdjacentHTML('afterbegin', str);
            /////////////////////////////////////////////////////////////////////

            //리스트 만들기
            const yearList = [];
            const salesList = [];
            for (const each of data) {
                yearList.push(each.yearSales);
                salesList.push(each.salesFee);
            }

            //연간 매출 차트 그림
            const yearChart = document.querySelector('#bar-chart2');

            new Chart(yearChart, {
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
                            max: 500000000
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

            /////////////////////////////////////////////////////////////////////
            const date = new Date();
            //let year = date.getFullYear();
            let month = date.getMonth() + 1;
            const month1 = document.querySelector('.month1');
            month1.innerHTML = '';
            let str = '';
            str += `
                <h4>이번 달 (${month}월)</h4>
            `;
            month1.insertAdjacentHTML('afterbegin', str);
            /////////////////////////////////////////////////////////////////////

            //리스트 만들기
            const monthList = [];
            const salesList = [];
            for (const each of data) {
                monthList.push(each.monthSales);
                salesList.push(each.salesFee);
            }

            //월별매출 차트 그림
            const monthChart = document.querySelector('#bar-chart1');

            new Chart(monthChart, {
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
                            max: 100000000
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
/////////////////////////////////////
function getTableData() {
    //2번째 fetch
    fetch('/admin/getTableData', { //요청경로
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
            console.log(data);

            const tableData = [];

            //데이터 테이블1 - TYPE_NAME과 SUM_FEE(합계) 넣기
            data.chargeNameList.forEach((element, idx) => {
                const rowData = {};
                rowData['type'] = element;
                data.monthList.forEach((m, i) => {
                    let find_data = 0;
                    data.mapList.forEach((each) => {
                        if (each.TYPE_NAME == element && each.MONTH == m) {
                            find_data = each.SUM_FEE;
                        }
                    });
                    //console.log(find_data);
                    rowData[data.monthList[i]] = find_data;
                });
                //rowData.sumData = 10;
                tableData.push(rowData);
            });

            //데이터 테이블2 - 합계 넣기
            tableData.forEach((element, idx) => {
                const sumFee = { ...element };
                delete sumFee.type;
                let sum = 0;
                for (const key in sumFee) {
                    sum = sum + sumFee[key];
                }
                element['sumFee'] = sum;
            });
            console.log(tableData);

            //총 합계 만들어 넣기
            let totalFee = 0;
            let eachFee = 0;
            // for (let i = 0; i < data.chargeNameList.length; i++){
            //     totalFee = totalFee + tableData[i].sumFee
            // }

            // 23년 4월
            // 24 / SUM_FEE : 0
            // 25 / SUM_FEE : 4455644
            // 26 / SUM_FEE : 0
            // 27 / SUM_FEE : 0
            // 28 / SUM_FEE : 0
            // 29 / SUM_FEE : 0
            // 30 / SUM_FEE : 0
            // 31 / SUM_FEE : 0

            // 컬럼의 개수 * j
            // 8 * 13 = 104
            
            
            // T-HEAD
            ////////////////////////////////////////////////////////////////////
            const monthSalesHead = document.querySelector('.monthdata-h');
            monthSalesHead.innerHTML = '';
            let str_1 = '';
            str_1 += `              
                <tr>
                    <td rowspan="2">구분</td>`;
            data.monthList.forEach((element, idx) => {
                str_1 += `
                    <td>${element}</td>
                `;
            });
            str_1 += `
                    <td>합계</td>
                </tr>`;
            str_1 += `
                <tr>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                </tr>
            `;
            monthSalesHead.insertAdjacentHTML('afterbegin', str_1);
            ////////////////////////////////////////////////////////////////////


            // T-BODY
            ////////////////////////////////////////////////////////////////////
            const monthSalesBody = document.querySelector('.monthdata-b');
            monthSalesBody.innerHTML = '';
            let str_2 = '';
            for (let i = 0; i < data.chargeNameList.length; i++) {
                str_2 += `
                <tr>
                    <td class="table-active">${tableData[i].type}</td>`;
                for (let j = 0; j < data.mapList.length / data.chargeNameList.length; j++) {
                    str_2 += `<td>${tableData[i][data.monthList[j]]}</td>`;
                }
                str_2 += `                            
                    <td class="totalFee ${i}">${tableData[i].sumFee}</td>
                <tr>`;
            }
            str_2 += `
                <tr>
                    <td class="table-active">합계</td>`;
            for (let j = 0; j < data.mapList.length / data.chargeNameList.length; j++) {
                str_2 += `<td>${eachFee}</td>`;
            }
            str_2 += `
                    <td>${totalFee}</td>
                </tr>
            `;
            monthSalesBody.insertAdjacentHTML('afterbegin', str_2);
            ////////////////////////////////////////////////////////////////////


        })
        //fetch 통신 실패 시 실행 영역
        .catch(err => {
            alert('fetch error!\nthen 구문에서 오류가 발생했습니다.\n콘솔창을 확인하세요!');
            console.log(err);
        });
}