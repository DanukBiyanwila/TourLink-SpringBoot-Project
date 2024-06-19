package com.hm.hotel_management.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hm.hotel_management.dao.HotelRatingDao;
import com.hm.hotel_management.model.HotelRating;
import com.hm.hotel_management.service.HotelRatingService;
import com.hm.serviceImpl.GenericServiceImpl;

@Service
public class HotelRatingServiceImpl extends GenericServiceImpl<HotelRating> implements HotelRatingService{
	
	private HotelRatingDao<HotelRating> ratingDao;
	
	@Autowired
	private HotelRatingServiceImpl(HotelRatingDao<HotelRating> ratingDao) {
		super(ratingDao);
		this.ratingDao = ratingDao;
	}

	@Override
	public List<HotelRating> getAllHotelRatingsById(String id) {
		List<HotelRating> getAllHotelRatingsById = ratingDao.getAllHotelRatingsById(id);
		return getAllHotelRatingsById;
	}

}
