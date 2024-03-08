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
            <form action="/admin/uptCharge" method="post">
            <input type="hidden" name="chargeCode" value="${chargeCode}">
                            <table class="adminContainer-table">
                                <colgroup>
                                    <col width="6%">
                                    <col width="20%">
                                    <col width="7%">
                                    <col width="20%">
                                    <col width="7%">
                                    <col width="20%">
                                    <col width="*">
                                </colgroup>
                                <tbody>
                                    <tr>
                                        <td>
                                            <div class="row">
                                                <div class="col text-end">
                                                    【요금명】
                                                </div>
                                            </div>
                                        </td>                                       
                                        <td class="charge-td">
                                            <input type="text" name="chargeName" value="${data.chargeName}" class="nameInput" placeholder="입력해주세요." style="font-style: oblique;">
                                        </td>
                                        <td>
                                            <div class="row">
                                                <div class="col text-end">
                                                    【기간(일)】
                                                </div>
                                            </div>
                                        </td>
                                        <td class="charge-td">
                                            <input type="text" name="chargeDate" value="${data.chargeDate}" class="dateInput" placeholder="입력해주세요." style="font-style: oblique;">
                                        </td>
                                        <td>
                                            <div class="row">
                                                <div class="col text-end">
                                                    【가격(원)】
                                                </div>
                                            </div>
                                        </td>                                        
                                        <td class="charge-td">
                                            <input type="text" name="chargeFee" value="${data.chargeFee}" class="chargeInput" placeholder="입력해주세요." style="font-style: oblique;">
                                        </td>
                                        <td>
                                            <div class="row">
                                                <div class="col text-end">
                                                    <div class="btnDiv">
                                                        <input type="submit" value="요금 변경" class="not-null-btn">&nbsp;
                                                        <input type="button" value="취소" onclick="window.location.reload()">
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div style="padding: 2vh;"></div>
                            <div>
                                <div class="btnDiv">                                           
                                    <input type="button" value="삭제" class="not-null-btn" onclick="deleteCharge(${chargeCode})" style="color: red;">                               
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


//빈값 입력 방지
document.querySelector('.not-null-btn').addEventListener('click', function (e) {
    //만약 id 있는 input태그의 value가 공백이라면
    if (document.querySelector('.nameInput').value == '') {
        e.preventDefault() //빈값 방지
        alert('빈칸에 값을 입력해주세요!')
    }
    else if (document.querySelector('.chargeInput').value == '') {
        e.preventDefault() //빈값 방지
        alert('빈칸에 값을 입력해주세요!')
    }
});

//charge 삭제
function deleteCharge(chargeCode) {
    if(confirm('정말 삭제하시겠습니까?')){
        location.href=`/admin/delCharge?chargeCode=${chargeCode}`;
    }
}