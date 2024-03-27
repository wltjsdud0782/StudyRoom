function sendMsg(loginInfo) {
    const content = document.querySelector('#user_message_content');
    const chat = document.querySelector('.userChat');

    fetch('/board/sendCounter', { //요청경로
        method: 'POST',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        //컨트롤러로 전달할 데이터
        body: JSON.stringify({
            // 데이터명 : 데이터값
            memberCode: `${loginInfo.memberCode}`
            , messageContent: content.value

        })
    })
        .then((response) => {
            //return response.text(); //컨트롤러에서 return하는 데이터가 없거나 int, String 일 때 사용
            return response.json(); //나머지 경우에 사용
        })
        //fetch 통신 후 실행 영역
        .then((data) => {//data -> controller에서 리턴되는 데이터!
            chat.innerHTML = '';
            str = ``;

            data.forEach(e => {
                if (e.toFrom == 'FROM') {
                    str += `<tr>
                <td class="msgTalk">
                <div class="userMsg">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                            fill="currentColor" class="bi bi-arrow-return-right"
                            viewBox="0 0 16 16">
                            <path fill-rule="evenodd"
                                d="M1.5 1.5A.5.5 0 0 0 1 2v4.8a2.5 2.5 0 0 0 2.5 2.5h9.793l-3.347 3.346a.5.5 0 0 0 .708.708l4.2-4.2a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 8.3H3.5A1.5 1.5 0 0 1 2 6.8V2a.5.5 0 0 0-.5-.5" />
                        </svg>
                    </span>
                    <span>카운터에게</span>
                </div>
                <div class="botMsg">
                    <span>${e.messageContent}</span>
                </div>
                <div class="text-end">
                    <span>${e.messageDate}</span>
                </div>
            </td>
                </tr>`
                } else {
                    str += `<tr>
                <td>
                <div>
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                            fill="currentColor" class="bi bi-arrow-return-right"
                            viewBox="0 0 16 16">
                            <path fill-rule="evenodd"
                                d="M1.5 1.5A.5.5 0 0 0 1 2v4.8a2.5 2.5 0 0 0 2.5 2.5h9.793l-3.347 3.346a.5.5 0 0 0 .708.708l4.2-4.2a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 8.3H3.5A1.5 1.5 0 0 1 2 6.8V2a.5.5 0 0 0-.5-.5" />
                        </svg>
                    </span>
                    <span>카운터에서 나에게</span>
                </div>
                <div>
                    <span>${e.messageContent}</span>
                </div>
                <div class="text-end">
                    <span>${e.messageDate}</span>
                </div>
            </td>
                </tr>`
                }

            });

            chat.insertAdjacentHTML("afterbegin", str)
            content.value = '';

        })
        //fetch 통신 실패 시 실행 영역
        .catch(err => {
            alert('fetch error!\nthen 구문에서 오류가 발생했습니다.\n콘솔창을 확인하세요!');
            console.log(err);
        });
}