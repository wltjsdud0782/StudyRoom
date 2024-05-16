function goWriting(){
    location.href="/board/inquiryWriting";
}
function goDetailSelect(boardCode){
    location.href=`/board/detailSelect?boardCode=${boardCode}`;
}
function myWriting(){
    location.href="/board/myWriting"
}

function searchBtn(){
    if (document.querySelector('.searchValue').value == '') {
        alert('검색어를 입력해주세요.')
    }
    else{
        const searchForm = document.querySelector('.searchForm');
        searchForm.submit()
    }
}