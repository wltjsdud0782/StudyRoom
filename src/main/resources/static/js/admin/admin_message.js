//페이지 최초 실행
setReceiver();
function setReceiver() {
    const receiver = document.querySelector("#receiver").value;

    if (receiver != '') {
        document.querySelector('#send_memberName').value = receiver;
    }

}

//submit
function infoSearch() {
    const sendCharge = document.querySelector('.infoSearch');

    if (document.querySelector('.searchInput').value == '') {
        alert('빈칸에 값을 입력해주세요!');
    }
    else {
        sendCharge.submit();
    }
}

//멤버 리스트 클릭 시 보낼 사람 호출
function goChat(memberCode) {
    fetch('/admin/who', { //요청경로
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
            document.querySelector('input[name="memberCode"]').value = memberCode;
            document.querySelector('#send_memberName').value = `+${data.member.memberName}`;

            const oneByone = document.querySelector('.adminContainer-table-tbody2');
            oneByone.innerHTML = '';
            let str = '';
            data.chtList.forEach(e => {
                str += `
            <tr>`;
                if (e.toFrom == 'TO') {
                    str += `
                <td width="60%"></td>    
                <td>
                    <div class="toMsg">
                        <div class="botMsg">
                            <span>${e.messageContent}</span>
                        </div>
                    </div>
                    <div class="topMsg" style="float: left;">
                        <span>&ensp;&ensp;${e.messageDate}</span>
                    </div>
                </td>`;
                }
                else {
                    str += `                                   
                <td>
                    <div class="userMsg">
                        &ensp;${data.member.memberName} (${data.member.memberId}) 회원님
                    </div>
                    <div class="fromMsg">
                        <div class="botMsg">
                            <span>${e.messageContent}</span>
                        </div>
                    </div>
                    <div class="topMsg" style="float: right;">
                        <span>${e.messageDate}&ensp;&ensp;</span>
                    </div>
                </td>
                <td width="60%"></td>
            </tr>
            `;
                }
            })
            //th:each="chat : ${data.chtList}"
            oneByone.insertAdjacentHTML('afterbegin', str)
        })

        //fetch 통신 실패 시 실행 영역
        .catch(err => {
            alert('fetch error!\nthen 구문에서 오류가 발생했습니다.\n콘솔창을 확인하세요.');
            console.log(err);
        });
}

//submit으로 보내기
function StartChat() {

    const sendForm = document.querySelector('#sendForm');

    const memberCode = document.querySelector('#send_memberCode').value;
    document.querySelector('input[name="memberCode"]').value = memberCode;

    let receiverName = document.querySelector('#send_memberName').value;
    document.querySelector('#receiver').value = receiverName;

    if (memberCode == 0) {
        alert('보낼 사람을 선택해주세요.');
    }
    else if (document.querySelector('#admin_message_content').value == '') {
        alert('메시지를 입력해주세요.');
    }
    else {
        sendForm.submit();
    }
}
