package com.green.StudyRoom.board.service;

import com.green.StudyRoom.board.vo.BoardVO;
import com.green.StudyRoom.board.vo.CommentVO;
import com.green.StudyRoom.member.vo.MemberVO;

import java.util.List;

public interface BoardService {

    // 게시판 등록
    void insertBoard(BoardVO boardVO);

    //게시판 조회
    List<BoardVO> selectBoard();

    //멤버정보변경
    void updateMember(MemberVO memberVO);

    //게시판 상세조회
    BoardVO detailSelect(int boardCode);

    // 매장소개 문의글
    List<BoardVO> selectPageInfo();

    //내가 쓴 글(문의글)
    List<BoardVO> selectMyPage(String boardWriter);
}
