package com.green.StudyRoom.admin.service;

import com.green.StudyRoom.admin.vo.InfoSearchVO;
import com.green.StudyRoom.admin.vo.MessageVO;
import com.green.StudyRoom.member.vo.MemberVO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("messageService")
public class MessageServiceImpl implements MessageService{

    @Autowired
    private SqlSessionTemplate sqlSession;

    //채팅보낼 사람 조회
    @Override
    public List<MemberVO> selectWho(InfoSearchVO infoSearchVO) {
        return sqlSession.selectList("messageMapper.selectWho", infoSearchVO);
    }

    //채팅받을 사람 (비동기)
    @Override
    public MemberVO selectMan(int memberCode) {
        return sqlSession.selectOne("messageMapper.selectMan", memberCode);
    }

    //관리자 메세지 보내기
    @Override
    public void insertAdmMsg(MessageVO messageVO) {
        sqlSession.insert("messageMapper.insertAdmMsg", messageVO);
    }

    //유저 메세지 저장
//    @Override
//    public void insertMessage(MessageVO messageVO) {
//        sqlSession.insert("messageMapper.insertMessage", messageVO);
//    }

    //메세지 조회
    @Override
    public List<MessageVO> selectMessage(int memberCode) {
        return sqlSession.selectList("messageMapper.selectMessage", memberCode);
    }

    //최근 메세지 조회
    @Override
    public List<MessageVO> selectRecentMsg() {
        return sqlSession.selectList("messageMapper.selectRecentMsg");
    }
}
