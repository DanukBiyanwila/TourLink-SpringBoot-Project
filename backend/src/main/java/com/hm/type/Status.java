package com.hm.type;

public enum Status {
	ACTIVE(0,"active"),DELETED(1,"deleted"),PERMANENT_DELETED(2,"permanent-deleted"),HIDDEN(9,"hidden"),MAP(5,"map"), PUBLIC(8,"public"), PRIVATE(7,"private"),
	PENDING(3,"pending");
	
	
	private Integer dbValue;
	
	private String displayName;
	
	private Status(Integer dbValue,String displayName){
		this.dbValue=dbValue;
		this.displayName = displayName;
	}

	public Integer getDbValue() {
		return dbValue;
	}

	public void setDbValue(Integer dbValue) {
		this.dbValue = dbValue;
	}
	
	public String getDisplayName() {
		return displayName;
	}

	public void setDisplayName(String displayName) {
		this.displayName = displayName;
	}
}
