package com.green.StudyRoom.admin.service;

import com.green.StudyRoom.admin.vo.ChargeVO;

import java.util.List;

public interface ChargeService {

    //요금제 설정하기
    void insertCharge(ChargeVO chargeVO);

    //만든 요금제 보여주기
    List<ChargeVO> selectCharge();

    //요금제 조회하기(비동기)
    ChargeVO getCharge(int chargeCode);

    //요금제 업데이트하기
    void uptCharge(ChargeVO chargeVO);

    //요금제 삭제하기
    void delCharge(int chargeCode);
}
