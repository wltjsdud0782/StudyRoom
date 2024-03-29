package com.green.StudyRoom.admin.service;

import com.green.StudyRoom.admin.vo.ChargeVO;
import com.green.StudyRoom.seat.vo.CouponVO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("chargeService")
public class ChargeServiceImpl implements ChargeService{

    @Autowired
    private SqlSessionTemplate sqlSession;

    //요금제 설정하기
    @Override
    public void insertCharge(ChargeVO chargeVO) {
        sqlSession.insert("chargeMapper.insertCharge",chargeVO);
    }

    //만든 요금제 보여주기
    @Override
    public List<ChargeVO> selectCharge() {
        return sqlSession.selectList("chargeMapper.selectCharge");
    }

    //요금제 조회하기(비동기)
    @Override
    public ChargeVO getCharge(int chargeCode) {
        return sqlSession.selectOne("chargeMapper.getCharge", chargeCode);
    }

    //요금제 업데이트하기
    @Override
    public void uptCharge(ChargeVO chargeVO) {
        sqlSession.update("chargeMapper.uptCharge", chargeVO);
    }

    //요금제 삭제하기
    @Override
    public void delCharge(int chargeCode) {
        sqlSession.delete("chargeMapper.delCharge", chargeCode);
    }

    //쿠폰 등록하기
    @Override
    public void insertCoupon(CouponVO couponVO) {
        sqlSession.insert("chargeMapper.insertCoupon", couponVO);
    }

    //쿠폰 보여주기
    @Override
    public List<CouponVO> selectCoupon() {
        return sqlSession.selectList("chargeMapper.selectCoupon");
    }

    //쿠폰 조회하기(비동기)
    @Override
    public CouponVO getCoupon(int couponCode) {
        return sqlSession.selectOne("chargeMapper.getCoupon", couponCode);
    }

    //쿠폰 업데이트하기
    @Override
    public void uptCoupon(CouponVO couponVO) {
        sqlSession.update("chargeMapper.uptCoupon", couponVO);
    }

    //쿠폰 삭제하기
    @Override
    public void delCoupon(int couponCode) {
        sqlSession.delete("chargeMapper.delCoupon", couponCode);
    }


}
