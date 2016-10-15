package com.bright.amp.user.model;

import java.util.Date;

import org.apache.ibatis.type.Alias;

@Alias("TsysUserLoginInfo")
public class TsysUserLoginInfo {
	
    private Integer loginid;

    private Integer userid;

    private Date lastlogintime;

    private String lastloginip;

    private Date lastloginfailtime;

    private String lastloginfailip;

    private Integer availloginfailcount;

    private Date lastlocktime;
    
    private Integer issetlocktime;
    
    private Integer successcount;

	public Integer getLoginid() {
		return loginid;
	}

	public void setLoginid(Integer loginid) {
		this.loginid = loginid;
	}

	public Integer getUserid() {
		return userid;
	}

	public void setUserid(Integer userid) {
		this.userid = userid;
	}

	public Date getLastlogintime() {
		return lastlogintime;
	}

	public void setLastlogintime(Date lastlogintime) {
		this.lastlogintime = lastlogintime;
	}

	public String getLastloginip() {
		return lastloginip;
	}

	public void setLastloginip(String lastloginip) {
		this.lastloginip = lastloginip;
	}

	public Date getLastloginfailtime() {
		return lastloginfailtime;
	}

	public void setLastloginfailtime(Date lastloginfailtime) {
		this.lastloginfailtime = lastloginfailtime;
	}

	public String getLastloginfailip() {
		return lastloginfailip;
	}

	public void setLastloginfailip(String lastloginfailip) {
		this.lastloginfailip = lastloginfailip;
	}

	public Integer getAvailloginfailcount() {
		return availloginfailcount;
	}

	public void setAvailloginfailcount(Integer availloginfailcount) {
		this.availloginfailcount = availloginfailcount;
	}

	public Date getLastlocktime() {
		return lastlocktime;
	}

	public void setLastlocktime(Date lastlocktime) {
		this.lastlocktime = lastlocktime;
	}

	public Integer getIssetlocktime() {
		return issetlocktime;
	}

	public void setIssetlocktime(Integer issetlocktime) {
		this.issetlocktime = issetlocktime;
	}

	public Integer getSuccesscount() {
		return successcount;
	}

	public void setSuccesscount(Integer successcount) {
		this.successcount = successcount;
	}

}