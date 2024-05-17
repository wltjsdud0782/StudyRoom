package com.green.StudyRoom.sms;

import com.green.StudyRoom.member.vo.MemberVO;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Random;

@Controller
public class SmsController {
    @Resource(name = "smsUtilService")
    private SmsUtil smsService;

    @ResponseBody
    @PostMapping("/sendSms")
    public String sendRandomSms(MemberVO memberVO){
        System.out.println(memberVO);

        Random random = new Random();
        StringBuffer buffer = new StringBuffer();

        for(int i=0; i<6; i++){
            buffer.append(random.nextInt(10));
        }
        String randomCode = buffer.toString();
        System.out.println("수신자 번호 :" + memberVO.getMemberTel());
        System.out.println("인증번호 : " + randomCode);

//        smsService.getMessage(memberVO.getMemberTel(), randomCode);

        return randomCode;
    }

}
