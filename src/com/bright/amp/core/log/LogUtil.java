package com.bright.amp.core.log;

import org.slf4j.Logger;

public class LogUtil  {
	private  Logger logger;
	
	public LogUtil(Logger logger){
		this.logger = logger;
	}
	
	public  void trace(String message){
		logger.trace(message);
	}
	
	public  void trace(String message,Throwable throwable){
		logger.trace(message, throwable);
	}
	
	public  void debug(String message){
		logger.debug(message);
	}
	
	public  void debug(String message,Throwable throwable){
		logger.debug(message, throwable);
	}
	
	public  void info(String message){
		logger.info(message);
	}
	
	public  void info(String message,Throwable throwable){
		logger.info(message, throwable);
	}
	
	public  void info(String message,LogType logType){
		logger.info("{}"+ message,LogType.TAGFLAG,logType);
	}
	
	public  void warn(String message){
		logger.warn(message);
	}
	
	public  void warn(String message,Throwable throwable){
		logger.warn(message, throwable);
	}
	
	public  void warn(String message,LogType logType){
		logger.warn("{}"+message,LogType.TAGFLAG,logType);
	}
	
	public  void error(String message){
		logger.error(message);
	}
	
	public  void error(String message,Throwable throwable){
		logger.error(message, throwable);
	}
	
	public  void error(String message,LogType logType){
		logger.error("{}"+message,LogType.TAGFLAG,logType);
	}


}