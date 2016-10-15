package com.com.bright.amp.web.controller;

import java.util.HashMap;
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

import com.com.bright.amp.core.application.ApplicationInfo;
import com.com.bright.amp.core.log.LogType;
import com.com.bright.amp.core.log.LogUtil;
import com.com.bright.amp.user.model.TsysUserGroup;
import com.com.bright.amp.user.service.UserGroupService;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.LongSerializationPolicy;


@Controller
public class GroupController  extends BaseController{
	
    /** logger */
	private static final LogUtil   logger    =  new LogUtil(LoggerFactory.getLogger(GroupController.class));

    @Resource(name="messageSource")
    private MessageSource messageSource;
    
	protected Gson createGson() {
		return new GsonBuilder().setDateFormat("yyyy-MM-dd HH:mm:ss")
				.setLongSerializationPolicy(LongSerializationPolicy.STRING)
				.create();
	}

    @Resource(name="userGroupService")
    private UserGroupService userGroupService;

    /*@Resource(name="organizationService")
    private OrganizationService organizationService;*/

    /**
     * 跳转列表页面
     * @param 
     * @return
     */
    @RequestMapping(value = "/groupList",method=RequestMethod.POST)
    public void list(HttpServletResponse response) throws Exception {
    	renderJson(userGroupService.listGroupTree(getLoginUserId()),response);
    }
    
    /**
     * 跳转新增页面
     * @param 
     * @return
     */
    @RequestMapping(value = "/addGroup",method=RequestMethod.GET)
    public ModelAndView showAdd(){
        Map<String,Object> map = new HashMap<String,Object>();
        return new ModelAndView("system/user/addGroup",map);
    }

    /**
     * AJAX提交新增数据
     * @param 
     * @return
     */
    @RequestMapping(value="/addGroup",method=RequestMethod.POST)
    public String add(@Valid TsysUserGroup group,BindingResult result,HttpServletResponse response,HttpServletRequest request){
        try{
            if(result.hasErrors()){
                logger.info(messageSource.getMessage("message.bindingerror",null,ApplicationInfo.getLocale()), LogType.OPERATOR);
                return this.renderText("fail|"+messageSource.getMessage("message.bindingerror",null,ApplicationInfo.getLocale()),response);
            }else{
            	userGroupService.addGroup(group);
                logger.info(messageSource.getMessage("system.user.group.add.succ",null,ApplicationInfo.getLocale()), LogType.OPERATOR);
                return this.renderText("success|" + group.getUsergroupid(),response);
            }
        }catch(Exception e){
            logger.info(messageSource.getMessage("system.user.group.add.fail",null,ApplicationInfo.getLocale()), LogType.OPERATOR);
            return this.renderText("failure|"+messageSource.getMessage(e.getMessage(),null,ApplicationInfo.getLocale()),response);
        }
    }

    /**
     * AJAX提交新增数据
     * @param 
     * @return
     */
    @RequestMapping(value="/deleteGroup",method=RequestMethod.POST)
    public String delete(@Valid Integer groupid,HttpServletResponse response,HttpServletRequest request){
        try{
        	userGroupService.deleteGroup(groupid);
            logger.info(messageSource.getMessage("system.user.group.del.succ",null,ApplicationInfo.getLocale()), LogType.OPERATOR);
            return this.renderText("success|success",response);
        }catch(Exception e){
            logger.info(messageSource.getMessage("system.user.group.del.fail",null,ApplicationInfo.getLocale()), LogType.OPERATOR);
            return this.renderText("failure|"+messageSource.getMessage(e.getMessage(),null,ApplicationInfo.getLocale()),response);
        }
    }

}
