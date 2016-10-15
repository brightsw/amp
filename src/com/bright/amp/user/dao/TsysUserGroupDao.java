package com.bright.amp.user.dao;

import java.util.List;
import java.util.Map;

import com.bright.amp.user.model.TsysUserGroup;
import com.polydata.framework.core.dao.BaseDao;
import com.polydata.framework.core.spring.Dao;

@Dao("tsysUserGroupDao")
public class TsysUserGroupDao extends BaseDao<TsysUserGroup> {

    @SuppressWarnings("unchecked")
    public List<TsysUserGroup> listGroupTree(Map<String,Object> map){
        return this.getSqlSession().selectList(this.getEntityClass().getName() + ".listGroupTree",map);
    }

}
