package com.green.StudyRoom.board.service;


import com.green.StudyRoom.board.vo.CommentVO;

import java.util.List;

public interface CommentService  {
    //답변 저장
    void adminAnswer(CommentVO commentVO);

    List<CommentVO> selectComment(int boardCode);
}
