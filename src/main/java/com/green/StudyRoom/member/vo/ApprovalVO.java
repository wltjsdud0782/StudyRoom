package com.green.StudyRoom.member.vo;

import com.green.StudyRoom.admin.vo.ChargeVO;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class ApprovalVO {
    private int approvalCode;
    private int approvalFee;
    private String approvalDate;
    private int memberCode;
    private int chargeCode;
    private String couponUse;

    private MemberVO memberVO;
    private ChargeVO chargeVO;
}
