package com.bright.amp.core.log;

public class LogType {
	public static LogType LOGIN = new LogType(0,1);
	public static LogType LOGOUT = new LogType(1,1);
	public static LogType OPERATOR = new LogType(2,1); 
	public static LogType RUNING  = new LogType(2,1);
	public static LogType WARNING  = new LogType(2,2);
	public static String TAGFLAG = "HAWK-LOG:"; 
	
	public LogType(int type, int level){
		this.type = type;
		this.level = level;
	}
	
	/**
	 *  日志类型 
	 *  0：用户登录  
	 *  1：用户注销 
	 *  2：用户操作 
	 *  3：运行日志   
	 */
	private int type;
	
	/**
	 * 日志级别 
	 * 0：致命
	 * 1：严重 
	 * 2：警告 
	 * 3：信息
	 *  4：调试
	 */
	private int level;
	
	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}

	public int getLevel() {
		return level;
	}

	public void setLevel(int level) {
		this.level = level;
	}
	
}
