package com.hm.hotel_management.restImpl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.hm.hotel_management.model.DriverGuidePackage;
import com.hm.hotel_management.model.TouristPackage;
import com.hm.hotel_management.rest.TouristPackageController;
import com.hm.hotel_management.service.TouristPackageService;

@RestController
public class TouristPackageControllerImpl implements TouristPackageController{
	
	@Autowired
	private TouristPackageService packageService;

	@Override
	public ResponseEntity<?> getAllTouristPackages() {
		List<TouristPackage> getAll = packageService.findAll();
		return ResponseEntity.ok(getAll);
	}

	@Override
	public ResponseEntity<?> getAlltouristPackesById(String id) {
		List<TouristPackage> getAll = packageService.getAllTouristPackagesById(id);
		
		List<DriverGuidePackage> allPackages = new ArrayList<>();
		
		for(TouristPackage a : getAll) {
			DriverGuidePackage one = a.getDriverGuidePackageId();
			
			allPackages.add(one);
			
		}
		return ResponseEntity.ok(allPackages);
	}

}
