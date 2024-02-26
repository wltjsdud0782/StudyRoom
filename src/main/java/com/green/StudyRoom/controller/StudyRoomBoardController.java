package com.green.StudyRoom.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class StudyRoomBoardController {

    @GetMapping("/main")
    public String StudyRoomBoard(){

        return "content/2_content";
    }
}
