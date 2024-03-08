package com.green.StudyRoom.seat.service;

import com.green.StudyRoom.admin.vo.ChargeVO;
import com.green.StudyRoom.member.vo.ApprovalVO;
import com.green.StudyRoom.member.vo.MemberVO;
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

    @Override // 구매한 이용권 유무
    public String haveCharge(int memberCode) {
        return sqlSession.selectOne("seatMapper.haveCharge", memberCode);
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

    // 이용권 구입화면
    @Override
    public List<ChargeVO> chargeList() {
        return sqlSession.selectList("seatMapper.chargeList");
    }

    @Override
    public ChargeVO chargeBuy(int chargeCode) {
        return sqlSession.selectOne("seatMapper.chargeBuy", chargeCode);
    }

    @Override
    public MemberVO selMem(int memberCode) {
        return sqlSession.selectOne("seatMapper.selMem", memberCode);
    }

    @Override
    public int selectNextApprovalCode() {
        return sqlSession.selectOne("seatMapper.selectNextApprovalCode");
    }

    @Override // 카드 결제 성공시 정보 추가
    public void buyCard(ApprovalVO approvalVO) {
        sqlSession.insert("seatMapper.buyCard", approvalVO);
    }

}
