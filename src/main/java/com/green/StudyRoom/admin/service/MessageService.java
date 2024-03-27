package com.green.StudyRoom.admin.service;

import com.green.StudyRoom.admin.vo.InfoSearchVO;
import com.green.StudyRoom.admin.vo.MessageVO;
import com.green.StudyRoom.member.vo.MemberVO;

import java.util.List;

public interface MessageService {

    //채팅보낼 사람 조회
    List<MemberVO> selectWho(InfoSearchVO infoSearchVO);

    //채팅 받을 사람 (비동기)
    MemberVO selectMan(int memberCode);

    //관리자 메세지 보내기
    void insertAdmMsg(MessageVO messageVO);

    //유저 메세지 저장
    void insertMessage(MessageVO messageVO);

    //메세지 조회
    List<MessageVO> selectMessage(int memberCode);
}
