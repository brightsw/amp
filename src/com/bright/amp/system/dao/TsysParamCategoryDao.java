package com.bright.amp.system.dao;

import java.util.List;
import java.util.Map;

import com.bright.amp.system.model.TsysParamCategory;
import com.polydata.framework.core.dao.BaseDao;
import com.polydata.framework.core.spring.Dao;

@Dao("tsysParamCategoryDao")
public class TsysParamCategoryDao extends BaseDao<TsysParamCategory> {

    @SuppressWarnings("unchecked")
    public List<TsysParamCategory> findByIds(Map<String,Object> map){
        return this.getSqlSession().selectList(this.getEntityClass().getName() + ".findByIds",map);
    }
    
}
