package com.bright.amp.authc.filter;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.web.filter.authc.FormAuthenticationFilter;
import org.apache.shiro.web.util.WebUtils;
import org.slf4j.LoggerFactory;

import com.bright.amp.core.log.LogUtil;

public class PdFormAuthenticationFilter extends FormAuthenticationFilter {

    /** logger */
    private static final LogUtil logger = new LogUtil(LoggerFactory.getLogger(PdFormAuthenticationFilter.class));

    @Override
    protected boolean onAccessDenied(ServletRequest request, ServletResponse response) throws Exception {
        if (isLoginRequest(request, response)) {
            if (isLoginSubmission(request, response)) {
                logger.trace("Login submission detected.  Attempting to execute login.");
                return executeLogin(request, response);
            } else {
                logger.trace("Login page view.");
                // allow them to see the login page ;)
                return true;
            }
        } else {
            logger.trace("Attempting to access a path which requires authentication.  Forwarding to the " + "Authentication url [" + getLoginUrl() + "]");
            if (isAjaxRequest(WebUtils.toHttp(request))) {
                HttpServletResponse res = WebUtils.toHttp(response);
                Subject currentUser = SecurityUtils.getSubject();
                Session session = currentUser.getSession();
                if (session.getAttribute("userId") == null)
                {
                    res.setHeader("sessionstatus", "sessionOut");
                }
                res.sendError(HttpServletResponse.SC_UNAUTHORIZED);

            } else {
                HttpServletResponse res = WebUtils.toHttp(response);
                Subject currentUser = SecurityUtils.getSubject();
                Session session = currentUser.getSession();
                if (session.getAttribute("userId") == null)
                {
                    res.setHeader("sessionstatus", "sessionOut");
                }
                saveRequestAndRedirectToLogin(request, response);
            }
            return false;

        }
    }
    
    private boolean isAjaxRequest(HttpServletRequest request)
    {
        String header = request.getHeader("X-Requested-With");
        if (header != null && "XMLHttpRequest".equals(header))
        {
            return true;
        } else
        {
            return false;
        }
    }   

}