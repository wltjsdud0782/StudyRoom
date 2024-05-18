const findTel = document.querySelector(".find-tel")
const findEmail = document.querySelector(".find-email")

const goTel = (memberId, secretEmail) => {


    fetch('/member/goTel', { //요청경로
        method: 'POST',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        //컨트롤러로 전달할 데이터
        body: new URLSearchParams({
            // 데이터명 : 데이터값
            memberId: memberId
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
            let sr = ''
            findEmail.innerHTML = ''

            sr += `
            <input type="radio" name="findPassword" onclick='goEmail("${data.memberId}", "${data.secretEmail}")'; this.onclick='null';"  class="showEmail"> 
            <span class="span-header">회원에 등록한 이메일로 찾기</span>
            <span class="span-style"> (${data.secretEmail})</span>
            `
            findEmail.insertAdjacentHTML("afterbegin", sr);


            const getTel = data.memberTel

            const findTel = document.querySelector(".find-tel")

            let str = ''

            str += `
        <div class="find-tel-container">
            <div class="find-tel-header">
            <span>회원정보에 등록한 휴대전화 번호와 입력한 휴대전화 번호가 같아야, 인증번호를 받을 수 있습니다.</span>
            </div>
            <div class="find-tel-content">
            <div class="find-tel-name" style="margin-bottom: 5px;">
                <input type="text" placeholder=" 이름" name="memberName" class="getName">
            </div>
            <div class="find-tel-tel">
                <input type="text" placeholder=" 전화번호" name="memberTel" class="memberTelInfo">`
            str += `<button type="button" onclick='telNumber("${data.memberTel}", "${data.memberId}")'>인증번호받기</button>`
            str += `</div>
            </div>
            <div class="find-tel-footer">
            <input type="text" placeholder="인증번호 6자리 숫자 입력" class="checkCode">
            <button type="button" class="checkTel">다음</button>
            </div>
        </div>
        `
            findTel.insertAdjacentHTML("beforeend", str)
        })
        //fetch 통신 실패 시 실행 영역
        .catch(err => {
            alert('fetch error!\nthen 구문에서 오류가 발생했습니다.\n콘솔창을 확인하세요!');
            console.log(err);
        });
}

const goEmail = (memberId, secretTel) => {
    fetch('/member/goEmail', { //요청경로
        method: 'POST',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        //컨트롤러로 전달할 데이터
        body: new URLSearchParams({
            // 데이터명 : 데이터값
            memberId: memberId
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
            let sr = ''
            findTel.innerHTML = ''
            sr += `
                <input type="radio" name="findPassword" onclick='goTel("${data.memberId}", "${data.secretEmail}")'; this.onclick='null';" class="showTel"> 
                <span class="span-header">회원에 등록한 전화번호로 찾기</span> 
                <span class="span-style"> (${data.secretTel})</span>
                `
            findTel.insertAdjacentHTML("afterbegin", sr)

            let str = ''

            str += `
        <div class="find-email-container">
            <div class="find-email-header">
                <span>회원정보에 등록한 이메일과 입력한 이메일이 같아야, 인증번호를 받을 수 있습니다.</span>
            </div>

            <div class="find-email-content">
            <div class="find-email-name" style="margin-bottom: 5px;">
                <input type="text" placeholder=" 이름" name="memberName" class="getName">
            </div>
            <div class="find-email-email">
                <input type="text" placeholder=" 이메일" name="memberEmail" class="memberEmailInfo">
                <button type="button" onclick='emailNumber("${data.memberEmail}", "${data.memberId}")'>인증번호받기</button>
            </div>
            </div>
            <div class="find-email-footer">
                <input type="text" placeholder="인증번호 6자리 숫자 입력" class="checkNum">
                <button type="button" class="checkEmail">다음</button>
            </div>
         </div> `

            document.querySelector(".find-email").insertAdjacentHTML("beforeend", str)
        })
        //fetch 통신 실패 시 실행 영역
        .catch(err => {
            alert('fetch error!\nthen 구문에서 오류가 발생했습니다.\n콘솔창을 확인하세요!');
            console.log(err);
        });

}

let telNumber = (getTel, getId) => {

    const getName = document.querySelector(".getName")
    const memberTelInfo = document.querySelector(".memberTelInfo").value
    const formattedNumber = `${memberTelInfo.substring(0, 3)}-${memberTelInfo.substring(3, 7)}-${memberTelInfo.substring(7)}`;

    if (getName.value == '') {
        alert("이름을 입력해주세요.")
        return;
    }
    else if (memberTelInfo.value == '') {
        alert("휴대폰번호를 입력해주세요.")
        return;
    }

    if (formattedNumber == getTel) {
        alert("인증번호가 전송되었습니다.")
        fetch('/sendSms', { //요청경로
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            //컨트롤러로 전달할 데이터
            body: new URLSearchParams({
                // 데이터명 : 데이터값
                memberTel: getTel
            })
        })
            .then((response) => {
                if (!response.ok) {
                    alert('fetch error!\n컨트롤러로 통신중에 오류가 발생했습니다.');
                    return;
                }

                return response.text(); //컨트롤러에서 return하는 데이터가 없거나 int, String 일 때 사용
                // return response.json(); //나머지 경우에 사용
            })
            //fetch 통신 후 실행 영역
            .then((data) => {//data -> controller에서 리턴되는 데이터!
                const checkCode = document.querySelector(".checkCode")
                const checkTel = document.querySelector(".checkTel")

                checkTel.addEventListener("click", () => {


                    if (checkCode.value == data) {
                        alert("인증이 완료되었습니다.")
                        location.href = `/member/resetPassword?memberId=${getId}`
                    } else {
                        alert("입력하신 인증번호가 틀립니다.")
                    }
                })

            })
            //fetch 통신 실패 시 실행 영역
            .catch(err => {
                alert('fetch error!\nthen 구문에서 오류가 발생했습니다.\n콘솔창을 확인하세요!');
                console.log(err);
            });
    } else {
        alert("입력하신 전화번호와 회원의 전화번호가 맞지 않습니다.")
    }
}

const emailNumber = (getEmail, getId) => {

    const getName = document.querySelector(".getName")
    const memberEmailInfo = document.querySelector(".memberEmailInfo")

    if (getName.value == '') {
        alert("이름을 입력해주세요.")
        return;
    }
    else if (memberEmailInfo.value == '') {
        alert("이메일을 입력해주세요.")
        return;
    }

    if (memberEmailInfo.value == getEmail) {
        alert("인증번호가 전송되었습니다.")
        fetch('/sendMail', { //요청경로
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            //컨트롤러로 전달할 데이터
            body: new URLSearchParams({
                // 데이터명 : 데이터값
                memberEmail: getEmail
            })
        })
            .then((response) => {
                if (!response.ok) {
                    alert('fetch error!\n컨트롤러로 통신중에 오류가 발생했습니다.');
                    return;
                }

                return response.text(); //컨트롤러에서 return하는 데이터가 없거나 int, String 일 때 사용
                // return response.json(); //나머지 경우에 사용
            })
            //fetch 통신 후 실행 영역
            .then((data) => {//data -> controller에서 리턴되는 데이터!
                const checkCode = document.querySelector(".checkNum")
                const checkTel = document.querySelector(".checkEmail")

                checkTel.addEventListener("click", () => {


                    if (checkCode.value == data) {
                        alert("인증이 완료되었습니다.")
                        location.href = `/member/resetPassword?memberId=${getId}`
                    } else {
                        alert("입력하신 인증번호가 틀립니다.")
                    }
                })

            })
            //fetch 통신 실패 시 실행 영역
            .catch(err => {
                alert('fetch error!\nthen 구문에서 오류가 발생했습니다.\n콘솔창을 확인하세요!');
                console.log(err);
            });
    } else {
        alert("입력하신 이메일과 회원의 이메일이 맞지 않습니다.")
    }

}

