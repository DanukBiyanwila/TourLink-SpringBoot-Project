package com.hm.model;

import javax.persistence.MappedSuperclass;

@MappedSuperclass
public class GenericModel<T> implements Comparable<GenericModel<T>>{

	@Override
	public int compareTo(GenericModel<T> o) {
		// TODO Auto-generated method stub
		return 0;
	}

}
