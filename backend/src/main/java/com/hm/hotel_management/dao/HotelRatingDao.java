package com.hm.hotel_management.dao;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.hm.hotel_management.model.HotelRating;
import com.hm.repository.GenericRepository;

public interface HotelRatingDao<T extends HotelRating> extends GenericRepository<HotelRating> {
	
	@Query("select h from HotelRating h where h.hotel.id = :id")
	List<HotelRating> getAllHotelRatingsById(@Param("id")String id);

}
