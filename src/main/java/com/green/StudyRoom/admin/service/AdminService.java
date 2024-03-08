package com.green.StudyRoom.admin.service;

import com.green.StudyRoom.admin.vo.InfoSearchVO;

import com.green.StudyRoom.member.vo.MemberVO;
import com.green.StudyRoom.seat.vo.SeatVO;

import java.util.List;

public interface AdminService {

    //회원정보 조회하기 (이름, 아이디) + 검색
    List<MemberVO> selectMemberInfo(InfoSearchVO infoSearchVO);

    //회원정보 상세조회하기 (비동기)
    MemberVO selectMemberDetailInfo(int memberCode);

    //회원정보/회원권한 업데이트
    void uptMemberInfo(MemberVO memberVO);

    //좌석정보 상세조회하기 (비동기)
    SeatVO selectSeatDetailInfo(int memberCode);

}

