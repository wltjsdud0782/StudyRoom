package com.green.StudyRoom.admin.controller;

import com.green.StudyRoom.admin.service.AdminServiceImpl;
import com.green.StudyRoom.admin.vo.MessageVO;
import com.green.StudyRoom.member.service.MemberServiceImpl;
import com.green.StudyRoom.seat.service.SeatServiceImpl;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/admin")
public class AdminController {
    @Resource(name="adminService")
    private AdminServiceImpl adminService;
//    @Resource(name="memberService")
//    private MemberServiceImpl memberService;
//    @Resource(name="seatService")
//    private SeatServiceImpl seatService;

    //(1)////////////////////////////////////////////////////// //
    @GetMapping("/msg")
    public String adminMessage(){
        return "content/admin/admin_message_content";
    }

    @PostMapping("/sendMsg")
    public String sendMessage(MessageVO messageVO){
        adminService.insertMessage(messageVO);
        System.out.println(messageVO);
        return "redirect:/admin/msg";
    }
    // ////////////////////////////////////////////////////// //
}
