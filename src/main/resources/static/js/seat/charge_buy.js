function buyDetail(){
    const buyDetail = document.querySelector('.buyDetail');
    fetch('/seat/buyDetail', { //요청경로
        method: 'POST',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        //컨트롤러로 전달할 데이터
        body: new URLSearchParams({
           // 데이터명 : 데이터값
        })
    })
    .then((response) => {
        if(!response.ok){
            alert('fetch error!\n컨트롤러로 통신중에 오류가 발생했습니다.');
            return ;
        }
    
        return response.text(); //컨트롤러에서 return하는 데이터가 없거나 int, String 일 때 사용
        //return response.json(); //나머지 경우에 사용
    })
    //fetch 통신 후 실행 영역
    .then((data) => {//data -> controller에서 리턴되는 데이터!
        buyDetail.innerHTML='';
        let str = '';
        str = `
            <div class="row text-start mt-4">
                <div class="col">
                    <h3>선택한 이용권 구매</h3>
                </div>
            </div>
            <div class="row">
                    <div class="col">
                        <div class="text-end" style="font-size: 11pt; color: red;">
                        * 구매 후 교환 및 환불이 불가능합니다.
                        </div>
                    </div>
                </div>
                <div class="row scrollbar" style="height: 70%; overflow: auto;">
                    <div class="col">
                        <table class="table table-hover text-center align-middle table-bordered" style="font-size: 12pt;">
                            <colgroup>
                                <col width="10%">
                                <col width="15%">
                                <col width="50%">
                                <col width="10%">
                                <col width="15%">
                            </colgroup>
                            <thead>
                                <tr class="table-success">
                                    <td>No</td>
                                    <td>상품코드</td>
                                    <td>상품명</td>
                                    <td>재고</td>
                                    <td>상태</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="pointer-span" th:onclick="buyDetail()">
                                    <td>1</td>
                                    <td>123</td>
                                    <td>ㄴㅇㄻ</td>
                                    <td>12324</td>
                                    <td>ㅇㄴㄹ</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
        `;
        

        buyDetail.insertAdjacentHTML("afterbegin", str);
    })
    //fetch 통신 실패 시 실행 영역
    .catch(err=>{
        alert('fetch error!\nthen 구문에서 오류가 발생했습니다.\n콘솔창을 확인하세요!');
        console.log(err);
    });

}