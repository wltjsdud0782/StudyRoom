package com.green.StudyRoom.board.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class PageVO {
    private int nowPage; //현재 선택된 페이지
    private int totalDateCnt;   //전체데이터 수
    private int displayDateCnt; //한 페이지에 보여지는 데이터 수
    private int displayPageCnt; //한 페이지에 보여지는 페이지 수
    private int beginPage; // 첫번째 페이지
    private int endPage; // 마지막 페이지 번호
    private boolean prev; // 이전 버특 유무
    private boolean next; // 다음 버튼 유무

    public PageVO(){
        nowPage = 1;
        displayDateCnt = 7;
        displayPageCnt = 5;
    }

    public void setPageInfo(){
        //화면에 보이는 마지막 페이지 번호세팅
        endPage = (int)Math.ceil(nowPage / (double)displayPageCnt) * displayPageCnt;

        //화면에 보이는 첫번째 페이지 번호 세팅
        beginPage = endPage - displayPageCnt + 1;

        //전체 페이지 수
        int totalPageCnt = (int)Math.ceil(totalDateCnt/(double)displayDateCnt);

        //next 버튼의 유무
        if(endPage < totalPageCnt){
            next = true;
        }
        else {
            next = false;
            endPage = totalPageCnt;
        }

        prev = beginPage == 1 ? false : true;
    }
}
