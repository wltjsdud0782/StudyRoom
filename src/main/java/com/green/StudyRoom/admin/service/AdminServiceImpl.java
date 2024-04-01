package com.green.StudyRoom.admin.service;

import com.green.StudyRoom.admin.vo.InfoSearchVO;
import com.green.StudyRoom.member.vo.MemberVO;
import com.green.StudyRoom.seat.vo.MemberCouponVO;
import com.green.StudyRoom.seat.vo.SeatStatusVO;
import com.green.StudyRoom.seat.vo.SeatVO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("adminService")
public class AdminServiceImpl implements AdminService {

    @Autowired
    private SqlSessionTemplate sqlSession;

    //회원정보 조회하기 (이름, 아이디) + 검색
    @Override
    public List<MemberVO> selectMemberInfo(InfoSearchVO infoSearchVO) {
        return sqlSession.selectList("adminMapper.selectMemberInfo", infoSearchVO);
    }

    //회원정보 상세조회하기 (비동기)
    @Override
    public MemberVO selectMemberDetailInfo(int memberCode) {
        return sqlSession.selectOne("adminMapper.selectMemberDetailInfo", memberCode);
    }

    //회원정보/회원권한 업데이트
    @Override
    public void uptMemberInfo(MemberVO memberVO) {
        sqlSession.update("adminMapper.uptMemberInfo", memberVO);
    }

    //좌석정보 상세조회하기 (비동기)
    @Override
    public SeatVO selectSeatDetailInfo(int memberCode) {
        return sqlSession.selectOne("adminMapper.selectSeatDetailInfo", memberCode);
    }

    //좌석정보 업데이트 하기
    @Override
    public void uptSeatInfo(SeatVO seatVO) {
        sqlSession.update("adminMapper.uptSeatInfo", seatVO);
    }

    //쿠폰정보 보여주기
    @Override
    public List<MemberCouponVO> selectInfoCoupon(int memberCode) {
        return sqlSession.selectList("adminMapper.selectInfoCoupon", memberCode);
    }

}
