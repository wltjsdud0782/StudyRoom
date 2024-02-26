package com.green.StudyRoom.board.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class StudyRoomBoardController {

    @GetMapping("/")
    public String StudyRoomBoard(){

        return "main_layout.html" +
                "";
    }
}
