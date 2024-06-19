package com.hm.hotel_management.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hm.hotel_management.dao.HotelPackageDao;
import com.hm.hotel_management.model.HotelPackage;
import com.hm.hotel_management.service.HotelPackageService;
import com.hm.serviceImpl.GenericServiceImpl;

@Service
public class HotelPackageServiceImpl extends GenericServiceImpl<HotelPackage> implements HotelPackageService{

	private HotelPackageDao<HotelPackage> packageDao;
	
	@Autowired
	public HotelPackageServiceImpl(HotelPackageDao<HotelPackage> packageDao) {
		super(packageDao);
		this.packageDao = packageDao;
	}

	@Override
	public List<HotelPackage> getAllPackageByHotelId(String id) {
		List<HotelPackage> all = packageDao.getAllPackageByHotelId(id);
		return all;
	}

	@Override
	public HotelPackage getAllPackageById(String packageid) {
		HotelPackage all = packageDao.getAllPackageById(packageid);
		return all;
	}
	
}
