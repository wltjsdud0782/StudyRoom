package com.green.StudyRoom.admin.service;

import com.green.StudyRoom.member.vo.ApprovalVO;
import com.green.StudyRoom.member.vo.ReservationVO;
import com.green.StudyRoom.member.vo.StudyRoomInOutVO;
import com.green.StudyRoom.seat.vo.SeatVO;

import java.util.List;

public interface TimeLogService {

    //결재 기록 조회
    List<ApprovalVO> selectBuyList();

    //예약 기록 조회 (안쓸 기능)
    List<ReservationVO> selectReserveList();

    //입퇴실 기록 조회
    List<StudyRoomInOutVO> selectInOutList();

    //좌석상태 조회
    List<SeatVO> selectSeatStatusList();

}
