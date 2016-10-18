package com.bright.amp.report.dao;

import java.util.HashMap;
import java.util.Map;

import com.bright.amp.report.model.TstaCommon;
import com.polydata.framework.core.dao.BaseDao;
import com.polydata.framework.core.spring.Dao;

@Dao("staCommonDao")
public class TstaCommonDao extends BaseDao<TstaCommon> {

	public boolean isExist(String tablename){
		boolean exist = false;
		Map<String, Object> map = new HashMap<String, Object>();
		String SQL = "SELECT COUNT(*) AS VALUE FROM INFORMATION_SCHEMA.`TABLES` WHERE TABLE_NAME = '"+tablename+"'";
		map.put("querySQL", SQL);
		
		if("1".equals(query(map).get(0).getValue())){
			exist = true;
		}
		
		return exist;
	}
}
