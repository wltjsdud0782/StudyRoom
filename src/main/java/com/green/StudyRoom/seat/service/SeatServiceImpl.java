package com.green.StudyRoom.seat.service;

import com.green.StudyRoom.admin.vo.ChargeVO;
import com.green.StudyRoom.admin.vo.MessageVO;
import com.green.StudyRoom.member.vo.ApprovalVO;
import com.green.StudyRoom.member.vo.MemberVO;
import com.green.StudyRoom.member.vo.StudyRoomInOutVO;
import com.green.StudyRoom.seat.vo.CouponVO;
import com.green.StudyRoom.seat.vo.MemberCouponVO;
import com.green.StudyRoom.seat.vo.SeatVO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service("seatService")
public class SeatServiceImpl implements SeatService{
    @Autowired
    private SqlSessionTemplate sqlSession;

    @Override // 좌석예약 조회
    public List<SeatVO> seatList() {
        return sqlSession.selectList("seatMapper.seatList");
    }

    @Override // 예약되어있는 상태로 좌석예약 조회
    public SeatVO moveAndOut(int memberCode) {
        return sqlSession.selectOne("seatMapper.moveAndOut", memberCode);
    }

    @Override // 입퇴실 시간
    public List<StudyRoomInOutVO> inOutTime(int memberCode) {
        return sqlSession.selectList("seatMapper.inOutTime", memberCode);
    }

    @Override // 구매한 이용권 유무
    public List<ApprovalVO> haveCharge(int memberCode) {
        return sqlSession.selectList("seatMapper.haveCharge", memberCode);
    }

    @Override // 결제일
    public List<ApprovalVO> haveChargeApprovalDate(int memberCode) {
        return sqlSession.selectList("seatMapper.haveChargeApprovalDate", memberCode);
    }

    @Override // 이용 가능 일 수
    public List<ApprovalVO> haveChargeDate(int memberCode) {
        return sqlSession.selectList("seatMapper.haveChargeDate", memberCode);
    }

    @Override // 이용권의 끝나는 날짜
    public String haveChargeEndDate(int memberCode) {
        return sqlSession.selectOne("seatMapper.haveChargeEndDate", memberCode);
    }

    @Override // 이용권의 남은 일 수
    public int haveChargeRemainDate(int memberCode) {
        return sqlSession.selectOne("seatMapper.haveChargeRemainDate", memberCode);
    }

    @Override
    public void updateApp(int memberCode) {
        sqlSession.update("seatMapper.updateApp", memberCode);
    }

    @Override
    public String today() {
        return sqlSession.selectOne("seatMapper.today");
    }

//    @Override
//    public String isExpires(int memberCode) {
//        return sqlSession.selectOne("seatMapper.isExpires", memberCode);
//    }

    @Override
    public void chargeDelete(int memberCode) {
        sqlSession.delete("seatMapper.chargeDelete", memberCode);
    }

    @Override // 입실
    @Transactional(rollbackFor = Exception.class)
    public void inSeat(SeatVO seatVO) {
        sqlSession.update("seatMapper.inSeat", seatVO);
        sqlSession.insert("seatMapper.inMem", seatVO);
    }

    @Override // 퇴실
    @Transactional (rollbackFor = Exception.class)
    public void outSeat(SeatVO seatVO) {
        sqlSession.update("seatMapper.outSeat", seatVO);
        sqlSession.update("seatMapper.outMem", seatVO);
    }

    @Override // 자리이동
    @Transactional (rollbackFor = Exception.class)
    public void moveSeat(SeatVO seatVO) {
        sqlSession.delete("seatMapper.outSeat", seatVO);
        sqlSession.update("seatMapper.inSeat", seatVO);
    }

    @Override // 이용권 상품 목록
    public List<ChargeVO> chargeList() {
        return sqlSession.selectList("seatMapper.chargeList");
    }

    @Override // 이용권 하나의 정보
    public ChargeVO chargeBuy(int chargeCode) {
        return sqlSession.selectOne("seatMapper.chargeBuy", chargeCode);
    }

    @Override // 카드 결제 고객 정보
    public MemberVO selMem(int memberCode) {
        return sqlSession.selectOne("seatMapper.selMem", memberCode);
    }

    @Override // 주문 번호 필요
    public String buyToday() {
        return sqlSession.selectOne("seatMapper.buyToday");
    }

    @Override // 카드 결제 성공시 정보 추가
    public void buyCard(ApprovalVO approvalVO) {
        sqlSession.insert("seatMapper.buyCard", approvalVO);
    }

    @Override // 관리자 좌석 상태 변경
    public void adminUpdateSeat(SeatVO seatVO) {
        sqlSession.update("seatMapper.adminUpdateSeat", seatVO);
    }

    @Override // 내 이용권 조회
    public List<ApprovalVO> myBuyDetail(int memberCode) {
        return sqlSession.selectList("seatMapper.myBuyDetail", memberCode);
    }

    @Override // 모든 쿠폰 조회
    public List<CouponVO> coupon() {
        return sqlSession.selectList("seatMapper.coupon");
    }

    @Override // 내 쿠폰 조회
    public List<MemberCouponVO> ownCoupon(int memberCode) {
        return sqlSession.selectList("seatMapper.ownCoupon", memberCode);
    }

    @Override // 쿠폰 사용하여 결제 시 해당 쿠폰 삭제
    public void deleteCoupon(int ownCouponCode) {
        sqlSession.delete("seatMapper.deleteCoupon", ownCouponCode);
    }

    @Override // 채팅
    public List<MessageVO> userMsg(int memberCode) {
        return sqlSession.selectList("seatMapper.userMsg", memberCode);
    }

    @Override // 채팅 전송
    public void userSend(MessageVO messageVO) {
        sqlSession.insert("seatMapper.userSend", messageVO);
    }

}
