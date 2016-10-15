package com.com.bright.amp.user.dao;

import java.util.List;
import java.util.Map;

import com.com.bright.amp.user.model.TsysRole;
import com.polydata.framework.core.dao.BaseDao;
import com.polydata.framework.core.spring.Dao;

@Dao("tsysRoleDao")
public class TsysRoleDao extends BaseDao<TsysRole> {

    @SuppressWarnings("unchecked")
    public List<TsysRole> findPrivRoleCategory(Map<String,Object> map){
        return this.getSqlSession().selectList(this.getEntityClass().getName() + ".findPrivRoleCategory",map);
    }

}
