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
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("/review")
public class ReviewController {
    @Resource(name = "reviewService")
    private ReviewService reviewService;

    //리뷰
    @GetMapping("/review")
    public String review(@RequestParam(name = "pageNo", required = false, defaultValue = "4")int pageNo,
                        Model model, StudyRoomInOutVO inOutVO, HttpSession session){

        MemberVO loginInfo = (MemberVO)session.getAttribute("loginInfo");
        model.addAttribute("reviewList", reviewService.selectReview());



        if(loginInfo != null){
            inOutVO.setMemberCode(loginInfo.getMemberCode());
            model.addAttribute("inoutList", reviewService.selectInout(inOutVO.getMemberCode()));
        }
        model.addAttribute("pageNo",pageNo);

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
