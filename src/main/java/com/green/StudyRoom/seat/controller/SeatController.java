package com.green.StudyRoom.seat.controller;

import com.green.StudyRoom.seat.service.SeatServiceImpl;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/seat")
public class SeatController {
    @Resource(name = "seatService")
    private SeatServiceImpl seatService;

    @GetMapping("/seatLive")
    public String seatLive(@RequestParam(name = "floor", required = false, defaultValue = "1")int floor
                        , Model model){
        model.addAttribute("floor", floor);
        return "content/seat/seat_live";
    }

    @ResponseBody
    @PostMapping("/seat2Floor")
    public void seat2Floor(@RequestBody int floor){
    }

    @GetMapping("/seatReservation")
    public String seatReservation(){
        return "/content/seat/seat_reservation";
    }

}
