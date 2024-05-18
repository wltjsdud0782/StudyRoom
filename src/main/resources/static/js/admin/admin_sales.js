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
            let str_1 = '';
            str_1 += `
                <h4>&nbsp;올해 (${year}년)</h4>
            `;
            year1.insertAdjacentHTML('afterbegin', str_1);
            const year2 = document.querySelector('.year2');
            year2.innerHTML = '';
            let str_2 = '';
            str_2 += `
                <h4>&nbsp;작년 (${year - 1}년)</h4>
            `;
            year2.insertAdjacentHTML('afterbegin', str_2);
            /////////////////////////////////////////////////////////////////////

            /////////////////////////////////////////////////////////////////////
            const totalSumY = document.querySelector('.salesY_SUM');
            const sumY = document.querySelectorAll('.salesY');
            let sum_1 = 0;
            for (let i = 0; i < sumY.length; i++) {
                sum_1 += parseInt(sumY[i].textContent.replace(/,/g, ""));
            }
            totalSumY.innerHTML = '';
            let str_3 = '';
            str_3 += `<div>${sum_1.toLocaleString('ko-KR')}</div>`;
            totalSumY.insertAdjacentHTML('afterbegin', str_3);
            const totalSumYA = document.querySelector('.salesYA_SUM');
            const sumYA = document.querySelectorAll('.salesYA');
            let sum_2 = 0;
            for (let i = 0; i < sumYA.length; i++) {
                sum_2 += parseInt(sumYA[i].textContent.replace(/,/g, ""));
            }
            totalSumYA.innerHTML = '';
            let str_4 = '';
            str_4 += `<div>${sum_2.toLocaleString('ko-KR')}</div>`;
            totalSumYA.insertAdjacentHTML('afterbegin', str_4);
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
                            max: 50000000
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
            let str_1 = '';
            str_1 += `
                <h4>&nbsp;이번 달 (${month}월)</h4>
            `;
            month1.insertAdjacentHTML('afterbegin', str_1);
            const month2 = document.querySelector('.month2');
            month2.innerHTML = '';
            let str_2 = '';
            str_2 += `
                <h4>&nbsp;지난 달 (${month - 1}월)</h4>
            `;
            month2.insertAdjacentHTML('afterbegin', str_2);
            /////////////////////////////////////////////////////////////////////

            /////////////////////////////////////////////////////////////////////
            const totalSumM = document.querySelector('.salesM_SUM');
            const sumM = document.querySelectorAll('.salesM');
            let sum_1 = 0;
            for (let i = 0; i < sumM.length; i++) {
                sum_1 += parseInt(sumM[i].textContent.replace(/,/g, ""));
            }
            totalSumM.innerHTML = '';
            let str_3 = '';
            str_3 += `<div>${sum_1.toLocaleString('ko-KR')}</div>`;
            totalSumM.insertAdjacentHTML('afterbegin', str_3);
            const totalSumMA = document.querySelector('.salesMA_SUM');
            const sumMA = document.querySelectorAll('.salesMA');
            let sum_2 = 0;
            for (let i = 0; i < sumMA.length; i++) {
                sum_2 += parseInt(sumMA[i].textContent.replace(/,/g, ""));
            }
            totalSumMA.innerHTML = '';
            let str_4 = '';
            str_4 += `<div>${sum_2.toLocaleString('ko-KR')}</div>`;
            totalSumMA.insertAdjacentHTML('afterbegin', str_4);
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
                            max: 5000000
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

//연간 매출 테이블
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
            ///////////////////////////////////////////////////////////////////////////////////////////////////

            //데이터 테이블1 - TYPE_NAME과 SUM_FEE(합계) 넣기
            const tableData = [];
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
                    rowData[data.monthList[i]] = find_data;
                });
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
            /////////////////////////////////////////////////////////////////////////////////////////////////// 

            //갯수 합계 만들기
            const cntData = [];
            data.monthList.forEach((element, idx) => {
                const totalCnt = {};
                totalCnt['type'] = element;
                data.chargeNameList.forEach((m, i) => {
                    let cnt = 0;
                    data.mapList.forEach((each) => {
                        if (each.TYPE_NAME == m && each.MONTH == element) {
                            cnt = each.CNT;
                        }
                    });
                    totalCnt[data.chargeNameList[i]] = cnt;
                });
                cntData.push(totalCnt);
            });

            //개수의 최종 합계 넣기
            cntData.forEach((element, idx) => {
                const cntFee = { ...element };
                delete cntFee.type;
                let sum = 0;
                for (const key in cntFee) {
                    sum = sum + cntFee[key];
                }
                element['cnt'] = sum;
            });
            //총 합계 만들어 넣기
            let totalCnt = 0;
            let totalSum = 0;
            for (let i = 0; i < data.monthList.length; i++) {
                totalSum = totalSum + cntData[i].cnt;
            }
            totalCnt = totalSum

            /////////////////////////////////////////////////////////////////////////////////////////////////// 

            //갯수 합계 만들기
            const feeData = [];
            data.monthList.forEach((element, idx) => {
                const totalCnt = {};
                totalCnt['type'] = element;
                data.chargeNameList.forEach((m, i) => {
                    let monthFee = 0;
                    data.mapList.forEach((each) => {
                        if (each.TYPE_NAME == m && each.MONTH == element) {
                            monthFee = each.SUM_FEE;
                        }
                    });
                    totalCnt[data.chargeNameList[i]] = monthFee;
                });
                feeData.push(totalCnt);
            });
            //개수의 최종 합계 넣기
            feeData.forEach((element, idx) => {
                const cntFee = { ...element };
                delete cntFee.type;
                let sum = 0;
                for (const key in cntFee) {
                    sum = sum + cntFee[key];
                }
                element['monthFee'] = sum;
            });

            //총 합계 만들어 넣기
            let totalfee = 0;
            let sumfee = 0;
            for (let i = 0; i < data.monthList.length; i++) {
                sumfee = sumfee + feeData[i].monthFee;
            }
            totalfee = sumfee;

            /////////////////////////////////////////////////////////////////////////////////////////////////// 
            const date = new Date();
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            const title = document.querySelector('.sales12')
            title.innerHTML = '';
            let str = ``;
            str += `<h4>&nbsp;${year - 1}년 ${month}월 ~ ${year}년 ${month}월</h4>`;
            title.insertAdjacentHTML('afterbegin', str);

            // T-HEAD
            ////////////////////////////////////////////////////////////////////
            const monthSalesHead = document.querySelector('.monthdata-h');
            monthSalesHead.innerHTML = '';
            let str_1 = '';
            str_1 += `              
                <tr>
                    <td class="table-active left">구분</td>
                    `;
            data.monthList.forEach((element, idx) => {
                str_1 += `
                    <td>${element}</td>
                `;
            });
            str_1 += `
                    <td class="table-active left">합계</td>
                </tr>
                `;
            str_1 += `
                <tr>
                    <td class="table-active left">개수</td>
                `;
            for (let i = 0; i < data.monthList.length; i++) {
                str_1 += `     
                    <td class="right">${cntData[i].cnt}EA</td>
                    `;
            }
            str_1 += `
                    <td class="table-active right">${totalCnt}EA</td>
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
                    <td class="table-active left">${tableData[i].type}</td>
                    `;
                for (let j = 0; j < data.mapList.length / data.chargeNameList.length; j++) {
                    str_2 += `
                    <td class="rowFee${i} colFee${j} right">${tableData[i][data.monthList[j]].toLocaleString('ko-KR')}</td>
                    `;
                }
                str_2 += `                            
                    <td class="table-active totalFee ${i} right">${tableData[i].sumFee.toLocaleString('ko-KR')}</td>
                <tr>`;
            }
            monthSalesBody.insertAdjacentHTML('afterbegin', str_2);
            ////////////////////////////////////////////////////////////////////

            // T-FOOTER
            ////////////////////////////////////////////////////////////////////
            const monthSalesFooter = document.querySelector('.monthdata-f');
            monthSalesFooter.innerHTML = '';
            let str_3 = '';
            str_3 += `
                <tr>
                    <td class="table-active left">합계</td>
                `;
            for (let i = 0; i < data.monthList.length; i++) {
                str_3 += `
                    <td class="right">${feeData[i].monthFee.toLocaleString('ko-KR')}</td>
                `;
            }
            str_3 += `
                    <td class="table-active right">${totalfee.toLocaleString('ko-KR')}</td>
                </tr>
            `;
            monthSalesFooter.insertAdjacentHTML('afterbegin', str_3);
        })
        //fetch 통신 실패 시 실행 영역
        .catch(err => {
            alert('fetch error!\nthen 구문에서 오류가 발생했습니다.\n콘솔창을 확인하세요!');
            console.log(err);
        });
}