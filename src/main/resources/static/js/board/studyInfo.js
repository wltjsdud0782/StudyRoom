// window.onload = function() {
// 	window.addEventListener("scroll", function(e) {
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