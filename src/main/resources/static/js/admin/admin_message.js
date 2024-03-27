//페이지 최초 실행
setReceiver();
function setReceiver() {
    const receiver = document.querySelector("#receiver").value;

    if (receiver != '') {
        document.querySelector('#send_memberName').value = receiver;
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
            document.querySelector('#send_memberName').value = `@${data.member.memberName}`;

            const oneByone = document.querySelector('.adminContainer-table-tbody2');
            oneByone.innerHTML = '';
            let str = '';
            data.chtList.forEach(e => {
                str += `
            <tr>
                <td>
                    <div class="userMsg">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16"
                                height="16" fill="currentColor"
                                class="bi bi-arrow-return-right" viewBox="0 0 16 16">
                                <path fill-rule="evenodd"
                                d="M1.5 1.5A.5.5 0 0 0 1 2v4.8a2.5 2.5 0 0 0 2.5 2.5h9.793l-3.347 3.346a.5.5 0 0 0 .708.708l4.2-4.2a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 8.3H3.5A1.5 1.5 0 0 1 2 6.8V2a.5.5 0 0 0-.5-.5" />
                            </svg>
                        </span>
                        <th:block th:if="${toFrom == 'TO'}" >
                            <span>&nbsp;[[${chat.memberVO.memberName}]]([[${chat.memberVO.memberId}]]) 님에게</span>
                        </th:block>
                        <th:block th:else="${toFrom == 'TO'}" >
                            <span>&nbsp;[[${chat.memberVO.memberName}]]([[${chat.memberVO.memberId}]]) 님으로부터</span>
                        </th:block>
                    </div>
                    <div class="botMsg">
                        <span>${e.messageContent}</span>
                    </div>
                    <div class="topMsg text-end">
                        <span>${e.messageDate}&ensp;</span>
                    </div>
                </td>
            </tr>`});
            //th:each="chat : ${data.chtList}"
            oneByone.insertAdjacentHTML('afterbegin', str)
        })

        //fetch 통신 실패 시 실행 영역
        .catch(err => {
            alert('fetch error!\nthen 구문에서 오류가 발생했습니다.\n콘솔창을 확인하세요!');
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

    if (document.querySelector('#admin_message_content').value == '') {
        alert('빈칸에 값을 입력해주세요!');
    }
    else {
        sendForm.submit();
    }
}

