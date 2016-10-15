package com.com.bright.amp.system.model;

import org.apache.ibatis.type.Alias;

@Alias("TsysParamCategory")
public class TsysParamCategory {
    private Integer paramcategoryid;
    
    private String paramcategoryname;
    
    private String paramcategorynameen;
    
    private String paramcategorydesc;
    
    private String paramcategorydescen;
    
    private Integer isvisable;

	public Integer getParamcategoryid() {
		return paramcategoryid;
	}

	public void setParamcategoryid(Integer paramcategoryid) {
		this.paramcategoryid = paramcategoryid;
	}

	public String getParamcategoryname() {
		return paramcategoryname;
	}

	public void setParamcategoryname(String paramcategoryname) {
		this.paramcategoryname = paramcategoryname;
	}

	public String getParamcategorynameen() {
		return paramcategorynameen;
	}

	public void setParamcategorynameen(String paramcategorynameen) {
		this.paramcategorynameen = paramcategorynameen;
	}

	public String getParamcategorydesc() {
		return paramcategorydesc;
	}

	public void setParamcategorydesc(String paramcategorydesc) {
		this.paramcategorydesc = paramcategorydesc;
	}

	public String getParamcategorydescen() {
		return paramcategorydescen;
	}

	public void setParamcategorydescen(String paramcategorydescen) {
		this.paramcategorydescen = paramcategorydescen;
	}

	public Integer getIsvisable() {
		return isvisable;
	}

	public void setIsvisable(Integer isvisable) {
		this.isvisable = isvisable;
	}
    
}
