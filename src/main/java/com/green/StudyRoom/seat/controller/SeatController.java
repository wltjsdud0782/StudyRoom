package com.green.StudyRoom.seat.controller;

import com.green.StudyRoom.seat.service.SeatServiceImpl;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/seat")
public class SeatController {
    @Resource(name = "seatService")
    private SeatServiceImpl seatService;

    @GetMapping("/seatLive")
    public String seatLive(){
        return "content/seat_live";
    }
}
