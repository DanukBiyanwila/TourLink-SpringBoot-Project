package com.hm.hotel_management.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hm.hotel_management.dao.HotelDao;
import com.hm.hotel_management.model.Hotel;
import com.hm.hotel_management.service.HotelService;
import com.hm.serviceImpl.GenericServiceImpl;

@Service
public class HotelServiceImpl extends GenericServiceImpl<Hotel> implements HotelService{
	
	
	private HotelDao<Hotel> hotelDao;

	
	@Autowired
	public HotelServiceImpl(HotelDao<Hotel> hotelDao) {
		super(hotelDao);
		this.hotelDao = hotelDao;
	}

}
