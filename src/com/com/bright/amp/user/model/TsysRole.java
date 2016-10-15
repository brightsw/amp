package com.com.bright.amp.user.model;

import org.apache.ibatis.type.Alias;

@Alias("TsysRole")
public class TsysRole {
    
    private Integer roleid;

    private String rolename;
    
    private String rolenameen;

    private String description;

    private String descriptionen;

    private Integer rolecategory;
    
    private Integer issysdefault;
    
    private Integer status;
    
    private Integer usercount;

	public Integer getRoleid() {
		return roleid;
	}

	public void setRoleid(Integer roleid) {
		this.roleid = roleid;
	}

	public String getRolename() {
		return rolename;
	}

	public void setRolename(String rolename) {
		this.rolename = rolename;
	}

	public String getRolenameen() {
		return rolenameen;
	}

	public void setRolenameen(String rolenameen) {
		this.rolenameen = rolenameen;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getDescriptionen() {
		return descriptionen;
	}

	public void setDescriptionen(String descriptionen) {
		this.descriptionen = descriptionen;
	}

	public Integer getRolecategory() {
		return rolecategory;
	}

	public void setRolecategory(Integer rolecategory) {
		this.rolecategory = rolecategory;
	}

	public Integer getIssysdefault() {
		return issysdefault;
	}

	public void setIssysdefault(Integer issysdefault) {
		this.issysdefault = issysdefault;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public Integer getUsercount() {
		return usercount;
	}

	public void setUsercount(Integer usercount) {
		this.usercount = usercount;
	}

}
