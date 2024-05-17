package com.green.StudyRoom.mail;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class MailController {

    @Autowired
    MailServiceImpl mailService;

    @ResponseBody
    @PostMapping("/sendMail")
    public String mailConfirm(@RequestParam(name = "memberEmail")String memberEmail) throws Exception{
        String code = mailService.sendSimpleMessage(memberEmail);
        System.out.println("사용자에게 발송한 인증 코드 =>" +  code);

        return code;
    }
}
