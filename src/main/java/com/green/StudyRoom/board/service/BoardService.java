package com.green.StudyRoom.board.service;

import com.green.StudyRoom.board.vo.BoardVO;
import com.green.StudyRoom.member.vo.MemberVO;

import java.util.List;

public interface BoardService {

    void insertBoard(BoardVO boardVO);

    List<BoardVO> selectBoard();

    void updateMember(MemberVO memberVO);

    BoardVO detailSelect(int boardCode);
}
