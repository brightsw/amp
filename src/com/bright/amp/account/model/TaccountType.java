package com.bright.amp.account.model;

import org.apache.ibatis.type.Alias;

@Alias("TaccountType")
public class TaccountType {
	private Integer typeid;

	private String typename;

	private Integer capitaluse;

	private Integer incomeuse;

	private Integer spenduse;

	private String description;

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

	public Integer getCapitaluse() {
		return capitaluse;
	}

	public void setCapitaluse(Integer capitaluse) {
		this.capitaluse = capitaluse;
	}

	public Integer getIncomeuse() {
		return incomeuse;
	}

	public void setIncomeuse(Integer incomeuse) {
		this.incomeuse = incomeuse;
	}

	public Integer getSpenduse() {
		return spenduse;
	}

	public void setSpenduse(Integer spenduse) {
		this.spenduse = spenduse;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

}
