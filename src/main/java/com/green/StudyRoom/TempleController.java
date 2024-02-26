package com.green.StudyRoom;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class TempleController {

    @GetMapping("/")
    public String main(){
        return "content/1_content";
    }
}
