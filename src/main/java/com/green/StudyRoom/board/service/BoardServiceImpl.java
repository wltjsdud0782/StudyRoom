package com.green.StudyRoom.board.service;

import com.green.StudyRoom.board.vo.BoardVO;
import com.green.StudyRoom.board.vo.CommentVO;
import com.green.StudyRoom.board.vo.SearchVO;
import com.green.StudyRoom.member.vo.MemberVO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service("boardService")
public class BoardServiceImpl implements BoardService {
    @Autowired
    private SqlSessionTemplate sqlSession;

    @Override
    // 글쓰기
    public void insertBoard(BoardVO boardVO) {
        sqlSession.insert("boardMapper.insertBoard", boardVO);
    }

    // 글쓰기 첫 화면, 작성한 글 조회
    @Override
    public List<BoardVO> selectBoard(SearchVO searchVO) {
        return sqlSession.selectList("boardMapper.selectBoard", searchVO);
    }

    @Override
    // 회원 정보 수정
    public void updateMember(MemberVO memberVO) {
        sqlSession.update("boardMapper.updateMember", memberVO);
    }

    @Override
    // 글쓰기 상세 정보 조회
    public BoardVO detailSelect(int boardCode) {
        return sqlSession.selectOne("boardMapper.detailSelect", boardCode);
    }

    @Override
    // 매장소개 문의 글
    public List<BoardVO> selectPageInfo() {
        return sqlSession.selectList("boardMapper.selectPageInfo");
    }


    @Override
    //내가 쓴글 (마이페이지)
    public List<BoardVO> selectMyPage(String boardWriter) {
        return sqlSession.selectList("boardMapper.selectMyPage", boardWriter);
    }

    @Override
    //내가 쓴글 삭제
    public int deleteBoard(int boardCode) {
        return sqlSession.delete("boardMapper.deleteBoard", boardCode);
    }

    // 글쓰기 답변

}
