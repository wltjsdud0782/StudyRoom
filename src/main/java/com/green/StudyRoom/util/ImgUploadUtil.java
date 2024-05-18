package com.green.StudyRoom.util;

import com.green.StudyRoom.board.vo.ImgVO;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class ImgUploadUtil {
    
    //파일 확장자를 문자열로 리턴 
    public static String getExtension(String fileName){
        return fileName.substring(fileName.lastIndexOf("."));
    }
    
    //uuid를 통한 (랜덤)파일명을 생성
    public static String getUUID(){
        return UUID.randomUUID().toString();
    }

    public static List<ImgVO> multiUploadFile(MultipartFile[] uploadFiles){
        List<ImgVO> imgList = new ArrayList<>();


        ImgVO imgVO = null;

        for(MultipartFile uploadFile : uploadFiles){
            //확장자 추출

            if(!uploadFile.isEmpty()) {
                imgVO = new ImgVO();
                String extension = getExtension(uploadFile.getOriginalFilename());

                String fileName = getUUID() + extension;

                try {
                    File file1 = new File(ConstantVariable.UPLOAD_PATH + fileName);
                    uploadFile.transferTo(file1);

                    imgVO.setAttachedFileName(fileName);
                    imgVO.setOriginFileName(uploadFile.getOriginalFilename());
                    imgList.add(imgVO);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }
        return imgList;
    }
    
}
