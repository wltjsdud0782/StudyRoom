//로그아웃 함수
function logout(){
    const result = confirm('로그아웃 하시겠습니까?');

    if(result){
        location.href= '/member/logout';
    }
}