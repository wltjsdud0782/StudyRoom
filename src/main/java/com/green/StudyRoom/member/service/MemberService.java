package com.green.StudyRoom.member.service;

import com.green.StudyRoom.member.vo.MemberVO;

public interface MemberService {
    //회원 가입
    void joinInsert(MemberVO memberVO);

    //로그인
    MemberVO login(MemberVO memberVO);
}
