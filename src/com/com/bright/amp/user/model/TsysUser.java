package com.com.bright.amp.user.model;

import java.util.Date;
import java.util.List;

import org.apache.ibatis.type.Alias;

@Alias("TsysUser")
public class TsysUser {
    private Integer userid;
    
    private Integer usergroupid;

    private Integer roleid;
    
    private String loginname;
    
    private String username;
    
    private String jobnum;
    
    private String email;
    
    private String telephone;
    
    private String mobilephone;
    
    private String ipaddress;
    
    private Integer policyid;
    
    private String password;
    
    private String description;
    
    private Integer status;
    
    private Integer issysdefault;
    
    private Date createtime;
    
    private Date lastlogintime;
    
    private String themetype;
    
    private Integer prefix;
    
    private String startstandardip;
    
    private String endstandardip;
    
    private Integer verifyipaddr;
    
    private String rolename;

    private String rolenameen;

    private String groupname;

    private String groupnameen;
    
    private String orginalpassword;
    
    private Integer updatepwdcount;
    
    private List<TsysRole> roles;
    
	public Integer getUserid() {
		return userid;
	}

	public void setUserid(Integer userid) {
		this.userid = userid;
	}

	public Integer getUsergroupid() {
		return usergroupid;
	}

	public void setUsergroupid(Integer usergroupid) {
		this.usergroupid = usergroupid;
	}

	public Integer getRoleid() {
		return roleid;
	}

	public void setRoleid(Integer roleid) {
		this.roleid = roleid;
	}

	public String getLoginname() {
		return loginname;
	}

	public void setLoginname(String loginname) {
		this.loginname = loginname;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getJobnum() {
		return jobnum;
	}

	public void setJobnum(String jobnum) {
		this.jobnum = jobnum;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getTelephone() {
		return telephone;
	}

	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}

	public String getMobilephone() {
		return mobilephone;
	}

	public void setMobilephone(String mobilephone) {
		this.mobilephone = mobilephone;
	}

	public String getIpaddress() {
		return ipaddress;
	}

	public void setIpaddress(String ipaddress) {
		this.ipaddress = ipaddress;
	}

	public Integer getPolicyid() {
		return policyid;
	}

	public void setPolicyid(Integer policyid) {
		this.policyid = policyid;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public Integer getIssysdefault() {
		return issysdefault;
	}

	public void setIssysdefault(Integer issysdefault) {
		this.issysdefault = issysdefault;
	}

	public Date getCreatetime() {
		return createtime;
	}

	public void setCreatetime(Date createtime) {
		this.createtime = createtime;
	}

	public Date getLastlogintime() {
		return lastlogintime;
	}

	public void setLastlogintime(Date lastlogintime) {
		this.lastlogintime = lastlogintime;
	}

	public String getThemetype() {
		return themetype;
	}

	public void setThemetype(String themetype) {
		this.themetype = themetype;
	}

	public Integer getPrefix() {
		return prefix;
	}

	public void setPrefix(Integer prefix) {
		this.prefix = prefix;
	}

	public String getStartstandardip() {
		return startstandardip;
	}

	public void setStartstandardip(String startstandardip) {
		this.startstandardip = startstandardip;
	}

	public String getEndstandardip() {
		return endstandardip;
	}

	public void setEndstandardip(String endstandardip) {
		this.endstandardip = endstandardip;
	}

	public Integer getVerifyipaddr() {
		return verifyipaddr;
	}

	public void setVerifyipaddr(Integer verifyipaddr) {
		this.verifyipaddr = verifyipaddr;
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

	public String getGroupname() {
		return groupname;
	}

	public void setGroupname(String groupname) {
		this.groupname = groupname;
	}

	public String getGroupnameen() {
		return groupnameen;
	}

	public void setGroupnameen(String groupnameen) {
		this.groupnameen = groupnameen;
	}

	public String getOrginalpassword() {
		return orginalpassword;
	}

	public void setOrginalpassword(String orginalpassword) {
		this.orginalpassword = orginalpassword;
	}

	public Integer getUpdatepwdcount() {
		return updatepwdcount;
	}

	public void setUpdatepwdcount(Integer updatepwdcount) {
		this.updatepwdcount = updatepwdcount;
	}

	public List<TsysRole> getRoles() {
		return roles;
	}

	public void setRoles(List<TsysRole> roles) {
		this.roles = roles;
	}
    
}
