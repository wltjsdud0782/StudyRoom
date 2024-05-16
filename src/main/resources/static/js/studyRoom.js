window.onload = () =>{
    const sidemenu = document.querySelector(".submenu-on")
    const aside = document.querySelector(".aside")
    const asideSubMenu = document.querySelector(".aside-subMenu")
    const sideClose = document.querySelector(".side-close")

    sidemenu.addEventListener("click", ()=> {
        aside.style.width = "250px";
        asideSubMenu.style.opacity = "1";
        asideSubMenu.style.display = "block";
    })
    sideClose.addEventListener("click", ()=>{
        aside.style.width = "0";
        asideSubMenu.style.opacity = "0";
        asideSubMenu.style.display = "none";
        setTimeout(function() {
            asideSubMenu.style = "";
        }, 100);
    })

    const loginModal = document.querySelector(".login-modal")
    const loginClose = document.querySelector(".login-close")

    document.querySelectorAll(".login-popup").forEach((element, idx) => {
        element.addEventListener("click", () =>{
            console.log(1);
            loginModal.style.display = 'block';
            loginModal.style.opacity = '1';
        })
    })
    // document.querySelector(".login-popup").addEventListener("click", () =>{
    //     loginModal.style.display = 'block';
    //     loginModal.style.opacity = '1';
    // })

    loginClose.addEventListener("click" , () => {
        loginModal.style.display = 'none';
        loginModal.style.opacity = '0';
    })
        
}
    




function logout(){
    const result = confirm('로그아웃 하시겠습니까?');

    if(result){
        location.href = '/member/logout';
    }
}
function pageNo1(){
    const page = document.querySelector('#page-no').value;
    const a = document.querySelector(".asd");

    const b = document.querySelectorAll(".aside-subMenu > li > a")

    for(let i = 0 ; i<b.length ; i++){
        if(page == i+1){
            b[i].style.backgroundColor="#f1f1f186";
            b[i].style.color="#ffffff";
        }
        else{
            b[i].style.color="#ffffff";
        }
    }
    return;
}
pageNo1();


function login(){
    const loginModal = document.querySelector(".login-modal")
    const memberId = document.querySelector('.memberId').value;
    const memberPw = document.querySelector('.memberPw').value;
    
    console.log(memberId)
    console.log(memberPw)

    fetch('/member/loginFetch', { //요청경로
        method: 'POST',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        //컨트롤러로 전달할 데이터
        body: new URLSearchParams({
        // 데이터명 : 데이터값
            'memberId' : memberId,
            'memberPw' : memberPw
        })
    })
    .then((response) => {
        if(!response.ok){
            alert('fetch error!\n컨트롤러로 통신중에 오류가 발생했습니다.');
            return ;
        }

        return response.text(); //컨트롤러에서 return하는 데이터가 없거나 int, String 일 때 사용
        //return response.json(); //나머지 경우에 사용
    })
    //fetch 통신 후 실행 영역
    .then((data) => {//data -> controller에서 리턴되는 데이터!
        if(data == ''){
            alert('ID혹은 PW를 확인하세요.');
            document.querySelector('.memberId').value='';
            document.querySelector('.memberPw').value='';
        }
        else{
            alert(`${data}님 반갑습니다!`);
            loginModal.style.opacity = '0';
            // location.href = '/board/mainHomepage';
            document.querySelector('#loginlogin').innerHTML='';
            let str = `<a>${data}님</a>`
            document.querySelector('#loginlogin').insertAdjacentHTML("afterbegin",str);
            location.reload(true);
        }
    })
    //fetch 통신 실패 시 실행 영역
    .catch(err=>{
        alert('fetch error!\nthen 구문에서 오류가 발생했습니다.\n콘솔창을 확인하세요!');
        console.log(err);
    });
}

   //로그아웃 함수
function logout(){
    const result = confirm('로그아웃 하시겠습니까?');
    if(result){
        location.href= '/member/logout';
    }
}
