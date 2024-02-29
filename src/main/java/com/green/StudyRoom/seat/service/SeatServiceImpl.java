package com.green.StudyRoom.seat.service;

import com.green.StudyRoom.member.vo.MemberVO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("seatService")
public class SeatServiceImpl implements SeatService{
    @Autowired
    private SqlSessionTemplate sqlSession;

}
