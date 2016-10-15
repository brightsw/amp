package com.com.bright.amp.system.model;

import java.util.Date;

import org.apache.ibatis.type.Alias;

@Alias("TsysLog")
public class TsysLog {
    private Integer logid;
    
    private String componentname;
    
    private String ipaddress;
    
    private Integer loglevel;
    
    private String logcontent;
    
    private Date createtime;
    
    private String operatoruser;
    
    private Integer logtype;

	public Integer getLogid() {
		return logid;
	}

	public void setLogid(Integer logid) {
		this.logid = logid;
	}

	public String getComponentname() {
		return componentname;
	}

	public void setComponentname(String componentname) {
		this.componentname = componentname;
	}

	public String getIpaddress() {
		return ipaddress;
	}

	public void setIpaddress(String ipaddress) {
		this.ipaddress = ipaddress;
	}

	public Integer getLoglevel() {
		return loglevel;
	}

	public void setLoglevel(Integer loglevel) {
		this.loglevel = loglevel;
	}

	public String getLogcontent() {
		return logcontent;
	}

	public void setLogcontent(String logcontent) {
		this.logcontent = logcontent;
	}

	public Date getCreatetime() {
		return createtime;
	}

	public void setCreatetime(Date createtime) {
		this.createtime = createtime;
	}

	public String getOperatoruser() {
		return operatoruser;
	}

	public void setOperatoruser(String operatoruser) {
		this.operatoruser = operatoruser;
	}

	public Integer getLogtype() {
		return logtype;
	}

	public void setLogtype(Integer logtype) {
		this.logtype = logtype;
	}
    
}
