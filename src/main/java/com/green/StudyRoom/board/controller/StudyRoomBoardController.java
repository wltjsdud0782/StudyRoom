package com.green.StudyRoom.board.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/board")
public class StudyRoomBoardController {

    @GetMapping("/mainHomepage")
    public String studyRoomBoard(){
        return "content/homepage/main_homepage" ;

    }
    @GetMapping("/inquiry")
    public String studyRoomInquiry(){
        return "content/homepage/inquiry_page";
    }
}
