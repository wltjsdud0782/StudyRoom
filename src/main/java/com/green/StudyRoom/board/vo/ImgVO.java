package com.green.StudyRoom.board.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ImgVO {
    private int imgCode;
    private String originFileName;
    private String attachedFileName;
    private int boardCode;
}
