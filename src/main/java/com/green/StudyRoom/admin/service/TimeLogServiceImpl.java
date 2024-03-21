package com.green.StudyRoom.admin.service;

import com.green.StudyRoom.admin.vo.TimeLogVO;
import com.green.StudyRoom.member.vo.ApprovalVO;
import com.green.StudyRoom.member.vo.MemberVO;
import com.green.StudyRoom.member.vo.ReservationVO;
import com.green.StudyRoom.member.vo.StudyRoomInOutVO;
import com.green.StudyRoom.seat.vo.SeatVO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("timeLogService")
public class TimeLogServiceImpl implements TimeLogService {

    @Autowired
    private SqlSessionTemplate sqlSession;

    //결재 기록 조회
    @Override
    public List<ApprovalVO> selectBuyList() {
        return sqlSession.selectList("logMapper.selectBuyList");
    }

    //예약 기록 조회
    @Override
    public List<ReservationVO> selectReserveList() {
        return sqlSession.selectList("logMapper.selectReserveList");
    }

    //입퇴실 기록 조회
    @Override
    public List<StudyRoomInOutVO> selectInOutList() {
        return sqlSession.selectList("logMapper.selectInOutList");
    }

    //좌석상태 조회
    @Override
    public List<SeatVO> selectSeatStatusList() {
        return sqlSession.selectList("logMapper.selectSeatStatusList");
    }
}
