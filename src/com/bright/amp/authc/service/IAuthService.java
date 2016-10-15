package com.bright.amp.authc.service;

import com.bright.amp.user.model.TsysUser;


public interface IAuthService {

    boolean login(TsysUser user) throws Exception;

    void logout();

}
