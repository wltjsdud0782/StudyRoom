package com.green.StudyRoom.member.controller;

import com.green.StudyRoom.member.service.MemberServiceImpl;
import com.green.StudyRoom.member.vo.MemberVO;
import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/member")
public class MemberController {
    @Resource(name="memberService")
    private MemberServiceImpl memberService;

    @GetMapping("/first")
    public String first(){
        return "content/member/first";
    }
    @GetMapping("/join")
    public String join(){
        return "content/member/join";
 }
    //회원가입
    @PostMapping("join")
    public String joinInsert(MemberVO memberVO){
        memberService.joinInsert(memberVO);
        System.out.println(memberVO);
        return "content/member/login";
    }
    //로그인화면
    @GetMapping("loginForm")
    public String loginForm(){
        return "content/member/login";
    }

    //로그인
    @PostMapping("login")
    public String login(MemberVO memberVO, HttpSession session){
        MemberVO loginInfo=memberService.login(memberVO);
        if(loginInfo != null){
            session.setAttribute("loginInfo", loginInfo);
        }
        return "content/member/login_result";
    }
}
