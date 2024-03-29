package com.green.StudyRoom.board.service;

import com.green.StudyRoom.board.vo.BoardVO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


public interface ImgService {

    void insertBoard(BoardVO boardVO);
}
