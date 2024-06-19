package com.hm.hotel_management.serviceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hm.hotel_management.dao.OtherFacilitiesDao;
import com.hm.hotel_management.model.OtherFacilities;
import com.hm.hotel_management.service.OtherFacilitiesService;
import com.hm.serviceImpl.GenericServiceImpl;

@Service
public class OtherFacilitiesServiceImpl extends GenericServiceImpl<OtherFacilities> implements OtherFacilitiesService{
	
	private OtherFacilitiesDao<OtherFacilities> facilitiesDao;
	
	@Autowired
	public OtherFacilitiesServiceImpl(OtherFacilitiesDao<OtherFacilities> facilitiesDao) {
		super(facilitiesDao);
		this.facilitiesDao = facilitiesDao;
	}

}
