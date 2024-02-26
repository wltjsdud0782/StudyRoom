package com.green.StudyRoom.admin.service;

import com.green.StudyRoom.admin.vo.MessageVO;

public interface AdminService {

    //유저 메세지 저장
    void insertMessage(MessageVO messageVO);

    //유저 메세지 보여주기
    void selectMessage();

    //요금제 설정하기

    //만든 요금제 보여주기
}
