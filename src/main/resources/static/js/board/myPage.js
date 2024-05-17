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
                            <td><input type="text" name="memberName" class="change-name" value="${data.memberList.memberName}"></td>
                        </tr>

                        <tr>
                            <td>전화번호</td>
                            <td><input type="text" name="memberTel" class="changeTel" value="${data.memberList.memberTel}"></td>
                        </tr>
                        <tr>
                            <td>이메일</td>
                            <td><input type="text" name="memberEmail" class="changeEmail" value="${data.memberList.memberEmail}"></td>
                        </tr>
                        <tr>
                            <td>생년월일</td>
                            <td>
                                <input type="date" name="memberBirth" class="changeBir" value="${data.memberList.memberBirth}"></td>
                        </tr>
                        <tr>
                            <td >
                                우편번호
                            </td>
                            <td >    
                                <input type="text" id="sample6_postcode" name="postCode" sytle="width:450px;">
                                <input type="button" onclick="sample6_execDaumPostcode()" value="우편번호 찾기" style="width: 150px;">
                            </td>
                        </tr>
                        <tr>
                            <td>주소</td>
                            <td>
                                <input type="text" id="sample6_address" value="${data.memberList.memberAddr}" class="addr-inpu" name="memberAddr" placeholder=" 주소">
                            </td>
                        </tr>
                        <tr>
                            <td>상세주소</td>
                            <td>
                                <input type="text" id="sample6_detailAddress" value="${data.memberList.addrDetail}"  name="addrDetail" placeholder=" 상세주소">
                            </td>
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
    const changeName = document.querySelector(".change-name")
    const addrInpu = document.querySelector(".addr-inpu")
    const changeBir = document.querySelector(".changeBir")
    const changeEmail = document.querySelector(".changeEmail")
    const changeTel = document.querySelector(".changeTel")

    if(changeName.value == ''){
        alert("이름을 입력해주세요.")
        return;
    }
    if(addrInpu.value == ''){
        alert("주소를 입력해주세요.")
        return;
    }
    if(changeBir.value == ''){
        alert("생년월일(8자리)를 입력해주세요.")
        return;
    }
    if(changeEmail.value == ''){
        alert("이메일을 입력해주세요.")
        return;
    }
    if(changeTel.value == ''){
        alert("전화번호를 입력해주세요.")
        return;
    }

    if(pwInputs[0].value == ''){
        alert("변경하실 비밀번호를 입력해주세요.")
        return;
    }
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

function sample6_execDaumPostcode() {
    new daum.Postcode({
        oncomplete: function(data) {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

            // 각 주소의 노출 규칙에 따라 주소를 조합한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var addr = ''; // 주소 변수
            var extraAddr = ''; // 참고항목 변수

            //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
            if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                addr = data.roadAddress;
            } else { // 사용자가 지번 주소를 선택했을 경우(J)
                addr = data.jibunAddress;
            }

            // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
            if(data.userSelectedType === 'R'){
                // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                    extraAddr += data.bname;
                }
                // 건물명이 있고, 공동주택일 경우 추가한다.
                if(data.buildingName !== '' && data.apartment === 'Y'){
                    extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                }
                // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                if(extraAddr !== ''){
                    extraAddr = ' (' + extraAddr + ')';
                }
                // 조합된 참고항목을 해당 필드에 넣는다.
                // document.getElementById("sample6_extraAddress").value = extraAddr;
            
            } 

            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            document.getElementById('sample6_postcode').value = data.zonecode;
            document.getElementById("sample6_address").value = addr;
            // 커서를 상세주소 필드로 이동한다.
            document.getElementById("sample6_detailAddress").focus();
        }
    }).open();
}