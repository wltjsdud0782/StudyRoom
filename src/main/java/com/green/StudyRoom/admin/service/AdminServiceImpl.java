package com.green.StudyRoom.admin.service;

import com.green.StudyRoom.admin.vo.MessageVO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("adminService")
public class AdminServiceImpl implements AdminService {

    @Autowired
    private SqlSessionTemplate sqlSession;

    //유저 메세지 저장
    @Override
    public void insertMessage(MessageVO messageVO) {
        sqlSession.insert("messageMapper.insertMessage", messageVO);
    }

    //유저 메세지 보여주기
    @Override
    public void selectMessage() {
        sqlSession.selectList("messageMapper.selectMessage");
    }

    //요금제 설정하기

    //만든 요금제 보여주기
}
