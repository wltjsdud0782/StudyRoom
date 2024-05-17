function goReview(){
    fetch('/board/goReview', { //요청경로
        method: 'POST',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        //컨트롤러로 전달할 데이터
        body: JSON.stringify({
           // 데이터명 : 데이터값
        })
    })
    .then((response) => {
        return response.json(); //나머지 경우에 사용
    })
    //fetch 통신 후 실행 영역
    .then((data) => {//data -> controller에서 리턴되는 데이터!
        console.log(data)
        const table = document.querySelector(".myPage-table");
        
        let str = '';
        table.innerHTML =''
        if(data.length == 0){
            str +=`
            <div class="row" style="height: 350px;">
                <div class="col">
                    <div style="font-size: 17pt; margin-top: 150px;">
                        등록한 글이 없습니다.
                    </div>
                </div>
            </div>`
        }
        str += `
            <table>
                <colgroup>
                    <col width="10%">
                    <col width="60%">
                    <col width="30%">
                    <col width="*">
                </colgroup>`
            data.forEach((e, i) => {
                str +=  
                `<tr>
                    <td>${data.length - i}</td>
                    <td>${e.reviewContent}</td>
                    <td>${e.reviewDate}</td>
                    <td><input type="button" value="삭제" onclick='deleteReview("${e.reviewCode}")'></td>
                </tr>`
            });    
        str+= `        
            </table>`
            
        table.insertAdjacentHTML("afterbegin", str)    
        // <th:block th:if="${#lists.size(boardList)} == 0">
            
        // </th:block>
    })
    //fetch 통신 실패 시 실행 영역
    .catch(err=>{
        alert('fetch error!\nthen 구문에서 오류가 발생했습니다.\n콘솔창을 확인하세요!');
        console.log(err);
    });
    
    
    
}
function goDetailSelect(boardCode){
    location.href=`/board/detailSelect?boardCode=${boardCode}`;
}
function deleteBoard(boardCode){
    location.href=`/board/deleteBoard?boardCode=${boardCode}`;
}

function deleteReview(reviewCode){
    location.href=`/board/deleteReview?reviewCode=${reviewCode}`;
}


const goBoard = (boardList) =>{
    console.log(boardList)

    const table = document.querySelector(".myPage-table");

    let str = '' 
    table.innerHTML = '';

    if(boardList.length == 0){
        str +=`
        <div class="row" style="height: 350px;">
            <div class="col">
                <div style="font-size: 17pt; margin-top: 150px;">
                    등록한 글이 없습니다.
                </div>
            </div>
        </div>`
    }
    str += `
        <table>
            <colgroup>
                <col width="10%">
                <col width="60%">
                <col width="30%">
                <col width="*">
            </colgroup>`
        boardList.forEach((e, i) => {
            str +=  
            `<tr>
                <td>${boardList.length - i}</td>
                <td onclick='goDetailSelect("${e.boardCode}")'>${e.boardTitle}</td>
                <td>${e.boardDate}</td>
                <td><input type="button" value="삭제" onclick='deleteBoard("${e.boardCode}")'></td>
            </tr>`
        });    
    str+= `        
        </table>`
        
    table.insertAdjacentHTML("afterbegin", str) 
}