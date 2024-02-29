package com.green.StudyRoom.admin.controller;

import com.green.StudyRoom.admin.service.AdminServiceImpl;
import com.green.StudyRoom.admin.vo.ChargeVO;
import com.green.StudyRoom.admin.vo.MessageVO;
import com.green.StudyRoom.member.service.MemberServiceImpl;
import com.green.StudyRoom.seat.service.SeatServiceImpl;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/admin")
public class AdminController {
    @Resource(name="adminService")
    private AdminServiceImpl adminService;
//    @Resource(name="memberService")
//    private MemberServiceImpl memberService;
//    @Resource(name="seatService")
//    private SeatServiceImpl seatService;

    //(회원 관리)///////////////////////////////////////////// //
    @GetMapping("/info")
    public String adminInfo(){
        return "content/admin/admin_Info";
    }

    //(메세지)//////////////////////////////////////////////// //
    @GetMapping("/msg")
    public String adminMessage(){
        return "content/admin/admin_message";
    }

    @PostMapping("/sendMsg")
    public String sendMessage(MessageVO messageVO){
        adminService.insertMessage(messageVO);
        System.out.println(messageVO);
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
        List<ChargeVO> chargeList = adminService.selectCharge();
        model.addAttribute("chargeList", chargeList);
        return "content/admin/admin_charge";
    }

    // 요금 등록하기
    @PostMapping("/setCharge")
    public String setCharge(ChargeVO chargeVO){
        adminService.insertCharge(chargeVO);
        return "redirect:/admin/charge";
    }

    // 요금 변경 조회하기 (비동기, fetch1)
    @ResponseBody
    @PostMapping("/getCharge")
    public ChargeVO changeCharge(@RequestParam(name = "chargeCode") int chargeCode){
        //Charge의 List 받아오기
        ChargeVO chargeVO = adminService.getCharge(chargeCode);
        return chargeVO;
    }

    // 요금 변경사항 업데이트
    @PostMapping("/uptCharge")
    public String uptCharge(ChargeVO chargeVO){
        //Charge의 List 받아오기
        adminService.uptCharge(chargeVO);
        return "redirect:/admin/charge";
    }

    // 요금 삭제하기
    @GetMapping("/delCharge")
    public String delCharge(ChargeVO chargeVO){
        adminService.delCharge(chargeVO);
        return "redirect:/admin/charge";
    }

    //(로그 확인)///////////////////////////////////////////// //
    @GetMapping("/log")
    public String adminLog(){
        return "content/admin/admin_log";
    }

    //(매출 관리)///////////////////////////////////////////// //
    @GetMapping("/sales")
    public String adminSales(){
        return "content/admin/admin_sales";
    }

    // ////////////////////////////////////////////////////// //
    // ////////////////////////////////////////////////////// //

}
