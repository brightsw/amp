package com.bright.amp.account.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.bright.amp.account.dao.TaccountTypeDao;
import com.bright.amp.account.model.TaccountType;
import com.polydata.exception.ParameterException;
import com.polydata.framework.core.service.BaseService;

@Service("accountTypeService")
public class AccountTypeService extends BaseService<TaccountType,TaccountTypeDao>{

	public void addAccountType(TaccountType accounttype) throws ParameterException{
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("typename", accounttype.getTypename());
		if(dao.count(map)>0){
			throw new ParameterException("账目类别名称重复!");
		}
		dao.insert(accounttype);
	}
	
	public void delete(Integer[] gids){
		for(Integer gid : gids){
			dao.delete(gid);
		}
	}
}
