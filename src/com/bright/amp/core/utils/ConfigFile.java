package com.bright.amp.core.utils;

import java.io.FileInputStream;
import java.io.InputStream;
import java.util.Properties;


public class ConfigFile {
	public static String getRestConfigValue(String name) {
		String resultStr = "";
		try {
			Properties properties = new Properties();
			InputStream inputStream = new FileInputStream(System.getProperty("garuda.root")+ "/WEB-INF/classes/config/rest.properties");
			properties.load(inputStream);
			inputStream.close(); // 关闭流
			resultStr = properties.getProperty(name);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return resultStr;
	}
}
