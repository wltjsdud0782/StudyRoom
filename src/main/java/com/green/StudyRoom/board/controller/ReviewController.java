package com.green.StudyRoom.board.controller;

import jakarta.annotation.Resource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/review")
public class ReviewController {


    @GetMapping("/writeReview")
    public String writeReview(){

        return "content/homepage/writeReview";
    }
}
