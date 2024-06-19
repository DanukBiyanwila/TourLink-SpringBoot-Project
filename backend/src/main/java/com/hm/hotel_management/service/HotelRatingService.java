package com.hm.hotel_management.service;

import java.util.List;

import com.hm.hotel_management.model.HotelRating;
import com.hm.service.GenericService;

public interface HotelRatingService extends GenericService<HotelRating> {
	
	List<HotelRating> getAllHotelRatingsById (final String id);

}
