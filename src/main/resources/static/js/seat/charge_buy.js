const IMP = window.IMP;
IMP.init("imp82847817");

// 이용권 구매 오른쪽화면 ////////////////////////////////////////////////////////////
function buyDetail(chargeCode, loginInfo, haveCharge) {
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
            , memberCode : loginInfo.memberCode
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
            <div class="row text-start mt-5">
            <div class="col">
                <h5>선택한 이용권 구매</h5>
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
                        <td>${data.chargeBuy.chargeName}</td>
                    </tr>
                    <tr>
                        <td class="text-end">가격</td>
                        <td>${data.chargeBuy.chargeFee.toLocaleString()} 원</td>
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
                </table>`
                    if (haveCharge != null) {
                        str +=`
                        <div class="row mt-5" style="font-size: 18pt;">
                            <div class="col">
                                이미 이용권을 보유하고 있습니다.
                            </div>
                        </div>
                        `
                        
                    } else {
                        str += `
                        <div class="row mt-5" style="font-size: 18pt;">
                            <div class="col">
                                <div style="font-size: 11pt; color: red;">
                                * 구매 후 교환 및 환불이 불가능합니다.
                                </div>
                            </div>
                        </div>
                        <div class="row mt-4 mb-4">
                            <div class="col" style="margin-left:100px;">
                                <select class="form-select text-center" style="width: 350px;" onchange="changePrice(${data.chargeBuy.chargeFee})" id="discount">`
                                    if (data.ownCouponList == null) {
                                        str+=`<option value=0 selected>적용할 쿠폰이 없습니다.</option>`
                                    } else {
                                        str+=`<option value=0 selected>적용할 쿠폰을 선택해주세요.</option>`
                                        for (let i = 0; i < data.ownCouponList.length; i++) {
                                            const e = data.ownCouponList[i];
                                            str+=`
                                            <option value="${e.couponVOList[0].discountPercent}" class="${e.ownCouponCode}">${e.couponVOList[0].couponName}</option>
                                            `
                                        }                                        
                                    }
                                str+=`</select>
                            </div>
                        </div>
                        <div class="row mt-5 mb-4">
                            <div class="col couponResult" style="font-size: 14pt;">
                                    총 결제금액 : ${data.chargeBuy.chargeFee.toLocaleString()} 원
                            </div>
                        </div>
                        <div class="row mb-5">
                            <div class="col">
                                <button type="button" class="btn btn-outline-danger mt-4 buyCard" onclick="buyCard(${data.chargeBuy.chargeCode}, ${loginInfo.memberCode})">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-credit-card" viewBox="0 0 16 16">
                                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z"></path>
                                    <path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"></path>
                                    </svg>
                                    카드 결제
                                </button>
                            </div>
                        </div>`
                    }
                    str += `
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
// 구매 금액 쿠폰 적용 시 바꾸기 ///////////////////////////////////////////////////
function changePrice(chargeFee){
    const discount = document.querySelector('#discount').value;
    const resultSpan = document.querySelector('.couponResult');

    let a = chargeFee/100*(100-discount);

    resultSpan.innerHTML='';
    let str=``;
    str += `총 결제금액 : ${a.toLocaleString()} 원`;

    resultSpan.insertAdjacentHTML("afterbegin", str);
}
// 카드결제 요청 ////////////////////////////////////////////////////////////////////
function buyCard(chargeCode, memberCode) {
    const discount = document.querySelector('#discount').value;
    //선택자를 통해 원하는 select 를 가져온다
    let select = document.getElementById('discount');

    //select.selectedIndex --> selected된 옵션 번호 
    select = select.options[select.selectedIndex].className;

    let couponUse = 'N';
    if (discount != 0) {
        couponUse = 'Y'
    }
    
    const result = confirm('결제를 진행하시겠습니까?')
    if (result) {
        fetch('/seat/buyCard', { //요청경로
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            //컨트롤러로 전달할 데이터
            body: new URLSearchParams({
               // 데이터명 : 데이터값
                chargeCode : chargeCode
                , memberCode : memberCode
            })
        })
        .then((response) => {
            if(!response.ok){
                alert('fetch error!\n컨트롤러로 통신중에 오류가 발생했습니다.');
                return ;
            }
        
            //return response.text(); //컨트롤러에서 return하는 데이터가 없거나 int, String 일 때 사용
            return response.json(); //나머지 경우에 사용
        })
        //fetch 통신 후 실행 영역
        .then((data) => {//data -> controller에서 리턴되는 데이터!
            IMP.request_pay(
                {
                    //pg: "{PG사코드}.{PG상점ID}", //Test는 TC0ONETIME
                    pg: "html5_inicis", //Test는 TC0ONETIME
                    pay_method: "card",
                    merchant_uid: `${data.merchant_uid}`,
                    name: `${data.buyOne.chargeName}`,
                    amount: `${data.buyOne.chargeFee/100*(100-discount)}`, //금액
                    buyer_email: '',
                    buyer_name: `${data.buyMem.memberName}`,
                    buyer_tel: `${data.buyMem.memberTel}`,
                    buyer_addr: `${data.buyMem.memberAddr + data.buyMem.addrDetail}`,
                    buyer_postcode: `${data.buyMem.postCode}`,
                },
                function (rsp) { // 결제 신청 //////////////////////////////////////

                    //rsp.imp_uid 값으로 결제 단건조회 API를 호출하여 결제결과를 판단합니다.
                    if (rsp.success) {
                        //서버 검증 요청 부분
                        //imp_178957754537 / 57008833-33006 / 100
                        console.log(rsp.imp_uid + ' / ' + rsp.merchant_uid + ' / ' + rsp.paid_amount);
                        fetch('/seat/buySuccess', { //요청경로
                            method: 'POST',
                            cache: 'no-cache',
                            headers: {
                                'Content-Type': 'application/json; charset=UTF-8'
                            },
                            //컨트롤러로 전달할 데이터
                            body: JSON.stringify({
                               // 데이터명 : 데이터값
                                approvalCode : `${data.merchant_uid}`
                                , memberCode : `${data.buyMem.memberCode}`
                                , chargeCode : `${data.buyOne.chargeCode}`
                                , couponUse : couponUse
                                , ownCouponCode : `${select}`
                            })
                        })
                        .then((response) => {
                            return response.text(); //컨트롤러에서 return하는 데이터가 없거나 int, String 일 때 사용
                            //return response.json(); //나머지 경우에 사용
                        })
                        //fetch 통신 후 실행 영역
                        .then((data) => {//data -> controller에서 리턴되는 데이터!
                            alert('결제 성공');
                        })
                        //fetch 통신 실패 시 실행 영역
                        .catch(err=>{
                            alert('fetch error!\nthen 구문에서 오류가 발생했습니다.\n콘솔창을 확인하세요!');
                            console.log(err);
                        });
                    } else {
                        alert("결제에 실패하였습니다. 에러 내용: " + rsp.error_msg);
                    }
                }
            );
        })
        //fetch 통신 실패 시 실행 영역
        .catch(err=>{
            alert('fetch error!\nthen 구문에서 오류가 발생했습니다.\n콘솔창을 확인하세요!');
            console.log(err);
        });
    }
    else {
        return;
    }
}