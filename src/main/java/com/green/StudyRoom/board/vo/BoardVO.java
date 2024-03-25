package com.green.StudyRoom.board.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class BoardVO {
    private int boardCode;
    private String boardTitle;
    private String boardWriter;
    private String boardDate;
    private String boardContent;
    private String boardSecret;
    private String boardAnswer;
    private List<ImgVO> imgList;
}
