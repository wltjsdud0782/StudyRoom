package com.green.StudyRoom.seat.vo;

import lombok.Data;

@Data
public class CouponVO {
    private int couponCode;
    private String couponName;
    private int discountPercent;

    private int cnt;
}
