package com.green.StudyRoom.board.service;

import com.green.StudyRoom.board.vo.ReviewPageVO;
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
    public List<ReviewVO> selectReview(ReviewPageVO reviewPageVO) {
        return sqlSession.selectList("reviewMapper.selectReview", reviewPageVO);
    }

    @Override
    public List<StudyRoomInOutVO> selectInout(int memberCode) {
        return sqlSession.selectList("reviewMapper.selectInout", memberCode);
    }

    @Override
    public List<StudyRoomInOutVO> selectReviewPage() {
        return sqlSession.selectList("reviewMapper.selectReviewPage");
    }

    @Override
    public List<ReviewVO> selectMyReview(ReviewVO reviewVO) {
        return sqlSession.selectList("reviewMapper.selectMyReview", reviewVO);
    }

    @Override
    public void deleteReview(int reviewCode) {
        sqlSession.delete("reviewMapper.deleteReview", reviewCode);
    }

    @Override
    public ReviewVO selectDetailReview(int reviewCode) {
        return sqlSession.selectOne("reviewMapper.selectDetailReview", reviewCode);
    }
}
