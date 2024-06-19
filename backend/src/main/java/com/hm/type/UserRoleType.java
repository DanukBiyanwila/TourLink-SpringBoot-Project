package com.hm.type;

public enum UserRoleType {

	ADMIN("1","admin"), DRIVER("2","driver"), TOURIST("3","tourist"),
	GUIDE("4","guide");
	
	private String dbValue;
	
	private String displayName;
	
	UserRoleType(String dbValue, String displayName) {
		this.dbValue=dbValue;
		this.displayName = displayName;
	}

	public String getDbValue() {
		return dbValue;
	}

	public void setDbValue(String dbValue) {
		this.dbValue = dbValue;
	}
	
	public String getDisplayName() {
		return displayName;
	}

	public void setDisplayName(String displayName) {
		this.displayName = displayName;
	}
}
