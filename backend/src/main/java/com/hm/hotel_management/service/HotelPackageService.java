package com.hm.hotel_management.service;

import java.util.List;

import com.hm.hotel_management.model.HotelPackage;
import com.hm.service.GenericService;

public interface HotelPackageService extends GenericService<HotelPackage>{

	List<HotelPackage> getAllPackageByHotelId(final String id);

	HotelPackage getAllPackageById(String packageid);
}
