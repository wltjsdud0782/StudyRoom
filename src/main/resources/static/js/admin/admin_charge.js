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
                <col width="9%">
                <col width="*">
                <col width="9%">
            </colgroup>
            <tbody class="enrollBody">
                <tr>
                    <td>
                        <select id="selectOption" onchange="selectService(this.value)" class="form-select">
                            <option value="CHARGE-option" selected>이용권</option>
                            <option value="COUPON-option">쿠폰</option>
                        </select>
                    </td>
                    <!-- 이용권 -->
                    <td>
                        <div class="input-group">
                            <span class="input-group-text"
                            style="width: 80px; height: 40px; justify-content: center;">이름</span>
                            <input type="text" class="form-control enInput" name="chargeName"
                            placeholder="이용권 이름">
                            <span class="input-group-text"
                            style="width: 80px; height: 40px; justify-content: center;">기간</span>
                            <input type="text" class="form-control enInput" name="chargeDate"
                            placeholder="이용 기간">
                            <span class="input-group-text"
                            style="width: 80px; height: 40px; justify-content: center;">가격</span>
                            <input type="text" class="form-control enInput" name="chargeFee"
                            placeholder="판매 가격">
                            <button type="button" class="btn green-btn" onclick="enroll()">이용권 등록
                            </button>
                            <button type="reset" class="btn btn-light"
                            style="width: 120px;">취소
                            </button>
                        </div>
                    </td>
                    <td>
                        <div class="row">
                            <div class="col">
                                <button type="button" class="btn btn-secondary" style="width: 120px;"
                                disabled>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                                    fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                                    <path
                                    d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                                </svg>
                                &ensp;삭제
                                </button>
                            </div>
                        </div>
                    </td>
                    <!--  -->
                </tr>
            </tbody>
        </table>
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
                <col width="9%">
                <col width="*">
                <col width="9%">
            </colgroup>
            <tbody class="enrollBody">
                <tr>
                    <td>
                        <select id="selectOption" onchange="selectService(this.value)" class="form-select">
                            <option value="CHARGE-option">이용권</option>
                            <option value="COUPON-option" selected>쿠폰</option>
                        </select>
                    </td>
                    <!-- 쿠폰 -->
                    <td>
                        <div class="input-group">
                            <span class="input-group-text"
                            style="width: 80px; height: 40px; justify-content: center;">이름</span>
                            <input type="text" class="form-control enInput" name="couponName"
                            placeholder="쿠폰 이름">
                            <span class="input-group-text"
                            style="width: 80px; height: 40px; justify-content: center;">할인율</span>
                            <input type="text" class="form-control enInput" name="discountPercent"
                            placeholder="할인율(%)">
                            <button type="button" class="btn green-btn"
                            onclick="enroll()">쿠폰 등록
                            </button>
                            <button type="reset" class="btn btn-light"
                            style="width: 120px;">취소
                        </div>
                    </td>
                    <td>
                        <div class="row">
                            <div class="col">
                                <button type="button" class="btn btn-secondary" style="width: 120px;"
                                disabled>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                                    fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                                    <path
                                    d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                                </svg>
                                &ensp;삭제
                                </button>
                            </div>
                        </div>
                    </td>
                    <!--  -->
                </tr>
            </tbody>
        </table>
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
                        <col width="9%">
                        <col width="*">
                        <col width="9%">
                    </colgroup>
                    <tbody class="enrollBody">
                        <tr>
                            <td>
                                <select id="selectOption" onchange="selectService(this.value)" class="form-select">
                                    <option value="CHARGE-option" selected>이용권</option>
                                    <option value="COUPON-option">쿠폰</option>
                                </select>
                            </td>
                            <td>
                                <div class="input-group">
                                    <span class="input-group-text"
                                    style="width: 80px; height: 40px; justify-content: center;">이름</span>
                                    <input type="text" class="form-control enInput" name="chargeName"
                                    placeholder="이용권 이름" value="${data.chargeName}">
                                    <span class="input-group-text"
                                    style="width: 80px; height: 40px; justify-content: center;">기간</span>
                                    <input type="text" class="form-control enInput" name="chargeDate"
                                    placeholder="이용 기간" value="${data.chargeDate}">
                                    <span class="input-group-text"
                                    style="width: 80px; height: 40px; justify-content: center;">가격</span>
                                    <input type="text" class="form-control enInput" name="chargeFee"
                                    placeholder="판매 가격" value="${data.chargeFee}">
                                    <button type="button" class="btn green-btn"
                                    onclick="enroll()">이용권 변경
                                    </button>
                                    <button type="reset" class="btn btn-light"
                                    style="width: 120px;">취소
                                    </button>
                                </div>
                            </td>
                            <td>
                                <div class="row">
                                    <div class="col">
                                        <button type="button" class="btn btn-secondary" style="width: 120px;"
                                        onclick="deleteCharge(${chargeCode})">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                                            fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                                            <path
                                            d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                                        </svg>
                                        &ensp;삭제
                                        </button>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div style="padding: 1vh;"></div>
                <div style="float: right;">     
                    <span style="font-size: small;"><font color="red">*</font> 이용권을 삭제하기 전에, 해당 이용권을 보유 중인 회원이 있는지 확인해주세요.</span>   
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
    if (confirm('삭제할 경우 되돌릴 수 없습니다.\n정말 삭제하시겠습니까?')) {
        location.href = `/admin/delCharge?chargeCode=${chargeCode}`;
        alert('해당 이용권이 삭제되었습니다.')
    }
    else {
        alert('취소되었습니다.')
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
                    <col width="9%">
                    <col width="*">
                    <col width="9%">
                </colgroup>
                <tbody class="enrollBody">
                    <tr>
                        <td>
                            <select id="selectOption" onchange="selectService(this.value)" class="form-select">
                                <option value="CHARGE-option">이용권</option>
                                <option value="COUPON-option" selected>쿠폰</option>
                            </select>
                        </td>
                        <!-- 쿠폰 -->
                        <td>
                            <div class="input-group">
                                <span class="input-group-text"
                                style="width: 80px; height: 40px; justify-content: center;">이름</span>
                                <input type="text" class="form-control enInput" name="couponName"
                                placeholder="쿠폰 이름" value="${data.couponName}">
                                <span class="input-group-text"
                                style="width: 80px; height: 40px; justify-content: center;">할인율</span>
                                <input type="text" class="form-control enInput" name="discountPercent"
                                placeholder="할인율(%)" value="${data.discountPercent}">
                                <button type="button" class="btn green-btn"
                                onclick="enroll()">쿠폰 변경
                                </button>
                                <button type="reset" class="btn btn-light"
                                style="width: 120px;">취소
                                </button>     
                            </div>
                        </td>
                        <td>
                            <div class="row">
                                <div class="col">
                                    <button type="button" class="btn btn-secondary" style="width: 120px;"
                                    onclick="deleteCoupon(${couponCode})">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                                        fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                                        <path
                                        d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                                    </svg>
                                    &ensp;삭제
                                    </button>
                                </div>
                            </div>
                        </td>
                        <!--  -->
                    </tr>
                </tbody>
            </table>
            <div style="padding: 1vh;"></div> <!-- 띄어쓰기 -->
            <div style="float: right;">      
                <span style="font-size: small;"><font color="red">*</font> 쿠폰을 삭제하기 전에, 해당 쿠폰을 보유 중인 회원이 있는지 확인해주세요.</span>                   
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
    if (confirm('삭제할 경우 되돌릴 수 없습니다.\n정말 삭제하시겠습니까?')) {
        location.href = `/admin/delCoupon?couponCode=${couponCode}`;
        alert('해당 쿠폰이 삭제되었습니다.')
    }
    else {
        alert('취소되었습니다.')
    }
}