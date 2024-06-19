package com.hm.hotel_management.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hm.hotel_management.dao.TravelInsuranceDao;
import com.hm.hotel_management.model.TravelInsurance;
import com.hm.hotel_management.service.TravelInsuranceService;
import com.hm.serviceImpl.GenericServiceImpl;

@Service
public class TravelInsuranceServiceImpl extends GenericServiceImpl<TravelInsurance> implements TravelInsuranceService{
	
	private TravelInsuranceDao<TravelInsurance> insuranceDao;
	
	@Autowired
	public TravelInsuranceServiceImpl(TravelInsuranceDao<TravelInsurance> insuranceDao) {
		super(insuranceDao);
		this.insuranceDao = insuranceDao;
	}

}
