package com.green.StudyRoom.admin.vo;

import com.green.StudyRoom.member.vo.MemberVO;
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

    //FK
    private int memberCode;
    private int seatNum;

    //외부 - memberVO
    private String memberName;
    private String memberId;
    private String isAdmin;

}
