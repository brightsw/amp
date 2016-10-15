package com.com.bright.amp.web.util;

import java.util.ArrayList;
import java.util.List;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.com.bright.amp.authc.vo.ShiroUser;
import com.com.bright.amp.user.dao.TsysUserDao;
import com.com.bright.amp.user.model.TsysUser;


public class ShiroDbRealm extends AuthorizingRealm {
    private final Logger logger = LoggerFactory.getLogger(ShiroDbRealm.class);
    private TsysUserDao tsysUserDao;
    
    public TsysUserDao getTsysUserDao() {
		return tsysUserDao;
	}

	public void setTsysUserDao(TsysUserDao tsysUserDao) {
		this.tsysUserDao = tsysUserDao;
	}
	/*
    @Resource(name="parameterService")
    private ParameterService parameterService;
*/
    public ShiroDbRealm() {
        super();
        // 设置认证token的实现类
        setAuthenticationTokenClass(UsernamePasswordToken.class);
        // 可以设置加密算法
        //setCredentialsMatcher(new HashedCredentialsMatcher(Sha1Hash.ALGORITHM_NAME));
    }

    /**
     * 认证回调函数,登录时调用.
     */
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {
        UsernamePasswordToken upToken = (UsernamePasswordToken) token;
        String username = upToken.getUsername().toLowerCase();
        // 如果是ldap表示并且不是admin管理员的进入ldap校验
        // 默认进行DB校验
        try {
        	TsysUser user = tsysUserDao.getByLoginName(username);
            String password = user.getPassword();
            String userId = user.getUserid().toString();
            String displayName = user.getUsername(); // 用户显示名
            logger.debug("userId={},username={}", userId, username);
            SimpleAuthenticationInfo sai = new SimpleAuthenticationInfo(
                    new ShiroUser(userId, username, displayName), password, getName());
            String timeout = "30";
            SecurityUtils.getSubject().getSession().setTimeout(Long.parseLong(timeout) * 1000 * 60); 
            //SecurityUtils.getSubject().getSession().setTimeout(1 * 1000 * 30); 
            return sai;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
    /**
     * 授权查询回调函数, 进行鉴权但缓存中无用户的授权信息时调用.
     */
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principalCollection) {
        logger.info("授权中");
        ShiroUser user = (ShiroUser) principalCollection.fromRealm(getName()).iterator().next();
        String userId = user.getId();
        try {
            SimpleAuthorizationInfo result = new SimpleAuthorizationInfo();
            // 添加角色组-可以根据声明@RequiresRoles(***)来判断
            List<String> rolesList = new ArrayList<String>();
            result.addRoles(rolesList);
            // 添加权限组-可以根据声明@RequiresPermissions(***)来判断
            //List<String> permissionsList = tsysUserDao.getUserModuleNames(userId);
            //result.addStringPermissions(permissionsList);
            return result;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        } finally {
        }
    }

    @Override
    public boolean isPermitted(PrincipalCollection principals, String permission) {
    	logger.debug("permission["+permission+"]");
        return super.isPermitted(principals, permission);
    }

}
