package com.green.StudyRoom.admin.service;

import com.green.StudyRoom.admin.vo.ChargeVO;
import com.green.StudyRoom.member.vo.ApprovalVO;
import com.green.StudyRoom.seat.vo.SalesInfoVO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service("salesService")
public class SalesServiceImpl implements SalesService{

    @Autowired
    private SqlSessionTemplate sqlSession;

    //이용권 매출리스트
//    @Override
//    public List<SalesInfoVO> chargeSalesList() {
//        return sqlSession.selectList("salesMapper.chargeSalesList");
//    }

//    //월별 매출
//    @Override
//    public List<SalesInfoVO> monthSales() {
//        return sqlSession.selectList("salesMapper.monthSales");
//    }

    //연별 매출
    @Override
    public List<SalesInfoVO> yearSales() {
        return sqlSession.selectList("salesMapper.yearSales");
    }

    //종합 월별 매출
    @Override
    public List<SalesInfoVO> monthSales() {
        return sqlSession.selectList("salesMapper.monthSales");
    }

    //올해 이용권 매출
    @Override
    public List<SalesInfoVO> chargeYearSales() {
        return sqlSession.selectList("salesMapper.chargeYearSales");
    }

    //이번달 이용권 매출
    @Override
    public List<SalesInfoVO> chargeMonthSales() {
        return sqlSession.selectList("salesMapper.chargeMonthSales");
    }

    @Override
    public List<Map<String, Object>> selectTableList(List<ChargeVO> chargeList) {
        return sqlSession.selectList("salesMapper.selectTableList", chargeList);
    }

    @Override
    public List<String> selectOneYearMonth() {
        return sqlSession.selectList("salesMapper.selectOneYearMonth");
    }


}
