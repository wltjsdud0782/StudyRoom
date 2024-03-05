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

        return response.text();
        // return response.json(); //나머지 경우에 사용
    })
    //fetch 통신 후 실행 영역
    .then((data) => {//data -> controller에서 리턴되는 데이터!
        console(data)

        if(data == ''){
            alert("입력하신 비밀번호가 맞지않습니다.")
            checkPw.value = '';
        }
        else{
            myPageContent.innerHTML= '';

            let str = '';

            str = `
                <form action="">
                    <table class="myPage-table table">
                        <colgroup>
                            <col width="20%">
                            <col width="*">
                        </colgroup>
                        <tr>
                            <td>아이디 <span style="font-size: 10px; color: red;">변경불가</span>
                            </td>
                            <td><input type="text" value="" name="memberId" readonly></td>
                        </tr>
                        <tr>
                            <td>비밀번호 <span>*</span></td>
                            <td><input type="text" name="memberPw"></td>
                        </tr>
                        <tr>
                            <td>비밀번호 확인<span>*</span></td>
                            <td><input type="text" name=""></td>
                        </tr>
                        <tr>
                            <td>이름 <span>*</span></td>
                            <td><input type="text" name="memberName" value=""></td>
                        </tr>
                        <tr>
                            <td>전화번호</td>
                            <td><input type="text" name="memberTel" value=""></td>
                        </tr>
                        <tr>
                            <td>주소</td>
                            <td><input type="text" name="memberAddr" value=""></td>
                        </tr>
                        <tr>
                            <td>상세주소</td>
                            <td><input type="text" name="memberDetail" value=""></td>
                        </tr>
                    </table>

                    <div class="myPage-btn">
                        <button type="submit" value="변경"></button>
                    </div>
                </form>
            `
            
        }
    })
    //fetch 통신 실패 시 실행 영역
    .catch(err=>{
        alert('fetch error!\nthen 구문에서 오류가 발생했습니다.\n콘솔창을 확인하세요!');
        console.log(err);
    });
    

}