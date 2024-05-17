const changePassword = () =>{
    const pw = document.querySelector(".checkPw")
    const pw2 = document.querySelector(".checkPw2")

    if(pw.value != pw2.value){
        alert("입력하신 비밀번호가 맞지 않습니다.")
        return;
    }else{
        alert("비밀번호 변경이 완료되었습니다. 첫 화면으로 이동합니다.")
        document.querySelector(".formInfo").submit();
    }
}