package com.green.StudyRoom.board.controller;

import com.green.StudyRoom.board.service.PagingService;
import com.green.StudyRoom.board.service.ReviewPagingService;
import com.green.StudyRoom.board.service.ReviewService;
import com.green.StudyRoom.board.vo.BoardVO;
import com.green.StudyRoom.board.vo.ReviewPageVO;
import com.green.StudyRoom.board.vo.ReviewVO;
import com.green.StudyRoom.board.vo.SearchVO;
import com.green.StudyRoom.member.vo.MemberVO;
import com.green.StudyRoom.member.vo.StudyRoomInOutVO;
import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpSession;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Controller
@RequestMapping("/review")
public class ReviewController {
    @Autowired
    private SqlSessionTemplate sqlSession;

    @Resource(name = "reviewService")
    private ReviewService reviewService;

    //리뷰
    @GetMapping("/review")
    public String review(@RequestParam(name = "pageNo", required = false, defaultValue = "4")int pageNo,
                         Model model, StudyRoomInOutVO inOutVO, HttpSession session, ReviewPageVO reviewPageVO){

        MemberVO loginInfo = (MemberVO)session.getAttribute("loginInfo");




        if(loginInfo != null){
            inOutVO.setMemberCode(loginInfo.getMemberCode());
            model.addAttribute("inoutList", reviewService.selectInout(inOutVO.getMemberCode()));
        }

        ReviewPagingService page = () -> sqlSession.selectOne("reviewMapper.selectReviewCnt");

        System.out.println("!!!!!!!" + reviewPageVO);
        System.out.println("@@@@@@@@@@@@@@@@@@@"+ page.selectReviewCnt());

        // 전체 데이터 수
        reviewPageVO.setTotalDateCnt(page.selectReviewCnt());

        //페이징 정보 세팅
        reviewPageVO.setPageInfo();
        System.out.println("#$!$!@#$!@$#!@$" + reviewPageVO.getEndPage());

        System.out.println("!!!!!!!!!!! " + reviewPageVO.getDisplayDateCnt() + "!!!!!!!!" + page.selectReviewCnt());

        List<ReviewVO> reviewList =reviewService.selectReview(reviewPageVO);
        reviewPageVO.setTotalDateCnt(reviewList.size());
//        reviewPageVO.setPageInfo();
        model.addAttribute("reviewList", reviewList);

        System.out.println("!!!!!!!!!!" + reviewList);
        model.addAttribute("pageNo",pageNo);
//        model.addAttribute("reviewPageVO", reviewPageVO);

        return "content/homepage/review";
    }

    @GetMapping("/writeReview")
    public String writeReview(Model model){

        return "content/homepage/writeReview";
    }

    @PostMapping("/writeReview")
    public String review(ReviewVO reviewVO, HttpSession session){
        System.out.println(reviewVO);

        MemberVO loginInfo = (MemberVO) session.getAttribute("loginInfo");
        reviewVO.setReviewWriter(loginInfo.getMemberId());

        reviewService.insertReview(reviewVO);
        return "redirect:/review/review";
    }
}
