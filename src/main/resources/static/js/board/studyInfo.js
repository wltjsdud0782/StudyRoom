// window.onload = function() {
//   console.log(1111)
// 	window.addEventListener("scroll", function(e) {
//     console.log(e)
// 		scrollEvent();
// 	});
// }

function chargeBuy(loginInfo){
    if (loginInfo == null) {
        alert('로그인이 필요한 기능입니다.')
        const loginModal = document.querySelector(".login-modal")
        loginModal.style.display = 'block';
        loginModal.style.opacity = '1';
    }
    else{
        location.href = '/seat/chargeBuy'
    }
}