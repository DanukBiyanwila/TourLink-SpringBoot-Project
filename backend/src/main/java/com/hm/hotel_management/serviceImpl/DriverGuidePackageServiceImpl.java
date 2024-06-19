package com.hm.hotel_management.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hm.hotel_management.dao.DriverGuidePackageDao;
import com.hm.hotel_management.dao.UserDao;
import com.hm.hotel_management.model.DriverGuidePackage;
import com.hm.hotel_management.model.User;
import com.hm.hotel_management.service.DriverGuidePackageService;
import com.hm.serviceImpl.GenericServiceImpl;

@Service
public class DriverGuidePackageServiceImpl  extends GenericServiceImpl<DriverGuidePackage> implements DriverGuidePackageService{

	private DriverGuidePackageDao<DriverGuidePackage> packageDao;
	@Autowired
	UserDao userDao;
	
	@Autowired
	private DriverGuidePackageServiceImpl(DriverGuidePackageDao<DriverGuidePackage> packageDao) {
		super(packageDao);
		this.packageDao = packageDao;
	}

	@Override
	public List<DriverGuidePackage> getAllPackgesByUserAccountId(String id) {
		List<DriverGuidePackage> getAll = packageDao.getAllPackagesByUserAccountId(id);
		return getAll;
	}

	@Override
	public DriverGuidePackage getAllByPackageId(String packageid) {
		DriverGuidePackage getAll = packageDao.getAllByPackageId(packageid);
		return getAll;
	}
	
}
