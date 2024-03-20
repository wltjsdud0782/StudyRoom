package com.green.StudyRoom.admin.service;

import com.green.StudyRoom.admin.vo.TimeLogVO;
import com.green.StudyRoom.member.vo.ApprovalVO;
import com.green.StudyRoom.member.vo.MemberVO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("timeLogService")
public class TimeLogServiceImpl implements TimeLogService {

    @Autowired
    private SqlSessionTemplate sqlSession;

    //로그 조회하기
    @Override
    public List<TimeLogVO> selectAllLog(MemberVO memberVO) {
        return sqlSession.selectList("logMapper.selectAllLog", memberVO);
    }

    //결재 기록 조회
    @Override
    public List<ApprovalVO> selectBuyList() {
        return sqlSession.selectList("logMapper.selectBuyList");
    }
}
