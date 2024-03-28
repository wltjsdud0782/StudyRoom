//submit
function enroll() {

    const sendCharge = document.querySelector('.sendCharge');

    if (document.querySelector('.enInput').value == '') {
        alert('빈칸에 값을 입력해주세요!');
    }
    else {
        sendCharge.submit();
    }
}

//쿠폰, 이용권 등록하기
function selectService(value) {
    //const selectOption = document.querySelector('#selectOption');
    const changeOption = document.querySelector('.changeOption');

    //이용권
    if (value == 'CHARGE-option') {
        changeOption.innerHTML = '';
        let str = '';
        str += `
        <form action="/admin/setCharge" method="post" class="sendCharge">
        <table class="adminContainer-table">
            <colgroup>
                <col width="11%">
                <col width="7%">
                <col width="16%">
                <col width="7%">
                <col width="16%">
                <col width="7%">
                <col width="16%">
                <col width="*">
            </colgroup>
            <tbody>
                <tr>
                    <td>
                        <select id="selectOption" onchange="selectService(this.value)">
                            <option value="CHARGE-option" selected>CHARGE</option>
                            <option value="COUPON-option">COUPON</option>
                        </select>
                    </td>
                    <!-- 이용권 -->
                    <td>
                        <div class="row">
                            <div class="col text-end charge-title">
                                이용권 명
                            </div>
                        </div>
                    </td>
                    <td class="charge-td">
                        <input type="text" name="chargeName" class="enInput" placeholder="이용권 명을 입력해주세요."
                            style="font-style: oblique;">
                    </td>
                    <td>
                        <div class="row">
                            <div class="col text-end charge-title">
                                기간(일)
                            </div>
                        </div>
                    </td>
                    <td class="charge-td">
                        <input type="text" name="chargeDate" class="enInput" placeholder="기간을 입력해주세요."
                            style="font-style: oblique;">
                    </td>
                    <td>
                        <div class="row">
                            <div class="col text-end charge-title">
                                가격(원)
                            </div>
                        </div>
                    </td>
                    <td class="charge-td">
                        <input type="text" name="chargeFee" class="enInput" placeholder="가격을 입력해주세요."
                            style="font-style: oblique;">
                    </td>
                    <td>
                        <div class="row">
                            <div class="col text-end">
                                <div class="btnDiv">
                                    <input type="button" value="이용권 등록" onclick="enroll()">&nbsp;
                                    <input type="button" value="취소" onclick="window.location.reload()">
                                </div>
                            </div>
                        </div>
                    </td>
                    <!--  -->
                </tr>
            </tbody>
        </table>
        <div style="padding: 1vh;"></div> <!-- 띄어쓰기 -->
        <div>
            <div class="btnDiv">
                <input type="button" value="삭제" disabled>
            </div>
        </div>
    </form>
        `;
        changeOption.insertAdjacentHTML('afterbegin', str)
    }

    // 쿠폰
    else {
        changeOption.innerHTML = '';
        let str = '';
        str += `
        <form action="/admin/setCoupon" method="post" class="sendCharge">
        <table class="adminContainer-table">
            <colgroup>
                <col width="11%">
                <col width="7%">
                <col width="26%">
                <col width="9%">
                <col width="26%">
                <col width="*">
            </colgroup>
            <tbody>
                <tr>
                    <td>
                        <select id="selectOption" onchange="selectService(this.value)">
                            <option value="CHARGE-option">CHARGE</option>
                            <option value="COUPON-option" selected>COUPON</option>
                        </select>
                    </td>
                    <!-- 쿠폰 -->
                    <td>
                        <div class="row">
                            <div class="col text-end charge-title">
                                쿠폰 명
                            </div>
                        </div>
                    </td>
                    <td class="charge-td">
                        <input type="text" name="couponName" class="enInput" placeholder="쿠폰 명을 입력해주세요."
                            style="font-style: oblique;">
                    </td>
                    <td>
                        <div class="row">
                            <div class="col text-end charge-title">
                                할인율(%)
                            </div>
                        </div>
                    </td>
                    <td class="charge-td">
                        <input type="text" name="discountPercent" class="enInput" placeholder="할인율을 입력해주세요."
                            style="font-style: oblique;">
                    </td>
                    <td>
                        <div class="row">
                            <div class="col text-end">
                                <div class="btnDiv">
                                    <input type="button" value="쿠폰 등록" onclick="enroll()">&nbsp;
                                    <input type="button" value="취소" onclick="window.location.reload()">
                                </div>
                            </div>
                        </div>
                    </td>
                    <!--  -->
                </tr>
            </tbody>
        </table>
        <div style="padding: 1vh;"></div> <!-- 띄어쓰기 -->
        <div>
            <div class="btnDiv">
                <input type="button" value="삭제" disabled>
            </div>
        </div>
    </form>
        `;
        changeOption.insertAdjacentHTML('afterbegin', str)
    }
}




//비동기로 charge의 value값 불러오고, 변경하기
function changeCharge(chargeCode) {
    fetch('/admin/getCharge', { //요청경로
        method: 'POST',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        //컨트롤러로 전달할 데이터
        body: new URLSearchParams({
            // 데이터명 : 데이터값
            'chargeCode': chargeCode
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
            const reCharge = document.querySelector('#charge-container');
            reCharge.replaceChildren();
            let str = '';
            str += `
            <form action="/admin/uptCharge" method="post" class="sendCharge">
            <input type="hidden" name="chargeCode" value="${chargeCode}">
                            <table class="adminContainer-table">
                            <colgroup>
                            <col width="11%">
                            <col width="7%">
                            <col width="16%">
                            <col width="7%">
                            <col width="16%">
                            <col width="7%">
                            <col width="16%">
                            <col width="*">
                        </colgroup>
                        <tbody>
                            <tr>
                                <td>
                                <select id="selectOption" onchange="selectService(this.value)">
                                    <option value="CHARGE-option" selected>CHARGE</option>
                                    <option value="COUPON-option">COUPON</option>
                                </select>
                                </td>
                                        <td>
                                            <div class="row">
                                                <div class="col text-end charge-title">
                                                    이용권 명
                                                </div>
                                            </div>
                                        </td>                                       
                                        <td class="charge-td">
                                            <input type="text" name="chargeName" value="${data.chargeName}" class="enInput" placeholder="입력해주세요." style="font-style: oblique;">
                                        </td>
                                        <td>
                                            <div class="row">
                                                <div class="col text-end charge-title">
                                                    기간(일)
                                                </div>
                                            </div>
                                        </td>
                                        <td class="charge-td">
                                            <input type="text" name="chargeDate" value="${data.chargeDate}" class="enInput" placeholder="입력해주세요." style="font-style: oblique;">
                                        </td>
                                        <td>
                                            <div class="row">
                                                <div class="col text-end charge-title">
                                                    가격(원)
                                                </div>
                                            </div>
                                        </td>                                        
                                        <td class="charge-td">
                                            <input type="text" name="chargeFee" value="${data.chargeFee}" class="enInput" placeholder="입력해주세요." style="font-style: oblique;">
                                        </td>
                                        <td>
                                            <div class="row">
                                                <div class="col text-end">
                                                    <div class="btnDiv">
                                                        <input type="button" value="이용권 변경" onclick="enroll()">&nbsp;
                                                        <input type="button" value="취소" onclick="window.location.reload()">
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div style="padding: 1vh;"></div>
                            <div>
                                <div class="btnDiv">                                           
                                    <input type="button" value="삭제" onclick="deleteCharge(${chargeCode})" style="color: red;">                               
                                </div>
                            </div>
            </form>
            `;
            reCharge.insertAdjacentHTML('afterbegin', str)
        })
        //fetch 통신 실패 시 실행 영역
        .catch(err => {
            alert('fetch error!\nthen 구문에서 오류가 발생했습니다.\n콘솔창을 확인하세요!');
            console.log(err);
        });
}




//charge 삭제
function deleteCharge(chargeCode) {
    if (confirm('정말 삭제하시겠습니까?')) {
        location.href = `/admin/delCharge?chargeCode=${chargeCode}`;
    }
}




//비동기로 coupon의 value값 불러오고, 변경하기
function changeCoupon(couponCode) {
    fetch('/admin/getCoupon', { //요청경로
        method: 'POST',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        //컨트롤러로 전달할 데이터
        body: new URLSearchParams({
            // 데이터명 : 데이터값
            'couponCode': couponCode
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
            const reCoupon = document.querySelector('#charge-container');
            reCoupon.replaceChildren();
            let str = '';
            str += `
            <form action="/admin/uptCoupon" method="post" class="sendCharge">
            <input type="hidden" name="couponCode" value="${couponCode}">
            <table class="adminContainer-table">
                <colgroup>
                    <col width="11%">
                    <col width="7%">
                    <col width="26%">
                    <col width="9%">
                    <col width="26%">
                    <col width="*">
                </colgroup>
                <tbody>
                    <tr>
                        <td>
                            <select id="selectOption" onchange="selectService(this.value)">
                                <option value="CHARGE-option">CHARGE</option>
                                <option value="COUPON-option" selected>COUPON</option>
                            </select>
                        </td>
                        <!-- 쿠폰 -->
                        <td>
                            <div class="row">
                                <div class="col text-end charge-title">
                                    쿠폰 명
                                </div>
                            </div>
                        </td>
                        <td class="charge-td">
                            <input type="text" name="couponName" value="${data.couponName}" class="enInput" placeholder="입력해주세요."
                                style="font-style: oblique;">
                        </td>
                        <td>
                            <div class="row">
                                <div class="col text-end charge-title">
                                    할인율(%)
                                </div>
                            </div>
                        </td>
                        <td class="charge-td">
                            <input type="text" name="discountPercent" value="${data.discountPercent}" class="enInput" placeholder="입력해주세요."
                                style="font-style: oblique;">
                        </td>
                        <td>
                            <div class="row">
                                <div class="col text-end">
                                    <div class="btnDiv">
                                        <input type="button" value="쿠폰 변경" onclick="enroll()">&nbsp;
                                        <input type="button" value="취소" onclick="window.location.reload()">
                                    </div>
                                </div>
                            </div>
                        </td>
                        <!--  -->
                    </tr>
                </tbody>
            </table>
            <div style="padding: 1vh;"></div> <!-- 띄어쓰기 -->
            <div>
                <div class="btnDiv">
                    <input type="button" value="삭제" onclick="deleteCoupon(${couponCode})" style="color: red;">
                </div>
            </div>         
        </form>
        <div style="padding: 2vh;"></div> <!-- 띄어쓰기 -->
        <!-- <h4>&nbsp;쿠폰 지급하기</h4> -->
            `;
            reCoupon.insertAdjacentHTML('afterbegin', str)

        })
        //fetch 통신 실패 시 실행 영역
        .catch(err => {
            alert('fetch error!\nthen 구문에서 오류가 발생했습니다.\n콘솔창을 확인하세요!');
            console.log(err);
        });
}



//coupon삭제
function deleteCoupon(couponCode) {
    if (confirm('정말 삭제하시겠습니까?')) {
        location.href = `/admin/delCoupon?couponCode=${couponCode}`;
    }
}