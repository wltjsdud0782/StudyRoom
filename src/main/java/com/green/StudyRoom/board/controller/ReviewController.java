package com.green.StudyRoom.board.controller;

import com.green.StudyRoom.board.service.ReviewService;
import com.green.StudyRoom.board.vo.ReviewVO;
import com.green.StudyRoom.member.vo.MemberVO;
import com.green.StudyRoom.member.vo.StudyRoomInOutVO;
import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/review")
public class ReviewController {
    @Resource(name = "reviewService")
    private ReviewService reviewService;

    //리뷰
    @GetMapping("/review")
    public String review(Model model, StudyRoomInOutVO inOutVO, HttpSession session){

        MemberVO loginInfo = (MemberVO)session.getAttribute("loginInfo");

        inOutVO.setMemberCode(loginInfo.getMemberCode());

        model.addAttribute("reviewList", reviewService.selectReview());
        model.addAttribute("inoutList", reviewService.selectInout(inOutVO.getMemberCode()));

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
