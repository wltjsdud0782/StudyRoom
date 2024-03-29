package com.green.StudyRoom.admin.service;

import com.green.StudyRoom.member.vo.ApprovalVO;

import java.util.List;

public interface SalesService {

    //매출 조회
    List<ApprovalVO> selectSales();

    //매출 합계
    List<ApprovalVO> salesSum();
}
