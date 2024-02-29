package com.green.StudyRoom.seat.controller;

import com.green.StudyRoom.member.service.MemberServiceImpl;
import com.green.StudyRoom.member.vo.MemberVO;
import com.green.StudyRoom.seat.service.SeatService;
import com.green.StudyRoom.seat.service.SeatServiceImpl;
import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/seat")
public class SeatController {
    @Resource(name = "seatService")
    private SeatServiceImpl seatService;
    @Resource(name = "memberService")
    private MemberServiceImpl memberService;

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

    @GetMapping("/chargeBuy")
    public String chargeBuy(){
        return "/content/seat/charge_buy";
    }

}
