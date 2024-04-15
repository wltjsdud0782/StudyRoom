package com.green.StudyRoom.seat.controller;

import com.green.StudyRoom.admin.vo.ChargeVO;
import com.green.StudyRoom.member.service.MemberServiceImpl;
import com.green.StudyRoom.member.vo.ApprovalVO;
import com.green.StudyRoom.member.vo.MemberVO;
import com.green.StudyRoom.seat.service.SeatService;
import com.green.StudyRoom.seat.service.SeatServiceImpl;
import com.green.StudyRoom.seat.vo.MemberCouponVO;
import com.green.StudyRoom.seat.vo.SeatVO;
import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/seat")
public class SeatController {
    @Resource(name = "seatService")
    private SeatServiceImpl seatService;
    @Resource(name = "memberService")
    private MemberServiceImpl memberService;

    @GetMapping("/seatLive") // 좌석선택 눌렀을때
    public String seatLive(@RequestParam(name = "floor", required = false, defaultValue = "1")int floor
                        , Model model, HttpSession session){
        model.addAttribute("floor", floor);

        if (session.getAttribute("loginInfo") != null){
            MemberVO loginInfo = (MemberVO)session.getAttribute("loginInfo");
            int memberCode = loginInfo.getMemberCode();

            model.addAttribute("reservationMem", seatService.moveAndOut(memberCode));
            model.addAttribute("haveCharge", seatService.haveCharge(memberCode));
            if (!seatService.haveCharge(memberCode).isEmpty()) { // 이용권을 가지고 있으면
                model.addAttribute("remainDate", seatService.haveChargeRemainDate(memberCode));
                model.addAttribute("endDate", seatService.haveChargeEndDate(memberCode));
            }

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

    @ResponseBody
    @PostMapping("/adminSeat") // 관리자전용 좌석현황
    public List<SeatVO> adminSeat(){
        List<SeatVO> data = seatService.adminSeatList();
        return data;
    }

    @ResponseBody
    @PostMapping("/adminSeatMove") // 관리자 좌석이동 모달 조회
    public Map<String, Object> adminSeatMove(@RequestBody Map<String, String> map){
        Map<String, Object> data = new HashMap<>();

        MemberVO mem = seatService.adminSeatMem(Integer.parseInt(map.get("memberCode")));
        List<SeatVO> floor = seatService.adminSeatFloor();
        if (Integer.parseInt(map.get("seatFloor")) == 0){
            List<SeatVO> num = seatService.adminSeatNum(1);
            data.put("num", num);
            data.put("resultFloor", 1);
        }
        else {
            List<SeatVO> num = seatService.adminSeatNum(Integer.parseInt(map.get("seatFloor")));
            data.put("num", num);
            data.put("resultFloor", map.get("seatFloor"));
        }
        data.put("mem", mem);
        data.put("floor", floor);

        return data;
    }

    @ResponseBody
    @PostMapping("/adminSeatMoveSuccess") // 관리자 좌석이동 실행
    public void adminSeatMoveSuccess(@RequestBody Map<String, String> map){
        SeatVO seatVO = new SeatVO();
        seatVO.setMemberCode(Integer.parseInt(map.get("memberCode")));
        seatVO.setSeatNum(Integer.parseInt(map.get("seatNum")));

        seatService.outSeat(seatVO);
        seatService.inSeat(seatVO);
    }

    @ResponseBody
    @PostMapping("/adminSeatOut")
    public void adminSeatOut(@RequestParam(name = "memberCode")int memberCode){
        SeatVO seatVO = new SeatVO();
        seatVO.setMemberCode(memberCode);
        seatService.outSeat(seatVO);
    }

    @GetMapping("/inSeat") // 입실하기 눌렀을때
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

    @GetMapping("/moveSeat") // 자리이동 눌렀을때
    public String moveSeat(HttpSession session, SeatVO seatVO){
        MemberVO loginInfo = (MemberVO)session.getAttribute("loginInfo");
        seatVO.setMemberVO(loginInfo);
        seatVO.setMemberCode(seatVO.getMemberVO().getMemberCode());

        seatService.moveSeat(seatVO);
        return "redirect:/seat/seatLive";
    }

    @GetMapping("/chargeBuy") // 이용권구매 눌렀을때
    public String chargeBuy(HttpSession session, Model model){
        model.addAttribute("chargeList",seatService.chargeList());

        MemberVO loginInfo = (MemberVO)session.getAttribute("loginInfo");
        int memberCode = loginInfo.getMemberCode();
        model.addAttribute("haveCharge", seatService.haveCharge(memberCode));

        return "/content/seat/charge_buy";
    }

    @ResponseBody
    @PostMapping("/buyDetail") // 이용권 상품 눌렀을때
    public Map<String, Object> buyDetail(@RequestParam(name = "chargeCode")int chargeCode, @RequestParam(name = "memberCode")int memberCode){
        Map<String, Object> a = new HashMap<String, Object>();
        a.put("chargeBuy", seatService.chargeBuy(chargeCode));
        a.put("ownCouponList", seatService.ownCoupon(memberCode));
        return a;
    }

    @ResponseBody
    @PostMapping("/buyCard") // 카드 구매 눌렀을때
    public Map<String, Object> buyCard(@RequestParam (name = "chargeCode")int chargeCode, @RequestParam(name = "memberCode")int memberCode){
        MemberVO buyMem = seatService.selMem(memberCode);
        ChargeVO buyOne = seatService.chargeBuy(chargeCode);

        Map<String, Object> buyInfo = new HashMap<String, Object>();
        buyInfo.put("buyMem", buyMem);
        buyInfo.put("buyOne", buyOne);
        int buyCode = (int)(Math.random()*10000000+1);
        buyInfo.put("merchant_uid", buyCode);

        return buyInfo;
    }

    @ResponseBody
    @PostMapping("/buySuccess")
    public void buySuccess(@RequestBody HashMap<String, String> data){
        ApprovalVO approvalVO = new ApprovalVO();
        approvalVO.setApprovalCode(Integer.parseInt(data.get("approvalCode")));
        approvalVO.setApprovalFee(Integer.parseInt(data.get("approvalFee")));
        approvalVO.setMemberCode(Integer.parseInt(data.get("memberCode")));
        approvalVO.setChargeCode(Integer.parseInt(data.get("chargeCode")));
        approvalVO.setCouponUse((String)data.get("couponUse"));
        int result = Integer.parseInt(data.get("ownCouponCode"));

        seatService.buyCard(approvalVO);
        if (result != 0){
            seatService.deleteCoupon(result);
        }
    }

}
