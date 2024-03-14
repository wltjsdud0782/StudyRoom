//info 나오기
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
            console.log(data);
            const changeInfo = document.querySelector('.changeInfo-div');
            changeInfo.replaceChildren();
            let str = '';
            str += `  
                        <form action="/admin/uptInfo" method="post">
                        <input type="hidden" name="memberCode" value="${memberCode}">
                            <h4>&nbsp;Member</h4>
                            <table class="adminContainer-table">
                                <colgroup>
                                    <col width="11%">
                                    <col width="22%">
                                    <col width="11%">
                                    <col width="22%">
                                    <col width="11%">
                                    <col width="*">
                                </colgroup>
                                <tbody id="changeInfo">
                                    <tr>
                                        <td class="info-border-title">
                                            <div class="row">
                                                <div class="col info-title">
                                                    이름/아이디
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="row">
                                                <div class="col" style="padding-top: 7px;">
                                                    ${data.memberMap.memberName} (${data.memberMap.memberId})
                                                </div>
                                                <div class="col-4" style="text-align: center;">`;
            if (data.memberMap.memberGender == 'M') {
                str += `&nbsp;<input type="button" value="남자" class="btn btn-dark" disabled>`;
            }
            if (data.memberMap.memberGender == 'W') {
                str += `&nbsp;<input type="button" value="여자" class="btn btn-dark" disabled>`;
            }
            str += `</div>
                                            </div>
                                        </td>
                                        <td class="info-border-title">
                                            <div class="row">
                                                <div class="col info-title">
                                                    생년 월일
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="row">
                                                <div class="col">
                                                    ${data.memberMap.memberBirth}
                                                </div>
                                            </div>
                                        </td>
                                        <td class="info-border-title">
                                            <div class="row">
                                                <div class="col info-title">
                                                    전화 번호                                               
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="row">
                                                <div class="col">
                                                    <input type="text" value="${data.memberMap.memberTel}" 
                                                    style="border: 1px solid #ccc; height: 40px;" name="memberTel">                                  
                                                </div>
                                            </div>
                                        </td>                      
                                    </tr>
                                    <tr>   
                                        <td class="info-border-title">
                                            <div class="row">
                                                <div class="col info-title">
                                                    우편 주소
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="row">
                                                <div class="col">
                                                    <input type="text" value="${data.memberMap.postCode}" id="postCode"
                                                    style="border: 1px solid #ccc; height: 40px;" name="postCode">&ensp;
                                                    <span>
                                                        <input type="button" value="검색" class="btn btn-dark" onclick="searchAddress()">
                                                    </span>                                            
                                                </div>                                         
                                            </div>
                                        </td>                                
                                        <td class="info-border-title">
                                            <div class="row">
                                                <div class="col info-title">
                                                    주소 정보
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="row">
                                                <div class="col">
                                                    <input type="text" value="${data.memberMap.memberAddr}" id="roadAddr"
                                                    style="border: 1px solid #ccc; height: 40px;" name="memberAddr">                                                   
                                                </div>
                                            </div>
                                        </td>
                                        <td class="info-border-title">
                                            <div class="row">
                                                <div class="col info-title">
                                                    상세 주소
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="row">
                                                <div class="col">
                                                    <input type="text" value="${data.memberMap.addrDetail}" 
                                                    style="border: 1px solid #ccc; height: 40px;" name="addrDetail">               
                                                </div>
                                            </div>
                                        </td>                                       
                                    </tr>
                                    <tr>   
                                    <td class="info-border-title">
                                        <div class="row">
                                            <div class="col info-title">
                                                권한 상태   
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="row">
                                            <div class="col">
                                            <select name="isAdmin">`;
            if (data.memberMap.isAdmin == 'USER') {
                str += `
                                            <option value="USER" selected>회원</option>
                                            <option value="ARBEIT">알바생</option>
                                            <option value="ADMIN">관리자</option>`;
            }
            else if (data.memberMap.isAdmin == 'ARBEIT') {
                str += `
                                            <option value="USER">회원</option>
                                            <option value="ARBEIT" selected>알바생</option>
                                            <option value="ADMIN">관리자</option>`;
            }
            else if (data.memberMap.isAdmin == 'ADMIN') {
                str += `
                                            <option value="USER">회원</option>
                                            <option value="ARBEIT">알바생</option>
                                            <option value="ADMIN" selected>관리자</option>`;
            }
            str += `</select>
                                            </div>
                                        </div>
                                    </td>                                
                                    <td class="info-border-title">
                                        <div class="row">
                                            <div class="col info-title">
                                                좌석 사용
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="row">
                                            <div class="col">`;
            if (data.seatMap == null) {
                str += `
            사용 중인 좌석이 없습니다.
            </div>
                                    </td>
                                    <td class="info-border-title">
                                        <div class="row">
                                            <div class="col info-title">
                                                점등 상태
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="row">
                                            <div class="col">
                                            `;
            }
            else {
                str += `
                ${data.seatMap.seatFloor}층&ensp;
                <input type="number" value="${data.seatMap.seatNum}" class="numUpDown"
                style="border: 1px solid #ccc; height: 40px; width: 40px; text-align: center;" 
                name="" min="1" max="60">번석
                </div>
                                        </div>
                                    </td>
                                    <td class="info-border-title">
                                        <div class="row">
                                            <div class="col info-title">
                                                점등 상태
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="row">
                                            <div class="col">
                                            <select name="seatPower">`;
                if (data.seatMap.seatPower == 'ON') {
                    str += `
                                            <option value="ON" selected>켜짐</option>
                                            <option value="OFF">꺼짐</option>`;
                }
                else if (data.seatMap.seatPower == 'OFF') {
                    str += `
                                            <option value="ON">켜짐</option>
                                            <option value="OFF" selected>꺼짐</option>`;
                }
            }
            // str +=`                                                                                                                                                                
            //                                 </div>
            //                             </div>
            //                         </td>
            //                         <td class="info-border-title">
            //                             <div class="row">
            //                                 <div class="col info-title">
            //                                     점등 상태
            //                                 </div>
            //                             </div>
            //                         </td>
            //                         <td>
            //                             <div class="row">
            //                                 <div class="col">
            //                                 <select name="seatPower">`;
            // if (data.seatMap.seatPower == 'ON') {
            //     str += `
            //                                 <option value="ON" selected>켜짐</option>
            //                                 <option value="OFF">꺼짐</option>`;
            // }
            // else if (data.seatMap.seatPower == 'OFF') {
            //     str += `
            //                                 <option value="ON">켜짐</option>
            //                                 <option value="OFF" selected>꺼짐</option>`;
            // }
            str += `</select>
                                            </div>
                                        </div>
                                    </td>                                       
                                </tr>
                            </tbody>
                        </table>  
                        <div style="padding: 2vh;"></div>   
                        <div class="btnDiv">
                            <input type="submit" value="변경 저장">&nbsp;
                            <input type="button" value="변경 취소" onclick="memberInfo(${memberCode})">
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


// search 버튼 클릭 시 주소록 검색 팝업 창 띄우기
function searchAddress() {
    new daum.Postcode({
        oncomplete: function (data) {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분입니다.
            // 예제를 참고하여 다양한 활용법을 확인해 보세요.
            document.querySelector('#postCode').value = data.zonecode;
            document.querySelector('#roadAddr').value = data.roadAddress;

        }
    }).open();
}