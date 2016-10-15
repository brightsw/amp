package com.bright.amp.account.model;

import org.apache.ibatis.type.Alias;

@Alias("TaccountType")
public class TaccountType {
    private Integer typeid;
    
    private String typename;

	public Integer getTypeid() {
		return typeid;
	}

	public void setTypeid(Integer typeid) {
		this.typeid = typeid;
	}

	public String getTypename() {
		return typename;
	}

	public void setTypename(String typename) {
		this.typename = typename;
	}
    
}
