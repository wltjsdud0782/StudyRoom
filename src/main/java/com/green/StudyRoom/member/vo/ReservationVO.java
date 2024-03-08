package com.green.StudyRoom.member.vo;

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
}
