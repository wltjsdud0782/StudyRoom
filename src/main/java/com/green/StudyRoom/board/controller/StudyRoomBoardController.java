package com.green.StudyRoom.board.controller;

import com.green.StudyRoom.admin.service.ChargeServiceImpl;
import com.green.StudyRoom.admin.service.MessageServiceImpl;
import com.green.StudyRoom.admin.vo.ChargeVO;
import com.green.StudyRoom.admin.vo.MessageVO;
import com.green.StudyRoom.board.service.*;
import com.green.StudyRoom.board.vo.BoardVO;
import com.green.StudyRoom.board.vo.CommentVO;
import com.green.StudyRoom.board.vo.ImgVO;
import com.green.StudyRoom.board.vo.SearchVO;
import com.green.StudyRoom.member.service.MemberService;
import com.green.StudyRoom.member.vo.MemberVO;
import com.green.StudyRoom.seat.service.SeatService;
import com.green.StudyRoom.seat.vo.SeatVO;
import com.green.StudyRoom.util.ImgUploadUtil;
import jakarta.annotation.Resource;
import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.http.HttpSession;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.liquibase.LiquibaseProperties;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.thymeleaf.spring6.processor.SpringInputCheckboxFieldTagProcessor;

import javax.naming.Name;
import javax.xml.crypto.KeySelector;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Controller
@RequestMapping("/board")
public class StudyRoomBoardController {
    @Autowired
    private SqlSessionTemplate sqlSession;

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

            SeatVO seatVO = new SeatVO();
            seatVO.setMemberCode(memberCode);

            if (!seatService.haveCharge(memberCode).isEmpty()) { // 이용권을 가지고 있으면
                if((seatService.haveChargeRemainDate(memberCode) <= 0) && (seatService.moveAndOut(memberCode) != null)){ // 자리가 있는 상태로 이용권이 만료 되었을 때
                        seatService.outSeat(seatVO);
                        seatService.chargeDelete(memberCode);
                }
                else if (seatService.haveChargeRemainDate(memberCode) <= 0){ // 자리는 없고 이용권이 만료 되었을 때
                seatService.chargeDelete(memberCode);
                }
            }
        }

        return "content/homepage/main_homepage" ;

    }


    //문의 홈페이지
    @RequestMapping("/inquiry")
    public String studyRoomInquiry(Model model, SearchVO searchVO,@RequestParam(name = "isSearch", required = false ,defaultValue = "0")int isSearch){

        //페이징처리 interface
        PagingService page = () -> sqlSession.selectOne("boardMapper.selectBoardCnt");

        System.out.println("!!!!!!!" + searchVO);

        // 전체 데이터 수
        searchVO.setTotalDateCnt(page.selectBoardCnt());

        //페이징 정보 세팅
        searchVO.setPageInfo();

        System.out.println("!!!!!!!!!!! " + searchVO.getDisplayDateCnt() + "!!!!!!!!" + page.selectBoardCnt());

        List<BoardVO> boardList = boardService.selectBoard(searchVO);
        if(isSearch == 1){
            searchVO.setTotalDateCnt(boardList.size());
            searchVO.setPageInfo();
            if(searchVO.getTotalDateCnt() == 0){
                isSearch = 2;
            }
            model.addAttribute("isSearch",isSearch);
        }


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
//    @PostMapping("/inquiryWriting")
//    public String insertWriting(BoardVO boardVO, HttpSession session){
//        MemberVO loginInfo = (MemberVO)session.getAttribute("loginInfo");
//
//        boardVO.setBoardWriter(loginInfo.getMemberId());
//        boardService.insertBoard(boardVO);
//        System.out.println(boardVO);
//        return "redirect:/board/inquiry";
//    }

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

        System.out.println(boardList);

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

        return "redirect:/board/detailSelect?boardCode=" + commentVO.getBoardCode();
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

    // 내 이용권/쿠폰
    @GetMapping("/myBuyDetail")
    public String myBuyDetail(Model model, HttpSession session){
        MemberVO loginInfo = (MemberVO)session.getAttribute("loginInfo");
        int memberCode = loginInfo.getMemberCode();

        model.addAttribute("haveCharge", seatService.haveCharge(memberCode));
        if (!seatService.haveCharge(memberCode).isEmpty()) { // 이용권을 가지고 있으면
            model.addAttribute("buyDetailInfo", seatService.myBuyDetail(memberCode));
            model.addAttribute("remainDate", seatService.haveChargeRemainDate(memberCode));
            model.addAttribute("endDate", seatService.haveChargeEndDate(memberCode));
        }
        model.addAttribute("ownCouponList", seatService.ownCoupon(memberCode));
        return "content/homepage/myBuyDetail";
    }

    // 내 입실조회
    @GetMapping("/mySeat")
    public String mySeat(HttpSession session, Model model){
        MemberVO loginInfo = (MemberVO)session.getAttribute("loginInfo");
        int memberCode = loginInfo.getMemberCode();

        model.addAttribute("reservationMem", seatService.moveAndOut(memberCode));
        model.addAttribute("inoutTime", seatService.inOutTime(memberCode));

        return "content/homepage/mySeat";
    }

    //내가 쓴글 확인
    @GetMapping("/myWriting")
    public String myWriting (HttpSession session, Model model){

        MemberVO loginInfo = (MemberVO) session.getAttribute("loginInfo");

        List<BoardVO> boardList = boardService.selectMyPage(loginInfo.getMemberId());
        model.addAttribute("boardList", boardList);
        System.out.println(boardList);
        return "content/homepage/myWriting";
    }

    // 카운터 채팅
    @GetMapping("/myCounter")
    public String myCounter(HttpSession session, Model model){
        MemberVO loginInfo = (MemberVO)session.getAttribute("loginInfo");
        int memberCode = loginInfo.getMemberCode();

        model.addAttribute("msgList", seatService.userMsg(memberCode));
        return "content/homepage/my_counter";
    }

    @ResponseBody
    @PostMapping("/sendCounter")
    public List<MessageVO> sendCounter(@RequestBody Map<String, String> data){
        System.out.println(data);
        MessageVO messageVO = new MessageVO();
        messageVO.setMemberCode(Integer.parseInt(data.get("memberCode")));
        messageVO.setMessageContent(data.get("messageContent"));

        seatService.userSend(messageVO);

        return seatService.userMsg(Integer.parseInt(data.get("memberCode")));
    }

    //상세정보
    @GetMapping("/deleteBoard")
    public String deleteBoard(@RequestParam(name = "boardCode") int boardCode){

        boardService.deleteBoard(boardCode);

        return "redirect:/board/myWriting";
    }

    //이미지 업로드 컨트롤러
    @PostMapping("/inquiryWriting")
    @Transactional(rollbackFor = Exception.class)
    public String insertWriting(BoardVO boardVO, @RequestParam(name= "file")MultipartFile[] boardImg
                                , HttpSession session){

        //로그인 회원의 아이디 정보
        MemberVO loginInfo = (MemberVO)session.getAttribute("loginInfo");
        boardVO.setBoardWriter(loginInfo.getMemberId());

        //파일 첨부 실행
        //첨부 파일이 없으면 imgList는 데이터가 없음.
        List<ImgVO> imgList = ImgUploadUtil.multiUploadFile(boardImg);

        //다음에 insert 할 boardCode
        SelectNextService selectCode = () -> sqlSession.selectOne("imgMapper.selectNextBoardCode");
        int boardCode = selectCode.selectNextBoardCode();

        //boardVO에 boardCode값 세팅
        boardVO.setBoardCode(boardCode);

        for(ImgVO img : imgList){
            img.setImgCode(boardCode);
        }

        boardVO.setImgList(imgList);

        boardService.insertBoard(boardVO);
        return "redirect:/board/inquiry";
    }


}