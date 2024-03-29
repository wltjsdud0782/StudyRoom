function loginCheck(mId){

    const checkId = document.querySelector(".memberId").value;
    const checkPw = document.querySelector(".memberPw").value;

    const myPageContent = document.querySelector(".myPage-content");

    fetch('/board/loginCheck', { //요청경로
        method: 'POST',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        //컨트롤러로 전달할 데이터
        body: JSON.stringify({
           // 데이터명 : 데이터값
            memberId : mId ,
            memberPw : checkPw
        })
    })
    .then((response) => {

        // return response.text();
        return response.json(); //나머지 경우에 사용
    })
    //fetch 통신 후 실행 영역
    .then((data) => {//data -> controller에서 리턴되는 데이터!
        console.log(data)

        if(data.nullInfo == ""){
            alert("입력하신 비밀번호가 맞지않습니다.")
            checkPw.value = '';
        }
        else{
            myPageContent.innerHTML= '';

            let str = '';

            str += `
                <form action="/board/updatePersInfo" method="post" class="myPageForm">
                    <input type="hidden" value=${data.memberList.memberCode} name="memberCode">
                    <table class="myPage-table table align-middle">
                        <colgroup>
                            <col width="20%">
                            <col width="*">
                        </colgroup>
                        <tr>
                            <td>아이디 <span style="font-size: 10px; color: red;">변경불가</span>
                            </td>
                            <td><input type="text" value="${data.memberList.memberId}" name="memberId" readonly></td>
                        </tr>
                        <tr>
                            <td>비밀번호 <span>*</span></td>
                            <td><input type="password" name="memberPw"></td>
                        </tr>
                        <tr>
                            <td>비밀번호 확인<span>*</span></td>
                            <td><input type="password" name=""></td>
                        </tr>
                        <tr>
                            <td>이름 <span>*</span></td>
                            <td><input type="text" name="memberName" value="${data.memberList.memberName}"></td>
                        </tr>

                        <tr>
                            <td>전화번호</td>
                            <td><input type="text" name="memberTel" value="${data.memberList.memberTel}"></td>
                        </tr>

                        <tr>
                            <td>생년월일</td>
                            <td>
                                <input type="date" name="memberBirth" value="${data.memberList.memberBirth}"></td>
                        </tr>

                        <tr>
                            <td>주소</td>
                            <td><input type="text" name="memberAddr" value="${data.memberList.memberAddr}"></td>
                        </tr>

                        <tr>
                            <td>상세주소</td>
                            <td><input type="text" name="memberDetail" value="${data.memberList.addrDetail}"></td>
                        </tr>
                    </table>

                    <div class="myPage-btn">
                        <button type="button" style="color: #fff;" onclick="updateInfo()">변경</button>
                    </div>
                </form>
            `

            myPageContent.insertAdjacentHTML("afterbegin", str);

        }
    })
    //fetch 통신 실패 시 실행 영역
    .catch(err=>{
        alert('fetch error!\nthen 구문에서 오류가 발생했습니다.\n콘솔창을 확인하세요!');
        console.log(err);
    });
    
    
}
function updateInfo(){
    
    const pwInputs = document.querySelectorAll('input[type="password"]')

    if(pwInputs[0].value != pwInputs[1].value){
        // < \n > 한 줄 개행 
        alert('입력한 두 비밀번호가 다릅니다.\n비밀번호를 다시 입력해주세요.')
        return ;
    }
    else{
        alert("정보가 변경이 되었습니다.")
        document.querySelector(".myPageForm").submit();
    }
}