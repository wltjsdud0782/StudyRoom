package com.green.StudyRoom.seat.vo;

import com.green.StudyRoom.member.vo.MemberVO;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class SeatVO {
    private int seatNum;
    private String seatPower;
    private int seatFloor;
    private int memberCode;
    private int statusNum;
    private int ageCode;

    private SeatStatusVO seatStatusVO;
    private FloorAgeVO floorAgeVO;
    private MemberVO memberVO;
}
