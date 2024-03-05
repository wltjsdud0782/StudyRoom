package com.green.StudyRoom.seat.controller;

import com.green.StudyRoom.admin.vo.ChargeVO;
import com.green.StudyRoom.member.service.MemberServiceImpl;
import com.green.StudyRoom.member.vo.MemberVO;
import com.green.StudyRoom.seat.service.SeatService;
import com.green.StudyRoom.seat.service.SeatServiceImpl;
import com.green.StudyRoom.seat.vo.SeatVO;
import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/seat")
public class SeatController {
    @Resource(name = "seatService")
    private SeatServiceImpl seatService;
    @Resource(name = "memberService")
    private MemberServiceImpl memberService;

    @GetMapping("/seatLive") // 좌석예약 눌렀을때
    public String seatLive(@RequestParam(name = "floor", required = false, defaultValue = "1")int floor
                        , Model model, HttpSession session){
        model.addAttribute("floor", floor);

        if (session.getAttribute("loginInfo") != null){
            MemberVO loginInfo = (MemberVO)session.getAttribute("loginInfo");
            int memberCode = loginInfo.getMemberCode();

            model.addAttribute("reservationMem", seatService.moveAndOut(memberCode));
        }

        return "content/seat/seat_live";
    }

    @ResponseBody
    @PostMapping("/seat1Floor") // 1층 버튼 눌렀을때
    public List<SeatVO> seatList1(){
        List<SeatVO> data = seatService.seatList();
        return data;
    }

    @ResponseBody
    @PostMapping("/seat2Floor") // 2층 버튼 눌렀을때
    public List<SeatVO> seat2Floor(){
        List<SeatVO> data = seatService.seatList();
        return data;
    }

    @GetMapping("/inSeat") // 예약하기 눌렀을때
    public String reservationSeat(HttpSession session, SeatVO seatVO){
        MemberVO loginInfo = (MemberVO)session.getAttribute("loginInfo");
        seatVO.setMemberVO(loginInfo);
        seatVO.setMemberCode(seatVO.getMemberVO().getMemberCode());

        seatService.inSeat(seatVO);
        return "redirect:/seat/seatLive";
    }

    @GetMapping("/outSeat")//퇴실하기 눌렀을때
    public String outSeat(HttpSession session, SeatVO seatVO){
        MemberVO loginInfo = (MemberVO)session.getAttribute("loginInfo");
        seatVO.setMemberVO(loginInfo);
        seatVO.setMemberCode(seatVO.getMemberVO().getMemberCode());

        seatService.outSeat(seatVO);
        return "redirect:/seat/seatLive";
    }

    @GetMapping("/chargeBuy") // 이용권구매 눌렀을때
    public String chargeBuy(Model model){
        model.addAttribute("chargeList",seatService.chargeList());
        return "/content/seat/charge_buy";
    }

    @ResponseBody
    @PostMapping("buyDetail") // 이용권 상품 눌렀을때
    public ChargeVO buyDetail(@RequestParam(name = "chargeCode")int chargeCode){
        return seatService.chargeBuy(chargeCode);
    }
}
