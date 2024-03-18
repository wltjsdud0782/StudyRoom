package com.green.StudyRoom.admin.controller;

import com.green.StudyRoom.admin.service.*;
import com.green.StudyRoom.admin.vo.ChargeVO;
import com.green.StudyRoom.admin.vo.InfoSearchVO;
import com.green.StudyRoom.admin.vo.LogViewVO;
import com.green.StudyRoom.admin.vo.MessageVO;
import com.green.StudyRoom.member.service.MemberServiceImpl;
import com.green.StudyRoom.member.vo.ApprovalVO;
import com.green.StudyRoom.member.vo.MemberVO;
import com.green.StudyRoom.seat.service.SeatServiceImpl;
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
    @Resource(name="logViewService")
    private LogViewServiceImpl logViewService;
    //좌석관리
    @Resource(name="seatService")
    private SeatServiceImpl seatService;

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
    public String adminMessage(Model model, InfoSearchVO infoSearchVO){
        //채팅 목록
        List<MessageVO> chtList = messageService.selectMessage();
        model.addAttribute("chtList", chtList);
        //InfoSearchVO 검색기능
        List<MemberVO> msgList = messageService.selectWho(infoSearchVO);
        model.addAttribute("msgList", msgList);
        return "content/admin/admin_message";
    }

    //채팅보낼 사람 정하기 (비동기)
    @ResponseBody
    @PostMapping("/who")
    public MemberVO selectMan(@RequestParam(name="memberCode") int memberCode){
        MemberVO member = messageService.selectMan(memberCode);
        return member;
    }

    //채팅 보내기
    @PostMapping("/sendAdmMsg")
    public String sendMessage(MessageVO messageVO){
        messageService.insertAdmMsg(messageVO);
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
        List<ChargeVO> chargeList = chargeService.selectCharge();
        model.addAttribute("chargeList", chargeList);
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
    public ChargeVO changeCharge(@RequestParam(name = "chargeCode") int chargeCode){
        //Charge의 List 받아오기
        ChargeVO chargeVO = chargeService.getCharge(chargeCode);
        return chargeVO;
    }

    // 요금 변경사항 업데이트
    @PostMapping("/uptCharge")
    public String uptCharge(ChargeVO chargeVO){
        //Charge의 List 받아오기
        chargeService.uptCharge(chargeVO);
        return "redirect:/admin/charge";
    }

    // 요금 삭제하기
    @GetMapping("/delCharge")
    public String delCharge(@RequestParam(name="chargeCode") int chargeCode){
        chargeService.delCharge(chargeCode);
        System.out.println("@"+chargeCode);
        return "redirect:/admin/charge";
    }

    //(로그 확인)///////////////////////////////////////////// //
    @RequestMapping ("/log")
    public String adminLog(Model model, MemberVO memberVO){
        //현재 들어가있는 데이터가 없음
        List<LogViewVO> logList = logViewService.selectAllLog(memberVO);
        model.addAttribute("logList", logList);
        return "content/admin/admin_log";
    }

    //(매출 관리)///////////////////////////////////////////// //
    @GetMapping("/sales")
    public String adminSales(){
        return "content/admin/admin_sales";
    }



}
