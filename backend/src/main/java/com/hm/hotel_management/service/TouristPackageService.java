package com.hm.hotel_management.service;

import java.util.List;

import com.hm.hotel_management.model.TouristPackage;
import com.hm.service.GenericService;

public interface TouristPackageService extends GenericService<TouristPackage>{
	
	List<TouristPackage> getAllTouristPackagesById(final String id);

}
