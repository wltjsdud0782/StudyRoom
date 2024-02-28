package com.green.StudyRoom.board.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/board")
public class StudyRoomBoardController {

    //메인 홈페이지
    @GetMapping("/mainHomepage")
    public String studyRoomBoard(){
        return "content/homepage/main_homepage" ;

    }

    //문의 홈페이지
    @GetMapping("/inquiry")
    public String studyRoomInquiry(){
        return "content/homepage/inquiry_page";
    }

    //문의 글쓰기
    @GetMapping("/inquiryWriting")
    public String inquiryWriting(){
        return "content/homepage/inquiry_writing";
    }
}
