package com.bright.amp.user.dao;

import java.util.Map;

import com.bright.amp.user.model.TsysUserLoginInfo;
import com.polydata.framework.core.dao.BaseDao;
import com.polydata.framework.core.spring.Dao;

@Dao("tsysUserLoginInfoDao")
public class TsysUserLoginInfoDao extends BaseDao<TsysUserLoginInfo> {

    public TsysUserLoginInfo getByUserId(String userId) {
        return (TsysUserLoginInfo)this.getSqlSession().selectOne(this.getEntityClass().getName() + ".getByUserId", userId);
    }

    public void deleteByUserId(String userId) {
        this.getSqlSession().delete(this.getEntityClass().getName() + ".deleteByUserId", userId);
    }
    
    public void updateSuccessCount(Map<String,Object> map) {
        this.getSqlSession().update(this.getEntityClass().getName() + ".updateSuccessCount", map);
    }
}
