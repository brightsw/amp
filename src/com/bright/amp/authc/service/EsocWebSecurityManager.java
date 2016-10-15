package com.bright.amp.authc.service;

import java.util.Collection;

import org.apache.shiro.realm.Realm;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.web.mgt.DefaultWebSecurityManager;

public class EsocWebSecurityManager extends DefaultWebSecurityManager {
    
    //private UserdurationDao userdurationDao;

    public EsocWebSecurityManager(){
        super();
    }
    
    public EsocWebSecurityManager(Realm singleRealm) {
        this();
        setRealm(singleRealm);
    }

    public EsocWebSecurityManager(Collection<Realm> realms) {
        this();
        setRealms(realms);
    }

    @Override
    public void beforeLogout(Subject subject) {
        super.beforeLogout(subject);
        Session session = subject.getSession();
        String userId = (String)session.getAttribute("userId");
        //userdurationDao.updateEndTime(userId);
    }
    /*
    public UserdurationDao getUserdurationDao() {
        return userdurationDao;
    }

    public void setUserdurationDao(UserdurationDao userdurationDao) {
        this.userdurationDao = userdurationDao;
    }*/
    
}
