package com.green.StudyRoom.board.service;

import com.green.StudyRoom.board.vo.ReviewVO;
import com.green.StudyRoom.member.vo.StudyRoomInOutVO;

import java.util.List;

public interface ReviewService {
    void insertReview(ReviewVO reviewVO);

    List<ReviewVO> selectReview();

    List<StudyRoomInOutVO> selectInout(int memberCode);

    List<StudyRoomInOutVO> selectReviewPage();

    List<ReviewVO> selectMyReview(ReviewVO reviewVO);

    void deleteReview(int reviewCode);
}
