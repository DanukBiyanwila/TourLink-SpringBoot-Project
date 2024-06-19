package com.hm.hotel_management.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hm.hotel_management.dao.DriverGuideRatingDao;
import com.hm.hotel_management.model.DriverGuideRating;
import com.hm.hotel_management.service.DriverGuideRatingService;
import com.hm.serviceImpl.GenericServiceImpl;

@Service
public class DriverGuideRatingServiceImpl extends GenericServiceImpl<DriverGuideRating> implements DriverGuideRatingService{
	
	private DriverGuideRatingDao<DriverGuideRating> ratingDao;
	
	@Autowired
	public DriverGuideRatingServiceImpl(DriverGuideRatingDao<DriverGuideRating> ratingDao) {
		super(ratingDao);
		this.ratingDao = ratingDao;
	}

	@Override
	public List<DriverGuideRating> getAllDriverGuideRatingById(String id) {
		List<DriverGuideRating> all = ratingDao.getAllDriverGuideRatingById(id);
		return all;
	}

}
