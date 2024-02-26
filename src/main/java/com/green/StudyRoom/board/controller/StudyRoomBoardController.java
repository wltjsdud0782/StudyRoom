package com.green.StudyRoom.board.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class StudyRoomBoardController {

    @GetMapping("/")
    public String StudyRoomBoard(){
        return "content/1_content" ;

    }
}
