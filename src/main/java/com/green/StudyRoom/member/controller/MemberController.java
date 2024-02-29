package com.green.StudyRoom.member.controller;

import com.green.StudyRoom.member.service.MemberServiceImpl;
import com.green.StudyRoom.member.vo.MemberVO;
import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

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
//        return "content/homepage/main_homepage";
 }
    //회원가입
    @PostMapping("/join")
    public String joinInsert(MemberVO memberVO){
        memberService.joinInsert(memberVO);
        System.out.println(memberVO);
        return "content/board/mainHomepage";
    }
    //로그인 화면-top에서 로그인 눌렀을 때
    @GetMapping("/loginForm")
    public String loginForm(){
        return "content/member/login";
    }

    //로그인==아이디와 비밀번호 후 로그인 할때
    @PostMapping("/login")
    public String login(MemberVO memberVO, HttpSession session){
        MemberVO loginInfo=memberService.login(memberVO);
        if(loginInfo != null){
            session.setAttribute("loginInfo", loginInfo);
        }
        return "content/member/login_result";
    }

    //비동기 로그인
    @ResponseBody
    @PostMapping("/loginFetch")
    public String loginFetch(MemberVO memberVO, HttpSession session){
        MemberVO loginInfo = memberService.login(memberVO);

        //로그인 성공 시 세션에 데이터 저장
        if(loginInfo != null){
            session.setAttribute("loginInfo", loginInfo);
        }
        return loginInfo == null ? "" : loginInfo.getMemberId();
    }

    //로그아웃
    @GetMapping("/logout")
    public String logout(HttpSession session){
        session.removeAttribute("loginInfo");
        return "redirect:/board/mainHomepage";
    }
}
