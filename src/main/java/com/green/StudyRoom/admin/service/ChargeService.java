package com.green.StudyRoom.admin.service;

import com.green.StudyRoom.admin.vo.ChargeVO;
import com.green.StudyRoom.seat.vo.CouponVO;

import java.util.List;

public interface ChargeService {

    //요금제 설정하기
    void insertCharge(ChargeVO chargeVO);

    //만든 요금제 보여주기
    List<ChargeVO> selectCharge();

    //만든 요금제 보여주기 top 5
    List<ChargeVO> setCharge();

    //요금제 조회하기(비동기)
    ChargeVO getCharge(int chargeCode);

    //요금제 업데이트하기
    void uptCharge(ChargeVO chargeVO);

    //요금제 삭제하기
    void delCharge(int chargeCode);

    //쿠폰 등록하기
    void insertCoupon(CouponVO couponVO);

    //쿠폰 보여주기
    List<CouponVO> selectCoupon();

    //쿠폰 조회하기(비동기)
    CouponVO getCoupon(int couponCode);

    //쿠폰 업데이트하기
    void uptCoupon(CouponVO couponVO);

    //쿠폰 삭제하기
    void delCoupon(int couponCode);
}
