package com.green.StudyRoom.admin.controller;

import com.green.StudyRoom.admin.service.AdminServiceImpl;
import com.green.StudyRoom.admin.vo.MessageVO;
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

    //(1)////////////////////////////////////////////////////// //
    @GetMapping("/home")
    public String adminHome(){
        return "content/admin_content";
    }

    @PostMapping("/sendMessage")
    public String sendMessage(MessageVO messageVO){
        adminService.insertMessage(messageVO);
        System.out.println(messageVO);
        return "redirect:/admin/home";
    }
    // ////////////////////////////////////////////////////// //
}
