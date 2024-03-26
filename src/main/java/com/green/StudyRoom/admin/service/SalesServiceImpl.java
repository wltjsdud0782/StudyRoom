package com.green.StudyRoom.admin.service;

import com.green.StudyRoom.member.vo.ApprovalVO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("salesService")
public class SalesServiceImpl implements SalesService{

    @Autowired
    private SqlSessionTemplate sqlSession;

    //매출 조회
    @Override
    public List<ApprovalVO> selectSales() {
        return sqlSession.selectList("logMapper.selectSales");
    }
}
