package com.com.bright.amp.user.model;

import org.apache.ibatis.type.Alias;

@Alias("TsysUserGroup")
public class TsysUserGroup {
    
    private Integer usergroupid;

    private String groupname;
    
    private String groupnameen;

    private String description;
    
    private Integer issysdefault;
    
    private Integer status;
    
    private Integer usercount;
    
    private String pid;

	public Integer getUsergroupid() {
		return usergroupid;
	}

	public void setUsergroupid(Integer usergroupid) {
		this.usergroupid = usergroupid;
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

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
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

    public String getPid() {
        return pid;
    }

    public void setPid(String pid) {
        this.pid = pid;
    }

}
