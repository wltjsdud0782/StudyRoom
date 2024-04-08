
//수정 불가능한 info 나오기
function allInfo(memberCode) {
    fetch('/admin/viewInfo', { //요청경로
        method: 'POST',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        //컨트롤러로 전달할 데이터
        body: new URLSearchParams({
            // 데이터명 : 데이터값
            'memberCode': memberCode
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
            console.log(data);

            //쿠폰 지급
            const goCoupon = document.querySelector('.goCoupon');
            goCoupon.innerHTML = '';
            let str_1 = '';
            str_1 += `
                <input type="hidden" name="memberCode" value="${memberCode}">
                <div class="btnDiv">
                    <input type="text" value="${data.memberMap.memberName}" name="memberName" style="color: green;" readonly>
                    <div style="float: right;">
                        <input type="button" value="지급하기" style="color: red;" onclick="yourCoupon()" class="enInput">
                    </div>                                              
                </div>
            `;
            goCoupon.insertAdjacentHTML('afterbegin', str_1);

            //쿠폰 지급창 출력
            const checkCoupon = document.querySelector('.checkCoupon');
            checkCoupon.innerHTML = '';
            let str_2 = '';  
                for(let i = 0; i < data.couponList.length; i++){
                    str_2 += `
                        <tr>
                            <td style="width: 5%; vertical-align: middle;">
                                <input type="checkbox" class="form-check-input" name="couponCode" value="${data.couponList[i].couponCode}">
                            </td>
                            <td>
                                <div>${data.couponList[i].couponName}</div>
                                <div style="font-size: larger;">
                                    &ensp;${data.couponList[i].discountPercent}% 할인
                                </div>
                            </td>
                        </tr>`;
                }
            checkCoupon.insertAdjacentHTML('afterbegin', str_2);

            //회원정보 출력
            const changeInfo = document.querySelector('.changeInfo-div');
            changeInfo.innerHTML = '';
            let str = '';
            str += `
                    <input type="hidden" name="memberCode" value="${memberCode}">
                        <h4>&nbsp;회원 정보</h4>
                        <form action="/admin/uptMemberInfo" method="post">
                        <table class="memberInfo-table">
                            <colgroup>
                                <col width="20%">
                                <col width="30%">
                                <col width="20%">
                                <col width="15%">
                                <col width="15%">
                            </colgroup>
                            <tbody>
                                <tr>
                                    <td class="infoIndex">
                                        <div class="row">
                                            <div class="col">
                                                &ensp;이름
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="row">
                                            <div class="col memberName-data">
                                                ${data.memberMap.memberName}
                                            </div>
                                        </div>
                                    </td>
                                    <td class="infoIndex">
                                        <div class="row">
                                            <div class="col">
                                                &ensp;아이디
                                            </div>
                                        </div>
                                    </td>
                                    <td colspan="2">
                                        <div class="row">
                                            <div class="col memberId-data">
                                                ${data.memberMap.memberId}
                                            </div>
                                        </div>
                                    </td>                    
                                </tr>
                                <tr>
                                    <td class="infoIndex">
                                        <div class="row">
                                            <div class="col">
                                                &ensp;성별
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="row">
                                            <div class="col memberGender-data">
                                                ${data.memberMap.memberGender}
                                            </div>
                                        </div>    
                                    </td>
                                    <td class="infoIndex">
                                        <div class="row">
                                            <div class="col">
                                                &ensp;생년 월일
                                            </div>
                                        </div>
                                    </td>
                                    <td colspan="2">
                                        <div class="row">
                                            <div class="col memberBirth-data">
                                                ${data.memberMap.memberBirth}
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td rowspan="2" class="infoIndex">
                                        <div class="row">
                                            <div class="col">
                                                &ensp;주소
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="row">
                                            <div class="col postCode-data">                                                                                  
                                                <input type="button" value="우편 번호" class="btn btn-outline-danger" disabled>&ensp;                                            
                                                ${data.memberMap.postCode}
                                            </div>                  
                                        </div>
                                    </td>
                                    <td class="infoIndex">
                                        <div class="row">
                                            <div class="col">
                                                &ensp;전화 번호
                                            </div>
                                        </div>
                                    </td>
                                    <td colspan="2">
                                        <div class="row">
                                            <div class="col memberTel-data">
                                                ${data.memberMap.memberTel}
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2">
                                        <div class="row">
                                            <div class=""col>
                                                <span class="memberAddr-data">
                                                    ${data.memberMap.memberAddr}&ensp;-&ensp;
                                                </span>   
                                                <span class="addrDetail-data">
                                                    ${data.memberMap.addrDetail}
                                                </span>                                         
                                            </div>                            
                                        </div>
                                    </td>
                                    <td class="infoIndex">
                                        <div class="row">
                                            <div class="col">
                                                &ensp;권한
                                            </div>
                                            
                                        </div>
                                    </td>
                                    <td>
                                        <div class="row">                 
                                            <div class="col isAdmin-data">
                                                ${data.memberMap.isAdmin}
                                            </div>
                                        </div>
                                    </td>                  
                                </tr>                            
                            </tbody>
                        </table>
                        <div style="padding: 1vh;"></div>
                        <div style="float: right;" class="changeMemberBtn">
                            <input type="button" value="정보 수정" class="btn btn-light" onclick="memberInfo(${memberCode})">
                        </div>
                        </form>      
                        <div style="padding: 2vh;"></div>`;
            if (data.memberMap.isAdmin == '회원') {
                //좌석 정보 불러오기
                if (data.seatMap != null) {
                str +=  
                        `<h4>&nbsp;좌석 정보</h4>
                        <form action="/admin/uptSeatInfo" method="post">
                        <table class="memberInfo-table">
                            <colgroup>
                                <col width="16.6%">
                                <col width="16.6%">
                                <col width="16.6%">
                                <col width="16.6%">
                                <col width="16.6%">
                                <col width="*">
                            </colgroup>
                            <tbody>
                                <tr>
                                    <td class="infoIndex">
                                        <div class="row">
                                            <div class="col">
                                                &ensp;이용 중인 좌석
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="row">
                                            <div class="col seatNum-data">
                                                ${data.seatMap.seatFloor}층&ensp;${data.seatMap.seatNum}번석
                                            </div>
                                        </div>
                                    </td>
                                    <td class="infoIndex">
                                        <div class="row">
                                            <div class="col">
                                                &ensp;좌석 상태
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="row">
                                            <div class="col statusNum-data">`;
                    if (data.seatMap.statusNum == 1) {
                    str += `사용중`;
                    }
                    else if (data.seatMap.statusNum == 2) {
                    str += `사용가능`;
                    }
                    else {
                    str += `수리중`
                    }
                    str += `
                                            </div>
                                        </div>
                                    </td>  
                                    <td class="infoIndex">
                                        <div class="row">
                                            <div class="col">
                                                &ensp;점등 상태
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="row">
                                            <div class="col seatPower-data">`;
                    if (data.seatMap.seatPower == '켜짐') {
                    str +=                      `<font color="orange">켜짐</font>`;
                    }
                    else {
                    str +=                      `<font color="gray">꺼짐</font>`;
                    }
                    str +=`                    
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div style="padding: 1vh;"></div>
                        <div style="float: right;" class="changeSeatBtn">
                            <input type="button" value="정보 수정" class="btn btn-light" onclick="seatInfo(${memberCode})">
                        </div>
                        </form>
                        <div style="padding: 2vh;"></div>`;
                }
                //못한다면
                else {
                str += `
                        <h4>&nbsp;좌석 정보</h4>
                        <table class="memberInfo-table">
                            <colgroup>
                                <col width="16.6%">
                                <col width="16.6%">
                                <col width="16.6%">
                                <col width="16.6%">
                                <col width="16.6%">
                                <col width="*">
                            </colgroup>
                            <tbody>
                                <tr>
                                    <td class="infoIndex">
                                        <div class="row">
                                            <div class="col">
                                                &ensp;좌석
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="row">
                                            <div class="col seatNum-data">
                                                이용 중인 좌석이 없습니다.
                                            </div>
                                        </div>
                                    </td>
                                    <td class="infoIndex">
                                        <div class="row">
                                            <div class="col">
                                                &ensp;좌석 상태
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="row">
                                            <div class="col statusNum-data text-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#dee2e6" class="bi bi-x-circle" viewBox="0 0 16 16">
                                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                                                </svg>
                                            </div>
                                        </div>
                                    </td>  
                                    <td class="infoIndex">
                                        <div class="row">
                                            <div class="col">
                                                &ensp;점등 상태
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="row">
                                            <div class="col seatPower-data text-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#dee2e6" class="bi bi-x-circle" viewBox="0 0 16 16">
                                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                                                </svg>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div style="padding: 3vh;"></div>`;
                }
                //이용권 정보 불러오기
                if (data.charName.length == 1) {
                str += 
                        `<h4>&nbsp;보유한 이용권</h4>
                        <table class="memberInfo-table">
                            <colgroup>
                                <col width="11%">
                                <col width="15%">
                                <col width="11%">
                                <col width="15%">                 
                                <col width="11%">
                                <col width="15%">
                                <col width="11%">
                                <col width="*">
                            </colgroup>
                            <tbody>
                                <tr>
                                    <td class="infoIndex">
                                        <div class="row">
                                            <div class="col">
                                                &ensp;사용 중인 이용권
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="row">
                                            <div class="col charName-data">
                                                ${data.charName[0].chargeVO.chargeName}                         
                                            </div>
                                        </div>
                                    </td>  
                                    <td class="infoIndex">
                                        <div class="row">
                                            <div class="col">
                                                &ensp;시작 날짜
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="row">
                                            <div class="col charAppDate-data">
                                                ${data.buyDetail[0].approvalDate}
                                            </div>
                                        </div>
                                    </td> 
                                    <td class="infoIndex">
                                        <div class="row">
                                            <div class="col">
                                                &ensp;만료 날짜
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="row">
                                            <div class="col charEndDate-data">
                                                ${data.charEndDate}
                                            </div>
                                        </div>
                                    </td>
                                    <td class="infoIndex">
                                        <div class="row">
                                            <div class="col">
                                                &ensp;남은 기간
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="row">
                                            <div class="col charRemDate-data">             
                                                ${data.charRemDate}일
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div style="padding: 3vh;"></div>`;
                }
                else if (data.charName.length == 2) {
                    str += 
                            `<h4>&nbsp;보유한 이용권</h4>
                            <table class="memberInfo-table">
                                <colgroup>
                                    <col width="11%">
                                    <col width="15%">
                                    <col width="11%">
                                    <col width="15%">                 
                                    <col width="11%">
                                    <col width="15%">
                                    <col width="11%">
                                    <col width="*">
                                </colgroup>
                                <tbody>
                                    <tr>
                                        <td class="infoIndex">
                                            <div class="row">
                                                <div class="col">
                                                    &ensp;사용 중인 이용권
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="row">
                                                <div class="col charName-data">                                                   
                                                    ${data.charName[0].chargeVO.chargeName}                        
                                                </div>
                                            </div>
                                        </td>  
                                        <td class="infoIndex">
                                            <div class="row">
                                                <div class="col">
                                                    &ensp;시작 날짜
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="row">
                                                <div class="col charAppDate-data">                                             
                                                    ${data.buyDetail[0].approvalDate}
                                                </div>
                                            </div>
                                        </td> 
                                        <td class="infoIndex">
                                            <div class="row">
                                                <div class="col">
                                                    &ensp;만료 날짜
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="row">
                                                <div class="col charEndDate-data">
                                                    ${data.charEndDate}
                                                </div>
                                            </div>
                                        </td>
                                        <td class="infoIndex">
                                            <div class="row">
                                                <div class="col">
                                                    &ensp;남은 기간
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="row">
                                                <div class="col charRemDate-data">             
                                                    ${data.charRemDate}일
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="infoIndex">
                                            <div class="row">
                                                <div class="col">
                                                    &ensp;남은 이용권
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="row">
                                                <div class="col charName-data">                                                   
                                                    ${data.charName[1].chargeVO.chargeName}                        
                                                </div>
                                            </div>
                                        </td>  
                                        <td class="infoIndex">
                                            <div class="row">
                                                <div class="col">
                                                    &ensp;시작 날짜
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="row">
                                                <div class="col charAppDate-data">                                             
                                                    ${data.buyDetail[1].approvalDate}
                                                </div>
                                            </div>
                                        </td> 
                                        <td class="infoIndex">
                                            <div class="row">
                                                <div class="col charEndDate-data">
                                                    &ensp;만료 날짜
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="row">
                                                <div class="col text-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#dee2e6" class="bi bi-x-circle" viewBox="0 0 16 16">
                                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                                                    </svg>
                                                    </div>
                                            </div>
                                        </td>
                                        <td class="infoIndex">
                                            <div class="row">
                                                <div class="col">
                                                    &ensp;남은 기간
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="row">
                                                <div class="col charRemDate-data text-center">             
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#dee2e6" class="bi bi-x-circle" viewBox="0 0 16 16">
                                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                                                    </svg>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div style="padding: 3vh;"></div>`;
                }
                else {
                str += 
                        `<h4>&nbsp;보유한 이용권</h4>
                        <table class="memberInfo-table">
                            <colgroup>
                                <col width="11%">
                                <col width="15%">
                                <col width="11%">
                                <col width="15%">                 
                                <col width="11%">
                                <col width="15%">
                                <col width="11%">
                                <col width="*">
                            </colgroup>
                            <tbody>
                                <tr>
                                    <td class="infoIndex">
                                        <div class="row">
                                            <div class="col">
                                                &ensp;이용권
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="row">
                                            <div class="col charName-data">
                                                보유한 이용권이 없습니다.
                                            </div>
                                        </div>
                                    </td>  
                                    <td class="infoIndex">
                                        <div class="row">
                                            <div class="col">
                                                &ensp;시작 날짜
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="row">
                                            <div class="col charAppDate-data text-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#dee2e6" class="bi bi-x-circle" viewBox="0 0 16 16">
                                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                                                </svg>
                                            </div>
                                        </div>
                                    </td>                  
                                    <td class="infoIndex">
                                        <div class="row">
                                            <div class="col">
                                                &ensp;만료 날짜
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="row">
                                            <div class="col charEndDate-data text-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#dee2e6" class="bi bi-x-circle" viewBox="0 0 16 16">
                                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                                                </svg>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="infoIndex">
                                        <div class="row">
                                            <div class="col">
                                                &ensp;남은 기간
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="row">
                                            <div class="col charRemDate-data text-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#dee2e6" class="bi bi-x-circle" viewBox="0 0 16 16">
                                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                                                </svg>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div style="padding: 3vh;"></div>`;
                }
                //쿠폰 정보 불러오기
                if (data.couponMap.length != 0) {
                str += `
                        <h4>&nbsp;보유한 쿠폰</h4>
                        <table class="table text-center">
                            <colgroup>
                                <col width="60%">
                                <col width="*">
                            </colgroup>
                            <thead class="table-success">
                                <tr>
                                    <td style="border: 1px solid #a7b9b1;">
                                        쿠폰
                                    </td>
                                    <td style="border: 1px solid #a7b9b1;">
                                        할인률
                                    </td>
                                </tr>
                            </thead>
                            <tbody class="couponInfo">
                            <!-- couponMap[i]로 반복문 돌리면 된다 -->`;
                    for(let i = 0; i < data.couponMap.length; i++) {
                    str +=  ` 
                                <tr>
                                    
                                    <td>
                                        <div class="row">
                                            <div class="col couponName-data">
                                                ${data.couponMap[i].couponVOList[0].couponName}
                                            </div>
                                        </div>
                                    </td>
                                    
                                    <td>
                                        <div class="row">
                                            <div class="col">
                                                ${data.couponMap[i].couponVOList[0].discountPercent}% 할인
                                            </div>
                                        </div>
                                    </td>
                                </tr>`;
                    }
                    str +=
                            `<!-- 반복문 여기까지 -->    
                            </tbody>
                        </table>`;
                }
                else {
                str += `
                        <h4>&nbsp;보유한 쿠폰</h4>
                        <table class="table text-center">
                            <colgroup>
                                <col width="60%">
                                <col width="*">
                            </colgroup>
                            <thead class="table-success">
                                <tr>
                                    <td style="border: 1px solid #a7b9b1;">
                                        쿠폰
                                    </td>
                                    <td style="border: 1px solid #a7b9b1;">
                                        할인률
                                    </td>
                                </tr>
                            </thead>
                            <tbody class="couponInfo">
                            <!-- couponMap[i]로 반복문 돌리면 된다/임시 -->
                                <tr>              
                                    <td>    
                                        보유한 쿠폰이 없습니다.
                                    </td>
                                    <td class="text-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#dee2e6" class="bi bi-x-circle" viewBox="0 0 16 16">
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                                        </svg>
                                    </td>
                                </tr>
                            <!-- 반복문 여기까지 -->    
                            </tbody>
                        </table>`;
                }
            }
            else {
            str += ``;
            }

            changeInfo.insertAdjacentHTML('afterbegin', str)
        })
        //fetch 통신 실패 시 실행 영역
        .catch(err => {
            alert('fetch error!\nthen 구문에서 오류가 발생했습니다.\n콘솔창을 확인하세요!');
            console.log(err);
        });
}


// 주소검색 버튼 클릭 시 주소록 검색 팝업 창 띄우기
function searchAddress() {
    new daum.Postcode({
        oncomplete: function (data) {
            // 기본 value 값 지우고 해당 값으로 바꾸기
            document.querySelector('#postCode-info').value = data.zonecode;
            document.querySelector('#roadAddr-info').value = data.roadAddress;
        }
    }).open();

}


//수정 가능한 회원정보 나오기
function memberInfo(memberCode) {
    fetch('/admin/viewInfo', { //요청경로
        method: 'POST',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        //컨트롤러로 전달할 데이터
        body: new URLSearchParams({
            // 데이터명 : 데이터값
            'memberCode': memberCode
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

            //버튼 변경
            const changeMemberBtn = document.querySelector('.changeMemberBtn');
            changeMemberBtn.innerHTML = '';
            let str_1 = '';
            str_1 += `
            <input type="submit" value="정보 변경" class="btn btn-warning">&ensp;   
            <input type="button" value="변경 취소" class="btn btn-light" onclick="allInfo(${memberCode})">
            <input type="hidden" name="memberCode" value="${memberCode}">
            `;
            changeMemberBtn.insertAdjacentHTML('afterbegin', str_1);

            //우편주소 변경
            const postCode_data = document.querySelector('.postCode-data');
            postCode_data.innerHTML = '';
            let str_2 = '';
            str_2 += `
            <input type="button" value="주소 검색" class="btn btn-outline-danger" onclick="searchAddress()">&ensp;                                          
            <input type="text" value="${data.memberMap.postCode}" name="postCode" id="postCode-info" style="width: 300px; float: right; font-style: oblique;" class="form-control">
            `;
            postCode_data.insertAdjacentHTML('afterbegin', str_2);

            //주소 변경
            const memberAddr_data = document.querySelector('.memberAddr-data');
            memberAddr_data.innerHTML = '';
            let str_3 = '';
            str_3 += `
            <input type="text" value="${data.memberMap.memberAddr}" name="memberAddr" id="roadAddr-info" style="width: 325px; float: left; font-style: oblique;" class="form-control">&ensp;_&ensp;
            `;
            memberAddr_data.insertAdjacentHTML('afterbegin', str_3);

            //상세주소 변경
            const addrDetail_data = document.querySelector('.addrDetail-data');
            addrDetail_data.innerHTML = '';
            let str_4 = '';
            str_4 += `
            <input type="text" value="${data.memberMap.addrDetail}" name="addrDetail" style="width: 325px; float: right; font-style: oblique;" class="form-control">
            `;
            addrDetail_data.insertAdjacentHTML('afterbegin', str_4);

            //전화번호 변경
            const memberTel_data = document.querySelector('.memberTel-data');
            memberTel_data.innerHTML = '';
            let str_5 = '';
            str_5 += `
            <input type="text" value="${data.memberMap.memberTel}" name="memberTel" style="font-style: oblique;" class="form-control">
            `;
            memberTel_data.insertAdjacentHTML('afterbegin', str_5);

            //권한 변경
            const isAdmin_data = document.querySelector('.isAdmin-data');
            isAdmin_data.innerHTML = '';
            let str_6 = '';
            str_6 += `
            <select name="isAdmin" class="form-select">`;
            if (data.memberMap.isAdmin == '알바생') {
                str_6 += `
                                            <option value="USER">회원</option>
                                            <option value="ARBEIT" selected>알바생</option>
                                            <option value="ADMIN">관리자</option>`;
            }
            else if (data.memberMap.isAdmin == '관리자') {
                str_6 += `
                                            <option value="USER">회원</option>
                                            <option value="ARBEIT">알바생</option>
                                            <option value="ADMIN" selected>관리자</option>`;
            }
            else {
                str_6 += `
                                            <option value="USER" selected>회원</option>
                                            <option value="ARBEIT">알바생</option>
                                            <option value="ADMIN">관리자</option>`;
            }
            str_6 += `</select>`;
            isAdmin_data.insertAdjacentHTML('afterbegin', str_6);

            //생년월일 변경
            const memberBirth_data = document.querySelector('.memberBirth-data');
            memberBirth_data.innerHTML = '';
            let str_7 = '';
            str_7 += `
            <input type="date" value="${data.memberMap.memberBirth}" name="memberBirth" style="font-style: oblique;" class="form-control">
            `;
            memberBirth_data.insertAdjacentHTML('afterbegin', str_7);


        })
        //fetch 통신 실패 시 실행 영역
        .catch(err => {
            alert('fetch error!\nthen 구문에서 오류가 발생했습니다.\n콘솔창을 확인하세요!');
            console.log(err);
        });
}



//수정 가능한 좌석정보 나오기
function seatInfo(memberCode) {
    fetch('/admin/viewInfo', { //요청경로
        method: 'POST',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        //컨트롤러로 전달할 데이터
        body: new URLSearchParams({
            // 데이터명 : 데이터값
            'memberCode': memberCode
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

            //버튼 변경
            const changeSeatBtn = document.querySelector('.changeSeatBtn');
            changeSeatBtn.innerHTML = '';
            let str_1 = '';
            str_1 += `
            <input type="submit" value="정보 변경" class="btn btn-warning">&ensp;   
            <input type="reset" value="변경 취소" class="btn btn-light" onclick="allInfo(${memberCode})">
            <input type="hidden" name="memberCode" value="${memberCode}">
            `;
            changeSeatBtn.insertAdjacentHTML('afterbegin', str_1);

            //점등상태 변경
            const seatPower_data = document.querySelector('.seatPower-data');
            seatPower_data.innerHTML = '';
            let str_2 = '';
            str_2 += `
            <select name="seatPower" class="form-select">`;
            if (data.seatMap.seatPower == '켜짐') {
                str_2 += `
                                            <option value="ON" selected>켜짐</option>
                                            <option value="OFF">꺼짐</option>`;
            }
            else {
                str_2 += `
                                            <option value="ON">켜짐</option>
                                            <option value="OFF" selected>꺼짐</option>`;
            }
            str_2 += `</select>`;
            seatPower_data.insertAdjacentHTML('afterbegin', str_2);

            //좌석상태 변경
            const statusNum_data = document.querySelector('.statusNum-data');
            statusNum_data.innerHTML = '';
            let str_3 = '';
            str_3 += `
            <select name="statusNum" class="form-select">`;
            if (data.seatMap.statusNum == 1) {
                str_3 += `
                                            <option value="1" selected>사용중</option>
                                            <option value="2">사용가능</option>
                                            <option value="3">수리중</option>`;
            }
            else if (data.seatMap.statusNum == 2) {
                str_3 += `
                                            <option value="1">사용중</option>
                                            <option value="2" selected>사용가능</option>
                                            <option value="3">수리중</option>`;
            }
            else {
                str_3 += `
                                            <option value="1">사용중</option>
                                            <option value="2">사용가능</option>
                                            <option value="3" selected>수리중</option>`;
            }
            str_3 += `</select>`;
            statusNum_data.insertAdjacentHTML('afterbegin', str_3);

        })
        //fetch 통신 실패 시 실행 영역
        .catch(err => {
            alert('fetch error!\nthen 구문에서 오류가 발생했습니다.\n콘솔창을 확인하세요!');
            console.log(err);
        });
}


//쿠폰 지급하기
function yourCoupon(){
    const sendCouponForm = document.querySelector('.sendCouponForm');
    const chksValue = []
    //체크된 체크박스들
    const chks = document.querySelectorAll('input[name="couponCode"]:checked');
    for(const chk of chks){
        console.log(chk.value);
        chksValue.push(chk.value);
    }
    
    //체크박스 체크여부 (미완)
    // if (document.querySelector('.enInput').ariaChecked == true) {
    //     alert('빈칸에 값을 입력해주세요!');
    // }
    // else {
    //     confirm('정말로 지급하시겠습니까?');
    //     sendCouponForm.submit();
        
    // }

    if (confirm("정말로 지급하시겠습니까?")){
		alert("쿠폰을 지급했습니다.");
        sendCouponForm.submit();
	} else {
		alert("취소되었습니다.");
	}
}