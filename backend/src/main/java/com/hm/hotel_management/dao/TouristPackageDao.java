package com.hm.hotel_management.dao;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.hm.hotel_management.model.TouristPackage;
import com.hm.repository.GenericRepository;

public interface TouristPackageDao<T extends TouristPackage> extends GenericRepository<TouristPackage>{
	
	@Query("select t from TouristPackage t where t.touristId.id = :id")
	List<TouristPackage> getAllTouristPackagesByTouristId(@Param("id") String id);

}
