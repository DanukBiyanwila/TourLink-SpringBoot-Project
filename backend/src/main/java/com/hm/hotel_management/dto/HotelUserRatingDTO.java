package com.hm.hotel_management.dto;

import java.sql.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class HotelUserRatingDTO {
	
	private String userID;
	private String ratingId;
	private String userName;
	private Double rating;
	private String comment;
	private Date ratingDateTime;
	
}
