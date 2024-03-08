package com.green.StudyRoom.admin.service;

import com.green.StudyRoom.admin.vo.LogViewVO;
import com.green.StudyRoom.member.vo.MemberVO;

import java.util.List;

public interface LogViewService {

    //로그 조회하기
    List<LogViewVO> selectAllLog(MemberVO memberVO);

}
