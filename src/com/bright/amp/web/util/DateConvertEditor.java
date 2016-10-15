package com.bright.amp.web.util;

import java.beans.PropertyEditorSupport;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.util.StringUtils;

public class DateConvertEditor extends PropertyEditorSupport {
	private SimpleDateFormat datetimeFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	private SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");

	public void setAsText(String text) throws IllegalArgumentException {
		if (StringUtils.hasText(text)) {
			try {
				if (text.indexOf(":") == -1 && text.length() == 10) {
					setValue(this.dateFormat.parse(text));
				} else if (text.indexOf(":") > 0 && text.length() == 19) {
					setValue(this.datetimeFormat.parse(text));
				}else{
					throw new IllegalArgumentException("Could not parse date, date format is error ");
				}
			} catch (ParseException ex) {
				IllegalArgumentException iae = new IllegalArgumentException("Could not parse date: " + ex.getMessage());
				iae.initCause(ex);
				throw iae;
			}
		} else {
			setValue(null);
		}
	}
	
	public String setAsTime(Date date){
		return datetimeFormat.format(date);
	}
	
	public String setAsDate(Date date){
		return dateFormat.format(date);
	}
	
	/**
	 * @param 2013112511
	 * @return 2013-11-25 11
	 */
	public String toDateString(String str){
		if(str.length()!=10){
			return str;
		}
		String date = str.substring(0, 4)+"-"+str.substring(4, 6)+"-"+str.substring(6, 8)+" "+str.substring(8, 10);
		return date;
	}
	
	/**
	 * @param 2013-11-25 11:24:25
	 * @return 2013112511
	 */
	
	public String toDateStr(String date){
		String dateStr = date.replaceAll("-", "").replaceAll(" ", "").replaceAll(":", "").substring(0, 10);
		return dateStr;
	}
	
	
	public String convertDateText(String dbDate) {
        String returnStr = "";
        try {
            if (dbDate.length() == 7) {
                String dayStr = dbDate.substring(0, 1);
                if (dayStr.equals("1")) {
                    dayStr = "星期一";
                } else if (dayStr.equals("2")) {
                    dayStr = "星期二";
                } else if (dayStr.equals("3")) {
                    dayStr = "星期三";
                } else if (dayStr.equals("4")) {
                    dayStr = "星期四";
                } else if (dayStr.equals("5")) {
                    dayStr = "星期五";
                } else if (dayStr.equals("6")) {
                    dayStr = "星期六";
                } else if (dayStr.equals("7")) {
                    dayStr = "星期日";
                } else {
                    dayStr = "";
                }
                SimpleDateFormat sD = new SimpleDateFormat("HHmmss");
                Date date = sD.parse(dbDate.substring(1));
                SimpleDateFormat simpleDate = new SimpleDateFormat(" HH:mm");
                returnStr = dayStr + simpleDate.format(date);
            }
            if (dbDate.length() == 6) {
                SimpleDateFormat sD = new SimpleDateFormat("HHmmss");
                Date date = sD.parse(dbDate);
                SimpleDateFormat simpleDate = new SimpleDateFormat(" HH:mm");
                returnStr = simpleDate.format(date);
            }
            if (dbDate.length() == 14) {
                SimpleDateFormat sD = new SimpleDateFormat("yyyyMMddHHmmss");
                Date date = sD.parse(dbDate);
                SimpleDateFormat simpleDate = new SimpleDateFormat("yyyy-MM-dd HH:mm");
                returnStr = simpleDate.format(date);
            }
            return returnStr;
        } catch (Exception e) {
            return "";
        }
    }
	
}
