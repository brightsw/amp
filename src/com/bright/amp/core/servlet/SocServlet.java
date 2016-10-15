package com.bright.amp.core.servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 线程调度实现Servlet
 * <b>Security Operation Center(SOC)
 * @author mike
 * @version 1.0
 */
public class SocServlet extends HttpServlet {

    private static final long serialVersionUID = 1L;
    
    //private RTMService rtmService = new RTMService();
    
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        super.doGet(request, response);
    }

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        super.doPost(request, response);
    }

    /**
     * Web application初始化
     * @throws ServletException Servlet
     */
    public void init() throws ServletException {
        super.init();
    }

    /**
     * Web application关闭前destory 其他对象
     */
    public void destroy() {
        //关闭总线通信连接方法
        super.destroy();
    }

   
    
}