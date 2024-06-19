package com.hm.hotel_management.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hm.hotel_management.dao.TouristPackageDao;
import com.hm.hotel_management.model.TouristPackage;
import com.hm.hotel_management.service.TouristPackageService;
import com.hm.serviceImpl.GenericServiceImpl;

@Service
public class TouristPackageServiceImpl extends GenericServiceImpl<TouristPackage> implements TouristPackageService{
	
	private TouristPackageDao<TouristPackage> packageDao;
	
	@Autowired
	public TouristPackageServiceImpl(TouristPackageDao<TouristPackage> packageDao) {
		super(packageDao);
		this.packageDao = packageDao;
	}

	@Override
	public List<TouristPackage> getAllTouristPackagesById(String id) {
		List<TouristPackage> getAllPackage = packageDao.getAllTouristPackagesByTouristId(id);
		return getAllPackage;
	}

}
