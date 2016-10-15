package com.bright.amp.user.dao;

import com.bright.amp.user.model.TsysUser;
import com.polydata.framework.core.dao.BaseDao;
import com.polydata.framework.core.spring.Dao;

@Dao("tsysUserDao")
public class TsysUserDao extends BaseDao<TsysUser> {

    public TsysUser getByLoginName(String loginName) {
        return (TsysUser) this.getSqlSession().selectOne(this.getEntityClass().getName() + ".getByLoginName", loginName);
    }

    public TsysUser getUserByName(String username) {
        return (TsysUser) this.getSqlSession().selectOne(this.getEntityClass().getName() + ".getUserByName", username);
    }
    
    public TsysUser getUserById(String userid) {
        return (TsysUser) this.getSqlSession().selectOne(this.getEntityClass().getName() + ".getUserById", userid);
    }
}
