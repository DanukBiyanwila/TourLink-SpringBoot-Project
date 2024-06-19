package com.hm.hotel_management.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hm.hotel_management.model.UserRole;

public interface RoleDao extends JpaRepository<UserRole, Integer> {
	Optional<UserRole> findByName(String name); 
}
