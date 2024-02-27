package com.green.StudyRoom.admin.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class LogViewVO {
    //STUDYROOM_MEMBER
    private int memberCode;
    private String memberName;

    //STUDYROOM_RESERVATION
    private int reservationCode;
    private String reservationDate;
    private String isReservation;

    //APPROVAL
    private int approvalCode;

    //STUDYROOM_INOUT
    private int dayInput;
    private String inOut;

    //STUDYROOM_SEAT
    private int seatCode;
    private String seatPower;
    private int seatFloor;

    //STUDYROOM_MESSAGE
    private int messageCode;
    private String messageContent;
    private String messageDate;
}
