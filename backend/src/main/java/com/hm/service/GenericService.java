package com.hm.service;

import java.awt.print.Pageable;
import java.util.List;

import org.springframework.data.domain.Page;

public interface GenericService<T> {
	
	   T findById(final String id);
	   
	   List<T> findAll();
	   
	   List<T> findAllByStatus(final Byte status);
	   
	   List<T> findAllByStatusAscendingOrder(final Byte status);
	 
	   T save(final T entity);
	 
	   T update(final T entity);
	 
	   void permanentDelete(final T entity);
	 
	   void permanentDeleteById(final String id);
	   
//	   void deleteById(final String id);
//	   
//	   void restoreById(final String id);
//	   
//	   public Page<T> getAllEntities(Pageable pageable);

}
