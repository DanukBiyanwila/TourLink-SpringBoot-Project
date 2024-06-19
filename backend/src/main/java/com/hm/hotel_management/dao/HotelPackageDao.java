package com.hm.hotel_management.dao;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.hm.hotel_management.model.HotelPackage;
import com.hm.repository.GenericRepository;

public interface HotelPackageDao<T extends HotelPackage> extends GenericRepository<HotelPackage> {

	@Query("select p from HotelPackage p where p.hotel.id = :id and p.status = 0")
	List<HotelPackage> getAllPackageByHotelId(@Param("id") String id);

	@Query("select p from HotelPackage p where p.id = :id and p.status = 0")
	HotelPackage getAllPackageById(@Param("id") String packageid);
}
