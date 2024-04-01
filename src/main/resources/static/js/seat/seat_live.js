onefloor();

// 선택한 층 및 좌석번호
let selected_floor = 0;
let selected_seat = 0;

function onefloor() {
    fetch('/seat/seat1Floor', { //요청경로
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
            //return response.text(); //컨트롤러에서 return하는 데이터가 없거나 int, String 일 때 사용
            return response.json(); //나머지 경우에 사용
        })
        //fetch 통신 후 실행 영역
        .then((data) => {//data -> controller에서 리턴되는 데이터!
            document.querySelector(".seatLive").innerHTML = '';
            let str = '';
            str = `
        <div class="row mb-2">
            <div class="col floor-title">
            1층
            </div>
        </div>
        <div class="row">
        <div class="col-2">
            <div class="rest" style="padding:280px 0;">
                휴<br>
                게<br>
                실
            </div>
        </div>
        <div class="col-10">
            <div class="row">
                <div class="offset-1 col-5 room up-room">
                    <div>
                    제 1열람실
                    </div>
                    <div class="row">`
            for (let i = 0; i < 4; i++) {
                const e = data[i];
                if (e.seatStatusVO.statusNum == 3) {
                    str += `
                                <div class="col-3 one-seat" style="background-color:rgb(219, 219, 219); cursor:default;">
                                <div>${e.seatNum}</div>
                                <div>&nbsp;</div>
                                <div>${e.seatStatusVO.statusName}</div>
                                <div></div>
                                </div>
                                `
                } else if (e.memberVO == null) {
                    str += `
                                <div class="col-3 one-seat non-click" onclick="selectSeat(this, ${e.seatFloor},${e.seatNum})">
                                <div>${e.seatNum}</div>
                                <div>&nbsp;</div>
                                <div>${e.seatStatusVO.statusName}</div>
                                <div></div>
                                </div>
                                `
                } else {
                    str += `
                                <div class="col-3 one-seat" style="background-color:rgb(217, 225, 242); cursor:default;">
                                <div>${e.seatNum}</div>
                                <div>${e.memberVO.memberName}</div>
                                <div>${e.seatStatusVO.statusName}</div>
                                <div>(${e.memberVO.memberTel})</div>
                                </div>
                                `
                }
            }
            str += `
                    </div>
                    <div class="row mt-5">`
            for (let i = 4; i < 7; i++) {
                const e = data[i];
                if (e.seatStatusVO.statusNum == 3) {
                    str += `
                            <div class="col-3 one-seat" style="background-color:rgb(219, 219, 219); cursor:default;">
                            <div>${e.seatNum}</div>
                            <div>&nbsp;</div>
                            <div>${e.seatStatusVO.statusName}</div>
                            <div></div>
                            </div>
                            `
                } else if (e.memberVO == null) {
                    str += `
                            <div class="col-3 one-seat non-click" onclick="selectSeat(this, ${e.seatFloor},${e.seatNum})">
                            <div>${e.seatNum}</div>
                            <div>&nbsp;</div>
                            <div>${e.seatStatusVO.statusName}</div>
                            <div></div>
                            </div>
                            `
                } else {
                    str += `
                            <div class="col-3 one-seat" style="background-color:rgb(217, 225, 242); cursor:default;">
                            <div>${e.seatNum}</div>
                            <div>${e.memberVO.memberName}</div>
                            <div>${e.seatStatusVO.statusName}</div>
                            <div>(${e.memberVO.memberTel})</div>
                            </div>
                            `
                }
            }
            str += `<div class="col-3"></div>
                    </div>
                </div>
                <div class="offset-1 col-5 room up-room">
                    <div>
                        제 2열람실
                    </div>
                    <div class="row">`
            for (let i = 7; i < 11; i++) {
                const e = data[i];
                if (e.seatStatusVO.statusNum == 3) {
                    str += `
                            <div class="col-3 one-seat" style="background-color:rgb(219, 219, 219); cursor:default;">
                            <div>${e.seatNum}</div>
                            <div>&nbsp;</div>
                            <div>${e.seatStatusVO.statusName}</div>
                            <div></div>
                            </div>
                            `
                } else if (e.memberVO == null) {
                    str += `
                            <div class="col-3 one-seat non-click" onclick="selectSeat(this, ${e.seatFloor},${e.seatNum})">
                            <div>${e.seatNum}</div>
                            <div>&nbsp;</div>
                            <div>${e.seatStatusVO.statusName}</div>
                            <div></div>
                            </div>
                            `
                } else {
                    str += `
                            <div class="col-3 one-seat" style="background-color:rgb(217, 225, 242); cursor:default;">
                            <div>${e.seatNum}</div>
                            <div>${e.memberVO.memberName}</div>
                            <div>${e.seatStatusVO.statusName}</div>
                            <div>(${e.memberVO.memberTel})</div>
                            </div>
                            `
                }
            }
            str += `</div>
                    <div class="row mt-5">
                        <div class="col-3"></div>`

            for (let i = 11; i < 14; i++) {
                const e = data[i];
                if (e.seatStatusVO.statusNum == 3) {
                    str += `
                                <div class="col-3 one-seat" style="background-color:rgb(219, 219, 219); cursor:default;">
                                <div>${e.seatNum}</div>
                                <div>&nbsp;</div>
                                <div>${e.seatStatusVO.statusName}</div>
                                <div></div>
                                </div>
                                `
                } else if (e.memberVO == null) {
                    str += `
                                <div class="col-3 one-seat non-click" onclick="selectSeat(this, ${e.seatFloor},${e.seatNum})">
                                <div>${e.seatNum}</div>
                                <div>&nbsp;</div>
                                <div>${e.seatStatusVO.statusName}</div>
                                <div></div>
                                </div>
                                `
                } else {
                    str += `
                                <div class="col-3 one-seat" style="background-color:rgb(217, 225, 242); cursor:default;">
                                <div>${e.seatNum}</div>
                                <div>${e.memberVO.memberName}</div>
                                <div>${e.seatStatusVO.statusName}</div>
                                <div>(${e.memberVO.memberTel})</div>
                                </div>
                                `
                }
            }

            str += `</div>
                </div>
            </div>
            <div class="row">
                <div class="offset-1 col room down-room">
                    <div>
                        제 3열람실
                    </div>
                    <div class="row">
                        <div class="col-2"></div>
                        <div class="col-1"></div>`
            for (let i = 14; i < 20; i++) {
                const e = data[i];
                if (e.seatStatusVO.statusNum == 3) {
                    str += `
                                <div class="col-3 one-seat" style="background-color:rgb(219, 219, 219); cursor:default;">
                                <div>${e.seatNum}</div>
                                <div>&nbsp;</div>
                                <div>${e.seatStatusVO.statusName}</div>
                                <div></div>
                                </div>
                                `
                } else if (e.memberVO == null) {
                    str += `
                                <div class="col-3 one-seat non-click" onclick="selectSeat(this, ${e.seatFloor},${e.seatNum})">
                                <div>${e.seatNum}</div>
                                <div>&nbsp;</div>
                                <div>${e.seatStatusVO.statusName}</div>
                                <div></div>
                                </div>
                                `
                } else {
                    str += `
                                <div class="col-3 one-seat" style="background-color:rgb(217, 225, 242); cursor:default;">
                                <div>${e.seatNum}</div>
                                <div>${e.memberVO.memberName}</div>
                                <div>${e.seatStatusVO.statusName}</div>
                                <div>(${e.memberVO.memberTel})</div>
                                </div>
                                `
                }
            }
            str += `</div>
                    <div class="row">`
            for (let i = 20; i < 21; i++) {
                const e = data[i];
                if (e.seatStatusVO.statusNum == 3) {
                    str += `
                            <div class="col-3 one-seat" style="background-color:rgb(219, 219, 219); cursor:default;">
                            <div>${e.seatNum}</div>
                            <div>&nbsp;</div>
                            <div>${e.seatStatusVO.statusName}</div>
                            <div></div>
                            </div>
                            `
                } else if (e.memberVO == null) {
                    str += `
                            <div class="col-3 one-seat non-click" onclick="selectSeat(this, ${e.seatFloor},${e.seatNum})">
                            <div>${e.seatNum}</div>
                            <div>&nbsp;</div>
                            <div>${e.seatStatusVO.statusName}</div>
                            <div></div>
                            </div>
                            `
                } else {
                    str += `
                            <div class="col-3 one-seat" style="background-color:rgb(217, 225, 242); cursor:default;">
                            <div>${e.seatNum}</div>
                            <div>${e.memberVO.memberName}</div>
                            <div>${e.seatStatusVO.statusName}</div>
                            <div>(${e.memberVO.memberTel})</div>
                            </div>
                            `
                }
            }
            str += `<div class="col-9"></div>`
            for (let i = 21; i < 22; i++) {
                const e = data[i];
                if (e.seatStatusVO.statusNum == 3) {
                    str += `
                                <div class="col-3 one-seat" style="background-color:rgb(219, 219, 219); cursor:default;">
                                <div>${e.seatNum}</div>
                                <div>&nbsp;</div>
                                <div>${e.seatStatusVO.statusName}</div>
                                <div></div>
                                </div>
                                `
                } else if (e.memberVO == null) {
                    str += `
                                <div class="col-3 one-seat non-click" onclick="selectSeat(this, ${e.seatFloor},${e.seatNum})">
                                <div>${e.seatNum}</div>
                                <div>&nbsp;</div>
                                <div>${e.seatStatusVO.statusName}</div>
                                <div></div>
                                </div>
                                `
                } else {
                    str += `
                                <div class="col-3 one-seat" style="background-color:rgb(217, 225, 242); cursor:default;">
                                <div>${e.seatNum}</div>
                                <div>${e.memberVO.memberName}</div>
                                <div>${e.seatStatusVO.statusName}</div>
                                <div>(${e.memberVO.memberTel})</div>
                                </div>
                                `
                }
            }
            str += `</div>
                    <div class="row">`
            for (let i = 22; i < 30; i++) {
                const e = data[i];
                if (e.seatStatusVO.statusNum == 3) {
                    str += `
                            <div class="col-3 one-seat" style="background-color:rgb(219, 219, 219); cursor:default;">
                            <div>${e.seatNum}</div>
                            <div>&nbsp;</div>
                            <div>${e.seatStatusVO.statusName}</div>
                            <div></div>
                            </div>
                            `
                } else if (e.memberVO == null) {
                    str += `
                            <div class="col-3 one-seat non-click" onclick="selectSeat(this, ${e.seatFloor},${e.seatNum})">
                            <div>${e.seatNum}</div>
                            <div>&nbsp;</div>
                            <div>${e.seatStatusVO.statusName}</div>
                            <div></div>
                            </div>
                            `
                } else {
                    str += `
                            <div class="col-3 one-seat" style="background-color:rgb(217, 225, 242); cursor:default;">
                            <div>${e.seatNum}</div>
                            <div>${e.memberVO.memberName}</div>
                            <div>${e.seatStatusVO.statusName}</div>
                            <div>(${e.memberVO.memberTel})</div>
                            </div>
                            `
                }
            }
            str += `</div>
                </div>
            </div>
        </div>
    </div>
        `;
            document.querySelector(".seatLive").insertAdjacentHTML('afterbegin', str)
        })
        //fetch 통신 실패 시 실행 영역
        .catch(err => {
            alert('fetch error!\nthen 구문에서 오류가 발생했습니다.\n콘솔창을 확인하세요!');
            console.log(err);
        });
}

function twofloor() {
    fetch('/seat/seat2Floor', { //요청경로
        method: 'POST',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        //컨트롤러로 전달할 데이터
        body: JSON.stringify({
            // 데이터명 : 데이터값
            floor: 2
        })
    })
        .then((response) => {
            //return response.text();
            return response.json(); //나머지 경우에 사용
        })
        //fetch 통신 후 실행 영역
        .then((data) => {//data -> controller에서 리턴되는 데이터!
            document.querySelector(".seatLive").innerHTML = '';
            let str = '';
            str = `
        <div class="row mb-2">
            <div class="col floor-title">
            2층
            </div>
        </div>
        <div class="row">
        <div class="col-2">
            <div class="rest" style="padding:280px 0;">
                휴<br>
                게<br>
                실
            </div>
        </div>
        <div class="col-10">
            <div class="row">
                <div class="offset-1 col room down-room" style="margin-top: 0;">
                    <div>
                        제 4열람실
                    </div>
                    <div class="row">`
            for (let i = 30; i < 38; i++) {
                const e = data[i];
                if (e.seatStatusVO.statusNum == 3) {
                    str += `
                            <div class="col-3 one-seat" style="background-color:rgb(219, 219, 219); cursor:default;">
                            <div>${e.seatNum}</div>
                            <div>&nbsp;</div>
                            <div>${e.seatStatusVO.statusName}</div>
                            <div></div>
                            </div>
                            `
                } else if (e.memberVO == null) {
                    str += `
                            <div class="col-3 one-seat non-click" onclick="selectSeat(this, ${e.seatFloor},${e.seatNum})">
                            <div>${e.seatNum}</div>
                            <div>&nbsp;</div>
                            <div>${e.seatStatusVO.statusName}</div>
                            <div></div>
                            </div>
                            `
                } else {
                    str += `
                            <div class="col-3 one-seat" style="background-color:rgb(217, 225, 242); cursor:default;">
                            <div>${e.seatNum}</div>
                            <div>${e.memberVO.memberName}</div>
                            <div>${e.seatStatusVO.statusName}</div>
                            <div>(${e.memberVO.memberTel})</div>
                            </div>
                            `
                }
            }
            str += `</div>
                    <div class="row">`
            for (let i = 38; i < 39; i++) {
                const e = data[i];
                if (e.seatStatusVO.statusNum == 3) {
                    str += `
                            <div class="col-3 one-seat" style="background-color:rgb(219, 219, 219); cursor:default;">
                            <div>${e.seatNum}</div>
                            <div>&nbsp;</div>
                            <div>${e.seatStatusVO.statusName}</div>
                            <div></div>
                            </div>
                            `
                } else if (e.memberVO == null) {
                    str += `
                            <div class="col-3 one-seat non-click" onclick="selectSeat(this, ${e.seatFloor},${e.seatNum})">
                            <div>${e.seatNum}</div>
                            <div>&nbsp;</div>
                            <div>${e.seatStatusVO.statusName}</div>
                            <div></div>
                            </div>
                            `
                } else {
                    str += `
                            <div class="col-3 one-seat" style="background-color:rgb(217, 225, 242); cursor:default;">
                            <div>${e.seatNum}</div>
                            <div>${e.memberVO.memberName}</div>
                            <div>${e.seatStatusVO.statusName}</div>
                            <div>(${e.memberVO.memberTel})</div>
                            </div>
                            `
                }
            }
            str += `<div class="col-9"></div>`
            for (let i = 39; i < 40; i++) {
                const e = data[i];
                if (e.seatStatusVO.statusNum == 3) {
                    str += `
                                <div class="col-3 one-seat" style="background-color:rgb(219, 219, 219); cursor:default;">
                                <div>${e.seatNum}</div>
                                <div>&nbsp;</div>
                                <div>${e.seatStatusVO.statusName}</div>
                                <div></div>
                                </div>
                                `
                } else if (e.memberVO == null) {
                    str += `
                                <div class="col-3 one-seat non-click" onclick="selectSeat(this, ${e.seatFloor},${e.seatNum})">
                                <div>${e.seatNum}</div>
                                <div>&nbsp;</div>
                                <div>${e.seatStatusVO.statusName}</div>
                                <div></div>
                                </div>
                                `
                } else {
                    str += `
                                <div class="col-3 one-seat" style="background-color:rgb(217, 225, 242); cursor:default;">
                                <div>${e.seatNum}</div>
                                <div>${e.memberVO.memberName}</div>
                                <div>${e.seatStatusVO.statusName}</div>
                                <div>(${e.memberVO.memberTel})</div>
                                </div>
                                `
                }
            }
            str += `</div>
                    <div class="row">
                        <div class="col-2"></div>
                        <div class="col-1"></div>`
            for (let i = 40; i < 46; i++) {
                const e = data[i];
                if (e.seatStatusVO.statusNum == 3) {
                    str += `
                                <div class="col-3 one-seat" style="background-color:rgb(219, 219, 219); cursor:default;">
                                <div>${e.seatNum}</div>
                                <div>&nbsp;</div>
                                <div>${e.seatStatusVO.statusName}</div>
                                <div></div>
                                </div>
                                `
                } else if (e.memberVO == null) {
                    str += `
                                <div class="col-3 one-seat non-click" onclick="selectSeat(this, ${e.seatFloor},${e.seatNum})">
                                <div>${e.seatNum}</div>
                                <div>&nbsp;</div>
                                <div>${e.seatStatusVO.statusName}</div>
                                <div></div>
                                </div>
                                `
                } else {
                    str += `
                                <div class="col-3 one-seat" style="background-color:rgb(217, 225, 242); cursor:default;">
                                <div>${e.seatNum}</div>
                                <div>${e.memberVO.memberName}</div>
                                <div>${e.seatStatusVO.statusName}</div>
                                <div>(${e.memberVO.memberTel})</div>
                                </div>
                                `
                }
            }
            str += `</div>
                </div>
            </div>
            <div class="row" style="margin-top: 40px;">
                <div class="offset-1 col-5 room up-room">
                    <div>
                    제 5열람실
                    </div>
                    <div class="row">`
            for (let i = 46; i < 49; i++) {
                const e = data[i];
                if (e.seatStatusVO.statusNum == 3) {
                    str += `
                            <div class="col-3 one-seat" style="background-color:rgb(219, 219, 219); cursor:default;">
                            <div>${e.seatNum}</div>
                            <div>&nbsp;</div>
                            <div>${e.seatStatusVO.statusName}</div>
                            <div></div>
                            </div>
                            `
                } else if (e.memberVO == null) {
                    str += `
                            <div class="col-3 one-seat non-click" onclick="selectSeat(this, ${e.seatFloor},${e.seatNum})">
                            <div>${e.seatNum}</div>
                            <div>&nbsp;</div>
                            <div>${e.seatStatusVO.statusName}</div>
                            <div></div>
                            </div>
                            `
                } else {
                    str += `
                            <div class="col-3 one-seat" style="background-color:rgb(217, 225, 242); cursor:default;">
                            <div>${e.seatNum}</div>
                            <div>${e.memberVO.memberName}</div>
                            <div>${e.seatStatusVO.statusName}</div>
                            <div>(${e.memberVO.memberTel})</div>
                            </div>
                            `
                }
            }
            str += `<div class="col-3"></div>
                    </div>
                    <div class="row mt-5">`
            for (let i = 49; i < 53; i++) {
                const e = data[i];
                if (e.seatStatusVO.statusNum == 3) {
                    str += `
                            <div class="col-3 one-seat" style="background-color:rgb(219, 219, 219); cursor:default;">
                            <div>${e.seatNum}</div>
                            <div>&nbsp;</div>
                            <div>${e.seatStatusVO.statusName}</div>
                            <div></div>
                            </div>
                            `
                } else if (e.memberVO == null) {
                    str += `
                            <div class="col-3 one-seat non-click" onclick="selectSeat(this, ${e.seatFloor},${e.seatNum})">
                            <div>${e.seatNum}</div>
                            <div>&nbsp;</div>
                            <div>${e.seatStatusVO.statusName}</div>
                            <div></div>
                            </div>
                            `
                } else {
                    str += `
                            <div class="col-3 one-seat" style="background-color:rgb(217, 225, 242); cursor:default;">
                            <div>${e.seatNum}</div>
                            <div>${e.memberVO.memberName}</div>
                            <div>${e.seatStatusVO.statusName}</div>
                            <div>(${e.memberVO.memberTel})</div>
                            </div>
                            `
                }
            }
            str += `</div>
                </div>
                <div class="offset-1 col-5 room up-room">
                    <div>
                        제 6열람실
                    </div>
                    <div class="row">
                        <div class="col-3"></div>`
            for (let i = 53; i < 56; i++) {
                const e = data[i];
                if (e.seatStatusVO.statusNum == 3) {
                    str += `
                                <div class="col-3 one-seat" style="background-color:rgb(219, 219, 219); cursor:default;">
                                <div>${e.seatNum}</div>
                                <div>&nbsp;</div>
                                <div>${e.seatStatusVO.statusName}</div>
                                <div></div>
                                </div>
                                `
                } else if (e.memberVO == null) {
                    str += `
                                <div class="col-3 one-seat non-click" onclick="selectSeat(this, ${e.seatFloor},${e.seatNum})">
                                <div>${e.seatNum}</div>
                                <div>&nbsp;</div>
                                <div>${e.seatStatusVO.statusName}</div>
                                <div></div>
                                </div>
                                `
                } else {
                    str += `
                                <div class="col-3 one-seat" style="background-color:rgb(217, 225, 242); cursor:default;">
                                <div>${e.seatNum}</div>
                                <div>${e.memberVO.memberName}</div>
                                <div>${e.seatStatusVO.statusName}</div>
                                <div>(${e.memberVO.memberTel})</div>
                                </div>
                                `
                }
            }
            str += `</div>
                    <div class="row mt-5">`
            for (let i = 56; i < 60; i++) {
                const e = data[i];
                if (e.seatStatusVO.statusNum == 3) {
                    str += `
                            <div class="col-3 one-seat" style="background-color:rgb(219, 219, 219); cursor:default;">
                            <div>${e.seatNum}</div>
                            <div>&nbsp;</div>
                            <div>${e.seatStatusVO.statusName}</div>
                            <div></div>
                            </div>
                            `
                } else if (e.memberVO == null) {
                    str += `
                            <div class="col-3 one-seat non-click" onclick="selectSeat(this, ${e.seatFloor},${e.seatNum})">
                            <div>${e.seatNum}</div>
                            <div>&nbsp;</div>
                            <div>${e.seatStatusVO.statusName}</div>
                            <div></div>
                            </div>
                            `
                } else {
                    str += `
                            <div class="col-3 one-seat" style="background-color:rgb(217, 225, 242); cursor:default;">
                            <div>${e.seatNum}</div>
                            <div>${e.memberVO.memberName}</div>
                            <div>${e.seatStatusVO.statusName}</div>
                            <div>(${e.memberVO.memberTel})</div>
                            </div>
                            `
                }
            }
            str += `</div>
                </div>
            </div>
        </div>
    </div>
        `
            document.querySelector(".seatLive").insertAdjacentHTML('afterbegin', str)
        })
        //fetch 통신 실패 시 실행 영역
        .catch(err => {
            alert('fetch error!\nthen 구문에서 오류가 발생했습니다.\n콘솔창을 확인하세요!');
            console.log(err);
        });
}

// 예약하기 Modal
const modal_open = new bootstrap.Modal('#seat-modal');

function reservation(loginInfo, haveCharge, remainDate, endDate) {
    if (loginInfo == null) { // 로그인 X
        alert("로그인이 필요한 기능입니다.");
        location.href = "/member/loginForm"
    }

    if (loginInfo != null) { // 로그인 O
        if (loginInfo.isAdmin == 'ADMIN') {
            alert("관리자는 이용할 수 없습니다.")
        }
        else if(selected_floor == 0 && selected_seat == 0){
            alert("좌석을 선택해주세요.")
        }
        else {
            if (haveCharge.length == 0) {
                alert("보유한 이용권이 없습니다.")
                location.href = "/seat/chargeBuy"
            }
            else {
                document.querySelector('.seat-modal-body').innerHTML = '';

                let str = '';

                str = `
            <div class="row line-height">
                <div class="col">
                    <div class="row">
                        <div class="col-6 text-end">선택한 좌석</div>
                        <div class="col-5 text-start">${selected_floor}층 ${selected_seat}번</div>
                    </div>
                    <div class="row">
                        <div class="col-6 text-end">사용자 아이디</div>
                        <div class="col-5 text-start">${loginInfo.memberId} </div>
                    </div>
                    <div class="row">
                        <div class="col-6 text-end">사용자명</div>
                        <div class="col-6 text-start">${loginInfo.memberName}</div>
                    </div>
                    <div class="row">
                        <div class="col-6 text-end">사용자번호</div>
                        <div class="col-5 text-start">${loginInfo.memberTel}</div>
                    </div>
                    <div class="row">
                        <div class="col-6 text-end">보유한 이용권</div>
                        <div class="col-5 text-start">
                            ${haveCharge[0].chargeVO.chargeName}
                            <span style="font-size: 10pt;">
                                (${remainDate}일 남음)
                            </span>
                            <span style="font-size: 9pt; color: red;">
                                &nbsp; * ${endDate} 만료</span>
                            </span>
                        </div>
                    </div>
                    <div class="row mt-4">
                        <div class="col">
                            <button type="button" class="btn btn-danger mb-4" onclick="oneMore()">입실하기</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

                document.querySelector('.seat-modal-body').insertAdjacentHTML('afterbegin', str);

                modal_open.show();
            }
        }
    }
}

function oneMore() {
    const result = confirm('등록된 정보로 입실하시겠습니까?')
    if (result) {
        alert('입실이 완료되었습니다.')
        location.href = `/seat/inSeat?seatNum=${selected_seat}`;
    }
    else {
        return;
    }
}

function selectSeat(event, seatFloor, seatNum) {
    selected_floor = seatFloor;
    selected_seat = seatNum;

    const nonClick = document.querySelectorAll('.non-click');

    nonClick.forEach((e) => {
        e.classList.remove("click");
    })
    event.classList.add("click")
}

function seatMove() {
    if (selected_floor == 0 && selected_seat == 0) {
        alert("좌석을 선택해주세요.")
    }
    else {
        const result = confirm('선택한 좌석으로 이동하시겠습니까?')
        if (result) {
            alert('자리가 이동되었습니다.')
            location.href = `/seat/moveSeat?seatNum=${selected_seat}`;
        }
        else {
            return;
        }

    }
}

function seatOut() {
    const result = confirm('정말 퇴실하시겠습니까?')
    if (result) {
        alert('퇴실이 완료되었습니다. 감사합니다.')
        location.href = "/seat/outSeat"
    }
    else {
        return;
    }
}
