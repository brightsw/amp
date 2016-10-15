package com.com.bright.amp.authc.service;

import com.com.bright.amp.user.model.TsysUser;


public interface IAuthService {

    boolean login(TsysUser user) throws Exception;

    void logout();

}
