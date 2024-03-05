package com.green.StudyRoom.board.controller;

import com.green.StudyRoom.board.service.BoardService;
import com.green.StudyRoom.board.vo.BoardVO;
import com.green.StudyRoom.member.service.MemberService;
import com.green.StudyRoom.member.vo.MemberVO;
import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.xml.crypto.KeySelector;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Controller
@RequestMapping("/board")
public class StudyRoomBoardController {
    @Resource(name="boardService")
    private BoardService boardService;
    @Resource(name = "memberService")
    private MemberService memberService;

    //메인 홈페이지
    @GetMapping("/mainHomepage")
    public String studyRoomBoard(){
        return "content/homepage/main_homepage" ;

    }

    //문의 홈페이지
    @GetMapping("/inquiry")
    public String studyRoomInquiry(Model model){
        List<BoardVO> boardList = boardService.selectBoard();

        model.addAttribute("boardList", boardList);
        return "content/homepage/inquiry_page";
    }

    //문의 글쓰기
    @GetMapping("/inquiryWriting")
    public String inquiryWriting(HttpSession session){
        MemberVO loginInfo = (MemberVO)session.getAttribute("loginInfo");

        return "content/homepage/inquiry_writing";
    }

    //글쓴 내용 저장
    @PostMapping("/inquiryWriting")
    public String insertWriting(BoardVO boardVO, HttpSession session){
        MemberVO loginInfo = (MemberVO)session.getAttribute("loginInfo");

        boardVO.setBoardWriter(loginInfo.getMemberId());
        boardService.insertBoard(boardVO);
        System.out.println(boardVO);
        return "redirect:/board/inquiry";
    }

    // 개인 정보 페이지로 이동
    @GetMapping("/personalInfo")
    public String myPage(HttpSession session){

        MemberVO loginInfo = (MemberVO)session.getAttribute("loginInfo");

        return "content/homepage/pers_info";
    }

    //login Check
    @ResponseBody
    @PostMapping("/loginCheck")
    public Map<String, Object> loginCheck(@RequestBody MemberVO memberVO){

        Map<String, Object> map = new HashMap<>();

        MemberVO loginInfo = memberService.login(memberVO);

        //Object nullInfo =  loginInfo == null ? "" : map.put("memberList" ,loginInfo);

        String nullInfo = "isLogin";

        if(loginInfo == null){
            nullInfo = "";
        }
        else{
            map.put("memberList" ,loginInfo);
        }

        map.put("nullInfo", nullInfo);

//        map.put("memberList", loginInfo);

        //null이면 빈문자 전송
        return map;
    }

    //마이페이지로 이동
    @GetMapping("/mainMyPage")
    public String mainMyPage(){

        return "content/homepage/main_myPage";
    }

    //개인 정보 수정
    @PostMapping("/updatePersInfo")
    public String updatePersInfo(MemberVO memberVO){

        boardService.updateMember(memberVO);
        return "redirect:/board/mainMyPage";
    }

    //오시는길
    @GetMapping("/wayToCome")
    public String wayToCome(){

        return "content/homepage/way_to_come";
    }

    //게시판 상세정보
    @GetMapping("/detailSelect")
    public String detailSelect(@RequestParam(name = "boardCode") int boardCode, Model model){

        BoardVO boardList = boardService.detailSelect(boardCode);

        model.addAttribute("boardList", boardList);

        return "content/homepage/detail_select";
    }
}
