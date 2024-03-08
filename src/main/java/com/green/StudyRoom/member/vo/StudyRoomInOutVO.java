package com.green.StudyRoom.member.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class StudyRoomInOutVO {
    private int dayInput;
    private int memberCode;
    private String InOut;

    private MemberVO memberVO;
}
