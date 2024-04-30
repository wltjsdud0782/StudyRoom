package com.green.StudyRoom.admin.service;

import com.green.StudyRoom.admin.vo.ChargeVO;
import com.green.StudyRoom.member.vo.ApprovalVO;
import com.green.StudyRoom.seat.vo.SalesInfoVO;

import java.util.List;
import java.util.Map;

public interface SalesService {

    //이용권 매출리스트
//    List<SalesInfoVO> chargeSalesList();

//    //월별 매출
//    List<SalesInfoVO> monthSales();

    //연별 매출
    List<SalesInfoVO> yearSales();

    //종합 매출
    List<SalesInfoVO> monthSales();

    //올해 이용권 매출
    List<SalesInfoVO> chargeYearSales();

    //이번달 이용권 매출
    List<SalesInfoVO> chargeMonthSales();

    //표 통계 데이터 조회
    List<Map<String, Object>> selectTableList(List<ChargeVO> chargeList);

    //
    List<String> selectOneYearMonth();
}
