package com.green.StudyRoom.admin.service;

import com.green.StudyRoom.admin.vo.ChargeVO;
import com.green.StudyRoom.admin.vo.MessageVO;
import com.green.StudyRoom.member.vo.MemberVO;

import java.util.List;

public interface AdminService {

    //회원정보 조회하기 (이름, 아이디)
    List<MemberVO> selectMemberInfo();

    //회원정보 상세조회하기 (비동기)
    MemberVO selectMemberDetailInfo(int memberCode);

    //회원정보/회원권한 업데이트
    void uptMemberInfo(MemberVO memberVO);

    /////////////////////////////////////////////////////////////////////

    //채팅보낼 사람 조회
    List<MemberVO> selectWho();

    //채팅 받을 사람 (비동기)
    MemberVO selectMan(int memberCode);

    //관리자 메세지 보내기
    void insertAdmMsg(MessageVO messageVO);

    //유저 메세지 저장
    void insertMessage(MessageVO messageVO);

    //모든 메세지 조회
    List<MessageVO> selectMessage();

    /////////////////////////////////////////////////////////////////////

    //요금제 설정하기
    void insertCharge(ChargeVO chargeVO);

    //만든 요금제 보여주기
    List<ChargeVO> selectCharge();

    //요금제 조회하기(비동기)
    ChargeVO getCharge(int chargeCode);

    //요금제 업데이트하기
    void uptCharge(ChargeVO chargeVO);

    //요금제 삭제하기
    void delCharge(int chargeCode);
}

