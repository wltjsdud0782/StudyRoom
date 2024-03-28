
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
            const changeInfo = document.querySelector('.changeInfo-div');
            changeInfo.replaceChildren();
            let str = '';
            str += `
                    <input type="hidden" name="memberCode" value="${memberCode}">
                        <h4>&nbsp;회원 정보</h4>
                        <table class="adminContainer-table">
                            <tbody>
                                <tr>
                                    <td>
                                        <div class="row">
                                            <div class="col">
                                                ●이름:${data.memberMap.memberName}
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="row">
                                            <div class="col">
                                                ●아이디:${data.memberMap.memberId}
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="row">
                                            <div class="col">
                                                ●성별:${data.memberMap.memberGender}
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="row">
                                            <div class="col">
                                                ●생년월일:${data.memberMap.memberBirth}
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="row">
                                            <div class="col">
                                                ●전화번호:${data.memberMap.memberTel}
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="row">
                                            <div class="col">
                                                ●우편번호:${data.memberMap.postCode}
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="row">
                                            <div class="col">
                                                ●주소:${data.memberMap.memberAddr}
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="row">
                                            <div class="col">
                                                ●상세주소:${data.memberMap.addrDetail}
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="row">
                                            <div class="col">
                                                
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="row">
                                            <div class="col">
                                                
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="row">
                                            <div class="col">
                                                
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="row">
                                            <div class="col">
                                                ●권한:${data.memberMap.isAdmin}
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                
                            </tbody>
                        </table>
                        <div style="padding: 2vh;"></div>`;
            //좌석 정보 불러오기
            if (data.seatMap != null) {
                str += `<h4>&nbsp;좌석 정보</h4>
                            <table class="adminContainer-table">
                                <tbody>
                                    <tr>
                                        <td>
                                            <div class="row">
                                                <div class="col">
                                                    ●좌석상태:${data.seatMap.seatStatusVO.statusName}
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="row">
                                                <div class="col">
                                                    ●층수:${data.seatMap.seatFloor}
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="row">
                                                <div class="col">
                                                    ●좌석:${data.seatMap.seatNum}
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="row">
                                                <div class="col">
                                                    ●점등:${data.seatMap.seatPower}
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div style="padding: 2vh;"></div>`;
            }
            //못한다면
            else {
                str += ``;
            }
            //이용권 정보 불러오기
            if (data.charName != null) {
                str += `<h4>&nbsp;이용권</h4>
                        <table class="adminContainer-table">
                            <tbody>
                                <tr>
                                    <td>
                                        <div class="row">
                                            <div class="col">
                                                ●요금제 이름:${data.charName}
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="row">
                                            <div class="col">
                                                ●n일 사용권:${data.charDate}
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="row">
                                            <div class="col">
                                                ●결제일:${data.charAppDate}
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="row">
                                            <div class="col">
                                                ●남은시간:${data.charRemDate}
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="row">
                                            <div class="col">
                                                ●경과일:${data.charDate - data.charRemDate}
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="row">
                                            <div class="col">
                                                ●만료날짜:${data.charEndDate}
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    <div style="padding: 2vh;"></div>`;
            }
            else {
                str += ``;
            }
            //쿠폰 정보 불러오기
            if (data.couponMap != '') {
                str += `
                <h4>&nbsp;쿠폰</h4>
                    <table class="adminContainer-table">
                            <tbody>
                            <!-- couponMap[i]로 반복문 돌리면 된다 -->
                                <tr>
                                    <td>
                                        <div class="row">
                                            <div class="col">
                                                ●쿠폰이름:${data.couponMap[0].couponVOList[0].couponName}
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="row">
                                            <div class="col">
                                                ●할인율:${data.couponMap[0].couponVOList[0].discountPercent}
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            <!-- 반복문 여기까지 -->    
                            </tbody>
                    </table>`;
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