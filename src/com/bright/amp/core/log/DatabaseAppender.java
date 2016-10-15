package com.bright.amp.core.log;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import ch.qos.logback.classic.net.LoggingEventPreSerializationTransformer;
import ch.qos.logback.classic.spi.ILoggingEvent;
import ch.qos.logback.classic.spi.LoggingEventVO;
import ch.qos.logback.core.AppenderBase;
import ch.qos.logback.core.spi.PreSerializationTransformer;

import com.bright.amp.core.utils.SessionUtil;
import com.bright.amp.system.model.TsysLog;
import com.bright.amp.system.service.LogManagerService;
import com.polydata.framework.core.spring.SpringUtils;

public  class DatabaseAppender extends AppenderBase<ILoggingEvent> {

	static int SUCCESSIVE_FAILURE_LIMIT = 3000;
	int successiveFailureCount = 0;

	private PreSerializationTransformer<ILoggingEvent> pst = new LoggingEventPreSerializationTransformer();

	public void append(ILoggingEvent eventObject) {
        String type = "";
        String loginIp ="";
        String loginUserName = "";
        HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();  
		if (!isStarted()) {
			return;
		}
		try {
			LoggingEventVO eventVO = (LoggingEventVO) pst.transform(eventObject);
			if( null == eventVO.getArgumentArray()){
				return;
			}
			LogType logType = (LogType) eventVO.getArgumentArray()[1];
			type = String.valueOf(logType.getType());
			loginIp = SessionUtil.getLoginIp();
			loginUserName = SessionUtil.getLoginUserDisplayName();
			if(loginUserName == null){
				loginUserName = request.getParameter("username");
			}
			if(loginIp == null){
				loginIp = request.getRemoteAddr();
			}
			TsysLog log = new TsysLog();
			log.setComponentname("web");
			log.setIpaddress(loginIp);
			log.setLoglevel(logType.getLevel());
			String message = eventVO.getMessage();
			if(message.startsWith("{}")){
				message = message.substring(message.indexOf("{}")+2, message.length());
			}
			log.setLogcontent(message);
			log.setOperatoruser(loginUserName);
			log.setLogtype(2);
	        LogManagerService logManagerService = (LogManagerService) SpringUtils.getBean("logManagerService");
	        logManagerService.insert(log);
			

		} catch (Exception e) {
			e.printStackTrace();
			successiveFailureCount++;
			if (successiveFailureCount > SUCCESSIVE_FAILURE_LIMIT) {
				stop();
			}
			addError("Could not publish message in JMSTopicAppender [" + name + "].", e);
		}
	}
	

}
