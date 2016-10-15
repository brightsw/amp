package com.bright.amp.authc.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.bright.amp.authc.dao.TsysModuleDao;
import com.bright.amp.authc.model.TsysModule;
import com.polydata.framework.core.service.BaseService;

@Service("frameService")
public class FrameService extends BaseService<TsysModule, TsysModuleDao> {
	
    public List<TsysModule> getModuleByUserId(String userId){
        return dao.getByUserId(userId);
    }
    
    public List<TsysModule> getTopModuleByUserId(String userId){
        return dao.getTopModuleByUserId(userId);
    }
    
    public List<TsysModule> getModuleByUserIdAndModId(Map<String,String> map){
        return dao.getModuleByUserIdAndModId(map);
    }
    
    public List<TsysModule> getSecondModuleByUserIdAndModId(Map<String,String> map){
        return dao.getSecondModuleByUserIdAndModId(map);
    }
}
