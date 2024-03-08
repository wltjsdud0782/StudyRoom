package com.green.StudyRoom.admin.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ChargeVO {
    //요금제VO
    private int chargeCode;
    private int chargeFee;
    private String chargeName;
    private int chargeDate;
}
