package com.bright.amp.core.utils;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.Subject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class SessionUtil 
{
    private static final Logger      logger       = LoggerFactory.getLogger(SessionUtil.class);
    
    /**
     * 获取当前登录用户ID
     * 
     * @return 返回登录用户ID
     */
    public static String getLoginUserId()
    {
        return getValue("userId");
    }

    /**
     * 获取当前登录用户登录名
     * 
     * @return 返回登录用户登录名
     */
    public static String getLoginUserName()
    {
        //logger.debug("获取当前登录名");
        return getValue("userName");
    }

    /**
     * 获取当前登录显示名称
     * 
     * @return 返回登录显示名称
     */
    public static String getLoginUserDisplayName()
    {
        //logger.debug("获取当前登录名");
        return getValue("userDisplayName");
    }

 
    public static String getLoginIp()
    {
        //logger.debug("获取当前登录人IP");
        return getValue("ip");
    }

    /**
     * 获取当前登录用户扩展属性
     * 
     * @param key
     * @return
     */
    public static String getValue(String key)
    {
        //logger.debug("获取Session属性={}", key);
        Subject currentUser = SecurityUtils.getSubject();
        if (currentUser.isAuthenticated())
        {
            Session session = currentUser.getSession();
            String username = (String) session.getAttribute(key);
            String id = (String) session.getId();
            //logger.debug("sessionid={},返回扩展属性{}={},", id, key, username);
            return username;
        } else
        {
            logger.warn("没有登录获取不到信息");
            return null;
        }
    }    

    /**
     * 判断用户登录IP是否合法
     * 
     * @param ip
     * @return
     */
    public static boolean ipIsLegal(String ip)
    {
        if (ip == null)
        {
            return false;
        } else
        {
            ip = ip.replace(".", "_");
        }
        String permitIp = getValue("permitIp");
        if (permitIp != null && permitIp.trim().length() > 1)
        {
            // 根据“，”分割多组ip策略 例如：192.168.100.1,192.168.2.?,192.168.5.*
            String[] ips = permitIp.trim().split(",");
            for (String ip1 : ips)
            {
                String ip2 = ip1.trim();
                ip2 = ip2.replace(".", "_");
                ip2 = ip2.replace("?", ".");
                ip2 = ip2.replace("*", ".*");
                String regEx = "^" + ip2 + "$"; // 表示一个或多个@
                Pattern pat = Pattern.compile(regEx);
                Matcher mat = pat.matcher(ip);
                if (mat.find())
                {
                    return true;
                }
            }
            return false;
        } else
        {
            return true;
        }
    }


    /**
     * 验证ip是否在ip段中
     * 
     * @param ipSection
     * @param ip
     * @return
     */
    public static boolean ipIsValid(String ip)
    {
        String ipSection = getValue("permitIp");
        if (ipSection == null || "".equals(ipSection))
            return true;
        if (ip == null || "".equals(ip))
            return false;
        ipSection = ipSection.trim();
        ip = ip.trim();
        final String REGX_IP = "((25[0-5]|2[0-4]\\d|1\\d{2}|[1-9]\\d|\\d)\\.){3}(25[0-5]|2[0-4]\\d|1\\d{2}|[1-9]\\d|\\d)";
        if (StringUtils.indexOf(ipSection, "-") > -1)
        {
            final String REGX_IPB = REGX_IP + "\\-" + REGX_IP;
            if (!ipSection.matches(REGX_IPB) || !ip.matches(REGX_IP))
                return false;
            int idx = StringUtils.indexOf(ipSection, '-');
            String[] sips = StringUtils.split(ipSection.substring(0, idx), "\\.");
            String[] sipe = StringUtils.split(ipSection.substring(idx + 1), "\\.");
            String[] sipt = StringUtils.split(ip, "\\.");
            long ips = 0L, ipe = 0L, ipt = 0L;
            for (int i = 0; i < 4; ++i)
            {
                ips = ips << 8 | Integer.parseInt(sips[i]);
                ipe = ipe << 8 | Integer.parseInt(sipe[i]);
                ipt = ipt << 8 | Integer.parseInt(sipt[i]);
            }
            if (ips > ipe)
            {
                long t = ips;
                ips = ipe;
                ipe = t;
            }
            return ips <= ipt && ipt <= ipe;
        } else
        {
            if (!ipSection.matches(REGX_IP) || !ip.matches(REGX_IP))
                return false;
            String[] sips = StringUtils.split(ipSection, "\\.");
            String[] sipt = StringUtils.split(ip, "\\.");
            long ips = 0L, ipt = 0L;
            for (int i = 0; i < 4; ++i)
            {
                ips = ips << 8 | Integer.parseInt(sips[i]);
                ipt = ipt << 8 | Integer.parseInt(sipt[i]);
            }
            return ips <= ipt;
        }
    }
}
