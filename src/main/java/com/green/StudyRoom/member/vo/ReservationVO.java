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
    private int seat_num;
    private String ReservationDate;
    private String isReservation;
}
