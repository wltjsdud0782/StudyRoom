package com.green.StudyRoom.mail;

import jakarta.mail.Message;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.util.Random;

@Service
public class MailServiceImpl implements MailService {

    @Autowired
    JavaMailSender emailSender;

    private String ePw;

    @Override
    public MimeMessage creatMessage(String to) throws MessagingException, UnsupportedEncodingException {
        System.out.println("메일받을 사용자" + to);
        System.out.println("인증번호" + ePw);

        MimeMessage message = emailSender.createMimeMessage();

        message.addRecipients(Message.RecipientType.TO, to); // 메일 받을 사용자
        message.setSubject("[GreenStudyRoom] 비밀번호 변경을 위한 이메일 인증코드 입니다"); // 이메일 제목

        String msgg = "";
        // msgg += "<img src=../resources/static/image/emailheader.jpg />"; // header image
        msgg += "<h1>안녕하세요</h1>";
        msgg += "<h1>GreenStudyRoom 입니다.</h1>";
        msgg += "<br>";
        msgg += "<p>아래 인증코드를 인증번호 페이지에 입력해주세요</p>";
        msgg += "<br>";
        msgg += "<br>";
        msgg += "<div align='center' style='border:1px solid black'>";
        msgg += "<h3 style='color:green'>비밀번호찾기 인증코드입니다</h3>";
        msgg += "<div style='font-size:130%'>";
        msgg += "<strong>" + ePw + "</strong></div><br/>" ; // 메일에 인증번호 ePw 넣기
        msgg += "</div>";
        // msgg += "<img src=../resources/static/image/emailfooter.jpg />"; // footer image

        message.setText(msgg, "utf-8", "html"); // 메일 내용, charset타입, subtype
        // 보내는 사람의 이메일 주소, 보내는 사람 이름
        message.setFrom(new InternetAddress("juhee053@naver.com", "GreenStudyRoom_Admin"));
        System.out.println("********creatMessage 함수에서 생성된 msgg 메시지********" + msgg);

        System.out.println("********creatMessage 함수에서 생성된 리턴 메시지********" + message);

        return message;
    }

    @Override
    public String createKey() {
        Random random = new Random();
        StringBuffer buffer = new StringBuffer();

        for(int i=0; i<6; i++){
            buffer.append(random.nextInt(10));
        }
        String randomCode = buffer.toString();
        return randomCode;
    }

    @Override
    public String sendSimpleMessage(String to) throws Exception {
        ePw = createKey(); // 랜덤 인증코드 생성
        System.out.println("********생성된 랜덤 인증코드******** => " + ePw);

        MimeMessage message = creatMessage(to); // "to" 로 메일 발송

        System.out.println("********생성된 메시지******** => " + message);

        try { // 예외처리
            emailSender.send(message);
        } catch (Exception e) {
            e.printStackTrace();
            throw new IllegalArgumentException();
        }

        return ePw;
    }
}
