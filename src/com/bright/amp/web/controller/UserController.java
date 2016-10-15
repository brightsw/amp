package com.bright.amp.web.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.slf4j.LoggerFactory;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.bright.amp.core.application.ApplicationInfo;
import com.bright.amp.core.log.LogType;
import com.bright.amp.core.log.LogUtil;
import com.bright.amp.user.model.TsysUser;
import com.bright.amp.user.model.TsysUserGroup;
import com.bright.amp.user.service.UserGroupService;
import com.bright.amp.user.service.UserService;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.LongSerializationPolicy;
import com.polydata.framework.core.web.Page;


@Controller
public class UserController  extends BaseController{
	
    /** logger */
	private static final LogUtil   logger    =  new LogUtil(LoggerFactory.getLogger(UserController.class));
    
    @Resource(name="userService")
    private UserService userService;

    @Resource(name="userGroupService")
    private UserGroupService userGroupService;

    @Resource(name="messageSource")
    private MessageSource messageSource;
    
	protected Gson createGson() {
		return new GsonBuilder().serializeNulls().setDateFormat("yyyy-MM-dd HH:mm:ss")
				.setLongSerializationPolicy(LongSerializationPolicy.STRING)
				.create();
	}

    /*@Resource(name="roleService")
    private RoleService roleService;

    @Resource(name="organizationService")
    private OrganizationService organizationService;*/
    /**
     * 跳转列表页面
     * @param 
     * @return
     */
    @RequestMapping(value = "/getUsergroups",method=RequestMethod.GET)
    public void getUsergroups(HttpServletResponse response) throws Exception {
        List<TsysUserGroup> userGroups = userGroupService.findAll();
        for (TsysUserGroup tsysUserGroup : userGroups) {
            tsysUserGroup.setPid("0");
        }
        this.renderJson(userGroups, response);
    }

    /**
     * AJAX请求列表数据
     * @param 
     * @return
     */
    @RequestMapping(value="/userListJson",method=RequestMethod.POST)
    public void getJsonData(HttpServletResponse response,HttpServletRequest request,String sort,
            Integer displayStart,String roleId,String groupId,String userName,String loginName){
    	try{
	        Map<String,Object> map = new HashMap<String,Object>();
	        map.put("sortColumns", sort);
	        map.put("roleid", roleId);
	        if(groupId != null && !groupId.equals("0")){
	        	map.put("usergroupid", groupId);
	        }
	        map.put("usernameSch", userName);
	        map.put("loginnameSch",loginName);
	        map.put("loginUserId", this.getLoginUserId());
	        Page<TsysUser> page = new Page<TsysUser>();
	        getPageParameter(page,request,displayStart);
	        userService.pageQueryUser(map, page);
	        readerData2Json(page.getPageList(), page.getTotalCount(),response,page.getStart());
    	}catch(Exception e){
    		e.printStackTrace();
	        readerData2Json(null, 0, response, 0);
    	}
    }
    
    /**
     * 跳转新增页面
     * @param 
     * @return
     */
    @RequestMapping(value = "/addUser",method=RequestMethod.GET)
    //@RequiresPermissions(value = "mapps.user.user.add")
    public ModelAndView showAdd(String searchSubContent,Integer groupid){
        Map<String,Object> map = new HashMap<String,Object>();
        map.put("groupid", groupid);
        map.put("groups", userGroupService.findAll());
        map.put("roles", userService.findPrivRoleCategory(Integer.valueOf(this.getLoginUserId())));

        map.put("minPwdLength",8);// 口令长度：最小

        map.put("minFigureNum",1);// 包含数字数：最小
		map.put("minSpCharNum",0);// 包含特殊字符数：最小
        
        return new ModelAndView("system/user/addUser",map);
    }


    /**
     * AJAX提交新增数据
     * @param 
     * @return
     */
    @RequestMapping(value="/addUser",method=RequestMethod.POST)
    public String add(@Valid TsysUser user,BindingResult result,HttpServletResponse response,String[] roleIds,HttpServletRequest request){
        try{
            if(result.hasErrors()){
                return this.renderText("fail|"+messageSource.getMessage("message.bindingerror",null,ApplicationInfo.getLocale()),response);
            }else{
                userService.addUser(user);
                //dashboardService.copyDefault(userId);

                logger.info(messageSource.getMessage("system.user.add.succ",null,ApplicationInfo.getLocale())+"["+user.getLoginname()+"]", LogType.OPERATOR);
                return this.renderText("success|success",response);
            }
        }catch(Exception e){
        	e.printStackTrace();
        	logger.debug(e.getMessage());
            logger.info(messageSource.getMessage("system.user.add.fail",null,ApplicationInfo.getLocale())+"["+user.getLoginname()+"]", LogType.OPERATOR);
            return this.renderText("failure|"+messageSource.getMessage(e.getMessage(),null,ApplicationInfo.getLocale()),response);
        }
    }
    
    /**
    * 详细信息页面
    * @param 
    * @return
    */
   @RequestMapping(value = "/viewUser",method=RequestMethod.GET)
   public void viewUser(String userid,HttpServletResponse response){
       TsysUser user = userService.getById(userid);
       this.renderJson(user, response);
   }
   

   /**
    * 跳转修改页面
    * @param 
    * @return
    */
   @RequestMapping(value = "/modifyUser",method=RequestMethod.GET)
   public ModelAndView showModify(String userId){
       TsysUser user = userService.getById(userId);
       Map<String,Object> map = new HashMap<String,Object>();
       map.put("groups", userGroupService.findAll());
       map.put("roles", userService.findPrivRoleCategory(Integer.valueOf(this.getLoginUserId())));
       map.put("user", user);
       map.put("minPwdLength",8);// 口令长度：最小

       map.put("minFigureNum",1);// 包含数字数：最小
	   map.put("minSpCharNum",0);// 包含特殊字符数：最小
       
       return new ModelAndView("system/user/modifyUser",map);
   }

   /**
    * 跳转修改页面
    * @param 
    * @return
    */
   @RequestMapping(value = "/getUserPasswordPolicy",method=RequestMethod.GET)
   public void getUserPasswordPolicy(HttpServletResponse response){
       Map<String,Object> map = new HashMap<String,Object>();
       map.put("minPwdLength",8);// 口令长度：最小

       map.put("minFigureNum",1);// 包含数字数：最小
	   map.put("minSpCharNum",0);// 包含特殊字符数：最小

       this.renderJson(map, response);
   }
   
   /**
    * AJAX提交修改数据
    * @param 
    * @return
    */
   @RequestMapping(value="/modifyUser",method=RequestMethod.POST)
   public String modify(@Valid TsysUser user,BindingResult result,HttpServletResponse response,HttpServletRequest request){
       try{
           if(result.hasErrors()){
               logger.info(messageSource.getMessage("message.bindingerror",null,ApplicationInfo.getLocale()), LogType.OPERATOR);
               return this.renderText("fail|"+messageSource.getMessage("message.bindingerror",null,ApplicationInfo.getLocale()),response);
           }else{
               userService.modifyUser(user);
               logger.info(messageSource.getMessage("system.user.modifyuser.succ",null,ApplicationInfo.getLocale())+"["+user.getLoginname()+"]", LogType.OPERATOR);
               return this.renderText("success|success",response);
           }
       }catch(Exception e){
    	   e.printStackTrace();
           logger.info(messageSource.getMessage("system.user.modifyuser.fail",null,ApplicationInfo.getLocale())+"["+user.getLoginname()+"]", LogType.OPERATOR);
           return this.renderText("failure|"+messageSource.getMessage(e.getMessage(),null,ApplicationInfo.getLocale()),response);
       }
   }

   /**
    * AJAX提交删除数据
    * @param 
    * @return
    */
   @RequestMapping(value="/removeUser",method=RequestMethod.POST)
   public String remove(Integer[] userIds,HttpServletResponse response,HttpServletRequest request){
       try{
	       String usernames = userService.delete(userIds);
           logger.info(messageSource.getMessage("system.user.deluser.succ",null,ApplicationInfo.getLocale())+"["+usernames+"]", LogType.OPERATOR);
	       return this.renderText("success|success",response);
       }catch(Exception e){
    	   e.printStackTrace();
           logger.info(messageSource.getMessage("system.user.deluser.fail",null,ApplicationInfo.getLocale()), LogType.OPERATOR);
           return this.renderText("failure|"+messageSource.getMessage(e.getMessage(),null,ApplicationInfo.getLocale()),response);
       }
   }

   /**
    * 解锁用户
    * @param 
    * @return
    */
   @RequestMapping(value="/unlockUser",method=RequestMethod.POST)
   public String unlockUser(Integer userid,HttpServletResponse response,HttpServletRequest request){
       try{
	       userService.updateUserUnlock(userid);
           logger.info(messageSource.getMessage("system.user.unlock.succ",null,ApplicationInfo.getLocale()), LogType.OPERATOR);
	       return this.renderText("success|success",response);
	   }catch(Exception e){
		   e.printStackTrace();
           logger.info(messageSource.getMessage("system.user.unlock.fail",null,ApplicationInfo.getLocale()), LogType.OPERATOR);
	       return this.renderText("failure|"+messageSource.getMessage(e.getMessage(),null,ApplicationInfo.getLocale()),response);
	   }
   }

   /**
    * 重置密码
    * @param 
    * @return
    */
   @RequestMapping(value="/resetUser",method=RequestMethod.POST)
   public String resetUser(Integer userid,HttpServletResponse response,HttpServletRequest request){
       try{
	       userService.updateUserReset(userid,this.getLoginUserId());
           logger.info(messageSource.getMessage("system.user.resetpwd.succ",null,ApplicationInfo.getLocale()), LogType.OPERATOR);
	       return this.renderText("success|success",response);
	   }catch(Exception e){
		   e.printStackTrace();
           logger.info(messageSource.getMessage("system.user.resetpwd.fail",null,ApplicationInfo.getLocale()), LogType.OPERATOR);
	       return this.renderText("failure|"+messageSource.getMessage(e.getMessage(),null,ApplicationInfo.getLocale()),response);
	   }
   }

   /**
    * 跳转修改页面
    * @param 
    * @return
    */
   @RequestMapping(value = "/selfManage",method=RequestMethod.GET)
   public void selfManage(HttpServletResponse response){
       TsysUser user = userService.getById(this.getLoginUserId());
       Map<String,Object> map = new HashMap<String,Object>();
       map.put("groups", userGroupService.findAll());
       map.put("roles", userService.findPrivRoleCategory(Integer.valueOf(this.getLoginUserId())));
       map.put("user", user);
       map.put("minPwdLength",8);// 口令长度：最小

       map.put("minFigureNum",1);// 包含数字数：最小
	   map.put("minSpCharNum",0);// 包含特殊字符数：最小
       
       
       this.renderJson(map, response);
   }

   /**
    * AJAX提交修改数据
    * @param 
    * @return
    */
   @RequestMapping(value="/selfManage",method=RequestMethod.POST)
   public String selfManage(@Valid TsysUser user,BindingResult result,HttpServletResponse response,HttpServletRequest request){
       try{
           if(result.hasErrors()){
               logger.info(messageSource.getMessage("message.bindingerror",null,ApplicationInfo.getLocale()), LogType.OPERATOR);
               return this.renderText("fail|"+messageSource.getMessage("message.bindingerror",null,ApplicationInfo.getLocale()),response);
           }else{
               userService.updateSelf(user);
               logger.info(messageSource.getMessage("system.user.selfmanage.succ",null,ApplicationInfo.getLocale())+"["+user.getLoginname()+"]", LogType.OPERATOR);
               return this.renderText("success|success",response);
           }
       }catch(Exception e){
    	   e.printStackTrace();
           logger.info(messageSource.getMessage("system.user.selfmanage.fail",null,ApplicationInfo.getLocale())+"["+user.getLoginname()+"]", LogType.OPERATOR);
           return this.renderText("failure|"+messageSource.getMessage(e.getMessage(),null,ApplicationInfo.getLocale()),response);
       }
   }

   /**
    * AJAX提交修改数据
    * @param 
    * @return
    */
   @RequestMapping(value="/changeSelfPasswd",method=RequestMethod.GET)
   public ModelAndView showChangeSelfPasswd(){
       Map<String,Object> map = new HashMap<String,Object>();
       map.put("minPwdLength",8);// 口令长度：最小

       map.put("minFigureNum",1);// 包含数字数：最小
	   map.put("minSpCharNum",0);// 包含特殊字符数：最小
       
       return new ModelAndView("system/user/changePasswdFirst",map);
   }
   
   /**
    * AJAX提交修改数据
    * @param 
    * @return
    */
   @RequestMapping(value="/changeSelfPasswd",method=RequestMethod.POST)
   public String changeSelfPasswd(String password,String email,HttpServletResponse response,HttpServletRequest request){
       try{
           userService.updateSelfPasswd(this.getLoginUserId(), password,email);
           logger.info(messageSource.getMessage("system.user.firstpwdmodify.succ",null,ApplicationInfo.getLocale()), LogType.OPERATOR);
           userService.updateUserLoginInfo(this.getLoginUserId());
           return this.renderText("success|success",response);
       }catch(Exception e){
    	   e.printStackTrace();
           logger.info(messageSource.getMessage("system.user.firstpwdmodify.fail",null,ApplicationInfo.getLocale()), LogType.OPERATOR);
           return this.renderText("failure|"+messageSource.getMessage(e.getMessage(),null,ApplicationInfo.getLocale()),response);
       }
   }
   
   /**
    * 跳转列表页面
    * @param 
    * @return
    */
   @RequestMapping(value = "/getRoles",method=RequestMethod.GET)
   public void getRoles(HttpServletResponse response) throws Exception {
       this.renderJson(userService.findPrivRoleCategory(Integer.valueOf(this.getLoginUserId())), response);
   }
   

   /**
    * 跳转列表页面
    * @param 
    * @return
    */
   @RequestMapping(value = "/resetPasswd",method=RequestMethod.POST)
   public void resetPasswd(String username,String email,HttpServletResponse response,HttpServletRequest request) {
       try{
    	   String subject = messageSource.getMessage("common.product.name",null,ApplicationInfo.getLocale())+
    			   "-"+messageSource.getMessage("system.user.resetpasswd",null,ApplicationInfo.getLocale());
    	   String content = messageSource.getMessage("system.user.resetpasswd.content1",null,ApplicationInfo.getLocale())+"\n"
    			   +messageSource.getMessage("system.user.resetpasswd.content2",null,ApplicationInfo.getLocale())+"\n"
    			   +messageSource.getMessage("system.user.resetpasswd.content3",null,ApplicationInfo.getLocale())+username+"\n"
    			   +messageSource.getMessage("system.user.resetpasswd.content2",null,ApplicationInfo.getLocale());
	       userService.updatePasswdReset(username,email,subject,content);
           logger.info(messageSource.getMessage("system.user.resetpwd.succ",null,ApplicationInfo.getLocale()), LogType.OPERATOR);
	       this.renderText("success|success",response);
	   }catch(Exception e){
		   e.printStackTrace();
           logger.info(messageSource.getMessage("system.user.resetpwd.fail",null,ApplicationInfo.getLocale()), LogType.OPERATOR);
	       this.renderText("failure|"+messageSource.getMessage(e.getMessage(),null,ApplicationInfo.getLocale()),response);
	   }
   }
   
}
