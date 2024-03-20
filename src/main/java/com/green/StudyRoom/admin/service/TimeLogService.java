package com.green.StudyRoom.admin.service;

import com.green.StudyRoom.admin.vo.TimeLogVO;
import com.green.StudyRoom.member.vo.MemberVO;

import java.util.List;

public interface TimeLogService {

    //로그 조회하기
    List<TimeLogVO> selectAllLog(MemberVO memberVO);

}
