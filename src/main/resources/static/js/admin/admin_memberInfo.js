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
                            <h4>&nbsp;Info&ensp;#${idx}</h4>
                            <table class="adminContainer-table">
                                <colgroup>
                                    <col width="33%">
                                    <col width="33%">
                                    <col width="*">
                                </colgroup>
                                <tbody id="changeInfo">
                                    <tr>
                                        <td>
                                            <div class="row">
                                                <div class="col Info-border">
                                                    【이름】 : ${data.memberName}
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="row">
                                                <div class="col Info-border">
                                                    【아이디】 : ${data.memberId}
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="row">
                                                <div class="col">
                                                    【전화번호】 : ${data.memberTel}                                                   
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>                                        
                                        <td>
                                            <div class="row">
                                                <div class="col Info-border">
                                                    【주소】 : ${data.memberAddr}
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="row">
                                                <div class="col Info-border">
                                                    【상세주소】 : ${data.memberDetail}
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="row">
                                                <div class="col">
                                                    【생년월일】 : ${data.memberBirth}
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div class="row">
                                                <div class="col Info-border">
                                                    【성별】 : ${data.memberGender}                                                    
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="row">
                                                <div class="col Info-border">                                                   
                                                    【상태(좌석)】 : <font color="red" ;>${data.seatNum}</font>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="row">
                                                <div class="col">
                                                    【권한 변경】 :
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
                                    </tr>
                                </tbody>
                            </table>
                            <div style="padding: 2vh;"></div>
                            <div class="btnDiv">
                                <input type="submit" value="회원정보 변경">&nbsp;
                                <input type="button" value="취소" onclick="window.location.reload()">
                            </div>
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
