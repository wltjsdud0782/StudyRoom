package com.green.StudyRoom.admin.service;

import com.green.StudyRoom.member.vo.ApprovalVO;
import com.green.StudyRoom.seat.vo.SalesInfoVO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("salesService")
public class SalesServiceImpl implements SalesService{

    @Autowired
    private SqlSessionTemplate sqlSession;

    //매출 조회
//    @Override
//    public List<ApprovalVO> selectSales() {
//        return sqlSession.selectList("salesMapper.selectSales");
//    }

    //매출 총합
//    @Override
//    public List<ApprovalVO> salesSum() {
//        return sqlSession.selectList("salesMapper.salesSum");
//    }

    //이용권 매출리스트
    @Override
    public List<SalesInfoVO> chargeSalesList() {
        return sqlSession.selectList("salesMapper.chargeSalesList");
    }

    //월별 매출
    @Override
    public List<SalesInfoVO> monthSales() {
        return sqlSession.selectList("salesMapper.monthSales");
    }


}
