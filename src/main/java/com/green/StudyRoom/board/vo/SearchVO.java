package com.green.StudyRoom.board.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class SearchVO extends PageVO{
    private String searchType;
    private String searchValue;
}
