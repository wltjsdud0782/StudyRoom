// search 버튼 클릭 시 주소록 검색 팝업 창 띄우기
function searchAddress(){
    new daum.Postcode({
        oncomplete: function(data) {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분입니다.
            // 예제를 참고하여 다양한 활용법을 확인해 보세요.
            document.querySelector('#postCode').value = data.zonecode;
            document.querySelector('#roadAddr').value = data.roadAddress;     
            
        }
    }).open();
  }
        
  //join버튼 클릭 시 form 태그를 submit
function join(){
    // 0. submit 전에 유효성 검사
    // -1) 아이디 입력 했는지 확인
    let idInput = document.querySelector('#memberId');
    if(idInput.value == ''){
      alert('id는 필수 입력 사항 입니다.');  
      return ;
     }

    // -2) id 입력 문자의 길이가 20을 초과 하는지 검사
     if(idInput.value.length > 20){
        alert('id는 20글자 내로 작성하세요.');
        return ;
     }

     // -3) 입력 된 두 pw가 일치 하는 지 확인
    const pwInputs = document.querySelectorAll('input[type="password"]');
     if(pwInputs[0].value != pwInputs[1].value){
        alert('입력한 두 비밀번호가 다릅니다. \n비밀번호를 다시 입력해주세요.');
        return ;
     }

     //문자 + 숫자 + 특수 문자가 포함 된 4~12자리의 글자
     let regExp = /^.*(?=^.{4,12}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
     //test 함수의 매개변수로 들어온 문자가 정규식 조건에 부합하면 return true
     const expResult = regExp.test(pwInputs[0].value);
     //if(!expResult){
        //alert('비밀번호 형식에 일치하지 않습니다.');
        //return ;
     //}


    // 1. submit 시킬 form 태그를 선택 후 submit 함수 실행
    document.querySelector('#join-form').submit();
    }

    //클릭 시 로그인 페이지로 이동
    function login(){
        location.href='/member/loginForm';
    }

    //로그아웃 함수
    function logout(){
        const result = confirm('로그아웃 하시겠습니까?');

        if(result){
            location.href= '/member/logout';
        }
    }

    //회원가입 모달창이 닫힐 때 실행되는 이벤트
    // 1. 모달창을 선택한다.
    const joinModal = document.querySelector('#join-modal');
    // 2. 선택한 태그에 이벤트 달아주기
    // hidden.bs.modal : 모달창이 닫힐 때 실행
    joinModal.addEventListener('hidden.bs.modal', function(event){
        document.querySelector('#join-form').reset();
    });

    