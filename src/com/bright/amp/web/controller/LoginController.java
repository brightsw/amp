package com.bright.amp.web.controller;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.bright.amp.authc.service.AuthService;
import com.bright.amp.core.application.ApplicationInfo;
import com.bright.amp.core.log.LogType;
import com.bright.amp.core.log.LogUtil;
import com.bright.amp.user.model.TsysUser;
import com.bright.amp.web.util.RandomNumUtil;
import com.polydata.commons.util.StringUtil;

@Controller
public class LoginController extends BaseController {
    
    @Autowired
    private AuthService authService;

    @Resource(name="messageSource")
    private MessageSource messageSource;
    
    /** logger */
	private static final LogUtil   logger    =  new LogUtil(LoggerFactory.getLogger(LoginController.class));
	
    @RequestMapping(value = "/getLang", method = RequestMethod.GET)
    public void getLang(HttpServletResponse response,HttpServletRequest request) throws Exception {
        Map<String, String> map = new HashMap<String, String>();
        map.put("language", ApplicationInfo.getLang());
        this.renderJson(map, response);
    }
	

    /**
     * 显示登录页面
     * 
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public void login(HttpServletResponse response,HttpServletRequest request) throws Exception {
        Map<String, String> map = new HashMap<String, String>();
        request.getSession();
		map.put("noLicence", "0");
        this.renderJson(map, response);
    }

    /**
     * 用户登录验证
     * 
     * @return
     * @throws UnsupportedEncodingException
     */
    @RequestMapping(value = "/loginCheck", method = RequestMethod.POST)
    public String loginCheck(HttpServletResponse response, HttpServletRequest request, String username,
            String password, String checkValidatecode, String validatecode, String remember) {
        // 返回信息
    	Map<String, String> map = new HashMap<String, String>();
    	try{
	        // 判断用户名为空
	        if (StringUtil.isEmpty(username)) {
	            map.put("success", "false");
	            map.put("errorMessage", messageSource.getMessage("login.username.input",null,ApplicationInfo.getLocale()));
	            renderJson(map, response);
	            return null;
	        }
	        // 增加根据用户名判断是否允许同名登陆
	        	authService.checkOnlineLoginName(username);
	        // 判断密码为空
	        if (StringUtil.isEmpty(password)) {
	            map.put("success", "false");
	            map.put("errorMessage", messageSource.getMessage("system.login.inputpasswd",null,ApplicationInfo.getLocale()));
	            renderJson(map, response);
	            return null;
	        }
	        // 解码
	        try{
	        	password = URLDecoder.decode(password, "UTF-8");
	        }catch(UnsupportedEncodingException e){
	        	e.printStackTrace();
	        	
	        	logger.info(messageSource.getMessage("system.login.user",null,ApplicationInfo.getLocale())
	        			+"(" + username + ")"+messageSource.getMessage("system.login.loginfail",null,ApplicationInfo.getLocale()),
	        			LogType.LOGIN);
	        }
	        // 判断验证码为空
	        if (StringUtil.isNotEmpty(checkValidatecode) && "1".equals(checkValidatecode)
	                && StringUtil.isEmpty(validatecode)) {
	            map.put("success", "false");
	            map.put("errorMessage", messageSource.getMessage("system.login.inputvalidcode",null,ApplicationInfo.getLocale()));
	        	logger.info(messageSource.getMessage("system.login.user",null,ApplicationInfo.getLocale())
	        			+"(" + username + ")"+messageSource.getMessage("system.login.loginfail",null,ApplicationInfo.getLocale()),
	        			LogType.LOGIN);
	            renderJson(map, response);
	            return null;
	        }
	        if (StringUtil.isNotEmpty(checkValidatecode) && "1".equals(checkValidatecode)
	                && StringUtil.isNotEmpty(validatecode)) {
	            // 获取session中生成的验证码
	            Object tempValidateCode = request.getSession().getAttribute("validate");
	            // 判断输入的验证码是否和生成的一致
	            if (StringUtil.isEmpty(tempValidateCode) || !(validatecode.equals(tempValidateCode.toString()))) {
	                map.put("success", "false");
	                map.put("errorMessage", messageSource.getMessage("system.login.errorvalidcode",null,ApplicationInfo.getLocale()));
		        	logger.info(messageSource.getMessage("system.login.user",null,ApplicationInfo.getLocale())
		        			+"(" + username + ")"+messageSource.getMessage("system.login.loginfail",null,ApplicationInfo.getLocale()),
		        			LogType.LOGIN);
	                renderJson(map, response);
	                return null;
	            }
	        }
	        // 如果选中记住密码，则记录用户名和密码
	        /*if (StringUtil.isNotEmpty(remember) && "checked".equals(remember)) {
	            this.addRememberName(request, response, username);
	            this.addRememberPwd(request, response, password);
	        } else {
	            this.cancleCookie(request, response);
	        }*/
	        TsysUser user = new TsysUser();
	        user.setLoginname(username);
	        user.setPassword(password);
	        TsysUser userTmp = authService.getUserByName(username);
	        if(userTmp == null){
	            map.put("success", "false");
	            map.put("errorMessage", messageSource.getMessage("system.login.notexsituser",null,ApplicationInfo.getLocale()));
	        	logger.info(messageSource.getMessage("system.login.user",null,ApplicationInfo.getLocale())
	        			+"(" + username + ")"+messageSource.getMessage("system.login.loginfail",null,ApplicationInfo.getLocale()),
	        			LogType.LOGIN);
	            renderJson(map, response);
	            return null;
	        }
	        String userId = String.valueOf(userTmp.getUserid());
	        boolean isNotLocked = authService.checkLocked(userId);
	        if(isNotLocked){
	            try{
	                authService.login(user);
	            }catch(Exception e){
	                int isLock = authService.updateLoginFailed(userId, request.getRemoteHost());
	                map.put("success", "false");
	                map.put("errorMessage", messageSource.getMessage(e.getMessage(),null,ApplicationInfo.getLocale()));
	                if(isLock == 1){
	    	        	logger.info(messageSource.getMessage("system.login.user",null,ApplicationInfo.getLocale())
	    	        			+"(" + username + ")"+messageSource.getMessage("system.login.failmaxtolock",null,ApplicationInfo.getLocale()),
	    	        			LogType.LOGIN);
	                }else{
	    	        	logger.info(messageSource.getMessage("system.login.user",null,ApplicationInfo.getLocale())
	    	        			+"(" + username + ")"+messageSource.getMessage("system.login.loginfail",null,ApplicationInfo.getLocale()),
	    	        			LogType.LOGIN);
	                }
	                renderJson(map, response);
	                return null;
	            }
	            // 初始用户登录实体
	            // 如果登录成功，页面转向主页，否则返回错误信息
	            request.getSession().setAttribute("loginUserName", username);
	            request.getSession().setAttribute("loginUserId", userId);
	            map.put("success", "true");
	            map.put("redirectURL", "index.do");
	            authService.updateLoginSuccess(userId, request.getRemoteHost());
	        	logger.info(messageSource.getMessage("system.login.user",null,ApplicationInfo.getLocale())
	        			+"(" + username + ")"+messageSource.getMessage("system.login.loginsuccess",null,ApplicationInfo.getLocale()),
	        			LogType.LOGIN);
	            renderJson(map, response);
	            return null;
	        } else {
	            map.put("success", "false");
	            map.put("errorMessage", messageSource.getMessage("system.login.userlocked",null,ApplicationInfo.getLocale()));
	        	logger.info(messageSource.getMessage("system.login.user",null,ApplicationInfo.getLocale())
	        			+"(" + username + ")"+messageSource.getMessage("system.login.loginfail",null,ApplicationInfo.getLocale()),
	        			LogType.LOGIN);
	            renderJson(map, response);
	            return null;
	        }
    	}catch(Exception e){
    		e.printStackTrace();
            map.put("success", "false");
            map.put("errorMessage", messageSource.getMessage("system.login.failcontackadmin",null,ApplicationInfo.getLocale()));
        	logger.info(messageSource.getMessage("system.login.user",null,ApplicationInfo.getLocale())
        			+"(" + username + ")"+messageSource.getMessage("system.login.loginfail",null,ApplicationInfo.getLocale()),
        			LogType.LOGIN);
            renderJson(map, response);
            return null;
    	}
    }

    /**
     * 获取cookie路径
     * 
     * @param request 请求
     * @return
     */
    /*private String getCookiePath(HttpServletRequest request) {
        String contextPath = request.getContextPath();
        return contextPath + "/login.do";
    }*/

    /**
     * 用户登出
     * @return 
     */
    @RequestMapping(value = "/logout", method = RequestMethod.GET)
    public void logout(HttpServletResponse response,HttpServletRequest request) throws Exception {
        String username = getLoginUserName();
        if(username != null){
	    	logger.info(messageSource.getMessage("system.login.user",null,ApplicationInfo.getLocale())
	    			+"(" + username + ")"+messageSource.getMessage("system.login.logoutsuccess",null,ApplicationInfo.getLocale()),
	    			LogType.LOGOUT);
        }
        authService.logout();
    }

    public String toMain() {
        return "toMain";
    }

    /**
     * 获得校验码
     * 
     * @return 校验码
     * @throws Exception 系统异常
     */
    @RequestMapping(value = "/operateValidateCode", method = RequestMethod.GET)
    public String operateValidateCode(HttpServletRequest request, HttpServletResponse response) throws Exception {
        RandomNumUtil rdnu = RandomNumUtil.Instance(response.getOutputStream());
        request.getSession().setAttribute("validate", rdnu.getString()); // 取得随机字符串放入HttpSession
        return null;
    }

    public String chartsMain() {
        return null;
    }

    /**
     * 显示登录页面
     * 
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/tomcatTest", method = RequestMethod.GET)
    public void tomcatTest(HttpServletResponse response,HttpServletRequest request) throws Exception {
	    this.renderJson("OK", response);
	}

}
