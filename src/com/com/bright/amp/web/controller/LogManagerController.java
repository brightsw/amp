package com.com.bright.amp.web.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileWriter;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.LoggerFactory;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.com.bright.amp.core.application.ApplicationInfo;
import com.com.bright.amp.core.log.LogType;
import com.com.bright.amp.core.log.LogUtil;
import com.com.bright.amp.system.model.TsysLog;
import com.com.bright.amp.system.service.LogManagerService;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.LongSerializationPolicy;
import com.polydata.framework.core.web.Page;

@Controller
public class LogManagerController extends BaseController {

    /** logger */
	private static final LogUtil   logger    =  new LogUtil(LoggerFactory.getLogger(LogManagerController.class));

    @Resource(name="logManagerService")
    private LogManagerService logManagerService;

    @Resource(name="messageSource")
    private MessageSource messageSource;
    
    protected Gson createGson() {
		return new GsonBuilder().serializeNulls().setDateFormat("yyyy-MM-dd HH:mm:ss")
				.setLongSerializationPolicy(LongSerializationPolicy.STRING)
				.create();
	}
    
	/**
     * 跳转列表页面
     * @param 
     * @return
     */
    @RequestMapping(value = "/getServerDate",method=RequestMethod.GET)
    public void getServerDate(HttpServletResponse response) throws Exception {
    	SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		String nowStr = sdf.format(new Date());
    	this.renderText(nowStr, response);
    }

	/**
     * 跳转列表页面
     * @param 
     * @return
     */
    @RequestMapping(value = "/operateLogListJson",method=RequestMethod.POST)
    public void getOperateLogJsonData(HttpServletResponse response,HttpServletRequest request,String sort,
            Integer displayStart,String createtime,String regcode,String ipaddress,
            String loglevel,String logcontent,String operatoruser){
    	try{
    		if(createtime == null || createtime.equals("")){
    	    	SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
    	    	createtime = sdf.format(new Date());
    		}
	        Map<String,Object> map = new HashMap<String,Object>();
	        map.put("sortColumns", sort);
	        map.put("createtime", createtime);
	        map.put("regcode", regcode);
	        map.put("ipaddress", ipaddress);
	        map.put("logtype", 2);
	        map.put("loglevel", loglevel);
	        map.put("logcontent", logcontent);
	        map.put("operatoruser", operatoruser);
	        Page<TsysLog> page = new Page<TsysLog>();
	        getPageParameter(page,request,displayStart);
	        logManagerService.pageQuery(map, page);
	        readerData2Json(page.getPageList(), page.getTotalCount(),response,page.getStart());
    	}catch(Exception e){
    		e.printStackTrace();
	        readerData2Json(null, 0, response, 0);
    	}
    }

	/**
     * 跳转列表页面
     * @param 
     * @return
     */
    @RequestMapping(value = "/runningLogList",method=RequestMethod.GET)
    public ModelAndView listRunning() throws Exception {
    	SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
    	
    	Map<String,Object> map = new HashMap<String,Object>();
		String nowStr = sdf.format(new Date());
    	map.put("currentDay", nowStr);
        return new ModelAndView("system/log/runningLogList",map);
    }

	/**
     * 跳转列表页面
     * @param 
     * @return
     */
    @RequestMapping(value = "/runningLogListJson",method=RequestMethod.POST)
    public void getRunningLogJsonData(HttpServletResponse response,HttpServletRequest request,String sort,
            Integer displayStart,String createtime,String componentname,String ipaddress,String regcode,
            String loglevel,String logcontent,String operatoruser){
    	try{
    		if(createtime == null || createtime.equals("")){
    	    	SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
    	    	createtime = sdf.format(new Date());
    		}
	        Map<String,Object> map = new HashMap<String,Object>();
	        map.put("sortColumns", sort);
	        map.put("createtime", createtime);
	        map.put("regcode", regcode);
	        map.put("componentname", componentname);
	        map.put("ipaddress", ipaddress);
	        map.put("logtype", 1);
	        map.put("loglevel", loglevel);
	        map.put("logcontent", logcontent);
	        map.put("operatoruser", operatoruser);
	        Page<TsysLog> page = new Page<TsysLog>();
	        getPageParameter(page,request,displayStart);
	        logManagerService.pageQuery(map, page);
	        readerData2Json(page.getPageList(), page.getTotalCount(),response,page.getStart());
    	}catch(Exception e){
    		e.printStackTrace();
	        readerData2Json(null, 0, response, 0);
    	}
    }

	/**
     * 跳转列表页面
     * @param 
     * @return
     */
    @RequestMapping(value = "/exportLog",method=RequestMethod.POST)
	@ResponseBody
    public void exportLog(HttpServletResponse response,HttpServletRequest request,String sort,
            Integer displayStart,String createtime,String componentname,String ipaddress,
            String loglevel,String logcontent,String operatoruser,Integer logtype,String regcode){
    	SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
    	try{
    		if(createtime == null || createtime.equals("")){
    	    	createtime = sdf.format(new Date());
    		}
	        Map<String,Object> map = new HashMap<String,Object>();
	        map.put("sortColumns", sort);
	        map.put("createtime", createtime);
	        map.put("componentname", componentname);
	        map.put("ipaddress", ipaddress);
	        map.put("logtype", logtype);
	        map.put("loglevel", loglevel);
	        map.put("logcontent", logcontent);
	        map.put("operatoruser", operatoruser);
	        map.put("regcode", regcode);
	        List<TsysLog> logList = logManagerService.query(map);
	        HttpHeaders headers = new HttpHeaders();
	        String fileName;
	        String contentTitle;
	        if(logtype == 1){
	        	fileName = "apt_runningLog-" + createtime + ".txt";
	        	contentTitle = messageSource.getMessage("system.logmanage.cmpname",null,ApplicationInfo.getLocale())+
        				"|"+messageSource.getMessage("system.logmanage.date",null,ApplicationInfo.getLocale())+
        				"|"+messageSource.getMessage("system.logmanage.level",null,ApplicationInfo.getLocale())+
        				"|"+messageSource.getMessage("system.logmanage.ip",null,ApplicationInfo.getLocale())+
        				"|"+messageSource.getMessage("system.logmanage.content",null,ApplicationInfo.getLocale());
	        }else{
	        	fileName = "apt_operateLog-" + createtime + ".txt";
	        	contentTitle = messageSource.getMessage("system.logmanage.cmpname",null,ApplicationInfo.getLocale())+
	        				"|"+messageSource.getMessage("system.logmanage.date",null,ApplicationInfo.getLocale())+
	        				"|"+messageSource.getMessage("system.logmanage.level",null,ApplicationInfo.getLocale())+
	        				"|"+messageSource.getMessage("system.logmanage.ip",null,ApplicationInfo.getLocale())+
	        				"|"+messageSource.getMessage("system.logmanage.user",null,ApplicationInfo.getLocale())+
	        				"|"+messageSource.getMessage("system.logmanage.content",null,ApplicationInfo.getLocale());
	        }
	        fileName = new String(fileName.getBytes(), "ISO8859-1");
	        headers.setContentType(MediaType.parseMediaType("application/txt"));
	        headers.setContentDispositionFormData("attachment", fileName);
	
	        String pathDir = "/temp/" + fileName;
	        String realFilePath = request.getSession().getServletContext().getRealPath(pathDir);
	        File tempFile = new File(realFilePath);
	        tempFile.deleteOnExit();
	        
	        PrintWriter out = new PrintWriter(new FileWriter(tempFile, false));
	        out.print(contentTitle+"\r\n");
	        for(TsysLog log : logList){
		        if(logtype == 1){
		        	out.print(log.getComponentname()+"|"+sdf.format(log.getCreatetime())+"|"+log.getLoglevel()+"|"+log.getIpaddress()+"|"+log.getLogcontent()+"\r\n");
		        }else{
		        	out.print(log.getComponentname()+"|"+sdf.format(log.getCreatetime())+"|"+log.getLoglevel()+"|"+log.getIpaddress()+"|"+log.getOperatoruser()+"|"+log.getLogcontent()+"\r\n");
		        }
	        }
	        out.flush();
	        out.close();
	        

			// 读取目标文件流，转换调用下载
			File resultFile = new File(realFilePath);
			FileInputStream resultFileFi = new FileInputStream(resultFile);
			long l = resultFile.length();
			int k = 0;
			byte abyte0[] = new byte[65000];

			// 调用下载
			response.setContentType("application/txt");
			response.setContentLength((int) l);
			response.setHeader("Content-Disposition", "attachment; filename=" + new String(fileName.getBytes(), "ISO8859_1"));
			while ((long) k < l) {
				int j;
				j = resultFileFi.read(abyte0, 0, 65000);
				k += j;
				response.getOutputStream().write(abyte0, 0, j);
			}
			resultFileFi.close();
	        
            logger.info(messageSource.getMessage("system.logmanage.exportlog.succ",null,ApplicationInfo.getLocale()), LogType.OPERATOR);
    	}catch(Exception e){
    		e.printStackTrace();
            logger.info(messageSource.getMessage("system.logmanage.exportlog.fail",null,ApplicationInfo.getLocale()), LogType.OPERATOR);
    	}
    }

	/**
     * 跳转列表页面
     * @param 
     * @return
     */
    @RequestMapping(value = "/viewSysLog",method=RequestMethod.GET)
    public ModelAndView viewSysLog(Integer logid) throws Exception {
    	Map<String,Object> map = new HashMap<String,Object>();
    	map.put("syslog", logManagerService.getById(logid));
        return new ModelAndView("system/log/viewSysLog",map);
    }

}
