package com.green.StudyRoom.board.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ReviewVO {
    private int reviewCode;
    private String reviewWriter;
    private String reviewContent;
    private String reviewDate;
}
