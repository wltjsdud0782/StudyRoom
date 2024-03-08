//info 나오기
function memberInfo(memberCode, idx) {
    fetch('/admin/changeInfo', { //요청경로
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
            const changeInfo = document.querySelector('.changeInfo-div');
            changeInfo.replaceChildren();
            let str = '';
            str += `  
                        <form action="/admin/uptMemberInfo" method="post">
                        <input type="hidden" name="memberCode" value="${memberCode}">
                            <h4>&nbsp;Member&ensp;#${idx}</h4>
                            <table class="adminContainer-table">
                                <colgroup>
                                    <col width="8%">
                                    <col width="25%">
                                    <col width="8%">
                                    <col width="25%">
                                    <col width="8%">
                                    <col width="*">
                                </colgroup>
                                <tbody id="changeInfo">
                                    <tr>
                                        <td>
                                            <div class="row">
                                                <div class="col">
                                                    【이름/성별】
                                                </div>
                                            </div>
                                        </td>
                                        <td class="Info-border">
                                            <div class="row">
                                                <div class="col">
                                                    ${data.memberName} (${data.memberGender})
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="row">
                                                <div class="col">
                                                    【아이디】
                                                </div>
                                            </div>
                                        </td>
                                        <td class="Info-border">
                                            <div class="row">
                                                <div class="col">
                                                    ${data.memberId}
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="row">
                                                <div class="col">
                                                    【전화번호】                                                
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="row">
                                                <div class="col">
                                                    <input type="text" value="${data.memberTel}" style="border: 1px solid #ccc;" name="memberTel">                                                
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>                                        
                                        <td>
                                            <div class="row">
                                                <div class="col">
                                                    【주소정보】
                                                </div>
                                            </div>
                                        </td>
                                        <td class="Info-border">
                                            <div class="row">
                                                <div class="col">
                                                    <input type="text" value="${data.memberAddr}" style="border: 1px solid #ccc;" name="memberAddr">                                                   
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="row">
                                                <div class="col">
                                                    【상세주소】
                                                </div>
                                            </div>
                                        </td>
                                        <td class="Info-border">
                                            <div class="row">
                                                <div class="col">
                                                    <input type="text" value="${data.addrDetail}" style="border: 1px solid #ccc;" name="addrDetail">               
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="row">
                                                <div class="col">
                                                    【생년월일】
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="row">
                                                <div class="col">
                                                    ${data.memberBirth}
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div class="row">
                                                <div class="col">
                                                    【좌석 이용】                                                   
                                                </div>
                                            </div>
                                        </td>
                                        <td class="Info-border">
                                            <div class="row">
                                                <div class="col btnDiv">
                                                    <input type="button" value="조회하기" onclick="seatModal(${memberCode})">                                                   
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="row">
                                                <div class="col">                                                   
                                                    【권한 변경】 
                                                </div>
                                            </div>
                                        </td>
                                        <td class="Info-border">
                                        <div class="row">
                                            <div class="col">
                                                <select name="isAdmin">`;
            if (data.isAdmin == 'USER') {
                str += `
            <option value="USER" selected>회원</option>
            <option value="ARBEIT">알바생</option>
            <option value="ADMIN">관리자</option>`;
            }
            else if (data.isAdmin == 'ARBEIT') {
                str += `
            <option value="USER">회원</option>
            <option value="ARBEIT" selected>알바생</option>
            <option value="ADMIN">관리자</option>`;
            }
            else if (data.isAdmin == 'ADMIN') {
                str += `
            <option value="USER">회원</option>
            <option value="ARBEIT">알바생</option>
            <option value="ADMIN" selected>관리자</option>`;
            }
            str += `</select>
                                            </div>
                                        </div>
                                    </td>
                                        <td colspan=2>
                                            <div class="row">
                                                <div class="col">                                                   
                                                    <div class="btnDiv">
                                                        <input type="submit" value="회원정보 변경">&nbsp;
                                                        <input type="button" value="취소" onclick="window.location.reload()">
                                                    </div>
                                                </div>
                                            </div>
                                        </td>                                       
                                    </tr>
                                </tbody>
                            </table>                           
                        </form>
            `;
            changeInfo.insertAdjacentHTML('afterbegin', str)
        })
        //fetch 통신 실패 시 실행 영역
        .catch(err => {
            alert('fetch error!\nthen 구문에서 오류가 발생했습니다.\n콘솔창을 확인하세요!');
            console.log(err);
        });
}


//seat info 모달
const seat_Modal = new bootstrap.Modal('#seatModal');

function seatModal(memberCode) {
    fetch('/admin/changeSeat', { //요청경로
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
            alert('받은 memberCode : ' + memberCode);
            alert('받은 data : ' + data);
            seat_Modal.show();
        })
        //fetch 통신 실패 시 실행 영역
        .catch(err => {
            alert('fetch error!\nthen 구문에서 오류가 발생했습니다.\n콘솔창을 확인하세요!');
            console.log(err);
        });

}