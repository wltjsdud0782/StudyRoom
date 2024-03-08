package com.green.StudyRoom.board.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.GetMapping;

@Setter
@Getter
@ToString
public class CommentVO {
    private int commentCode;
    private String commentWriter;
    private String commentContent;
    private String commentDate;
    private int boardCode;
}

