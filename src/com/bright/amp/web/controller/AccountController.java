package com.bright.amp.web.controller;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.bright.amp.account.model.Taccount;
import com.bright.amp.account.service.AccountService;
import com.bright.amp.core.log.LogType;
import com.bright.amp.core.log.LogUtil;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.LongSerializationPolicy;
import com.polydata.framework.core.web.Page;


@Controller
public class AccountController  extends BaseController{
	
    /** logger */
	private static final LogUtil   logger    =  new LogUtil(LoggerFactory.getLogger(AccountController.class));
    
    @Resource(name="accountService")
    private AccountService accountService;
    
	protected Gson createGson() {
		return new GsonBuilder().serializeNulls().setDateFormat("yyyy-MM-dd HH:mm:ss")
				.setLongSerializationPolicy(LongSerializationPolicy.STRING)
				.create();
	}

    /**
     * AJAX请求列表数据
     * @param 
     * @return
     */
    @RequestMapping(value="/accountListJson",method=RequestMethod.POST)
    public void getJsonData(HttpServletResponse response,HttpServletRequest request,String sort,
            Integer displayStart,Integer acctype,String accdateBegin,String accdateEnd,Integer moneyBegin,Integer moneyEnd){
    	try{
	        Map<String,Object> map = new HashMap<String,Object>();
	        map.put("sortColumns", sort);
	        map.put("acctype", acctype);
	        map.put("accdateBegin", accdateBegin);
	        map.put("accdateEnd",accdateEnd);
	        map.put("moneyBegin",moneyBegin);
	        map.put("moneyEnd",moneyEnd);
	        Page<Taccount> page = new Page<Taccount>();
	        getPageParameter(page,request,displayStart);
	        accountService.pageQuery(map, page);
	        readerData2Json(page.getPageList(), page.getTotalCount(),response,page.getStart());
    	}catch(Exception e){
    		e.printStackTrace();
	        readerData2Json(null, 0, response, 0);
    	}
    }


    /**
     * AJAX提交新增数据
     * @param 
     * @return
     */
    @RequestMapping(value="/addAccount",method=RequestMethod.POST)
    public String add(@Valid Taccount account,BindingResult result,HttpServletResponse response,String[] roleIds,HttpServletRequest request){
        try{
        	account.setRecuser(Integer.valueOf(this.getLoginUserId()));
        	accountService.addAccount(account);
            logger.info("新增账目成功", LogType.OPERATOR);
            return this.renderText("success|success",response);
        }catch(Exception e){
        	e.printStackTrace();
            logger.info("新增账目错误", LogType.OPERATOR);
            return this.renderText("failure|新增账目错误",response);
        }
    }

    /**
     * AJAX提交删除数据
     * @param 
     * @return
     */
    @RequestMapping(value="/removeAccount",method=RequestMethod.POST)
    public String remove(Integer[] gids,HttpServletResponse response,HttpServletRequest request){
        try{
 	        accountService.delete(gids);
            logger.info("删除账目成功", LogType.OPERATOR);
 	       return this.renderText("success|success",response);
        }catch(Exception e){
     	   e.printStackTrace();
            logger.info("删除账目失败", LogType.OPERATOR);
            return this.renderText("failure|删除账目成功",response);
        }
    }   
    
    /**
    * 详细信息页面
    * @param 
    * @return
    */
   @RequestMapping(value = "/viewAccount",method=RequestMethod.GET)
   public void viewUser(String gid,HttpServletResponse response){
	   Taccount account = accountService.getById(gid);
       this.renderJson(account, response);
   }

   /**
    * AJAX提交修改数据
    * @param 
    * @return
    */
   @RequestMapping(value="/modifyAccount",method=RequestMethod.POST)
   public String modify(@Valid Taccount account,BindingResult result,HttpServletResponse response,HttpServletRequest request){
       try{
    	   accountService.updateAccount(account);
           logger.info("修改账目成功", LogType.OPERATOR);
           return this.renderText("success|success",response);
       }catch(Exception e){
       	e.printStackTrace();
           logger.info("修改账目错误", LogType.OPERATOR);
           return this.renderText("failure|修改账目错误",response);
       }
   }

   /**
    * 跳转列表页面
    * @param 
    * @return
    */
   @RequestMapping(value = "/getAccountTypes",method=RequestMethod.GET)
   public void getRoles(HttpServletResponse response) throws Exception {
       this.renderJson(accountService.getAccountTypes(), response);
   }
   
}
