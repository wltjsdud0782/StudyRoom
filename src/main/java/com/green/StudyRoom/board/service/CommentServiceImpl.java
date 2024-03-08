package com.green.StudyRoom.board.service;


import com.green.StudyRoom.board.vo.CommentVO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service("commentService")
public class CommentServiceImpl implements CommentService {
    @Autowired
    private SqlSessionTemplate sqlSession;


    @Override
    // 답변 및 업데이트
    @Transactional(rollbackFor = Exception.class)
    public void adminAnswer(CommentVO commentVO) {
        sqlSession.insert("commentMapper.adminAnswer",commentVO);
        sqlSession.update("commentMapper.updateAnswer",commentVO);
    }

    @Override
    //답변 조회
    public List<CommentVO> selectComment() {
        return sqlSession.selectList("commentMapper.selectComment");
    }
}
