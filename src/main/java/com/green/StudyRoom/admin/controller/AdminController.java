package com.green.StudyRoom.admin.controller;

import com.green.StudyRoom.admin.service.MessageService;
import com.green.StudyRoom.admin.service.MessageServiceImpl;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/admin")
public class AdminController {

    @Resource(name="messageService")
    private MessageServiceImpl messageService;

    // ////////////////////////////////////////////////////// //
}
