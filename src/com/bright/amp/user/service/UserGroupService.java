package com.bright.amp.user.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bright.amp.user.dao.TsysRoleDao;
import com.bright.amp.user.dao.TsysUserGroupDao;
import com.bright.amp.user.model.TsysRole;
import com.bright.amp.user.model.TsysUserGroup;
import com.polydata.framework.core.service.BaseService;
import com.polydata.exception.ParameterException;

@Service("userGroupService")
public class UserGroupService extends BaseService<TsysUserGroup,TsysUserGroupDao>{

	@Autowired
	private TsysRoleDao tsysRoleDao;

	public void addGroup(TsysUserGroup group) throws ParameterException{
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("groupname", group.getGroupname());
		if(dao.count(map) > 0){
			throw new ParameterException("system.user.group.dupname");
		}
		group.setGroupnameen(group.getGroupname());
		dao.insert(group);
		
	}
	
	public void deleteGroup(Integer groupid)throws ParameterException{
		TsysUserGroup group = dao.getById(groupid);
		if(group == null){
			throw new ParameterException("system.user.group.notexist");
		}
		if(group.getIssysdefault() == 1){
			throw new ParameterException("system.user.group.sysunabledel");
		}
		if(group.getUsercount() > 0){
			throw new ParameterException("system.user.group.deluserfirst");
		}
		dao.delete(groupid);
	}
	
	public List<TsysUserGroup> listGroupTree(String loginUserId){
		Map<String,Object> map = new HashMap<String,Object>();
		TsysRole role = tsysRoleDao.getById(loginUserId);
		map.put("rolecategory", role.getRolecategory());
		return dao.listGroupTree(map);
	}
}
