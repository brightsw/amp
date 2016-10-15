package com.bright.amp.system.service;

import org.springframework.stereotype.Service;

import com.bright.amp.system.dao.TsysLogDao;
import com.bright.amp.system.model.TsysLog;
import com.polydata.framework.core.service.BaseService;

@Service("logManagerService")
public class LogManagerService extends BaseService<TsysLog,TsysLogDao>{

}