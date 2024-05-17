package com.green.StudyRoom.member.service;

import com.green.StudyRoom.member.vo.MemberVO;
import org.apache.ibatis.session.SqlSession;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("memberService")
public class MemberServiceImpl implements MemberService{
    @Autowired
    private SqlSessionTemplate sqlSession;

    @Override
    public void resetPassword(MemberVO memberVO) {
        sqlSession.insert("memberMapper.resetPassword", memberVO);
    }

    @Override
    public MemberVO memberIdSelect(String memberId) {
        return sqlSession.selectOne("memberMapper.memberIdSelect", memberId);
    }

    @Override
    public List<MemberVO> idFindResult(MemberVO memberVO) {
        return sqlSession.selectList("memberMapper.idFindResult", memberVO);
    }

    //회원 등록
    @Override
    public void joinInsert(MemberVO memberVO) {
        sqlSession.insert("memberMapper.joinInsert",memberVO);
    }

    @Override
    public MemberVO login(MemberVO memberVO) {
        return sqlSession.selectOne("memberMapper.login", memberVO);
    }

    @Override
    public MemberVO idFindSelect(MemberVO memberVO) {
        return sqlSession.selectOne("memberMapper.idFindSelect",memberVO);
    }


}
