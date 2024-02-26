package com.green.StudyRoom.admin.service;

import com.green.StudyRoom.admin.vo.MessageVO;

public interface MessageService {

    //유저 메세지 저장
    void insertMessage(MessageVO messageVO);
}
