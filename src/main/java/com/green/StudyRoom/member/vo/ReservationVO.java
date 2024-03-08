package com.green.StudyRoom.member.vo;

import com.green.StudyRoom.admin.vo.ChargeVO;
import com.green.StudyRoom.seat.vo.SeatVO;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ReservationVO {
    private int reservationCode;
    private int memberCode;
    private int seatNum;
    private String ReservationDate;
    private int chargeCode;

    private MemberVO memberVO;
    private ChargeVO chargeVO;
    private SeatVO seatVO;
}
