package com.green.StudyRoom.seat.service;

import com.green.StudyRoom.admin.vo.ChargeVO;
import com.green.StudyRoom.admin.vo.MessageVO;
import com.green.StudyRoom.member.vo.ApprovalVO;
import com.green.StudyRoom.member.vo.MemberVO;
import com.green.StudyRoom.member.vo.StudyRoomInOutVO;
import com.green.StudyRoom.seat.vo.CouponVO;
import com.green.StudyRoom.seat.vo.MemberCouponVO;
import com.green.StudyRoom.seat.vo.SeatVO;

import java.util.List;

public interface SeatService {
    
    // 좌석예약 조회
    List<SeatVO> seatList();
    SeatVO moveAndOut(int memberCode); // 예약 상태 좌석 이동,퇴실 버튼 띄우기

    List<StudyRoomInOutVO> inOutTime(int memberCode); // 입퇴실 시간

    // 이용권 관련
    String haveCharge(int memberCode); // 구매한 이용권 유무
    String haveChargeApprovalDate(int memberCode); // 구매한 이용권의 결제일
    int haveChargeDate(int memberCode); // 구매한 이용권의 이용 가능 일 수
    String haveChargeEndDate(int memberCode); // 구매한 이용권의 끝나는 날짜
    int haveChargeRemainDate(int memberCode); // 구매한 이용권의 남은 일 수
    String today();
//    String isExpires(int memberCode);
    void chargeDelete(int memberCode);

    // 입실
    void inSeat(SeatVO seatVO);

    // 퇴실
    void outSeat(SeatVO seatVO);

    // 자리이동
    void moveSeat(SeatVO seatVO);
    
    // 이용권 상품 목록
    List<ChargeVO> chargeList();

    // 이용권 상품 하나의 정보
    ChargeVO chargeBuy(int chargeCode);

    // 카드 결제
    MemberVO selMem(int memberCode);
    String buyToday(); // 주문번호 만들기

    // 카드 결제 성공
    void buyCard(ApprovalVO approvalVO);

    // 관리자
    void adminUpdateSeat(SeatVO seatVO);

    // 마이페이지 이용권
    ApprovalVO myBuyDetail(int memberCode);

    // 쿠폰 관련
    List<CouponVO> coupon(); // admin 관련
    List<MemberCouponVO> ownCoupon(int memberCode);

    void deleteCoupon(int ownCouponCode);

    // 채팅
    List<MessageVO> userMsg(int memberCode);
    void userSend(MessageVO messageVO);

}
