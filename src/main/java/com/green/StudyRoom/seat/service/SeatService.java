package com.green.StudyRoom.seat.service;

import com.green.StudyRoom.admin.vo.ChargeVO;
import com.green.StudyRoom.seat.vo.SeatVO;

import java.util.List;

public interface SeatService {
    List<ChargeVO> chargeList();

    ChargeVO chargeBuy(int chargeCode);

    List<SeatVO> seatList();

}
