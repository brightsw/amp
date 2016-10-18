package com.bright.amp.report.model;

import org.apache.ibatis.type.Alias;

@Alias("TrptTemplate")
public class TrptTemplate {
	
	private Integer templateid;
	private Integer typeid;
	private String templatename;
	private Integer charttype;
	private String chartsql;
	private String listsql;
	private String tablename;
	private String rptcondition;
	private String reserved;
	private Integer granularity;
	private Integer status;
	private Integer pid=0;

	public Integer getTemplateid() {
		return templateid;
	}

	public void setTemplateid(Integer templateid) {
		this.templateid = templateid;
	}

	public Integer getTypeid() {
		return typeid;
	}

	public void setTypeid(Integer typeid) {
		this.typeid = typeid;
	}

	public String getTemplatename() {
		return templatename;
	}

	public void setTemplatename(String templatename) {
		this.templatename = templatename;
	}

	public Integer getCharttype() {
		return charttype;
	}

	public void setCharttype(Integer charttype) {
		this.charttype = charttype;
	}

	public String getChartsql() {
		return chartsql;
	}

	public void setChartsql(String chartsql) {
		this.chartsql = chartsql;
	}

	public String getListsql() {
		return listsql;
	}

	public void setListsql(String listsql) {
		this.listsql = listsql;
	}

	public String getTablename() {
		return tablename;
	}

	public void setTablename(String tablename) {
		this.tablename = tablename;
	}

	public String getReserved() {
		return reserved;
	}

	public void setReserved(String reserved) {
		this.reserved = reserved;
	}

	public String getRptcondition() {
		return rptcondition;
	}

	public void setRptcondition(String rptcondition) {
		this.rptcondition = rptcondition;
	}

	public Integer getGranularity() {
		return granularity;
	}

	public void setGranularity(Integer granularity) {
		this.granularity = granularity;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public Integer getPid() {
		if(pid == null){
			pid = 0;
		}
		return pid;
	}

	public void setPid(Integer pid) {
		this.pid = pid;
	}
	
}
