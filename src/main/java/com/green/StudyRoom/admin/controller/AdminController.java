package com.green.StudyRoom.admin.controller;

import com.green.StudyRoom.admin.service.*;
import com.green.StudyRoom.admin.vo.ChargeVO;
import com.green.StudyRoom.admin.vo.InfoSearchVO;
import com.green.StudyRoom.admin.vo.LogViewVO;
import com.green.StudyRoom.admin.vo.MessageVO;
import com.green.StudyRoom.member.service.MemberServiceImpl;
import com.green.StudyRoom.member.vo.MemberVO;
import com.green.StudyRoom.seat.service.SeatServiceImpl;
import com.green.StudyRoom.seat.vo.SeatVO;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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


    //(회원 관리)///////////////////////////////////////////// //
    @RequestMapping("/info")
    public String adminInfo(Model model, InfoSearchVO infoSearchVO){
        //InfoSearchVO 검색기능
        List<MemberVO> memberList = adminService.selectMemberInfo(infoSearchVO);
        model.addAttribute("memberList", memberList);
        return "content/admin/admin_Info";
    }

    //회원정보 상세조회하기 (비동기)
    @ResponseBody
    @PostMapping("/changeInfo")
    public MemberVO selectMemberDetailInfo(@RequestParam(name="memberCode") int memberCode){
        MemberVO memberVO = adminService.selectMemberDetailInfo(memberCode);
        return memberVO;
    }

    //회원 좌석정보 상세조회하기 (비동기)
    @ResponseBody
    @PostMapping("/changeSeat")
    public SeatVO selectSeatDetailInfo(@RequestParam(name="memberCode") int memberCode){
        SeatVO seatVO = adminService.selectSeatDetailInfo(memberCode);
        return seatVO;
    }

    //회원정보/회원권한 업데이트
    @PostMapping("/uptMemberInfo")
    public String uptMemberInfo(MemberVO memberVO){
        adminService.uptMemberInfo(memberVO);
        return "redirect:/admin/info";
    }

    //(메세지)//////////////////////////////////////////////// //
    @RequestMapping("/msg")
    public String adminMessage(Model model, InfoSearchVO infoSearchVO){
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
    @GetMapping("/log")
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
