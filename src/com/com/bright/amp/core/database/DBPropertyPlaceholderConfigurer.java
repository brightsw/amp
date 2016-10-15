package com.com.bright.amp.core.database;

import java.util.Properties;

import org.springframework.beans.BeansException;
import org.springframework.beans.factory.BeanInitializationException;
import org.springframework.beans.factory.config.ConfigurableListableBeanFactory;
import org.springframework.beans.factory.config.PropertyPlaceholderConfigurer;

import com.polydata.commons.util.CharTurn;

/**
 * DB����
 * Create DateTime: Dec 1, 2009 1:00:11 PM
 * @author steven
 * @version 1.0
 */
public class DBPropertyPlaceholderConfigurer extends PropertyPlaceholderConfigurer {
    protected void processProperties(ConfigurableListableBeanFactory beanFactory, Properties props)
            throws BeansException { 
    	try {  
	        String dialect = props.getProperty("dialect");
	        String password = CharTurn.paraDecrypt(props.getProperty(dialect+".password").trim()).trim();
	        props.setProperty("jdbc.password", password);
	        super.processProperties(beanFactory, props);
    	}catch(Exception e){
    		throw new BeanInitializationException(e.getMessage());
    	}
    }

    public static void main(String args[]) throws Exception{
    	System.out.println(CharTurn.paraEncrypt("polydata"));
    }
}
