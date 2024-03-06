const IMP = window.IMP;
IMP.init("imp82847817");

function buyDetail(chargeCode, loginInfo) {
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
            chargeCode: chargeCode
        })
    })
        .then((response) => {
            if (!response.ok) {
                alert('fetch error!\n컨트롤러로 통신중에 오류가 발생했습니다.');
                return;
            }

            //return response.text(); //컨트롤러에서 return하는 데이터가 없거나 int, String 일 때 사용
            return response.json(); //나머지 경우에 사용
        })
        //fetch 통신 후 실행 영역
        .then((data) => {//data -> controller에서 리턴되는 데이터!
            buyDetail.innerHTML = '';
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
        <div class="row mt-4">
            <div class="col">
                <table class="table table-borderless text-center align-middle" style="font-size: 13pt;">
                    <colgroup>
                        <col width="40%">
                        <col width="60%">
                    </colgroup>
                    <tr>
                        <td class="text-end">상품명</td>
                        <td>${data.chargeName}</td>
                    </tr>
                    <tr>
                        <td class="text-end">가격</td>
                        <td>${data.chargeFee.toLocaleString()} 원</td>
                    </tr>
                    <tr>
                        <td class="text-end">구매자ID</td>
                        <td>${loginInfo.memberId}</td>
                    </tr>
                    <tr>
                        <td class="text-end">구매자명</td>
                        <td>${loginInfo.memberName}</td>
                    </tr>
                    <tr>
                        <td class="text-end">구매자번호</td>
                        <td>${loginInfo.memberTel}</td>
                    </tr>
                </table>
                <div class="row mt-5" style="font-size: 18pt;">
                    <div class="col">
                        결제수단 선택
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <button type="button" class="btn btn-outline-danger mt-4 buyCard" onclick="buyCard()">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-credit-card" viewBox="0 0 16 16">
                            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z"></path>
                            <path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"></path>
                            </svg>
                            카드 결제
                        </button>
                    </div>
                    <div class="col">
                        <button type="button" class="btn btn-outline-danger mt-4" onclick="buyAccount()">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cash-coin" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8m5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0"></path>
                            <path d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195z"></path>
                            <path d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083q.088-.517.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1z"></path>
                            <path d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 6 6 0 0 1 3.13-1.567"></path>
                            </svg>
                            계좌 이체
                        </button>
                    </div>
                </div>
            </div>
        </div>
        `;


            buyDetail.insertAdjacentHTML("afterbegin", str);
        })
        //fetch 통신 실패 시 실행 영역
        .catch(err => {
            alert('fetch error!\nthen 구문에서 오류가 발생했습니다.\n콘솔창을 확인하세요!');
            console.log(err);
        });

}

function buyCard() {
    const result = confirm('카드로 결제하시겠습니까?')
    if (result) {

        IMP.request_pay(
            {
                //pg: "{PG사코드}.{PG상점ID}", //Test는 TC0ONETIME
                pg: "html5_inicis", //Test는 TC0ONETIME
                pay_method: "card",
                merchant_uid: "57008833-33006",
                name: "상품명",
                amount: 100, //금액
                buyer_email: 'test@naver.com',
                buyer_name: '코드쿡',
                buyer_tel: '010-1234-5678',
                buyer_addr: '서울특별시',
                buyer_postcode: '123-456',
            },
            function (rsp) {
                //rsp.imp_uid 값으로 결제 단건조회 API를 호출하여 결제결과를 판단합니다.
                if (rsp.success) {
                    //서버 검증 요청 부분

                    //imp_178957754537 / 57008833-33006 / 100
                    console.log(rsp.imp_uid + ' / ' + rsp.merchant_uid + ' / ' + rsp.paid_amount);
                    alert('결제 성공' + rsp.imp_uid);
                } else {
                    alert("결제에 실패하였습니다. 에러 내용: " + rsp.error_msg);
                }
            }
        );

    }
    else {
        return;
    }
}

function buyAccount() {
    const result = confirm('계좌이체로 결제하시겠습니까?')
    if (result) {
        return;
    }
    else {
        return;
    }
}