package com.com.bright.amp.authc.model;

import java.util.List;

import org.apache.ibatis.type.Alias;

@Alias("TsysModule")
public class TsysModule {
    private String modid;

    private String modname;

    private String modlevel;

    private String parentid;

    private String url;

    private String modCode;

    private String iconName;
    
    private String subModuleFlag;
    
    private List<TsysModule> subModule;

	public String getModid() {
		return modid;
	}

	public void setModid(String modid) {
		this.modid = modid;
	}

	public String getModname() {
		return modname;
	}

	public void setModname(String modname) {
		this.modname = modname;
	}

	public String getModlevel() {
		return modlevel;
	}

	public void setModlevel(String modlevel) {
		this.modlevel = modlevel;
	}

	public String getParentid() {
		return parentid;
	}

	public void setParentid(String parentid) {
		this.parentid = parentid;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getModCode() {
		return modCode;
	}

	public void setModCode(String modCode) {
		this.modCode = modCode;
	}

	public String getIconName() {
		return iconName;
	}

	public void setIconName(String iconName) {
		this.iconName = iconName;
	}

	public List<TsysModule> getSubModule() {
		return subModule;
	}

	public void setSubModule(List<TsysModule> subModule) {
		this.subModule = subModule;
	}

    public String getSubModuleFlag() {
        return subModuleFlag;
    }

    public void setSubModuleFlag(String subModuleFlag) {
        this.subModuleFlag = subModuleFlag;
    }
	
}