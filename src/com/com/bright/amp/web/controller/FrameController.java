package com.com.bright.amp.web.controller;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.com.bright.amp.authc.model.TsysModule;
import com.com.bright.amp.authc.service.FrameService;
import com.com.bright.amp.core.application.ApplicationInfo;
import com.com.bright.amp.core.log.LogType;
import com.com.bright.amp.core.log.LogUtil;
import com.com.bright.amp.user.model.TsysUser;
import com.com.bright.amp.user.service.UserService;
import com.polydata.commons.util.CharTurn;
import com.polydata.commons.util.PropertyReader;
import com.polydata.exception.ParameterException;



@Controller
public class FrameController extends BaseController {

    @Resource(name="frameService")
    private FrameService frameService;

    @Resource(name="userService")
    private UserService userService;

	/** logger */
	private static final LogUtil logger = new LogUtil(
			LoggerFactory.getLogger(FrameController.class));

   /* 
    @Resource(name="portalService")
    private PortalService portalService;
*/
    /**
     * 跳转Index页面
     * @param 
     * @return
     */
    @RequestMapping(value = "/indexFrame",method=RequestMethod.GET)
    public ModelAndView showIndex() throws Exception {
        return new ModelAndView("frame/main");
    }

    /**
     * 跳转swith页面
     * @param 
     * @return
     */
    @RequestMapping(value = "/switchFrame",method=RequestMethod.GET)
    public ModelAndView showSwitch() throws Exception {
        return new ModelAndView("frame/switch_frame");
    }

    /**
     * 跳转mainFrame页面
     * @param 
     * @return
     */
    @RequestMapping(value = "/getThirdMenu",method=RequestMethod.GET)
    public ModelAndView showMainFrame(String menuAction,String menuId) throws Exception {
        TsysModule module = frameService.getById(menuId);
        Map<String,String> map = new HashMap<String,String>();
        map.put("menuAction", menuAction);
        map.put("menuId", menuId);
        map.put("currentLocation", module.getModname());
        return new ModelAndView("frame/main_frame",map);
    }

    /**
     * 跳转Main页面
     * @param 
     * @return
     */
    @RequestMapping(value = "/main",method=RequestMethod.GET)
    public ModelAndView showMain() throws Exception {
        return new ModelAndView("frame/main_frame");
    }

    /**
     * 跳转TOP页面
     * @param 
     * @return
     */
    @RequestMapping(value = "/topFrame",method=RequestMethod.GET)
    public ModelAndView showTop() throws Exception {
    	Map<String,Object> model = new HashMap<String,Object>();
    	List<TsysModule> topModule = frameService.getTopModuleByUserId(getLoginUserId());
    	model.put("topModule", topModule);
        return new ModelAndView("frame/top_frame",model);
    }

    /**
     * 跳转LEFT页面
     * @param 
     * @return
     */
    @RequestMapping(value = "/leftFrame",method=RequestMethod.GET)
    public ModelAndView showLeft(String modId) throws Exception {
    	
    	if(modId==null || "".equals(modId)){
    		modId = "1";
    	}
    	
        Map<String,String> map = new HashMap<String,String>();
        map.put("userId", getLoginUserId());
        map.put("modId", modId);
        List<TsysModule> subModules = frameService.getModuleByUserIdAndModId(map);
        
        for(TsysModule thiMod : subModules){
        	map.put("modId", thiMod.getModid());
            List<TsysModule> thiModules = frameService.getModuleByUserIdAndModId(map);
            thiMod.setSubModule(thiModules);
        }
        
        Map<String,Object> model = new HashMap<String,Object>();
        model.put("module", subModules);
        
        return new ModelAndView("frame/left_frame",model);
    }
    
    
    @RequestMapping(value="/showSecond",method=RequestMethod.POST)
    public void showSecond(@Valid String modId,HttpServletResponse response){
    	List<TsysModule> modules = null;
    	Map<String,String> modle = new HashMap<String,String>();
    	modle.put("userId", getLoginUserId());
    	modle.put("modId", modId);
    	modules = frameService.getSecondModuleByUserIdAndModId(modle);
    	renderJson(modules,response);
    }

    /**
     * 跳转BOTTOM页面
     * @param 
     * @return
     */
    @RequestMapping(value = "/bottomFrame",method=RequestMethod.GET)
    public ModelAndView showBottom() throws Exception {
    	Map<String,Object> map = new HashMap<String,Object>();
    	PropertyReader reader;
    	String version = "V3.0";
		try {
			reader = new PropertyReader("/config/version.properties");
			version = reader.getProperty("version");
		} catch (IOException e) {
			e.printStackTrace();
		}
    	map.put("version", version);
        return new ModelAndView("frame/bottom_frame", map);
    }
    
    @RequestMapping(value="/showPages",method=RequestMethod.POST)
    public void showPages(HttpServletResponse response){
    	Map<String,String> mod = new HashMap<String,String>();
    	mod.put("userId", this.getLoginUserId());
    	//List<TPtlPage> modules = portalService.loadPagesByUserId(mod);
    	//renderJson(modules,response);
    }

    @RequestMapping(value="/showMsg",method=RequestMethod.GET)
    public ModelAndView showMsg(String msg){
    	Map<String,String> map = new HashMap<String,String>();
    	map.put("msg", msg);
        return new ModelAndView("frame/showMsg",map);
    }

    @RequestMapping(value="/getFooterInfo",method=RequestMethod.GET)
    public void getFooterInfo(HttpServletResponse response,HttpServletRequest request){
        Map<String,Object> map = new HashMap<String,Object>();
        try{
	        map.put("productversion", "1.0");
	    	map.put("loginDisplayname", userService.getById(this.getLoginUserId()).getUsername());
	    	TsysUser user = userService.getById(getLoginUserId());
	    	map.put("updatepwdcount", user.getUpdatepwdcount());
	    	map.put("issysdefault", user.getIssysdefault());
        }catch(Exception e){
        	e.printStackTrace();
        }
    	this.renderJson(map, response);
    }
    
    @RequestMapping(value="/index",method=RequestMethod.GET)
    public ModelAndView loadMenu(HttpServletResponse response,HttpServletRequest request){
        Map<String,String> modle = new HashMap<String,String>();
        modle.put("userId", this.getLoginUserId());
        modle.put("modId", "0");
        List<TsysModule> subModules = frameService.getModuleByUserIdAndModId(modle);
        
        for(TsysModule thiMod : subModules){
            modle.put("modId", thiMod.getModid());
            List<TsysModule> thiModules = frameService.getModuleByUserIdAndModId(modle);
            thiMod.setSubModule(thiModules);
        }

    	Map<String,Object> map = new HashMap<String,Object>();
    	map.put("subModules", subModules);
    	TsysUser user = userService.getById(getLoginUserId());
    	map.put("updatepwdcount", user.getUpdatepwdcount());
    	map.put("issysdefault", user.getIssysdefault());
    	
    	map.put("loginDisplayname", userService.getById(this.getLoginUserId()).getUsername());
    	
    	//map.put("testMode", Protocol.isTestMode()?1:0);
        return new ModelAndView("frame/index",map);
        //renderJson(subModules,response);
    }
    
    @RequestMapping(value = "/ico",method=RequestMethod.GET)
    public ModelAndView showIco() throws Exception {
        return new ModelAndView("ico");
    }

    @RequestMapping(value = "/showabout",method=RequestMethod.GET)
    public void showabout(HttpServletResponse response) throws Exception {
        Map<String,Object> map = new HashMap<String,Object>();
        String line = "";
		Process pr = null;
		BufferedReader in = null;
		List<Map<String,String>> contents = new ArrayList<Map<String,String>>();
		try{
			String cmd = "python "+this.getRoot()+"/script/upgrade_show_versions.py -t all -x";
			pr = Runtime.getRuntime().exec(cmd);
			in = new BufferedReader(new InputStreamReader(
					pr.getInputStream()));

			while((line = in.readLine())!=null){
				logger.debug(cmd + " 执行返回: " + line);
				if(line.indexOf("$")>-1){
					Map<String,String> content = new HashMap<String,String>();
					String[] contentArr = line.split("\\$");
					content.put("name", contentArr[0]);
					content.put("content", contentArr[1]);
					contents.add(content);
				}
			}
		} catch(IOException e) {
			e.printStackTrace();
			throw new ParameterException("system.frame.execscriptfail");
		} finally{
		}
        map.put("contents", contents);
        this.renderJson(map, response);
    }

    @RequestMapping(value="/getSysMenu",method=RequestMethod.GET)
    public void loadSystemMenu(HttpServletResponse response,HttpServletRequest request){
        Map<String,String> modle = new HashMap<String,String>();
        modle.put("userId", this.getLoginUserId());
        modle.put("modId", "0");
        List<TsysModule> subModules = frameService.getModuleByUserIdAndModId(modle);
        
        for(TsysModule thiMod : subModules){
            modle.put("modId", thiMod.getModid());
            List<TsysModule> thiModules = frameService.getModuleByUserIdAndModId(modle);
            thiMod.setSubModule(thiModules);
            if(thiModules.size() > 0){
                thiMod.setSubModuleFlag("");
            }else{
                thiMod.setSubModuleFlag("active");
            }
        }
    	this.renderJson(subModules, response);
    }
}
