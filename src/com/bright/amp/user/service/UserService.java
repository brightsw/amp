package com.bright.amp.user.service;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bright.amp.core.log.LogUtil;
import com.bright.amp.user.dao.TsysRoleDao;
import com.bright.amp.user.dao.TsysUserDao;
import com.bright.amp.user.dao.TsysUserLoginInfoDao;
import com.bright.amp.user.model.TsysRole;
import com.bright.amp.user.model.TsysUser;
import com.bright.amp.user.model.TsysUserLoginInfo;
import com.polydata.commons.util.CharTurn;
import com.polydata.exception.EncryptionException;
import com.polydata.exception.ParameterException;
import com.polydata.framework.core.exception.CommunicationException;
import com.polydata.framework.core.service.BaseService;
import com.polydata.framework.core.web.Page;

@Service("userService")
public class UserService extends BaseService<TsysUser,TsysUserDao>{
    /** logger */
	private static final LogUtil   logger    =  new LogUtil(LoggerFactory.getLogger(UserService.class));
	@Autowired
	private TsysRoleDao tsysRoleDao;

    @Autowired
    private TsysUserLoginInfoDao tsysUserLoginInfoDao;

	public List<TsysRole> findPrivRoleCategory(Integer userid){
		TsysUser user = dao.getById(userid);
		TsysRole role = tsysRoleDao.getById(user.getRoleid());
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("rolecategory", role.getRolecategory());
		return tsysRoleDao.findPrivRoleCategory(map);
	}
	
	public void pageQueryUser(Map<String,Object> map, Page<TsysUser> page){
		TsysUser user = dao.getById(Integer.valueOf((String)map.get("loginUserId")));
		TsysRole role = tsysRoleDao.getById(user.getRoleid());
		map.put("rolecategory", role.getRolecategory());
        page.setPageList(dao.pageQuery(map, page));
	}

	public void addUser(TsysUser user) throws ParameterException,EncryptionException{
		Map<String,Object> map = new HashMap<String,Object>();
		//同名验证
		map.put("loginname", user.getLoginname());
		if(dao.count(map)>0){
			throw new ParameterException("system.user.duploginname");
		}
		//口令策略验证
		checkUserPassword(user);
		//IPV4转IPV6
		if(user.getVerifyipaddr() == 1){
			String startip = user.getStartstandardip();
			if(startip != null && startip.indexOf(".") > 0){
				user.setStartstandardip(CharTurn.calIPAddress(startip));
			}
			String endip = user.getEndstandardip();
			if(endip != null && endip.indexOf(".") > 0){
				user.setEndstandardip(CharTurn.calIPAddress(endip));
			}
			//开始结束IP验证
			if(compareIpv6(user.getStartstandardip(),user.getEndstandardip()) > 0){
				throw new ParameterException("system.user.ipinvalid");
			}
		}
		//加密
		user.setPassword(CharTurn.encryptString(CharTurn.ENCRY_STYLE_MD5,user.getPassword()));
		user.setUpdatepwdcount(1);
		dao.insert(user);
	}

	public void modifyUser(TsysUser user) throws ParameterException,EncryptionException{
		Map<String,Object> map = new HashMap<String,Object>();
		//同名验证
		map.put("loginname", user.getLoginname());
		map.put("excludeId", user.getUserid());
		if(dao.count(map)>0){
			throw new ParameterException("system.user.duploginname");
		}
		TsysUser oldUser = dao.getById(user.getUserid());
		if(!user.getPassword().equals(oldUser.getPassword())){
			//口令策略验证
			checkUserPassword(user);
			//加密
			user.setPassword(CharTurn.encryptString(CharTurn.ENCRY_STYLE_MD5,user.getPassword()));
			user.setUpdatepwdcount(oldUser.getUpdatepwdcount()+1);
		}
		//IPV4转IPV6
		if(user.getVerifyipaddr() == 1){
			String startip = user.getStartstandardip();
			if(startip != null && startip.indexOf(".") > 0){
				user.setStartstandardip(CharTurn.calIPAddress(startip));
			}
			String endip = user.getEndstandardip();
			if(endip != null && endip.indexOf(".") > 0){
				user.setEndstandardip(CharTurn.calIPAddress(endip));
			}
			//开始结束IP验证
			if(compareIpv6(user.getStartstandardip(),user.getEndstandardip()) > 0){
				throw new ParameterException("system.user.ipinvalid");
			}
		}
		dao.update(user);
	}

	public void updateSelf(TsysUser user) throws ParameterException,EncryptionException{
		Map<String,Object> map = new HashMap<String,Object>();
		//同名验证
		map.put("loginname", user.getLoginname());
		map.put("excludeId", user.getUserid());
		if(dao.count(map)>0){
			throw new ParameterException("system.user.duploginname");
		}
		TsysUser oldUser = dao.getById(user.getUserid());
		String passTmp = CharTurn.encryptString(CharTurn.ENCRY_STYLE_MD5,user.getOrginalpassword());
		if(!passTmp.equals(oldUser.getPassword())){
			throw new ParameterException("system.user.pwdinvalid");
		}
		if(!user.getPassword().equals("")){
			//口令策略验证
			checkUserPassword(user);
			//加密
			user.setPassword(CharTurn.encryptString(CharTurn.ENCRY_STYLE_MD5,user.getPassword()));
			user.setUpdatepwdcount(oldUser.getUpdatepwdcount()+1);
		}
		dao.update(user);
	}

	public void updateSelfPasswd(String userid,String password,String email) throws ParameterException,EncryptionException{
		TsysUser user = dao.getById(userid);
		user.setPassword(password);
		if(password != null && !password.equals("")){
			//口令策略验证
			checkUserPassword(user);
			//加密
			user.setPassword(CharTurn.encryptString(CharTurn.ENCRY_STYLE_MD5,user.getPassword()));
			user.setUpdatepwdcount(user.getUpdatepwdcount()+1);
		}
		user.setEmail(email);
		dao.update(user);
	}

    public String delete(Integer[] userIds) {
    	StringBuffer userNames = new StringBuffer();
        for (Integer userId : userIds) {
        	TsysUser user = dao.getById(userId);
        	userNames.append(user.getLoginname()).append(",");
            dao.delete(userId);
        }
        return userNames.substring(0, userNames.length()-1).toString();
    }

    public void updateUserUnlock(Integer userid) {
        TsysUser user = dao.getById(userid);
        user.setStatus(1);
        dao.update(user);
		TsysUserLoginInfo userLoginInfo = tsysUserLoginInfoDao
				.getByUserId(String.valueOf(userid));
		if (null != userLoginInfo) {
			userLoginInfo.setAvailloginfailcount(0);
			//清除锁定时间
			userLoginInfo.setIssetlocktime(2);
			tsysUserLoginInfoDao.update(userLoginInfo);
		}
    }
    
    public void updateUserReset(Integer userid,String loginUserId) throws EncryptionException,CommunicationException,IOException {
    	TsysUser user = dao.getById(userid);
        //String password = getRndPasswd();
    	String password = "000000";
        user.setPassword(CharTurn.encryptString(CharTurn.ENCRY_STYLE_MD5,password));
		user.setUpdatepwdcount(0);
        dao.update(user);
		// 发送邮件
		/*SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String time = sdf.format(System.currentTimeMillis());
		String subject = "高级持续威胁检测系统-重置用户密码";
		String content = dao.getById(loginUserId).getUsername()+"已经为您重置了用户密码，信息如下：\n"+
						"您的用户名："+user.getLoginname()+"\n"
						+"您的登录密码："+password+"\n";*/
		/*ResponseJMQService responseJMQService = new ResponseJMQService();
		responseJMQService.send(time, emil, subject, content, null);*/
		/*TmisMail mail = new TmisMail();
		mail.setReceiver(user.getEmail());
		mail.setTitle(subject);
		mail.setContent(content);
		tmisMailDao.insert(mail);*/
    }

    public void updatePasswdReset(String username,String email,String subject,String content) throws ParameterException {
    	   TsysUser user = dao.getByLoginName(username);
    	   if(user == null || !email.equals(user.getEmail())){
    		   throw new ParameterException("system.user.notexsituser");
    	   }
           String password = getRndPasswd();
           //String password = "000000";
           logger.debug(password);
           try{
	           user.setPassword(CharTurn.encryptString(CharTurn.ENCRY_STYLE_MD5,password));
	           user.setUpdatepwdcount(0);
	           dao.update(user);
           }catch(EncryptionException e){
        	   e.printStackTrace();
    		   throw new ParameterException("system.user.encryerror");
           }
           this.updateUserUnlock(user.getUserid());
    }
    
	/**
     * 检查用户输入的密码是否合策略相符
     * 
     * @param passwdPolicyId
     *            密码策略ID
     * @param password
     *            用户输入的密码
     * @throws EncryptionException 
     */
    private void checkUserPassword(TsysUser user) throws ParameterException, EncryptionException{
        String password = user.getPassword();
        int minPwdLength = 8;// 口令长度：最小

        int minFigureNum = 1;// 包含数字数：最小
        int minSpCharNum = 0;// 包含特殊字符数：最小

        int figureCounter = 0;
        int specialCounter = 0;
        int charCounter = 0;
        if (password.length() < minPwdLength) {
            throw new ParameterException("system.user.pwdinvalidpolicy");
        }

        for (int i = 0; i < password.length(); i++) {
            char c = password.charAt(i);
            int value = (int) c;
            // 是字符
            if (((value > 64) && (value < 91))
                    || ((value > 96) && (value < 123))) {
                charCounter++;
            }
            // 是数字
            else if ((value > 47) && (value < 58)) {
                figureCounter++;
            }
            // 是特殊字符
            else {
                specialCounter++;
            }
        }
        if (figureCounter < minFigureNum) {
            throw new ParameterException("system.user.pwdinvalidpolicy");
        }
        if (specialCounter < minSpCharNum) {
            throw new ParameterException("system.user.pwdinvalidpolicy");
        }
    }
    
    //IPV6比较函数 ip1>ip2 返回1 否则 返回-1
    private int compareIpv6(String ip1, String ip2) {
        String[] ip1s = ip1.split(":");
        String[] ip2s = ip2.split(":");
        //循环比较对应的项
        for (int i = 0; i < ip1s.length; i++) {
            if (ip1s[i].equals("")) {
                if (ip2s[i].equals("")) { //对应的项都位空，往下比较
                    continue;
                } else {
                    return -1;
                }
            } else {
                if (ip2s[i].equals("")) {
                    return 1;
                } else {   //确定对应的项不位空，讲字符串转换位整数进行比较
                    int value1 = Integer.parseInt(ip1s[i], 16);
                    int value2 = Integer.parseInt(ip2s[i], 16);
                    if (value1 > value2) {
                        return 1;
                    } else if (value1 < value2) {
                        return -1;
                    } else {
                        continue;
                    }
                }
            }
        }
        //循环结束，表示两个串表示的地址相同
        return 0;
    }
    /**
	 * 随机生成密码策略，主要使用与内置的没有密码策略的用户
	 * 
	 * @return 随机密码
	 */
	private String getRndPasswd() {
		// 最小的值
        int minPwdLength = 8;// 口令长度：最小

        int minFigureNum = 1;// 包含数字数：最小
        int minSpCharNum = 0;// 包含特殊字符数：最小
        //最大口令长度默认8位
        int maxPwdLength = 8;
        while(maxPwdLength < minPwdLength || maxPwdLength < minFigureNum+minSpCharNum){
        	maxPwdLength++;
        }
        
		final char[] CHARACTER = { 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
				'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U',
				'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g',
				'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
				't', 'u', 'v', 'w', 'x', 'y', 'z' };

		final char[] FIGURE = { '0', '1', '2', '3', '4', '5', '6', '7', '8',
				'9' };

		final char[] SEPCIALCHAR = { '!', '\"', '#', '$', '%', '&', '\'', '(',
				')', '*', '+', ',', '-', '.', '/', ':', ';', '<', '=', '>',
				'?', '@', '`', '[', ']', '^', '_', '{', '|', '}', '~' };

		String spChars = new String(SEPCIALCHAR);
		String password = null;
		boolean isNext = true;// 生成的口令是否有效
		while (isNext) {
			int pwdLength = maxPwdLength;
			int charLength = maxPwdLength-minFigureNum-minSpCharNum;
			int figureLength = minFigureNum;
			int specialLength = minSpCharNum;
			// 随机生成口令
			StringBuffer pwdStr = new StringBuffer(pwdLength);
			Random r = new Random();
			for (int i = 0; i < pwdLength; i++) {
				int numType = r.nextInt(3);
				boolean isContinue = true;
				while (isContinue) {
					if (numType == 0 && charLength == 0) {
						numType = r.nextInt(3);
						continue;
					}
					if (numType == 1 && figureLength == 0) {
						numType = r.nextInt(3);
						continue;
					}
					if (numType == 2 && specialLength == 0) {
						numType = r.nextInt(3);
						continue;
					}
					isContinue = false;
				}
				if (numType == 0) {// 字符
					pwdStr.append(CHARACTER[r.nextInt(CHARACTER.length)]);
					charLength--;
				} else if (numType == 1) {// 数字
					pwdStr.append(FIGURE[r.nextInt(FIGURE.length)]);
					figureLength--;
				} else {// 特殊字符
					pwdStr.append(SEPCIALCHAR[r.nextInt(SEPCIALCHAR.length)]);
					specialLength--;
				}
			}
			password = pwdStr.toString();
			// 产生的口令第一个字符不能为特殊字符
			if (spChars.indexOf(password.charAt(0)) >= 0) {
				continue;
			}
			// 产生的口令最后一个字符不能为特殊字符
			if (spChars.indexOf(password.charAt(password.length() - 1)) >= 0) {
				continue;
			}
			isNext = false;
		}
		return password;
	}

	public TsysUserLoginInfo getUserLoginInfo(String userid){
		return tsysUserLoginInfoDao.getByUserId(userid);
	}
	
	public void updateUserLoginInfo(String userid){
		Map<String, Object> map = new HashMap<String,Object>();
		map.put("userid", userid);
		map.put("successcount", 2);
		tsysUserLoginInfoDao.updateSuccessCount(map);
	}
}
