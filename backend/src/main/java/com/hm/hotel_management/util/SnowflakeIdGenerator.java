package com.hm.hotel_management.util;

import java.io.Serializable;

import org.hibernate.HibernateException;
import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.id.IdentifierGenerator;

public class SnowflakeIdGenerator implements IdentifierGenerator {

	private Snowflake snowflake = new Snowflake();

	public SnowflakeIdGenerator() {
	}

	@Override
	public Serializable generate(SharedSessionContractImplementor sharedSessionContractImplementor, Object o)
			throws HibernateException {
		return String.valueOf(this.snowflake.newId());
	}
}
