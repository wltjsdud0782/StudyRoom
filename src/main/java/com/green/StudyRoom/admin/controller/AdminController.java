package com.green.StudyRoom.admin.controller;

import com.green.StudyRoom.admin.service.*;
import com.green.StudyRoom.admin.vo.ChargeVO;
import com.green.StudyRoom.admin.vo.InfoSearchVO;
import com.green.StudyRoom.admin.vo.MessageVO;
import com.green.StudyRoom.member.vo.MemberVO;
import com.green.StudyRoom.seat.service.SeatServiceImpl;
import com.green.StudyRoom.seat.vo.*;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.ArrayList;
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
    public String adminInfo(Model model, InfoSearchVO infoSearchVO,
                            @RequestParam(name = "pageNo", required = false, defaultValue = "2") int pageNo){
        //InfoSearchVO 검색기능
        List<MemberVO> memberList = adminService.selectMemberInfo(infoSearchVO);
        model.addAttribute("memberList", memberList);
        //쿠폰 리스트 보여주기
        List<CouponVO> couponList = chargeService.selectCoupon();
        model.addAttribute("couponList", couponList);
        model.addAttribute("pageNo", pageNo);
        return "content/admin/admin_Info";
    }

    //회원정보/좌석정보 조회하기
    @ResponseBody
    @PostMapping("/viewInfo")
    public Map<String, Object> viewInfo(@RequestParam(name="memberCode") int memberCode){
        Map<String, Object> map = new HashMap<>();
        map.put("couponList", chargeService.selectCoupon());
        map.put("memberMap", adminService.selectMemberDetailInfo(memberCode));
        map.put("seatMap", adminService.selectSeatDetailInfo(memberCode));
        map.put("couponMap", adminService.eachCoupon(memberCode));

        map.put("charName", seatService.haveCharge(memberCode));
        if (!seatService.haveCharge(memberCode).isEmpty()){
            map.put("charDate", adminService.chargeInfoDate(memberCode)); //이용날짜 보여주기
            map.put("buyDetail", seatService.myBuyDetail(memberCode)); //결재정보
            map.put("charRemDate", seatService.haveChargeRemainDate(memberCode)); //남은시간
            map.put("charEndDate", seatService.haveChargeEndDate(memberCode)); //만료시간
        }
        return map;
    }

    // 회원정보 업데이트
    @PostMapping("/uptMemberInfo")
    public String uptMemberInfo(MemberVO memberVO){
        adminService.uptMemberInfo(memberVO);
        return "redirect:/admin/info";
    }

    // 좌석정보 업데이트
    @PostMapping("/uptSeatInfo")
    public String uptSeatInfo(SeatVO seatVO){
        adminService.uptSeatInfo(seatVO);
        //사용중 이외엔 강제퇴실
        if(seatVO.getStatusNum() != 1){
            seatService.outSeat(seatVO);
        }
        return "redirect:/admin/info";
    }

    //쿠폰 지급
    @PostMapping("/sendCoupon")
    public String sendCoupon(@RequestParam(name="couponCode") List<Integer> cpCode, MemberCouponVO memberCouponVO){
        for (Integer integer : cpCode) {
            memberCouponVO.setCouponCode(integer);
            adminService.sendCoupon(memberCouponVO);
        }
        return "redirect:/admin/info";
    }

    //(메세지)//////////////////////////////////////////////// //
    @RequestMapping("/msg")
    public String adminMessage(Model model, InfoSearchVO infoSearchVO,
                               @RequestParam(name="receiver", required=false, defaultValue="") String receiver
                                , @RequestParam(name="memberCode", required=false, defaultValue="0") int memberCode,
                               @RequestParam(name = "pageNo", required = false, defaultValue = "3") int pageNo){
        //InfoSearchVO 검색기능
        model.addAttribute("msgList", messageService.selectWho(infoSearchVO));
        //메세지 보기 (처음엔 안보임)
        model.addAttribute("chtList", messageService.selectMessage(memberCode));
        //최근 메세지 보기(처음에만 보임)
        model.addAttribute("recList", messageService.selectRecentMsg());
        //메세지를 받은 사람의 이름
        model.addAttribute("receiver", receiver);
        model.addAttribute("memberCode", memberCode);
        model.addAttribute("pageNo", pageNo);
        return "content/admin/admin_message";
    }

    //채팅보낼 사람 정하기(비동기)
    @ResponseBody
    @PostMapping("/who")
    public Map<String, Object> selectMan(@RequestParam(name="memberCode") int memberCode){
        Map<String, Object> map = new HashMap<>();
        map.put("member", messageService.selectMan(memberCode));
        map.put("chtList", messageService.selectMessage(memberCode));
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
    public String adminSeat(@RequestParam(name = "pageNo", required = false, defaultValue = "4") int pageNo,
                            Model model){
        model.addAttribute("pageNo", pageNo);
        return "content/admin/admin_seat";
    }

    //좌석 변경
    @PostMapping("/changeStatus")
    public void changeStatus(@RequestParam(name = "seatNum") int seatNum, SeatVO seatVO){
        seatService.adminUpdateSeat(seatVO);
    }

    //(요금 변경)///////////////////////////////////////////// //
    @GetMapping("/charge")
    public String adminCharge(Model model,@RequestParam(name = "pageNo", required = false, defaultValue = "6") int pageNo){
        //요금제
        List<ChargeVO> chargeList = chargeService.selectCharge();
        model.addAttribute("chargeList", chargeList);
        //쿠폰
        List<CouponVO> couponList = chargeService.selectCoupon();
        model.addAttribute("couponList", couponList);
        model.addAttribute("pageNo",pageNo);
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
    public String adminLog(@RequestParam(name = "pageNo", required = false, defaultValue = "5") int pageNo,
                           Model model){
        //결재 기록
        model.addAttribute("appList", timeLogService.selectBuyList());
        //입퇴실 기록
        model.addAttribute("inotList", timeLogService.selectInOutList());
        //좌석상태 조회
        model.addAttribute("statusList", timeLogService.selectSeatStatusList());
        //보유 쿠폰 조회
        model.addAttribute("couponList", timeLogService.showCoupon());
        //페이지
        model.addAttribute("pageNo",pageNo);
        return "content/admin/admin_log";
    }

    //(매출 관리)///////////////////////////////////////////// //
    @RequestMapping("/sales")
    public String adminSales(Model model,@RequestParam(name = "pageNo", required = false, defaultValue = "7") int pageNo){
        model.addAttribute("yearCharge",salesService.chargeYearSales());
        model.addAttribute("monthCharge",salesService.chargeMonthSales());
        model.addAttribute("yearAgo",salesService.chargeYearAgo());
        model.addAttribute("monthAgo",salesService.chargeMonthAgo());
//        model.addAttribute("salesCharge",salesService.chargeSalesList());
//        model.addAttribute("chargeList", chargeService.selectCharge());
        model.addAttribute("pageNo",pageNo);
        return "content/admin/admin_sales";
    }

    //연 매출 막대 그래프
    @ResponseBody
    @PostMapping("/getYearChart")
    public List<SalesInfoVO> getYearChart(){
        //연간 매출
        List<SalesInfoVO> yearData =  salesService.yearSales();
        return yearData;
    }

    //종합 매출 막대 그래프
    @ResponseBody
    @PostMapping("/getMonthChart")
    public List<SalesInfoVO> getMonthChart(){
        //월별 매출
        List<SalesInfoVO> monthData = salesService.monthSales();
        return monthData;
    }

    //표 데이터
    @ResponseBody
    @PostMapping("/getTableData")
    public Map<String, Object> getTableData(){
        //요금 목록 조회
        List<ChargeVO> chargeList = chargeService.selectCharge();

        //실제 데이터
        List<Map<String, Object>> mapList = salesService.selectTableList(chargeList);

        //현재 월 기준 이전 1년치 월 데이터
        List<String> monthList = salesService.selectOneYearMonth();

        //매출 표
        List<String> chargeNameList = new ArrayList<>();
        for(ChargeVO e : chargeList){
            chargeNameList.add(e.getChargeName());
        }
        
        //Map에 담기
        Map<String, Object> finalData = new HashMap<>();
        finalData.put("chargeNameList", chargeNameList);
        finalData.put("mapList", mapList);
        finalData.put("monthList", monthList);

        return finalData;
    }


}
