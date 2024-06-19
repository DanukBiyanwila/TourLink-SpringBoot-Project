package com.hm.serviceImpl;

import java.awt.print.Pageable;
import java.util.List;

import org.springframework.data.domain.Page;

import com.hm.model.GenericModel;
import com.hm.repository.GenericRepository;
import com.hm.service.GenericService;
import com.hm.type.Status;

public class GenericServiceImpl<T extends GenericModel<T>> implements GenericService<T>{
	
	private GenericRepository<T> repository;
	
	public GenericServiceImpl(GenericRepository<T> repository) {
		this.repository = repository;
	}
	
	@Override
	public List<T> findAll() {
		List<T> list = (List<T>) repository.findAll();
		return list;
	}

	@Override
	public T findById(String id) {
		T entity = (T) repository.findById(id).orElse(null);
		return entity;
	}

	@Override
	public List<T> findAllByStatus(Byte status) {
		List<T> list = (List<T>) repository.findAllByStatus(status);
		return list;
	}

	@Override
	public List<T> findAllByStatusAscendingOrder(Byte status) {
		List<T> list = (List<T>) repository.findAllByStatus(status);
		return list;
	}

	@Override
	public T save(T entity) {
		T saved = repository.save(entity);
		return saved;
	}

	@Override
	public T update(T entity) {
		T saved = repository.save(entity);
		return saved;
	}

	@Override
	public void permanentDelete(T entity) {
		try {
			repository.delete(entity);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}

	@Override
	public void permanentDeleteById(String id) {
		try {
			repository.deleteById(id);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

//	@Override
//	public void deleteById(String id) {
//		try {
//			T entity = repository.findById(id).orElse(null);
//			entity.setStatus(Status.DELETED.getDbValue().byteValue());
//			repository.save(entity);
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//		
//	}
//
//	@Override
//	public void restoreById(String id) {
//		try {
//			T entity = repository.findById(id).orElse(null);
//			entity.setStatus(Status.ACTIVE.getDbValue().byteValue());
//			repository.save(entity);
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//	}
//
//	@Override
//	public Page<T> getAllEntities(Pageable pageable) {
//		Page<T> all = (Page<T>) repository.findAll(pageable);
//		return all;
//	}

}
