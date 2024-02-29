package com.green.StudyRoom.admin.service;

import com.green.StudyRoom.admin.vo.ChargeVO;
import com.green.StudyRoom.admin.vo.MessageVO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("adminService")
public class AdminServiceImpl implements AdminService {

    @Autowired
    private SqlSessionTemplate sqlSession;

    //유저 메세지 저장
    @Override
    public void insertMessage(MessageVO messageVO) {
        sqlSession.insert("messageMapper.insertMessage", messageVO);
    }

    //유저 메세지 보여주기
    @Override
    public void selectMessage() {
        sqlSession.selectList("messageMapper.selectMessage");
    }

    //요금제 설정하기
    @Override
    public void insertCharge(ChargeVO chargeVO) {
        sqlSession.insert("chargeMapper.insertCharge",chargeVO);
    }

    //만든 요금제 보여주기
    @Override
    public List<ChargeVO> selectCharge() {
        return sqlSession.selectList("chargeMapper.selectCharge");
    }

    //요금제 조회하기(비동기)
    @Override
    public ChargeVO getCharge(int chargeCode) {
        return sqlSession.selectOne("chargeMapper.getCharge", chargeCode);
    }

    //요금제 업데이트하기
    @Override
    public void uptCharge(ChargeVO chargeVO) {
        sqlSession.update("chargeMapper.uptCharge", chargeVO);
    }

    //요금제 삭제하기
    @Override
    public void delCharge(ChargeVO chargeVO) {
        sqlSession.delete("chargeMapper.delCharge", chargeVO);
    }

}
