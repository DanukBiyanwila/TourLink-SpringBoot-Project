package com.hm.hotel_management.dto;

import java.sql.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DriverGuideRatingDTO {
	
	private String touristID;
	private String ratingId;
	private String userName;
	private Double rating;
	private String comment;
	private Date ratingDateTime;

}
