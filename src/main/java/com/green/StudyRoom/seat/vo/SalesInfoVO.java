package com.green.StudyRoom.seat.vo;

import com.green.StudyRoom.admin.vo.ChargeVO;
import lombok.Data;

import java.util.List;

@Data
public class SalesInfoVO {
    private int salesCode;
    private int salesFee;
    private String salesDate;
    private int chargeCode;
    private int cnt;

    private List<ChargeVO> chargeVOList;
}
