package com.hm.hotel_management.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.hm.hotel_management.model.User;
import com.hm.repository.GenericRepository;

public interface UserDao<T extends User> extends GenericRepository<User> {

	@Query("Select u from User u where u.email = :email")
	User findByEmailId(@Param("email") String email);
	
	@Query("select u from User u where u.account.id = :id")
	User getUserByUserAccountId(@Param("id") String id);

	
	@Query("select u from User u where u.role.id = :id")
	List<User> getAllUsersByUserRole(@Param("id") String id);

	@Query("select u from User u where u.id = :id")
	User findAll(@Param("id") String id);

	
}
