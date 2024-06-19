package com.hm.hotel_management.service;

import java.util.List;

import com.hm.hotel_management.model.DriverGuideRating;
import com.hm.service.GenericService;

public interface DriverGuideRatingService extends GenericService<DriverGuideRating>{
	
	List<DriverGuideRating> getAllDriverGuideRatingById (final String id);

}
