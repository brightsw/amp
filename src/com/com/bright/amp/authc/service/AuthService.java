package com.com.bright.amp.authc.service;

import java.security.MessageDigest;
import java.util.Calendar;
import java.util.Collection;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.session.Session;
import org.apache.shiro.session.mgt.eis.SessionDAO;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.com.bright.amp.authc.vo.ShiroUser;
import com.com.bright.amp.user.dao.TsysUserDao;
import com.com.bright.amp.user.dao.TsysUserLoginInfoDao;
import com.com.bright.amp.user.model.TsysUser;
import com.com.bright.amp.user.model.TsysUserLoginInfo;
import com.polydata.commons.util.CharTurn;
import com.polydata.exception.ParameterException;

@Service("authService")
public class AuthService implements IAuthService {

	@Autowired
	private TsysUserDao tsysUserDao;

	@Autowired
	private SessionDAO sessionDAO;

    @Autowired
    private TsysUserLoginInfoDao tsysUserLoginInfoDao;

	/**
	 * 用户登录接口
	 * 
	 * @param request
	 * @return
	 */
	@Override
	public boolean login(TsysUser user) throws Exception {
		Subject currentUser = SecurityUtils.getSubject();
		String username = user.getLoginname();
		String password = user.getPassword();
		// License确认，确认系统是否有权限使用
		try {
			UsernamePasswordToken token = new UsernamePasswordToken(username,
					getEncryptedPassword(password));
			token.setRememberMe(false);
			currentUser.login(token);
			Session session = currentUser.getSession();
			// logger.debug("IP={}", session.getHost());
			ShiroUser shUser = (ShiroUser) currentUser.getPrincipal();
			// 放入用户名
			String userIdString = shUser.getId();
			TsysUser userData = tsysUserDao.getById(userIdString);
			if (userData.getVerifyipaddr()!=null&&userData.getVerifyipaddr()==1) {
				String startIpValue = CharTurn.calIPAddress(userData.getStartstandardip());
				String endIpValue = CharTurn.calIPAddress(userData.getEndstandardip());
				String ipValue = CharTurn.calIPAddress(session.getHost());
				if ((startIpValue.compareTo(ipValue) > 0)
						|| (endIpValue.compareTo(ipValue) < 0)) {
					throw new ParameterException("system.login.invalidip");
				}
			}
			session.setAttribute("userName", username); // 记录当前登录人登录用户名
			session.setAttribute("userId", userIdString); // 记录当前登录人用户ID
			session.setAttribute("userDisplayName", shUser.getName()); // 记录当前登录人显示名
			session.setAttribute("ip", session.getHost()); // 记录当前登录人IP
			/*TUsrUserduration userduration = new TUsrUserduration();
			userduration.setUserId(userIdString);
			userduration.setUserIp(session.getHost());
			userdurationDao.insert(userduration);*/
		} catch (ParameterException ex) {
			throw ex;
		} catch (Exception ex) {
			ex.printStackTrace();
			throw new ParameterException("system.login.invalidpasswd");
		}
		return true;
	}

	private String getEncryptedPassword(String password) throws Exception {
		MessageDigest localMessageDigest = null;
        char hexDigits[]={'0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'};  
		try {
			localMessageDigest = MessageDigest.getInstance("MD5");
		} catch (Exception localException) {
			throw new Exception(localException.getMessage());
		}
		localMessageDigest.update(password.getBytes());
		byte[] arrayOfByte = localMessageDigest.digest();
        int j = arrayOfByte.length;
        char str[] = new char[j * 2];
        int k = 0;
        for (int i = 0; i < j; i++) {
            byte byte0 = arrayOfByte[i];
            str[k++] = hexDigits[byte0 >>> 4 & 0xf];
            str[k++] = hexDigits[byte0 & 0xf];
        }
        return new String(str);
	}

	public int updateLoginFailed(String userId, String loginIp) {
		long max = 3;

		TsysUserLoginInfo userLoginInfo = tsysUserLoginInfoDao
				.getByUserId(userId);
		if (null != userLoginInfo) {
			userLoginInfo
					.setAvailloginfailcount(userLoginInfo.getAvailloginfailcount() + 1);
			if (max > userLoginInfo.getAvailloginfailcount()) {
				userLoginInfo.setLastloginfailip(loginIp);
				//不更新锁定时间
				userLoginInfo.setIssetlocktime(0);
				tsysUserLoginInfoDao.update(userLoginInfo);
				return 0;
			} else {
				userLoginInfo.setLastloginfailip(loginIp);
				//更新锁定时间
				userLoginInfo.setIssetlocktime(1);
				tsysUserLoginInfoDao.update(userLoginInfo);
				TsysUser user = tsysUserDao.getById(userId);
				user.setStatus(3);
				tsysUserDao.update(user);
				return 1;
			}
		} else {
			TsysUserLoginInfo newUserLoginInfo = new TsysUserLoginInfo();
			newUserLoginInfo.setAvailloginfailcount(1);
			newUserLoginInfo.setLastloginfailip(loginIp);
			newUserLoginInfo.setUserid(Integer.valueOf(userId));
			newUserLoginInfo.setSuccesscount(0);
			tsysUserLoginInfoDao.insert(newUserLoginInfo);
			return 0;
		}
	}

	public void updateLoginSuccess(String userId, String loginIp) {
		TsysUserLoginInfo userLoginInfo = tsysUserLoginInfoDao
				.getByUserId(userId);
		if (null != userLoginInfo) {
			userLoginInfo.setAvailloginfailcount(0);
			userLoginInfo.setLastloginip(loginIp);
			userLoginInfo.setUserid(Integer.valueOf(userId));
			//清除锁定时间
			userLoginInfo.setIssetlocktime(2);
			userLoginInfo.setSuccesscount(userLoginInfo.getSuccesscount()+1);
			tsysUserLoginInfoDao.update(userLoginInfo);
			TsysUser user = tsysUserDao.getById(userId);
			if(user.getStatus() == 3){
				user.setStatus(1);
				tsysUserDao.update(user);
			}
		} else {
			TsysUserLoginInfo newUserLoginInfo = new TsysUserLoginInfo();
			newUserLoginInfo.setAvailloginfailcount(0);
			newUserLoginInfo.setLastloginip(loginIp);
			newUserLoginInfo.setUserid(Integer.valueOf(userId));
			newUserLoginInfo.setSuccesscount(1);
			tsysUserLoginInfoDao.insert(newUserLoginInfo);
		}
	}

	public TsysUser getUserByName(String userName) {
		return tsysUserDao.getByLoginName(userName);
	}

	public boolean checkLocked(String userId) {
		TsysUserLoginInfo userLoginInfo = tsysUserLoginInfoDao.getByUserId(userId);
		if (userLoginInfo == null) {
			return true;
		}
		Date lockTime = userLoginInfo.getLastlocktime();
		if ("1".equals("1")) {//暂不开启锁定功能
			return true;
		}
		String lockedDuration = "15";
		Date currentTime = GregorianCalendar.getInstance().getTime();
		Calendar calender;
		if (null != lockTime) {
			if (userLoginInfo.getAvailloginfailcount() < 3) {
				return true;
			}
			calender = GregorianCalendar.getInstance();
			try {
				calender.setTime(lockTime);
			} catch (Exception e) {
				e.printStackTrace();
			}
			calender.add(Calendar.MINUTE, Integer.parseInt(lockedDuration));
			Date unLockTime = calender.getTime();
			return currentTime.compareTo(unLockTime) > 0;
		}
		return true;
	}

	/**
	 * 用户注销接口
	 * 
	 * @param request
	 * @return
	 */
	@Override
	public void logout() {
		try {
			Subject currentUser = SecurityUtils.getSubject();
			//Session session = currentUser.getSession();
			//String userName = (String) session.getAttribute("userName");
			//userdurationDao.updateEndTime(userId);
			
			currentUser.logout();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@SuppressWarnings("rawtypes")
	public Set<String> getOnlineLoginNames() {
		Collection<Session> sessions = sessionDAO.getActiveSessions();
		Iterator it = sessions.iterator();
		Set<String> loginNames = new HashSet<String>();
		while (it.hasNext()) {
			Session session = (Session) it.next();
			Object userObj = session.getAttribute("userName");
			if(null != userObj){
				loginNames.add(userObj.toString());
			}
		}

		return loginNames;

	}
	
	@SuppressWarnings("rawtypes")
	public void checkOnlineLoginName(String userName) {
		try{
			Collection<Session> sessions = sessionDAO.getActiveSessions();
			Iterator it = sessions.iterator();
			while (it.hasNext()) {
				Session session = (Session) it.next();
				Object userObj = session.getAttribute("userName");
				if(userObj != null && userObj.toString().equals(userName)){
			        String isSameName = "1";
			        if("0".equals(isSameName)){
			        	//不允许同名用户在线
			        	session.stop();
			        }
				}
			}
		}catch(Exception e){
			e.printStackTrace();
		}
	}
}
