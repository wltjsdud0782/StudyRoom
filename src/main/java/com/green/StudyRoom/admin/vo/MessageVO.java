package com.green.StudyRoom.admin.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class MessageVO {
    //사용자 메세지VO
    private int messageCode;
    private String messageContent;
    private String messageDate;

}
