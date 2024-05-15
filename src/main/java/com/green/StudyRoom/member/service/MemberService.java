package com.green.StudyRoom.member.service;

import com.green.StudyRoom.member.vo.MemberVO;

import java.util.List;

public interface MemberService {
    void resetPassword(MemberVO memberVO);

    MemberVO memberIdSelect(String memberId);

    List<MemberVO> idFindResult(MemberVO memberVO);
    //회원 가입
    void joinInsert(MemberVO memberVO);

    //로그인
    MemberVO login(MemberVO memberVO);

    //아이디 찾기
    MemberVO idFindSelect(MemberVO memberVO);
}
