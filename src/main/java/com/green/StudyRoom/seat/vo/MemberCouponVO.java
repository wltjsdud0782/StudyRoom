package com.green.StudyRoom.seat.vo;

import com.green.StudyRoom.member.vo.MemberVO;
import lombok.Data;

import java.util.List;

@Data
public class MemberCouponVO {
    private int ownCouponCode;
    private int couponCode;
    private int memberCode;

    private MemberVO memberVO;
    private List<CouponVO> couponVOList;
}
