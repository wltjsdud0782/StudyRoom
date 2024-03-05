package com.green.StudyRoom.seat.service;

import com.green.StudyRoom.admin.vo.ChargeVO;
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

    @Override
    public List<SeatVO> seatList() {
        return sqlSession.selectList("seatMapper.seatList");
    }

    @Override
    public SeatVO moveAndOut(int memberCode) {
        return sqlSession.selectOne("seatMapper.moveAndOut", memberCode);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void inSeat(SeatVO seatVO) {
        sqlSession.update("seatMapper.inSeat", seatVO);
        sqlSession.insert("seatMapper.inMem", seatVO);
    }

    @Override
    @Transactional (rollbackFor = Exception.class)
    public void outSeat(SeatVO seatVO) {
        sqlSession.update("seatMapper.outSeat", seatVO);
        sqlSession.update("seatMapper.outMem", seatVO);
    }

    @Override
    public List<ChargeVO> chargeList() {
        return sqlSession.selectList("seatMapper.chargeList");
    }

    @Override
    public ChargeVO chargeBuy(int chargeCode) {
        return sqlSession.selectOne("seatMapper.chargeBuy", chargeCode);
    }

}
