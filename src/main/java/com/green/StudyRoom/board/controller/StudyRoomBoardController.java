package com.green.StudyRoom.board.controller;

import com.green.StudyRoom.admin.service.ChargeServiceImpl;
import com.green.StudyRoom.admin.vo.ChargeVO;
import com.green.StudyRoom.board.service.BoardService;
import com.green.StudyRoom.board.service.CommentService;
import com.green.StudyRoom.board.vo.BoardVO;
import com.green.StudyRoom.board.vo.CommentVO;
import com.green.StudyRoom.member.service.MemberService;
import com.green.StudyRoom.member.vo.MemberVO;
import com.green.StudyRoom.seat.service.SeatService;
import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.naming.Name;
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
    @Resource(name = "seatService")
    private SeatService seatService;

    //멤버
    @Resource(name = "memberService")
    private MemberService memberService;

    //관리자 문의 댓글
    @Resource(name = "commentService")
    private CommentService commentService;

    //요금제
    @Resource(name="chargeService")
    private ChargeServiceImpl chargeService;

    //메인 홈페이지
    @GetMapping("/mainHomepage")
    public String studyRoomBoard(HttpSession session){
        if (session.getAttribute("loginInfo") != null) {
            MemberVO loginInfo = (MemberVO) session.getAttribute("loginInfo");
            int memberCode = loginInfo.getMemberCode();

            if (seatService.haveCharge(memberCode) != null) { // 이용권을 가지고 있으면
                if (seatService.isExpires(memberCode).equals("만료일이 오늘보다 이전")){
                seatService.chargeDelete(memberCode);
                }
            }
        }

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

        List<CommentVO> commentList = commentService.selectComment(boardCode);

        model.addAttribute("boardList", boardList);
        model.addAttribute("commentList", commentList);

        return "content/homepage/detail_select";
    }

//    //관리자 답변 게시글 select
//    @ResponseBody
//    @PostMapping("/goDetailSelectAdmin")
//    public BoardVO goDetailSelectAdmin(@RequestBody BoardVO boardVO){
//
//        BoardVO boardList = boardService.detailSelect(boardVO.getBoardCode());
//
//        return boardList;
//    }

    @PostMapping("/adminAnswer")
    public String adminAnswer(CommentVO commentVO, HttpSession session){

        System.out.println(commentVO);

        MemberVO loginInfo = (MemberVO) session.getAttribute("loginInfo");

        //작성자 세션으로 가져와서 세팅.
        commentVO.setCommentWriter(loginInfo.getMemberId());

        //insert 겸 update
        commentService.adminAnswer(commentVO);

        return "redirect:/board/detailSelect";
    }

    // 매장 소개
    @GetMapping("/studyInfo")
    public String studyInfo(Model model){

        List<ChargeVO> chargeList = chargeService.selectCharge();
        model.addAttribute("chargeList", chargeList);

        List<BoardVO> boardList = boardService.selectPageInfo();
        model.addAttribute("boardList", boardList);

        return "content/homepage/studyInfo";
    }

}
