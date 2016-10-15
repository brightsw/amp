/**
 * 
 */
package com.com.bright.amp.web.util;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * @author Administrator
 * 
 */
public final class StringUtil {
    private final static Pattern url_pattern = Pattern.compile("http(s)?://([\\w-]+\\.)+[\\w-]+(/[\\w-./?%&=#]*)?");

    /**
     * 自动为文本中的url生成链接
     * 
     * @param txt
     * @return
     */
    public static String autoMakeLink(String txt) {
        StringBuilder html = new StringBuilder();
        int lastIdx = 0;
        Matcher matchr = url_pattern.matcher(txt);
        while (matchr.find()) {
            String str = matchr.group();
            html.append(txt.substring(lastIdx, matchr.start()));
            html.append("<a href='javascript:openWindow(\"" + str + "\")'>" + str + "</a>");
            lastIdx = matchr.end();
        }
        html.append(txt.substring(lastIdx));
        return html.toString();
    }

    public static String IPv6toIPv4(String ipv6) {
        String ipv4 = "";
        String[] sp = ipv6.split(":");

        boolean notV4 = true;
        if (sp.length == 8) {
            if (sp[0].equals(sp[1]) && sp[1].equals(sp[2]) && sp[2].equals(sp[3]) && sp[3].equals(sp[4]) && sp[4].equals(sp[5])) {
                notV4 = false;
                // 可以转换
                try {
                    Integer ip0 = Integer.parseInt(sp[6].substring(0, 2), 16);
                    Integer ip1 = Integer.parseInt(sp[6].substring(2, 4), 16);
                    Integer ip2 = Integer.parseInt(sp[7].substring(0, 2), 16);
                    Integer ip3 = Integer.parseInt(sp[7].substring(2, 4), 16);
                    if (ip0 > 255 || ip1 > 255 || ip2 > 255 || ip3 > 255) {
                        ipv4 = "::" + sp[6] + ":" + sp[7];
                    } else {
                        ipv4 = ip0 + "." + ip1 + "." + ip2 + "." + ip3;
                    }
                } catch (Exception e) {
                    return ipv4 = "::" + sp[6] + ":" + sp[7];
                }
            }
        }
        if (ipv6.indexOf("::") >= 0) {
            notV4 = false;
            ipv4 = ipv6;
        }
        if (notV4) {
            boolean flag = true;
            for (int i = 0; i < sp.length; i++) {
                int index = 0;
                if (sp[i].equals("0000") && sp[i + 1].equals("0000") && flag) {
                    for (int k = i + 1; k < sp.length; k++) {
                        if (!sp[k].equals("0000")) {
                            index = k - 1;
                            break;
                        }
                    }
                    ipv4 += "::";
                    i = index;
                    flag = false;

                } else {
                    if (ipv4.endsWith("::")) {
                        ipv4 += sp[i];
                    } else {
                        ipv4 += "_:" + sp[i];
                    }
                }
            }
        }
        if (ipv4.startsWith("_:")) {
            ipv4 = ipv4.substring(2, ipv4.length()).replace("_", "");
        }

        return ipv4;
    }

    public static String[] array_unique(String[] arr) {
        Set<String> set = new HashSet<String>();
        set.addAll(Arrays.asList(arr));
        return set.toArray(new String[0]);
    }

}
