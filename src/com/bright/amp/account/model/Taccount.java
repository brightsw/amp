package com.bright.amp.account.model;

import java.util.Date;

import org.apache.ibatis.type.Alias;

@Alias("Taccount")
public class Taccount {
	private Integer gid;

	private Integer money;

	private Integer acctype;

	private String accdate;

	private String accmon;

	private String accyear;

	private Date recdate;

	private Integer recuser;

	private String username;

	private String typename;

	private String description;

	public Integer getGid() {
		return gid;
	}

	public void setGid(Integer gid) {
		this.gid = gid;
	}

	public Integer getMoney() {
		return money;
	}

	public void setMoney(Integer money) {
		this.money = money;
	}

	public Integer getAcctype() {
		return acctype;
	}

	public void setAcctype(Integer acctype) {
		this.acctype = acctype;
	}

	public String getAccdate() {
		return accdate;
	}

	public void setAccdate(String accdate) {
		this.accdate = accdate;
	}

	public String getAccmon() {
		return accmon;
	}

	public void setAccmon(String accmon) {
		this.accmon = accmon;
	}

	public String getAccyear() {
		return accyear;
	}

	public void setAccyear(String accyear) {
		this.accyear = accyear;
	}

	public Date getRecdate() {
		return recdate;
	}

	public void setRecdate(Date recdate) {
		this.recdate = recdate;
	}

	public Integer getRecuser() {
		return recuser;
	}

	public void setRecuser(Integer recuser) {
		this.recuser = recuser;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getTypename() {
		return typename;
	}

	public void setTypename(String typename) {
		this.typename = typename;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

}
