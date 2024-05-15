package com.green.StudyRoom.member.controller;

import com.green.StudyRoom.member.service.MemberServiceImpl;
import com.green.StudyRoom.member.vo.MemberVO;
import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpSession;
import org.apache.ibatis.javassist.compiler.ast.Member;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    @GetMapping("/idFind")
    public String idFind(){
        return "content/member/id_find";
    }

    @PostMapping("/idFind")
    public String idFindTo(MemberVO memberVO, Model model){
        System.out.println(memberVO);

        model.addAttribute("memberList", memberService.idFindSelect(memberVO));
        return "content/member/idResult";
    }

    @GetMapping("/passwordFind")
    public String passwordFind(@RequestParam(name = "memberId") String memberId, Model model){
        System.out.println(memberId);

        model.addAttribute("memberList", memberService.memberIdSelect(memberId));
        return "content/member/passwordFind";
    }
//    // 로그인
//    @PostMapping("/login")
//    public String login(MemberVO memberVO, HttpSession session, Model model){
//        MemberVO loginInfo=memberService.login(memberVO);
//        String str = "";
//        if(loginInfo != null){
//            session.setAttribute("loginInfo", loginInfo);
//        }
//        else {
//            str="아이디와 password가 틀립니다.";
//            model.addAttribute("str",str);
//            return "redirect:/member/loginForm";
//        }
//        return  "redirect:/board/mainHomepage";
//    }


    //아이디 찾기 화면
//    @GetMapping("idFindForm")
//    public String idFindForm(@RequestParam(name="errorMsg", required = false) String errorMsg, Model model){
//        return "content/member/id_find";
//    }

    //아이디 찾기
//    @PostMapping("/idFind")
//    public String idFindSelect(MemberVO memberVO, Model model) {
//        MemberVO idFind=memberService.idFindSelect(memberVO);
//        String str="";
//        if (idFind != null) {
//            idFind.setMemberId(idFind.getMemberId().replace(idFind.getMemberId().substring(idFind.getMemberId().length()-2, idFind.getMemberId().length()),"**"));
//            model.addAttribute("idFind", idFind);
//            str = "content/member/id_find_result";
//        } else {
//            str="redirect:/member/idFindForm";
//        }
//        return str;
//    }

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

    // 로그아웃
    @GetMapping("/logout")
    public String logout(HttpSession session){
            session.removeAttribute("loginInfo");
        return "redirect:/board/mainHomepage";
    }

    @PostMapping("/idFind")
    public String insertIdFind(MemberVO memberVO, Model model){
        System.out.println(memberVO);

        model.addAttribute("memberList" , memberService.idFindResult(memberVO));
        return "content/member/idFindResult";
    }

    @ResponseBody
    @PostMapping("/goTel")
    public MemberVO goTel(@RequestParam(name = "memberId") String memberId){
        MemberVO memberList = memberService.memberIdSelect(memberId);

        return memberList;
    }

    @ResponseBody
    @PostMapping("/goEmail")
    public MemberVO goEmail(@RequestParam(name = "memberId") String memberId){
        MemberVO memberList = memberService.memberIdSelect(memberId);

        return memberList;
    }
    
    // 비밀번호 찾기 첫화면
    @GetMapping("/passwordFindFirst")
    public String passwordFindFirst(){
        
        return "content/member/passwordFindFirst";
    }

    @ResponseBody
    @PostMapping("/selectMemberId")
    public Map<String , Object> selectMemberId(@RequestParam(name = "memberId")String memberId){
        System.out.println(memberId);

        Map<String, Object> map = new HashMap<>();

        MemberVO memberList = memberService.memberIdSelect(memberId);

        System.out.println(memberList);

        String nullInfo = "FindId";

        if(memberList == null){
            nullInfo = "";
        }
        else {
            map.put("memberList", memberList);
        }

        map.put("nullInfo", nullInfo);

        return map;
    }

    @GetMapping("/resetPassword")
    public String resetPassword(@RequestParam(name = "memberId") String memberId ,Model model){
        System.out.println(memberId);
        model.addAttribute("memberId", memberId);
        return "content/member/resetPassword";
    }
    @PostMapping("/changePassword")
    public String changePassword(MemberVO memberVO){

        System.out.println(memberVO);

        memberService.resetPassword(memberVO);

        return "redirect:/board/mainHomepage";
    }
}
