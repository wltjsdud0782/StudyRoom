package com.green.StudyRoom.board.service;

import com.green.StudyRoom.board.vo.ReviewVO;
import com.green.StudyRoom.member.vo.StudyRoomInOutVO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("reviewService")
public class ReviewServiceImpl implements ReviewService {
    @Autowired
    SqlSessionTemplate sqlSession;


    @Override
    public void insertReview(ReviewVO reviewVO) {
        sqlSession.insert("reviewMapper.insertReview", reviewVO);
    }

    @Override
    public List<ReviewVO> selectReview() {
        return sqlSession.selectList("reviewMapper.selectReview");
    }

    @Override
    public List<StudyRoomInOutVO> selectInout(int memberCode) {
        return sqlSession.selectList("reviewMapper.selectInout", memberCode);
    }

    @Override
    public List<StudyRoomInOutVO> selectReviewPage() {
        return sqlSession.selectList("reviewMapper.selectReviewPage");
    }
}
