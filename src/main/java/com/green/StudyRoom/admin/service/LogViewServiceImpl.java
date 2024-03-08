package com.green.StudyRoom.admin.service;

import com.green.StudyRoom.admin.vo.LogViewVO;
import com.green.StudyRoom.member.vo.MemberVO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("logViewService")
public class LogViewServiceImpl implements LogViewService{

    @Autowired
    private SqlSessionTemplate sqlSession;

    //로그 조회하기
    @Override
    public List<LogViewVO> selectAllLog(MemberVO memberVO) {
        return sqlSession.selectList("logMapper.selectAllLog", memberVO);
    }
}
