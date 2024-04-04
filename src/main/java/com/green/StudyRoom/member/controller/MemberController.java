package com.green.StudyRoom.member.controller;

import com.green.StudyRoom.member.service.MemberServiceImpl;
import com.green.StudyRoom.member.vo.MemberVO;
import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/member")
public class MemberController {
    @Resource(name="memberService")
    private MemberServiceImpl memberService;

    // 회원 가입
    @PostMapping("/join")
    public String joinInsert(MemberVO memberVO){
        //연락처 셋팅
        memberVO.setMemberTel(memberVO.getMemberTel().replace(",","-"));
        memberService.joinInsert(memberVO);
        System.out.println(memberVO);
        return "redirect:/board/mainHomepage";
    }

    // 로그인 화면
    @GetMapping("/loginForm")
    public String loginForm(){
        return "content/member/login";
    }

    // 로그인
    @PostMapping("/login")
    public String login(MemberVO memberVO, HttpSession session, Model model){
        MemberVO loginInfo=memberService.login(memberVO);
        String str = "";
        if(loginInfo != null){
            session.setAttribute("loginInfo", loginInfo);
        }
        else {
            str="아이디와 password가 틀립니다.";
            model.addAttribute("str",str);
            return "redirect:/member/loginForm";
        }
        return  "redirect:/board/mainHomepage";
    }


    //아이디 찾기 폼
//    @GetMapping("/idFindForm")
//    public String id_find(@RequestParam(name="errorMsg", required = false , defaultValue = "success") String errorMsg, Model model){
//        return "content/member/id_find";
//    }

    @GetMapping("idFindForm")
    public String idFindForm(@RequestParam(name="errorMsg", required = false) String errorMsg, Model model){
        return "content/member/id_find";
    }

    //아이디 찾기
    @PostMapping("/idFind")
    public String idFindSelect(MemberVO memberVO, Model model) {

        MemberVO idFind=memberService.idFindSelect(memberVO);
        String str="";
        if (idFind != null) {
            idFind.setMemberId(idFind.getMemberId().replace(idFind.getMemberId().substring(idFind.getMemberId().length()-2, idFind.getMemberId().length()),"**"));
            model.addAttribute("idFind", idFind);
            str = "content/member/id_find_result";
        } else {
            str="redirect:/member/idFindForm";
        }
        return str;
    }

    //이용약관
    @GetMapping("/termsUse")
    public String terms_use(){
        return "content/member/terms_use";
    }

    //개인정보처리방침
    @GetMapping("/privacyPolicy")
    public String privacy_policy(){
        return "content/member/privacy_policy";

    }

    // 비동기 로그인
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

    // 로그아웃
    @GetMapping("/logout")
    public String logout(HttpSession session){
            session.removeAttribute("loginInfo");
        return "redirect:/board/mainHomepage";
    }
}
