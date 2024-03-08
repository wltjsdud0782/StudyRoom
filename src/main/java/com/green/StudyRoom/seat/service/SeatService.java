package com.green.StudyRoom.seat.service;

import com.green.StudyRoom.admin.vo.ChargeVO;
import com.green.StudyRoom.member.vo.ApprovalVO;
import com.green.StudyRoom.member.vo.MemberVO;
import com.green.StudyRoom.seat.vo.SeatVO;

import java.util.List;

public interface SeatService {
    
    // 좌석예약 조회
    List<SeatVO> seatList();
    SeatVO moveAndOut(int memberCode); // 예약 상태 좌석이동,퇴실 버튼 띄우기

    String haveCharge(int memberCode); // 구입한 이용권 유무

    // 입실
    void inSeat(SeatVO seatVO);

    // 퇴실
    void outSeat(SeatVO seatVO);

    // 자리이동
    void moveSeat(SeatVO seatVO);
    
    // 이용권 구입 화면
    List<ChargeVO> chargeList();

    ChargeVO chargeBuy(int chargeCode);

    // 카드 결제
    MemberVO selMem(int memberCode);
    int selectNextApprovalCode();

    // 카드 결제 성공
    void buyCard(ApprovalVO approvalVO);
}
