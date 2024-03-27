package com.green.StudyRoom.admin.controller;

import com.green.StudyRoom.admin.service.*;
import com.green.StudyRoom.admin.vo.ChargeVO;
import com.green.StudyRoom.admin.vo.InfoSearchVO;
import com.green.StudyRoom.admin.vo.MessageVO;
import com.green.StudyRoom.member.vo.MemberVO;
import com.green.StudyRoom.seat.service.SeatServiceImpl;
import com.green.StudyRoom.seat.vo.CouponVO;
import com.green.StudyRoom.seat.vo.SeatVO;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/admin")
public class AdminController {

    //회원관리
    @Resource(name="adminService")
    private AdminServiceImpl adminService;
    //요금관리
    @Resource(name="chargeService")
    private ChargeServiceImpl chargeService;
    //채팅관리
    @Resource(name="messageService")
    private MessageServiceImpl messageService;
    //로그확인
    @Resource(name="timeLogService")
    private TimeLogServiceImpl timeLogService;
    //좌석관리
    @Resource(name="seatService")
    private SeatServiceImpl seatService;
    //매출관리
    @Resource(name="salesService")
    private SalesServiceImpl salesService;

    //(회원 관리)///////////////////////////////////////////// //
    @RequestMapping("/info")
    public String adminInfo(Model model, InfoSearchVO infoSearchVO){
        //InfoSearchVO 검색기능
        List<MemberVO> memberList = adminService.selectMemberInfo(infoSearchVO);
        model.addAttribute("memberList", memberList);
        return "content/admin/admin_Info";
    }

    //회원정보/좌석정보 조회하기
    @ResponseBody
    @PostMapping("/viewInfo")
    public Map<String, Object> viewInfo(@RequestParam(name="memberCode") int memberCode){
        MemberVO memberMap = adminService.selectMemberDetailInfo(memberCode);
        SeatVO seatMap = adminService.selectSeatDetailInfo(memberCode);
        Map<String, Object> map = new HashMap<>();
        map.put("memberMap", memberMap);
        map.put("seatMap", seatMap);
        return map;
    }

    //회원정보/좌석정보 업데이트
    @PostMapping("/uptInfo")
    public String uptAllInfo(MemberVO memberVO, SeatVO seatVO){
        adminService.uptMemberInfo(memberVO);
        adminService.uptSeatInfo(seatVO);
        return "redirect:/admin/info";
    }

    //좌석의 시간정보 불러오기
    @ResponseBody
    @PostMapping("/viewDate")
    public Map<String, Object> viewDate(@RequestParam(name="memberCode") int memberCode){
        Map<String, Object> map = new HashMap<>();
        map.put("charName", seatService.haveCharge(memberCode));
        map.put("charDate", seatService.haveChargeDate(memberCode));
        map.put("charAppDate", seatService.haveChargeApprovalDate(memberCode));
        map.put("charRemDate", seatService.haveChargeRemainDate(memberCode));
        map.put("charEndDate", seatService.haveChargeEndDate(memberCode));
        return map;
    }

    //(메세지)//////////////////////////////////////////////// //
    @RequestMapping("/msg")
    public String adminMessage(Model model, InfoSearchVO infoSearchVO,
                               @RequestParam(name="receiver", required=false, defaultValue="") String receiver
                                , @RequestParam(name="memberCode", required=false, defaultValue="0") int memberCode){
        //InfoSearchVO 검색기능
        model.addAttribute("msgList", messageService.selectWho(infoSearchVO));

        model.addAttribute("chtList", messageService.selectMessage(memberCode));

        //메세지를 받은 사람의 이름
        model.addAttribute("receiver", receiver);
        model.addAttribute("memberCode", memberCode);

        return "content/admin/admin_message";
    }

    //채팅보낼 사람 정하기 (비동기)
    @ResponseBody
    @PostMapping("/who")
    public  Map<String, Object> selectMan(@RequestParam(name="memberCode") int memberCode){
        Map<String, Object> map = new HashMap<>();
        //고른 사람
        MemberVO member = messageService.selectMan(memberCode);
        //채팅 목록
        List<MessageVO> chtList = messageService.selectMessage(memberCode);
        map.put("member",member);
        map.put("chtList", chtList);
        return map;
    }

    //채팅 보내기
    @PostMapping("/sendAdmMsg")
    public String sendMessage(MessageVO messageVO ,
                              @RequestParam(name="receiver") String receiver, RedirectAttributes redirectAttributes
                            , @RequestParam(name="memberCode") int memberCode)
    {
        messageService.insertAdmMsg(messageVO);
        redirectAttributes.addAttribute("receiver", receiver);
        redirectAttributes.addAttribute("memberCode", memberCode);
        return "redirect:/admin/msg";
    }

    //(좌석 관리)///////////////////////////////////////////// //
    @GetMapping("/seat")
    public String adminSeat(){
        return "content/admin/admin_seat";
    }

    //(요금 변경)///////////////////////////////////////////// //
    @GetMapping("/charge")
    public String adminCharge(Model model){
        //요금제
        List<ChargeVO> chargeList = chargeService.selectCharge();
        model.addAttribute("chargeList", chargeList);
        //쿠폰
        List<CouponVO> couponList = chargeService.selectCoupon();
        model.addAttribute("couponList", couponList);
        return "content/admin/admin_charge";
    }

    // 요금 등록하기
    @PostMapping("/setCharge")
    public String setCharge(ChargeVO chargeVO){
        chargeService.insertCharge(chargeVO);
        return "redirect:/admin/charge";
    }

    // 요금 변경 조회하기 (비동기, fetch1)
    @ResponseBody
    @PostMapping("/getCharge")
    public ChargeVO changeCharge(@RequestParam(name="chargeCode") int chargeCode){
        //Charge의 List 받아오기
        ChargeVO chargeVO = chargeService.getCharge(chargeCode);
        return chargeVO;
    }

    // 요금 변경사항 업데이트
    @PostMapping("/uptCharge")
    public String uptCharge(ChargeVO chargeVO){
        //Charge의 List 업데이트
        chargeService.uptCharge(chargeVO);
        return "redirect:/admin/charge";
    }

    // 요금 삭제하기
    @GetMapping("/delCharge")
    public String delCharge(@RequestParam(name="chargeCode") int chargeCode){
        chargeService.delCharge(chargeCode);
        return "redirect:/admin/charge";
    }

    //쿠폰 등록하기
    @PostMapping("/setCoupon")
    public String setCoupon(CouponVO couponVO){
        chargeService.insertCoupon(couponVO);
        return "redirect:/admin/charge";
    }

    //쿠폰 변경 조회하기
    @ResponseBody
    @PostMapping("/getCoupon")
    public CouponVO changeCoupon(@RequestParam(name="couponCode") int couponCode){
        //Coupon의 List 받아오기
        CouponVO couponVO = chargeService.getCoupon(couponCode);
        return couponVO;
    }

    // 쿠폰 변경사항 업데이트
    @PostMapping("/uptCoupon")
    public String uptCoupon(CouponVO couponVO){
        //Coupon의 List 업데이트
        chargeService.uptCoupon(couponVO);
        return "redirect:/admin/charge";
    }

    //쿠폰 삭제하기
    @GetMapping("/delCoupon")
    public String delCoupon(@RequestParam(name="couponCode") int couponCode){
        chargeService.delCoupon(couponCode);
        return "redirect:/admin/charge";
    }

    //(로그 확인)///////////////////////////////////////////// //
    @RequestMapping ("/log")
    public String adminLog(Model model){
        //결재 기록
        model.addAttribute("appList", timeLogService.selectBuyList());
        //예약 기록
        model.addAttribute("resList", timeLogService.selectReserveList());
        //입퇴실 기록
        model.addAttribute("inotList", timeLogService.selectInOutList());
        //좌석상태 조회
        model.addAttribute("statusList", timeLogService.selectSeatStatusList());
        return "content/admin/admin_log";
    }

    //(매출 관리)///////////////////////////////////////////// //
    @GetMapping("/sales")
    public String adminSales(Model model){
        model.addAttribute("salesList", salesService.selectSales());
        model.addAttribute("sumAll", salesService.salesSum());
        return "content/admin/admin_sales";
    }



}
