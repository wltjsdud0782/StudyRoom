onefloor();

// 선택한 층 및 좌석번호
let selected_floor = 0;
let selected_memberCode = 0;

function onefloor() {
    fetch('/seat/adminSeat', { //요청경로
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
            console.log(data);

            document.querySelector(".group-button").innerHTML = '';
            let str_1 = '';
            str_1 += `
                <button type="button" class="btn btn-light floor-btn" onclick="onefloor()">1층</button>
                <button type="button" class="btn btn-outline-secondary floor-btn" onclick="twofloor()">2층</button>
                <span class="input-group-text"></span>
                <button type="button" class="btn btn-outline-danger" onclick="moveMember()">회원이동</button>
                <button type="button" class="btn btn-outline-danger" onclick="adminSeatOut()">회원퇴실</button>
            `;
            document.querySelector(".group-button").insertAdjacentHTML('afterbegin', str_1);

            document.querySelector(".seatLive").innerHTML = '';
            let str = '';
            str = `
        <div class="row mb-3">
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
                                <div class="col-3 one-seat" style="background-color:#dfd3f8; cursor:default;">
                                <div>${e.seatNum}</div>
                                <div>&nbsp;</div>
                                <div>${e.seatStatusVO.statusName}</div>
                                <div></div>
                                </div>
                                `
                } else if (e.memberVO == null) {
                    str += `
                                <div class="col-3 one-seat greenSeat">
                                <div>${e.seatNum}</div>
                                <div>&nbsp;</div>
                                <div>${e.seatStatusVO.statusName}</div>
                                <div></div>
                                </div>
                                `
                } else {
                    str += `
                                <div class="col-3 one-seat non-click" onclick="selectSeat(this, ${e.memberCode})">
                                <div>${e.seatNum}</div>
                                <div>${e.memberVO.memberName}</div>
                                <div>${e.seatStatusVO.statusName}</div>
                                <div>(${e.memberVO.memberTel.slice(9,)})</div>
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
                            <div class="col-3 one-seat" style="background-color:#dfd3f8; cursor:default;">
                            <div>${e.seatNum}</div>
                            <div>&nbsp;</div>
                            <div>${e.seatStatusVO.statusName}</div>
                            <div></div>
                            </div>
                            `
                } else if (e.memberVO == null) {
                    str += `
                            <div class="col-3 one-seat greenSeat">
                            <div>${e.seatNum}</div>
                            <div>&nbsp;</div>
                            <div>${e.seatStatusVO.statusName}</div>
                            <div></div>
                            </div>
                            `
                } else {
                    str += `
                            <div class="col-3 one-seat non-click" onclick="selectSeat(this, ${e.memberCode})">
                            <div>${e.seatNum}</div>
                            <div>${e.memberVO.memberName}</div>
                            <div>${e.seatStatusVO.statusName}</div>
                            <div>(${e.memberVO.memberTel.slice(9,)})</div>
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
                            <div class="col-3 one-seat" style="background-color:#dfd3f8; cursor:default;">
                            <div>${e.seatNum}</div>
                            <div>&nbsp;</div>
                            <div>${e.seatStatusVO.statusName}</div>
                            <div></div>
                            </div>
                            `
                } else if (e.memberVO == null) {
                    str += `
                            <div class="col-3 one-seat greenSeat">
                            <div>${e.seatNum}</div>
                            <div>&nbsp;</div>
                            <div>${e.seatStatusVO.statusName}</div>
                            <div></div>
                            </div>
                            `
                } else {
                    str += `
                            <div class="col-3 one-seat non-click" onclick="selectSeat(this, ${e.memberCode})">
                            <div>${e.seatNum}</div>
                            <div>${e.memberVO.memberName}</div>
                            <div>${e.seatStatusVO.statusName}</div>
                            <div>(${e.memberVO.memberTel.slice(9,)})</div>
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
                                <div class="col-3 one-seat" style="background-color:#dfd3f8; cursor:default;">
                                <div>${e.seatNum}</div>
                                <div>&nbsp;</div>
                                <div>${e.seatStatusVO.statusName}</div>
                                <div></div>
                                </div>
                                `
                } else if (e.memberVO == null) {
                    str += `
                                <div class="col-3 one-seat greenSeat">
                                <div>${e.seatNum}</div>
                                <div>&nbsp;</div>
                                <div>${e.seatStatusVO.statusName}</div>
                                <div></div>
                                </div>
                                `
                } else {
                    str += `
                                <div class="col-3 one-seat non-click" onclick="selectSeat(this, ${e.memberCode})">
                                <div>${e.seatNum}</div>
                                <div>${e.memberVO.memberName}</div>
                                <div>${e.seatStatusVO.statusName}</div>
                                <div>(${e.memberVO.memberTel.slice(9,)})</div>
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
                                <div class="col-3 one-seat" style="background-color:#dfd3f8; cursor:default;">
                                <div>${e.seatNum}</div>
                                <div>&nbsp;</div>
                                <div>${e.seatStatusVO.statusName}</div>
                                <div></div>
                                </div>
                                `
                } else if (e.memberVO == null) {
                    str += `
                                <div class="col-3 one-seat greenSeat">
                                <div>${e.seatNum}</div>
                                <div>&nbsp;</div>
                                <div>${e.seatStatusVO.statusName}</div>
                                <div></div>
                                </div>
                                `
                } else {
                    str += `
                                <div class="col-3 one-seat non-click" onclick="selectSeat(this, ${e.memberCode})">
                                <div>${e.seatNum}</div>
                                <div>${e.memberVO.memberName}</div>
                                <div>${e.seatStatusVO.statusName}</div>
                                <div>(${e.memberVO.memberTel.slice(9,)})</div>
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
                            <div class="col-3 one-seat" style="background-color:#dfd3f8; cursor:default;">
                            <div>${e.seatNum}</div>
                            <div>&nbsp;</div>
                            <div>${e.seatStatusVO.statusName}</div>
                            <div></div>
                            </div>
                            `
                } else if (e.memberVO == null) {
                    str += `
                            <div class="col-3 one-seat greenSeat">
                            <div>${e.seatNum}</div>
                            <div>&nbsp;</div>
                            <div>${e.seatStatusVO.statusName}</div>
                            <div></div>
                            </div>
                            `
                } else {
                    str += `
                            <div class="col-3 one-seat non-click" onclick="selectSeat(this, ${e.memberCode})">
                            <div>${e.seatNum}</div>
                            <div>${e.memberVO.memberName}</div>
                            <div>${e.seatStatusVO.statusName}</div>
                            <div>(${e.memberVO.memberTel.slice(9,)})</div>
                            </div>
                            `
                }
            }
            str += `<div class="col-9"></div>`
            for (let i = 21; i < 22; i++) {
                const e = data[i];
                if (e.seatStatusVO.statusNum == 3) {
                    str += `
                                <div class="col-3 one-seat" style="background-color:#dfd3f8; cursor:default;">
                                <div>${e.seatNum}</div>
                                <div>&nbsp;</div>
                                <div>${e.seatStatusVO.statusName}</div>
                                <div></div>
                                </div>
                                `
                } else if (e.memberVO == null) {
                    str += `
                                <div class="col-3 one-seat greenSeat">
                                <div>${e.seatNum}</div>
                                <div>&nbsp;</div>
                                <div>${e.seatStatusVO.statusName}</div>
                                <div></div>
                                </div>
                                `
                } else {
                    str += `
                                <div class="col-3 one-seat non-click" onclick="selectSeat(this, ${e.memberCode})">
                                <div>${e.seatNum}</div>
                                <div>${e.memberVO.memberName}</div>
                                <div>${e.seatStatusVO.statusName}</div>
                                <div>(${e.memberVO.memberTel.slice(9,)})</div>
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
                            <div class="col-3 one-seat" style="background-color:#dfd3f8; cursor:default;">
                            <div>${e.seatNum}</div>
                            <div>&nbsp;</div>
                            <div>${e.seatStatusVO.statusName}</div>
                            <div></div>
                            </div>
                            `
                } else if (e.memberVO == null) {
                    str += `
                            <div class="col-3 one-seat greenSeat">
                            <div>${e.seatNum}</div>
                            <div>&nbsp;</div>
                            <div>${e.seatStatusVO.statusName}</div>
                            <div></div>
                            </div>
                            `
                } else {
                    str += `
                            <div class="col-3 one-seat non-click" onclick="selectSeat(this, ${e.memberCode})">
                            <div>${e.seatNum}</div>
                            <div>${e.memberVO.memberName}</div>
                            <div>${e.seatStatusVO.statusName}</div>
                            <div>(${e.memberVO.memberTel.slice(9,)})</div>
                            </div>
                            `
                }
            }
            str += `</div>
                </div>
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
    fetch('/seat/adminSeat', { //요청경로
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

            document.querySelector(".input-group").innerHTML = '';
            let str_2 = '';
            str_2 += `
                <button type="button" class="btn btn-outline-secondary floor-btn" onclick="onefloor()">1층</button>
                <button type="button" class="btn btn-light floor-btn" onclick="twofloor()">2층</button>
                <span class="input-group-text"></span>
                <button type="button" class="btn btn-outline-danger" onclick="moveMember()">회원이동</button>
                <button type="button" class="btn btn-outline-danger" onclick="adminSeatOut()">회원퇴실</button>
            `;
            document.querySelector(".input-group").insertAdjacentHTML('afterbegin', str_2);

            document.querySelector(".seatLive").innerHTML = '';
            let str = '';
            str = `
            <div class="row mb-3">
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
                            <div class="col-3 one-seat" style="background-color:#dfd3f8; cursor:default;">
                            <div>${e.seatNum}</div>
                            <div>&nbsp;</div>
                            <div>${e.seatStatusVO.statusName}</div>
                            <div></div>
                            </div>
                            `
                } else if (e.memberVO == null) {
                    str += `
                            <div class="col-3 one-seat greenSeat">
                            <div>${e.seatNum}</div>
                            <div>&nbsp;</div>
                            <div>${e.seatStatusVO.statusName}</div>
                            <div></div>
                            </div>
                            `
                } else {
                    str += `
                            <div class="col-3 one-seat non-click" onclick="selectSeat(this, ${e.memberCode})">
                            <div>${e.seatNum}</div>
                            <div>${e.memberVO.memberName}</div>
                            <div>${e.seatStatusVO.statusName}</div>
                            <div>(${e.memberVO.memberTel.slice(9,)})</div>
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
                            <div class="col-3 one-seat" style="background-color:#dfd3f8; cursor:default;">
                            <div>${e.seatNum}</div>
                            <div>&nbsp;</div>
                            <div>${e.seatStatusVO.statusName}</div>
                            <div></div>
                            </div>
                            `
                } else if (e.memberVO == null) {
                    str += `
                            <div class="col-3 one-seat greenSeat">
                            <div>${e.seatNum}</div>
                            <div>&nbsp;</div>
                            <div>${e.seatStatusVO.statusName}</div>
                            <div></div>
                            </div>
                            `
                } else {
                    str += `
                            <div class="col-3 one-seat non-click" onclick="selectSeat(this, ${e.memberCode})">
                            <div>${e.seatNum}</div>
                            <div>${e.memberVO.memberName}</div>
                            <div>${e.seatStatusVO.statusName}</div>
                            <div>(${e.memberVO.memberTel.slice(9,)})</div>
                            </div>
                            `
                }
            }
            str += `<div class="col-9"></div>`
            for (let i = 39; i < 40; i++) {
                const e = data[i];
                if (e.seatStatusVO.statusNum == 3) {
                    str += `
                                <div class="col-3 one-seat" style="background-color:#dfd3f8; cursor:default;">
                                <div>${e.seatNum}</div>
                                <div>&nbsp;</div>
                                <div>${e.seatStatusVO.statusName}</div>
                                <div></div>
                                </div>
                                `
                } else if (e.memberVO == null) {
                    str += `
                                <div class="col-3 one-seat greenSeat">
                                <div>${e.seatNum}</div>
                                <div>&nbsp;</div>
                                <div>${e.seatStatusVO.statusName}</div>
                                <div></div>
                                </div>
                                `
                } else {
                    str += `
                                <div class="col-3 one-seat non-click" onclick="selectSeat(this, ${e.memberCode})">
                                <div>${e.seatNum}</div>
                                <div>${e.memberVO.memberName}</div>
                                <div>${e.seatStatusVO.statusName}</div>
                                <div>(${e.memberVO.memberTel.slice(9,)})</div>
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
                                <div class="col-3 one-seat" style="background-color:#dfd3f8; cursor:default;">
                                <div>${e.seatNum}</div>
                                <div>&nbsp;</div>
                                <div>${e.seatStatusVO.statusName}</div>
                                <div></div>
                                </div>
                                `
                } else if (e.memberVO == null) {
                    str += `
                                <div class="col-3 one-seat greenSeat">
                                <div>${e.seatNum}</div>
                                <div>&nbsp;</div>
                                <div>${e.seatStatusVO.statusName}</div>
                                <div></div>
                                </div>
                                `
                } else {
                    str += `
                                <div class="col-3 one-seat non-click" onclick="selectSeat(this, ${e.memberCode})">
                                <div>${e.seatNum}</div>
                                <div>${e.memberVO.memberName}</div>
                                <div>${e.seatStatusVO.statusName}</div>
                                <div>(${e.memberVO.memberTel.slice(9,)})</div>
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
                            <div class="col-3 one-seat" style="background-color:#dfd3f8; cursor:default;">
                            <div>${e.seatNum}</div>
                            <div>&nbsp;</div>
                            <div>${e.seatStatusVO.statusName}</div>
                            <div></div>
                            </div>
                            `
                } else if (e.memberVO == null) {
                    str += `
                            <div class="col-3 one-seat greenSeat">
                            <div>${e.seatNum}</div>
                            <div>&nbsp;</div>
                            <div>${e.seatStatusVO.statusName}</div>
                            <div></div>
                            </div>
                            `
                } else {
                    str += `
                            <div class="col-3 one-seat non-click" onclick="selectSeat(this, ${e.memberCode})">
                            <div>${e.seatNum}</div>
                            <div>${e.memberVO.memberName}</div>
                            <div>${e.seatStatusVO.statusName}</div>
                            <div>(${e.memberVO.memberTel.slice(9,)})</div>
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
                            <div class="col-3 one-seat" style="background-color:#dfd3f8; cursor:default;">
                            <div>${e.seatNum}</div>
                            <div>&nbsp;</div>
                            <div>${e.seatStatusVO.statusName}</div>
                            <div></div>
                            </div>
                            `
                } else if (e.memberVO == null) {
                    str += `
                            <div class="col-3 one-seat greenSeat">
                            <div>${e.seatNum}</div>
                            <div>&nbsp;</div>
                            <div>${e.seatStatusVO.statusName}</div>
                            <div></div>
                            </div>
                            `
                } else {
                    str += `
                            <div class="col-3 one-seat non-click" onclick="selectSeat(this, ${e.memberCode})">
                            <div>${e.seatNum}</div>
                            <div>${e.memberVO.memberName}</div>
                            <div>${e.seatStatusVO.statusName}</div>
                            <div>(${e.memberVO.memberTel.slice(9,)})</div>
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
                                <div class="col-3 one-seat" style="background-color:#dfd3f8; cursor:default;">
                                <div>${e.seatNum}</div>
                                <div>&nbsp;</div>
                                <div>${e.seatStatusVO.statusName}</div>
                                <div></div>
                                </div>
                                `
                } else if (e.memberVO == null) {
                    str += `
                                <div class="col-3 one-seat greenSeat">
                                <div>${e.seatNum}</div>
                                <div>&nbsp;</div>
                                <div>${e.seatStatusVO.statusName}</div>
                                <div></div>
                                </div>
                                `
                } else {
                    str += `
                                <div class="col-3 one-seat non-click" onclick="selectSeat(this, ${e.memberCode})">
                                <div>${e.seatNum}</div>
                                <div>${e.memberVO.memberName}</div>
                                <div>${e.seatStatusVO.statusName}</div>
                                <div>(${e.memberVO.memberTel.slice(9,)})</div>
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
                            <div class="col-3 one-seat" style="background-color:#dfd3f8; cursor:default;">
                            <div>${e.seatNum}</div>
                            <div>&nbsp;</div>
                            <div>${e.seatStatusVO.statusName}</div>
                            <div></div>
                            </div>
                            `
                } else if (e.memberVO == null) {
                    str += `
                            <div class="col-3 one-seat greenSeat">
                            <div>${e.seatNum}</div>
                            <div>&nbsp;</div>
                            <div>${e.seatStatusVO.statusName}</div>
                            <div></div>
                            </div>
                            `
                } else {
                    str += `
                            <div class="col-3 one-seat non-click" onclick="selectSeat(this, ${e.memberCode})">
                            <div>${e.seatNum}</div>
                            <div>${e.memberVO.memberName}</div>
                            <div>${e.seatStatusVO.statusName}</div>
                            <div>(${e.memberVO.memberTel.slice(9,)})</div>
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

function selectSeat(event, memberCode) {
    selected_memberCode = memberCode;

    const nonClick = document.querySelectorAll('.non-click');

    nonClick.forEach((e) => {
        e.classList.remove("click");
    })
    event.classList.add("click")
}

function changeFloor() {
    selected_floor = document.querySelector('.seatFloor').value;
    moveMember();
}

// 좌석이동 Modal
const modal_open = new bootstrap.Modal('#adminSeat-modal');

function moveMember() {

    if (selected_memberCode == 0) {
        alert("사용 중인 회원을 선택해주세요.")
    }
    else {

        fetch('/seat/adminSeatMove', { //요청경로
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            //컨트롤러로 전달할 데이터
            body: JSON.stringify({
                // 데이터명 : 데이터값
                memberCode: `${selected_memberCode}`
                , seatFloor: `${selected_floor}`

            })
        })
            .then((response) => {
                //return response.text(); //컨트롤러에서 return하는 데이터가 없거나 int, String 일 때 사용
                return response.json(); //나머지 경우에 사용
            })
            //fetch 통신 후 실행 영역
            .then((data) => {//data -> controller에서 리턴되는 데이터!
                console.log(data);
                document.querySelector('.adminSeat-modal-body').innerHTML = '';

                let str = '';

                str += `
                <table class="modal-table">
                    <colgroup>
                        <col width="30%">
                        <col width="*">
                    </colgroup>
                    <tbody>
                        <tr>
                            <td style="padding-top: 20px;">이동할 좌석</td>
                            <td style="padding-top: 20px;">
                                <div class="row">
                                    <div class="col-auto">
                                        <select class="form-select text-center seatFloor" onchange="changeFloor()" style="width: 75px; font-size: 15px;">`
                data.floor.forEach(e => {
                    str += `
                                        <option ${data.resultFloor == e.seatFloor ? 'selected' : ''} value=${e.seatFloor}>${e.seatFloor}</option>
                                        `
                });
                str += `
                                        </select>
                                    </div>
                                    <div class="col-auto">
                                        <label style="padding-top: 4px;">층</label>
                                    </div>
                                    <div class="col-auto">
                                        <select class="form-select text-center seatNum ms-2" style="width: 75px; font-size: 15px;">`
                data.num.forEach(e => {
                    str += `
                                        <option value=${e.seatNum}>${e.seatNum}</option>
                                        `
                });
                str += `
                                        </select>
                                    </div>
                                    <div class="col-auto">
                                        <label style="padding-top: 4px;">번</label>
                                    </div>                                 
                                </div>                              
                                
                            </td>
                        </tr>
                        <tr>
                            <td>이용자 아이디</td>
                            <td>${data.mem.memberId}</td>
                        </tr>
                        <tr>
                            <td>이용자 이름</td>
                            <td>${data.mem.memberName}</td>
                        </tr>
                        <tr>
                            <td>전화번호</td>
                            <td style="letter-spacing: 1px;">${data.mem.memberTel}</td>
                        </tr>
                    </tbody>
                </table>
                <div class="text-center">
                    <button type="button" class="btn btn-danger mb-4" onclick="oneMore()">좌석이동</button>
                </div>
                `;

                //         str = `
                //     <div class="row line-height">
                //         <div class="col">
                //             <div class="row">
                //                 <div class="col-6 text-end">이동할 좌석</div>
                //                 <div class="col-5 text-start" style="display: flex; align-items: center;">
                //                 <select class="form-select text-center seatFloor" onchange="changeFloor()" style="width: 70px;">`
                //         data.floor.forEach(e => {
                //             str += `
                //                     <option ${data.resultFloor == e.seatFloor ? 'selected' : ''} value=${e.seatFloor}>${e.seatFloor}</option>
                //                     `
                //         });
                //         str += `
                //                 </select>
                //                 <span class="ms-2">층</span>
                //                 <select class="form-select text-center seatNum ms-2" style="width: 90px;">`
                //         data.num.forEach(e => {
                //             str += `
                //             <option value=${e.seatNum}>${e.seatNum}</option>
                //                 `
                //         });

                //         str += `
                //                 </select>
                //                 <span class="ms-2">번</span>
                //                 </div>
                //             </div>
                //             <div class="row">
                //                 <div class="col-6 text-end">이용자 아이디</div>
                //                 <div class="col-5 text-start memberId">${data.mem.memberId}</div>
                //             </div>
                //             <div class="row">
                //                 <div class="col-6 text-end">이용자명</div>
                //                 <div class="col-6 text-start">${data.mem.memberName}</div>
                //             </div>
                //             <div class="row">
                //                 <div class="col-6 text-end">이용자번호</div>
                //                 <div class="col-5 text-start">${data.mem.memberTel}</div>
                //             </div>
                //             <div class="row mt-4">
                //                 <div class="col">
                //                     <button type="button" class="btn btn-danger mb-4" onclick="oneMore()">좌석이동</button>
                //                 </div>
                //             </div>
                //         </div>
                //     </div>
                // `;

                document.querySelector('.adminSeat-modal-body').insertAdjacentHTML('afterbegin', str);

                modal_open.show();


            })
            //fetch 통신 실패 시 실행 영역
            .catch(err => {
                alert('fetch error!\nthen 구문에서 오류가 발생했습니다.\n콘솔창을 확인하세요!');
                console.log(err);
            });


    }
}

function oneMore() {
    const result = confirm('선택한 회원의 좌석을 이동시키겠습니까?')
    if (result) {
        fetch('/seat/adminSeatMoveSuccess', { //요청경로
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            //컨트롤러로 전달할 데이터
            body: JSON.stringify({
                // 데이터명 : 데이터값
                seatNum: `${document.querySelector('.seatNum').value}`
                , memberCode: `${selected_memberCode}`
            })
        })
            .then((response) => {
                return response.text(); //컨트롤러에서 return하는 데이터가 없거나 int, String 일 때 사용
                //return response.json(); //나머지 경우에 사용
            })
            //fetch 통신 후 실행 영역
            .then((data) => {//data -> controller에서 리턴되는 데이터!
                alert('좌석이동이 완료되었습니다.')
                location.href = `/admin/seat`;
            })
            //fetch 통신 실패 시 실행 영역
            .catch(err => {
                alert('fetch error!\nthen 구문에서 오류가 발생했습니다.\n콘솔창을 확인하세요!');
                console.log(err);
            });


    }
    else {
        return;
    }
}

function adminSeatOut() {
    const result = confirm('선택한 회원을 퇴실시키겠습니까?')
    if (result) {
        fetch('/seat/adminSeatOut', { //요청경로
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            //컨트롤러로 전달할 데이터
            body: new URLSearchParams({
                // 데이터명 : 데이터값
                memberCode: selected_memberCode
            })
        })
            .then((response) => {
                if (!response.ok) {
                    alert('오류가 발생하였습니다.');
                    return;
                }

                return response.text(); //컨트롤러에서 return하는 데이터가 없거나 int, String 일 때 사용
                //return response.json(); //나머지 경우에 사용
            })
            //fetch 통신 후 실행 영역
            .then((data) => {//data -> controller에서 리턴되는 데이터!
                if (data != null) {
                    alert('퇴실이 완료되었습니다. 감사합니다.')
                    location.href = "/admin/seat"
                }
                else {
                    alert('퇴실시킬 회원을 선택해 주세요.');
                }
            })
            //fetch 통신 실패 시 실행 영역
            .catch(err => {
                alert('fetch error!\nthen 구문에서 오류가 발생했습니다.\n콘솔창을 확인하세요!');
                console.log(err);
            });
    }
    else {
        return;
    }
}

function changeStatus(){
    const num = document.querySelector('.statusNum').value;
    alert(num);

    fetch('/', { //요청경로
        method: 'POST',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        //컨트롤러로 전달할 데이터
        body: new URLSearchParams({
           // 데이터명 : 데이터값
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
        
    })
    //fetch 통신 실패 시 실행 영역
    .catch(err=>{
        alert('fetch error!\nthen 구문에서 오류가 발생했습니다.\n콘솔창을 확인하세요!');
        console.log(err);
    });
}