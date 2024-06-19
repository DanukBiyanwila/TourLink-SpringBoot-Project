package com.hm.hotel_management.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hm.hotel_management.model.Hotel;
import com.hm.repository.GenericRepository;

public interface HotelDao<T extends Hotel> extends GenericRepository<Hotel>{

}
