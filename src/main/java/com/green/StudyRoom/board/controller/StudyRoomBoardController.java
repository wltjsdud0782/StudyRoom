package com.green.StudyRoom.board.controller;

import com.green.StudyRoom.board.service.BoardService;
import com.green.StudyRoom.board.vo.BoardVO;
import com.green.StudyRoom.member.vo.MemberVO;
import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/board")
public class StudyRoomBoardController {
    @Resource(name="boardService")
    private BoardService boardService;

    //메인 홈페이지
    @GetMapping("/mainHomepage")
    public String studyRoomBoard(){
        return "content/homepage/main_homepage" ;

    }

    //문의 홈페이지
    @GetMapping("/inquiry")
    public String studyRoomInquiry(){

        return "content/homepage/inquiry_page";
    }

    //문의 글쓰기
    @GetMapping("/inquiryWriting")
    public String inquiryWriting(){
        return "content/homepage/inquiry_writing";
    }

    //글쓴 내용 저장
    @PostMapping("/inquiryWriting")
    public String insertWriting(BoardVO boardVO, HttpSession session){
        MemberVO loginInfo = (MemberVO)session.getAttribute("loginIngo");

        boardVO.setBoardWriter(loginInfo.getMemberId());
        boardService.insertBoard(boardVO);
        return "redirect:/inquiry";
    }
}
