onefloor();

function onefloor(){
    fetch('/seat/seatLive', { //요청경로
        method: 'POST',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        //컨트롤러로 전달할 데이터
        body: JSON.stringify({
           // 데이터명 : 데이터값
            floor : 1
        })
    })
    .then((response) => {
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
                    <div class="row">
                        <div class="col-3 one-seat">
                        <div>1</div>
                        <div>지*영</div>
                        <div>사용중</div>
                        <div>(0782)</div>
                        </div>
                        <div class="col-3 one-seat">
                        <div>2</div>
                        </div>
                        <div class="col-3 one-seat">
                        <div>3</div>
                        </div>
                        <div class="col-3 one-seat">4</div>
                    </div>
                    <div class="row mt-5">
                        <div class="col-3 one-seat">5</div>
                        <div class="col-3 one-seat">6</div>
                        <div class="col-3 one-seat">7</div>
                        <div class="col-3"></div>
                    </div>
                </div>
                <div class="offset-1 col-5 room up-room">
                    <div>
                        제 2열람실
                    </div>
                    <div class="row">
                        <div class="col-3 one-seat">8</div>
                        <div class="col-3 one-seat">9</div>
                        <div class="col-3 one-seat">10</div>
                        <div class="col-3 one-seat">11</div>
                    </div>
                    <div class="row mt-5">
                        <div class="col-3"></div>
                        <div class="col-3 one-seat">12</div>
                        <div class="col-3 one-seat">13</div>
                        <div class="col-3 one-seat">14</div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="offset-1 col room down-room">
                    <div>
                        제 3열람실
                    </div>
                    <div class="row">
                        <div class="col-2"></div>
                        <div class="col-1"></div>
                        <div class="col-1 one-seat">15</div>
                        <div class="col-1 one-seat">16</div>
                        <div class="col-1 one-seat">17</div>
                        <div class="col-1 one-seat">18</div>
                        <div class="col-1 one-seat">19</div>
                        <div class="col-1 one-seat">20</div>
                    </div>
                    <div class="row">
                        <div class="col-1 one-seat">21</div>
                        <div class="col-9"></div>
                        <div class="col-1 one-seat">22</div>
                    </div>
                    <div class="row">
                        <div class="col-2 one-seat">23</div>
                        <div class="col-1 one-seat">24</div>
                        <div class="col-1 one-seat">25</div>
                        <div class="col-1 one-seat">26</div>
                        <div class="col-1 one-seat">27</div>
                        <div class="col-1 one-seat">28</div>
                        <div class="col-1 one-seat">29</div>
                        <div class="col-1 one-seat">30</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
        `;
        document.querySelector(".seatLive").insertAdjacentHTML('afterbegin', str)
    })
    //fetch 통신 실패 시 실행 영역
    .catch(err=>{
        alert('fetch error!\nthen 구문에서 오류가 발생했습니다.\n콘솔창을 확인하세요!');
        console.log(err);
    });
}

function twofloor(){
    fetch('/seat/seat2Floor', { //요청경로
        method: 'POST',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        //컨트롤러로 전달할 데이터
        body: JSON.stringify({
           // 데이터명 : 데이터값
            floor : 2
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
                    <div class="row">
                        <div class="col-2 one-seat">31</div>
                        <div class="col-1 one-seat">32</div>
                        <div class="col-1 one-seat">33</div>
                        <div class="col-1 one-seat">34</div>
                        <div class="col-1 one-seat">35</div>
                        <div class="col-1 one-seat">36</div>
                        <div class="col-1 one-seat">37</div>
                        <div class="col-1 one-seat">38</div>
                    </div>
                    <div class="row">
                        <div class="col-1 one-seat">39</div>
                        <div class="col-9"></div>
                        <div class="col-1 one-seat">40</div>
                    </div>
                    <div class="row">
                        <div class="col-2"></div>
                        <div class="col-1"></div>
                        <div class="col-1 one-seat">41</div>
                        <div class="col-1 one-seat">42</div>
                        <div class="col-1 one-seat">43</div>
                        <div class="col-1 one-seat">44</div>
                        <div class="col-1 one-seat">45</div>
                        <div class="col-1 one-seat">46</div>
                    </div>
                </div>
            </div>
            <div class="row" style="margin-top: 40px;">
                <div class="offset-1 col-5 room up-room">
                    <div>
                    제 5열람실
                    </div>
                    <div class="row">
                        <div class="col-3 one-seat">47</div>
                        <div class="col-3 one-seat">48</div>
                        <div class="col-3 one-seat">49</div>
                        <div class="col-3"></div>
                    </div>
                    <div class="row mt-5">
                        <div class="col-3 one-seat">50</div>
                        <div class="col-3 one-seat">51</div>
                        <div class="col-3 one-seat">52</div>
                        <div class="col-3 one-seat">53</div>
                    </div>
                </div>
                <div class="offset-1 col-5 room up-room">
                    <div>
                        제 6열람실
                    </div>
                    <div class="row">
                        <div class="col-3"></div>
                        <div class="col-3 one-seat">54</div>
                        <div class="col-3 one-seat">55</div>
                        <div class="col-3 one-seat">56</div>
                    </div>
                    <div class="row mt-5">
                        <div class="col-3 one-seat">57</div>
                        <div class="col-3 one-seat">58</div>
                        <div class="col-3 one-seat">59</div>
                        <div class="col-3 one-seat">60</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
        `
    document.querySelector(".seatLive").insertAdjacentHTML('afterbegin', str)
    })
    //fetch 통신 실패 시 실행 영역
    .catch(err=>{
        alert('fetch error!\nthen 구문에서 오류가 발생했습니다.\n콘솔창을 확인하세요!');
        console.log(err);
    });
}

// 예약하기 Modal
const modal_open = new bootstrap.Modal('#seat-modal');

function reservation(loginInfo){
    if(loginInfo == null){ // 로그인 X
        alert("로그인이 필요한 기능입니다.");
        location.href = "/member/loginForm"
    }
    
    if(loginInfo != null){ // 로그인 O
        console.log(loginInfo)

        document.querySelector('.modal-body').innerHTML = '';

        let str = '';

        str = `
        <div class="row">
                                <div class="col text-end">선택한 좌석</div>
                                <div class="col text-start">{seatFloor}층 {seatNum}번</div>
                            </div>
                            <div class="row">
                                <div class="col text-end">예약자 아이디</div>
                                <div class="col text-start">${loginInfo.memberId} </div>
                            </div>
                            <div class="row">
                                <div class="col text-end">예약자명</div>
                                <div class="col text-start">${loginInfo.memberName}</div>
                            </div>
                            <div class="row">
                                <div class="col text-end">예약자번호</div>
                                <div class="col text-start">${loginInfo.memberTel}</div>
                            </div>
                            <div class="row">
                                <div class="col text-end">보유한 정액권</div>
                                <div class="col text-start">
                                    <select name="">
                                        <option value="">30일권(남은기간:28일)</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <button type="button" class="btn btn-danger mt-4" onclick="oneMore()">예약하기</button>
                                </div>
                            </div>
        `;

        document.querySelector('.modal-body').insertAdjacentHTML('afterbegin', str);

        modal_open.show();
    }
}

function oneMore(){
    const result = confirm('등록된 정보로 예약하시겠습니까?')
    if(result){
        alert('예약이 완료되었습니다.')
        location.href = "/seat/seatLive";
    }
    else{
        return ;
    }
}