package com.green.StudyRoom.board.service;

import com.green.StudyRoom.board.vo.ReviewVO;

import java.util.List;

public interface ReviewService {
    void insertReview(ReviewVO reviewVO);

    List<ReviewVO> selectReview();
}
