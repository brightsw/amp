package com.com.bright.amp.core.application;


import java.util.Locale;

import org.apache.commons.configuration.Configuration;
import org.apache.commons.configuration.PropertiesConfiguration;
import org.slf4j.LoggerFactory;

import com.com.bright.amp.core.log.LogUtil;

public class ApplicationInfo{
    /** logger */
    private static final LogUtil logger = new LogUtil(LoggerFactory.getLogger(ApplicationInfo.class));
    
    private static final String LANGUAGE_PATH = "config/language.properties";
    
    private static String curlang = "zh-CN";
    
    private static Locale curLocale = Locale.CHINA;
    
    private static boolean flag = false;
    
    static {
        init();
    }
    
    private static void init(){
        if(!flag){
            try{
                Configuration langConf = new PropertiesConfiguration(LANGUAGE_PATH);
                curlang = langConf.getString("language","zh-CN");
                if(curlang.equalsIgnoreCase("zh-CN")){
                    curLocale = Locale.CHINA;
                }else if(curlang.equalsIgnoreCase("en-US")){
                    curLocale = Locale.US;
                }
                
            }catch(Exception e){
               logger.error(e.getMessage()); 
            }
            
            flag = true;
        }
    }
    
    public static String getLang(){
        return curlang;
    }
    
    public static Locale getLocale(){
        return curLocale;
    }
}