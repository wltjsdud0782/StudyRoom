package com.green.StudyRoom.admin.vo;

import com.green.StudyRoom.member.vo.MemberVO;
import com.green.StudyRoom.seat.vo.SeatVO;
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
    private int memberCode;
    private String toFrom;
//    private String memberName;
//    private String memberId;
//    private String isAdmin;
    private MemberVO memberVO;
//    private SeatVO seatVO;
}
