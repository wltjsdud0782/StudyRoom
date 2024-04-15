package com.green.StudyRoom.admin.service;

import com.green.StudyRoom.member.vo.ApprovalVO;
import com.green.StudyRoom.seat.vo.SalesInfoVO;

import java.util.List;

public interface SalesService {

    //이용권 매출리스트
    List<SalesInfoVO> chargeSalesList();

    //월별 매출
    List<SalesInfoVO> monthSales();

    //연별 매출
    List<SalesInfoVO> yearSales();
}
