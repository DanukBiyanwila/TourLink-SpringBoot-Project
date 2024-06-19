package com.hm.hotel_management.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.hm.hotel_management.model.DriverGuidePackage;
import com.hm.service.GenericService;

public interface DriverGuidePackageService extends GenericService<DriverGuidePackage>{
	
	List<DriverGuidePackage> getAllPackgesByUserAccountId(final String id);

	DriverGuidePackage getAllByPackageId(String packageid);

}
