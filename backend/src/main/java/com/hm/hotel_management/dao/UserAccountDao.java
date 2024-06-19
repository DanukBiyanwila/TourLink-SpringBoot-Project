package com.hm.hotel_management.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


import com.hm.hotel_management.model.UserAccount;
import com.hm.repository.GenericRepository;

public interface UserAccountDao<T extends UserAccount> extends GenericRepository<UserAccount> {

	@Query("Select u from UserAccount u where u.userName = :userName")
	UserAccount findByEmailId(@Param("userName") String userName);
	
	

}
