package com.hm.hotel_management.dao;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.hm.hotel_management.model.DriverGuidePackage;
import com.hm.repository.GenericRepository;

public interface DriverGuidePackageDao<T extends DriverGuidePackage> extends GenericRepository<DriverGuidePackage> {

	@Query("select p from DriverGuidePackage p where p.account.id = :id and p.status = 0")
	List<DriverGuidePackage> getAllPackagesByUserAccountId(@Param("id") String id);

	@Query("select p from DriverGuidePackage p where p.id = :id and p.status = 0")
	DriverGuidePackage getAllByPackageId(@Param("id") String packageid);
	
}
