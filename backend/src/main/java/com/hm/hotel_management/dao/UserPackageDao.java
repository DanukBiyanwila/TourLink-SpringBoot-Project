package com.hm.hotel_management.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.hm.hotel_management.model.User;
import com.hm.hotel_management.model.UserPackage;
import com.hm.repository.GenericRepository;

public interface UserPackageDao<T extends UserPackage> extends GenericRepository<UserPackage> {

	@Query("select u from UserPackage u where u.toursitId = :id")
	List<UserPackage> getAll(@Param("id") String id);


	
}
