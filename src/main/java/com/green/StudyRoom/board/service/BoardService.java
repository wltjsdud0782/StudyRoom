package com.green.StudyRoom.board.service;

import com.green.StudyRoom.board.vo.BoardVO;

import java.util.List;

public interface BoardService {

    void insertBoard(BoardVO boardVO);

    List<BoardVO> selectBoard();
}
