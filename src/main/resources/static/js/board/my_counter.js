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
                    <td width="60%">&nbsp;</td>
                    <td>
                        <div>
                            <span>발신</span>
                        </div>
                        <div class="toMsg">
                            <div class="botMsg">
                                <span>${e.messageContent}</span>
                            </div>
                        </div>
                        <div class="topMsg" style="float: left;">
                            <span>&ensp;&ensp;${e.messageDate}</span>
                        </div>
                    </td>
                </tr>`
                } else {
                    str += `<tr>
                    <td>
                    <div class="userMsg">
                        <span>&ensp;수신</span>
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
                <td width="60%">&nbsp;</td>
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