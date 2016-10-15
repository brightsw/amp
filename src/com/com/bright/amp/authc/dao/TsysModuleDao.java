package com.com.bright.amp.authc.dao;

import java.util.List;
import java.util.Map;

import com.com.bright.amp.authc.model.TsysModule;
import com.polydata.framework.core.dao.BaseDao;
import com.polydata.framework.core.spring.Dao;

@Dao("tsysModuleDao")
public class TsysModuleDao extends BaseDao<TsysModule> {
    @SuppressWarnings("unchecked")
    public List<TsysModule> getByUserId(String userId) {
        return (List<TsysModule>)this.getSqlSession().selectList(this.getEntityClass().getName() + ".getByUserId", userId);
    }
    
    @SuppressWarnings("unchecked")
    public List<TsysModule> getTopModuleByUserId(String userId) {
        return (List<TsysModule>)this.getSqlSession().selectList(this.getEntityClass().getName() + ".getTopModuleByUserId", userId);
    }
    
    @SuppressWarnings("unchecked")
	public List<TsysModule> getModuleByUserIdAndModId(Map<String,String> map) {
        return (List<TsysModule>)this.getSqlSession().selectList(this.getEntityClass().getName() + ".getByUserIdAndModId", map);
    }
    
    @SuppressWarnings("unchecked")
	public List<TsysModule> getSecondModuleByUserIdAndModId(Map<String,String> map) {
        return (List<TsysModule>)this.getSqlSession().selectList(this.getEntityClass().getName() + ".getSecondByUserIdAndModId", map);
    }

    @SuppressWarnings("unchecked")
    public List<TsysModule> getByRoleId(String roleId) {
        return (List<TsysModule>)this.getSqlSession().selectList(this.getEntityClass().getName() + ".getByRoleId", roleId);
    }

}
