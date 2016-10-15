package com.com.bright.amp.web.listener;

import javax.servlet.ServletContextEvent;

import org.springframework.web.context.ContextLoaderListener;

public class HawkContextListener extends ContextLoaderListener {  

	private boolean isDeploymentMode = false;
	
	@Override
	public void contextDestroyed(ServletContextEvent arg0) {
		super.contextDestroyed(arg0);
	}

	@Override
	public void contextInitialized(ServletContextEvent arg0) {
		super.contextInitialized(arg0);
	}  
  
}  

