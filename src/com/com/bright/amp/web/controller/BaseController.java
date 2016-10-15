package com.com.bright.amp.web.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.Subject;
import org.slf4j.LoggerFactory;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.web.bind.ServletRequestDataBinder;
import org.springframework.web.bind.annotation.InitBinder;

import com.polydata.framework.core.web.Page;
import com.com.bright.amp.authc.vo.ShiroUser;
import com.com.bright.amp.core.log.LogUtil;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.LongSerializationPolicy;

public class BaseController {

    /** logger */
	private static final LogUtil   logger    =  new LogUtil(LoggerFactory.getLogger(BaseController.class));
	
    protected String getLoginUserId(){
        Subject currentUser = SecurityUtils.getSubject();
        ShiroUser shUser = (ShiroUser) currentUser.getPrincipal();
        return shUser.getId();
    }
    
    protected String getLoginUserName(){
        Subject currentUser = SecurityUtils.getSubject();
        Session session = currentUser.getSession();
        String userName = (String) session.getAttribute("userName");
        return userName;
    }
    
    protected void readerData2Json(Collection<?> list, Integer total,HttpServletResponse response,Integer start)
    {
        // 将要转换的对象
        Map<String, Object> pageToJson = new HashMap<String, Object>();
        // 总记录条数
        if (total == -1)
        {
            pageToJson.put("iTotalRecords", 0);
        } else
        {
            pageToJson.put("iTotalRecords", total);
        }
        // 数据行
        if (null == list)
        {
            list = new ArrayList<Object>();
        }
        pageToJson.put("aaData", list);
        if (null == total)
        {
            total = 0;
        }
        pageToJson.put("iTotalDisplayRecords", total);
        pageToJson.put("iDisplayStart", start);
        // 调用通用转JSON方法
        renderJson(pageToJson,response);
    }
    
    protected void initPageData2Json(Collection<?> list, Integer total,HttpServletResponse response,Integer start)
    {
        // 将要转换的对象
        Map<String, Object> pageToJson = new HashMap<String, Object>();
        // 总记录条数
        if (total == -1)
        {
            pageToJson.put("total", 0);
        } else
        {
            pageToJson.put("total", total);
        }
        // 数据行
        if (null == list)
        {
            list = new ArrayList<Object>();
        }
        pageToJson.put("data", list);
        if (null == total)
        {
            total = 0;
        }
        pageToJson.put("total", total);
        // 调用通用转JSON方法
        renderJson(pageToJson,response);
    }
    
    protected void initData2Json(Collection<?> list, Integer total,HttpServletResponse response)
    {
        // 将要转换的对象
        Map<String, Object> pageToJson = new HashMap<String, Object>();
        // 总记录条数
        if (total == -1)
        {
            pageToJson.put("iTotalRecords", 0);
        } else
        {
            pageToJson.put("iTotalRecords", total);
        }
        // 数据行
        if (null == list)
        {
            list = new ArrayList<Object>();
        }
        pageToJson.put("aaData", list);
        if (null == total)
        {
            total = 0;
        }
        pageToJson.put("iTotalDisplayRecords", total);
        pageToJson.put("iDisplayStart", 0);
        // 调用通用转JSON方法
        renderJson(pageToJson,response);
    }

    /**
     * @param obj(需要转化为JSON的对象)
     * @return
     */
    protected void renderJson(Object obj,HttpServletResponse response)
    {
        response.setContentType("application/json;charset=UTF-8");
        Gson gson = this.createGson();
        if (obj != null)
        {
            try
            {
                String jsonStr = gson.toJson(obj);
                //logger.debug(jsonStr);
                response.getWriter().write(jsonStr);
            } catch (Exception e)
            {
                e.printStackTrace();
            }
        }
    }
    
    /**
     * @param obj(需要转化为JSON的对象)
     * @return
     */
    protected void renderJsonArray(Object obj,HttpServletResponse response)
    {
        response.setContentType("application/json;charset=UTF-8");
        if (obj != null)
        {
            try
            {
                String jsonStr = obj.toString();
                //logger.debug(jsonStr);
                response.getWriter().write(jsonStr);
            } catch (Exception e)
            {
                e.printStackTrace();
            }
        }
    }
    
    /**
     * @param obj(需要转化为JSON的对象)
     * @return
     */
    protected void renderEsJson(Object obj,HttpServletResponse response)
    {
        response.setContentType("application/json;charset=UTF-8");
        if (obj != null)
        {
            try
            {
                response.getWriter().write((String)obj);
            } catch (Exception e)
            {
                e.printStackTrace();
            }
        }
    }

    /**
     * 子类可以覆盖这个函数以配置GSON的选项，比如修改摸个内联对象的格式化策略
     * 
     * @return
     */
    protected Gson createGson()
    {
        return new GsonBuilder().serializeNulls().setDateFormat("yyyy-MM-dd").setLongSerializationPolicy(LongSerializationPolicy.STRING)
                .create();
    }
    

    /**
     * @desc 根据传入的内容信息，以流的形式返回前台与AJAX进行交互
     * @param text
     * @param contentType
     * @return
     */
    protected String render(String text, String contentType,HttpServletResponse response)
    {
        response.setCharacterEncoding("UTF-8");
        response.setHeader("Cache-Control", "no-cache");
        response.setContentType(contentType);
        PrintWriter pw = null;
        try
        {
            pw = response.getWriter();
            pw.write(text);
            pw.flush();
        } catch (IOException e)
        {
            e.printStackTrace();
        } finally
        {
            if (null != pw)
            {
                pw.close();
            }
        }
        return null;
    }

    /**
     * @desc
     * @param text（字符串）
     * @return
     */
    protected String renderText(String text,HttpServletResponse response)
    {
        return this.render(text, "text/plain;charset=UTF-8",response);
    }

    /**
     * Checks if is empty.
     * 
     * @param str the str
     * @return true, if is empty
     */
    protected boolean isEmpty(Object str)
    {
        return str == null || str.toString().isEmpty() || ("undefined").equals(str.toString());
    }

    /**
     * @param obj(需要转化为JSON的对象)
     * @return
     */
    protected String renderDataJson(Object obj)
    {
        String jsonStr = "";
        Gson gson = this.createGson();
        if (obj != null)
        {
            try
            {
                jsonStr = gson.toJson(obj);
            } catch (Exception e)
            {
                e.printStackTrace();
            }
        }
        return jsonStr;
    }

    protected void getPageParameter(Page<?> page,HttpServletRequest request,Integer displayStart){
        Integer pageDisStart = Integer.parseInt(request.getParameter("iDisplayStart"));
        Integer pageSize = Integer.parseInt(request.getParameter("iDisplayLength"));
        int start;
        if (!isEmpty(displayStart) && displayStart == pageDisStart) {
            start = displayStart;
        } else {
            displayStart = pageDisStart;
            start = pageDisStart;
        }
        int currPage = start / pageSize == 0 ? 1 : start / pageSize + 1;
        page.setPageNo(currPage);
        page.setStart(start);
        page.setPageSize(pageSize);
    }
    
    protected void getPageParameter(Page<?> page,HttpServletRequest request){
        Integer pageDisStart = Integer.parseInt(request.getParameter("page"));
        Integer pageSize = Integer.parseInt(request.getParameter("page_limit"));
        int start = pageDisStart * pageSize;
        int currPage = pageDisStart;
        page.setStart(start);
        page.setPageNo(currPage);
        page.setPageSize(pageSize);
    }

    @InitBinder
    protected void initBinder(HttpServletRequest request,
              ServletRequestDataBinder binder) throws Exception { 
          DateFormat fmt = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
          CustomDateEditor dateEditor = new CustomDateEditor(fmt, true);
          binder.registerCustomEditor(Date.class, dateEditor);
      }
    
    protected String readerData2JsonString(Collection<?> list, Integer total,Integer start)
    {
        // 将要转换的对象
        Map<String, Object> pageToJson = new HashMap<String, Object>();
        // 总记录条数
        if (total == -1)
        {
            pageToJson.put("iTotalRecords", 0);
        } else
        {
            pageToJson.put("iTotalRecords", total);
        }
        // 数据行
        if (null == list)
        {
            list = new ArrayList<Object>();
        }
        pageToJson.put("aaData", list);
        if (null == total)
        {
            total = 0;
        }
        pageToJson.put("iTotalDisplayRecords", total);
        pageToJson.put("iDisplayStart", start);
        Gson gson = this.createGson();
        if (pageToJson != null)
        {
            try
            {
                return gson.toJson(pageToJson);
            } catch (Exception e)
            {
                e.printStackTrace();
            }
        }
        return null;
    }

    protected String getRoot(){
    	String root = System.getenv("PRODUCT_HAWK_ROOT");
    	if(root == null || root.equals("")){
    		logger.debug(new Date()+" "+"WARNING com.polydata.falcon.web.controller.BaseController - Get system env is "+root+",now return default value");
    		root = "/polyhawk";
    	}
    	return root;
    }

    protected String getDataRoot(){
    	String root = System.getenv("PRODUCT_HAWK_DATA");
    	if(root == null || root.equals("")){
    		root = "/polydata";
    	}
    	return root;
    }
}
