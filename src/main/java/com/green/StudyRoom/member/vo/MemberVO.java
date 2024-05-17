package com.green.StudyRoom.member.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class MemberVO {
    private String memberEmail;
    private int memberCode;
    private String memberId;
    private String memberPw;
    private String memberName;
    private String memberTel;
    private String memberBirth;
    private String postCode;
    private String memberAddr;
    private String addrDetail;
    private String memberGender;
    private String isAdmin;
    private String secretTel;
    private String secretEmail;
}
