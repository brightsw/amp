package com.bright.amp.report.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bright.amp.report.dao.TrptTemplateDao;
import com.bright.amp.report.dao.TstaCommonDao;
import com.bright.amp.report.model.TrptTemplate;
import com.bright.amp.report.model.TstaCommon;
import com.polydata.framework.core.service.BaseService;

@Service("rptTemplateService")
public class RptTemplateService extends BaseService<TrptTemplate, TrptTemplateDao> {

	@Autowired
	private TstaCommonDao tstaCommonDao;

	public List<TstaCommon> querySql(Map<String, Object> map) {
		return tstaCommonDao.query(map);
	}

	public ArrayList<String> generatorxAxis(String timeStr, String type) {

		try {
			String[] timeArr = toFormatTimeRange(timeStr, type).split("@");
			String startTime = timeArr[0];
			String endTime = timeArr[1];

			ArrayList<String> xdatas = new ArrayList<String>();
			if ("1".equals(type)) {
				for (int i = 0; i <= 23; i++) {
					String hour = "";
					if (i < 10) {
						hour = "0" + i;
					} else {
						hour = "" + i;
					}
					xdatas.add(hour);
				}
			} else if ("2".equals(type) || "3".equals(type)) {
				Calendar startCalendar = Calendar.getInstance();
				Calendar endCalendar = Calendar.getInstance();
				SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
				Date startDate = df.parse(startTime.substring(0, 10));
				startCalendar.setTime(startDate);
				Date endDate = df.parse(endTime.substring(0, 10));
				endCalendar.setTime(endDate);
				while (true) {
					xdatas.add(df.format(startCalendar.getTime()));

					if (startCalendar.getTimeInMillis() < endCalendar.getTimeInMillis()) {
						startCalendar.add(Calendar.DAY_OF_MONTH, 1);
					} else {
						break;
					}
				}

			} else if ("4".equals(type)) {
				for (int i = 1; i <= 12; i++) {
					String month = startTime.substring(0, 5);
					if (i < 10) {
						month += "0" + i;
					} else {
						month += "" + i;
					}
					xdatas.add(month);
				}
			} else if ("5".equals(type)) {
				for (int i = 1; i <= 12; i++) {
					String month = startTime.substring(0, 5);
					if (i < 10) {
						month += "0" + i;
					} else {
						month += "" + i;
					}
					xdatas.add(month);
				}
			} else if ("6".equals(type)) {
				for (int i = 1; i <= 12; i++) {
					String month = "";
					if (i < 10) {
						month += "0" + i;
					} else {
						month += "" + i;
					}
					xdatas.add(month);
				}
			}

			return xdatas;
		} catch (Exception e) {
			return null;
		}
	}

	public String toTimeRange(TrptTemplate template) {
		String beginTime = "";
		String endTime = "";

		if (template.getGranularity() == 3) {
			// 上一天
			Calendar c = Calendar.getInstance();
			c.add(Calendar.DAY_OF_MONTH, -1);
			beginTime = new SimpleDateFormat("yyyy-MM-dd").format(c.getTime());
			return beginTime;

		} else if (template.getGranularity() == 4) {
			// 上一周
			SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
			Calendar calendar1 = Calendar.getInstance();
			Calendar calendar2 = Calendar.getInstance();
			int dayOfWeek = calendar1.get(Calendar.DAY_OF_WEEK) - 1;
			int offset1 = 1 - dayOfWeek;
			int offset2 = 7 - dayOfWeek;
			calendar1.add(Calendar.DATE, offset1 - 7);
			calendar2.add(Calendar.DATE, offset2 - 7);

			beginTime = format.format(calendar1.getTime());
			endTime = format.format(calendar2.getTime());
			return beginTime + "~" + endTime;

		} else if (template.getGranularity() == 5) {
			// 上一月
			Calendar c = Calendar.getInstance();
			c.add(Calendar.MONTH, -1);
			beginTime = new SimpleDateFormat("yyyy-MM").format(c.getTime());
			return beginTime;
		} else if (template.getGranularity() == 6) {
			// 上一年
			Calendar c = Calendar.getInstance();
			c.add(Calendar.YEAR, -1);
			beginTime = new SimpleDateFormat("yyyy").format(c.getTime());
			return beginTime;
		} else if (template.getGranularity() == 7) {
			// 自定义时间段
			if (template.getRptcondition() != null) {
				for (String con : template.getRptcondition().split(";")) {
					if ("time".equals(con.split("_=")[0])) {
						String time = con.split("_=")[1].split("@")[0];
						if ("1".equals(template.getReserved())) {
							String weekTime = toFormatTimeRange(time, "1");
							beginTime = weekTime.split("@")[0];
							endTime = weekTime.split("@")[1];
						} else if ("2".equals(template.getReserved())) {

							String weekTime = toFormatTimeRange(time, "2");
							beginTime = weekTime.split("@")[0];
							endTime = weekTime.split("@")[1];
						} else if ("3".equals(template.getReserved())) {

							return beginTime = time.substring(0, 7);
						} else if ("4".equals(template.getReserved())) {

							return beginTime = time.substring(0, 4);
						} else {

							beginTime = con.split("_=")[1].split("@")[0];
							endTime = con.split("_=")[1].split("@")[1];
						}
					}
				}
				return beginTime + " ~ " + endTime;
			}
			return "";
		} else if (template.getGranularity() == 8) {
			// 上一年
			Calendar c = Calendar.getInstance();
			beginTime = new SimpleDateFormat("yyyy").format(c.getTime());
			return beginTime;
		} else {
			return "";
		}
	}

	public String parseFilterCondition(String filter, String trendType) {

		if (filter == null) {
			return "";
		}

		String condition = "";
		String sevTemp = "";
		String categoryTemp = "";
		String subCategroyTemp = "";
		String dstTemp = "";
		String srcTemp = "";
		String dpTemp = "";
		String protocolTemp = "";
		String appProtocolTemp = "";
		String nameTemp = "";
		String timeTemp = "";

		for (String str : filter.split(";")) {
			if (str.indexOf("_=") > 0) {
				String[] strArr = str.split("_=");
				if ("sev".equals(strArr[0]) || "severity".equals(strArr[0])) {
					sevTemp += " (" + strArr[0] + " >= " + strArr[1].split("@")[0] + " AND " + strArr[0] + " <= "
					        + strArr[1].split("@")[1] + ") OR ";
				}
				if ("time".equals(strArr[0])) {
					if ("1".equals(trendType)) {
						String weekRange = toFormatTimeRange(strArr[1], "1");
						timeTemp += " AND calctime >= str_to_date('" + weekRange.split("@")[0]
						        + "','%Y-%m-%d %H:%i:%s') AND calctime <= str_to_date('"
						        + weekRange.split("@")[0].substring(0, 10) + " 23:59:59" + "','%Y-%m-%d %H:%i:%s') ";
					} else if ("2".equals(trendType)) {
						String weekRange = toFormatTimeRange(strArr[1], "2");
						timeTemp += " AND calctime >= str_to_date('" + weekRange.split("@")[0]
						        + "','%Y-%m-%d %H:%i:%s') AND calctime <= str_to_date('"
						        + weekRange.split("@")[1].substring(0, 10) + " 23:59:59" + "','%Y-%m-%d %H:%i:%s') ";
					} else if ("3".equals(trendType)) {
						timeTemp += "";// 全月
					} else if ("4".equals(trendType)) {
						timeTemp += "";// 全年
					} else {
						timeTemp += " AND calctime >= str_to_date('" + strArr[1].split("@")[0]
						        + "','%Y-%m-%d %H:%i:%s') AND calctime <= str_to_date('" + strArr[1].split("@")[1]
						        + "','%Y-%m-%d %H:%i:%s') ";
					}
				}
			} else if (str.indexOf("~=") > 0 && str.indexOf("^=") < 0) {
				String[] strArr = str.split("~=");
				if ("sev".equals(strArr[0]) || "severity".equals(strArr[0])) {
					sevTemp += strArr[0] + " LIKE '%" + strArr[1] + "%' OR ";
				} else if ("protocol".equals(strArr[0])) {
					protocolTemp += strArr[0] + " LIKE '%" + strArr[1] + "%' OR ";
				} else if ("appprotocol".equals(strArr[0]) || "alproto".equals(strArr[0])) {
					appProtocolTemp += strArr[0] + " LIKE '%" + strArr[1] + "%' OR ";
				} else if ("src".equals(strArr[0]) || "sourceaddress".equals(strArr[0])) {
					srcTemp += strArr[0] + " LIKE '%" + strArr[1] + "%' OR ";
				} else if ("dst".equals(strArr[0]) || "destinationaddress".equals(strArr[0])) {
					dstTemp += strArr[0] + " LIKE '%" + strArr[1] + "%' OR ";
				} else if ("dp".equals(strArr[0]) || "destinationport".equals(strArr[0])) {
					dpTemp += strArr[0] + " LIKE '%" + strArr[1] + "%' OR ";
				} else if ("collectoraddr".equals(strArr[0]) || "incidentname".equals(strArr[0])) {
					nameTemp += strArr[0] + " LIKE '%" + strArr[1] + "%' OR ";
				} else if ("inccategory".equals(strArr[0]) || "category".equals(strArr[0])) {
					categoryTemp += strArr[0] + " LIKE '%" + strArr[1] + "%' OR ";
				} else if ("incsubcategory".equals(strArr[0]) || "subcategory".equals(strArr[0])) {
					subCategroyTemp += strArr[0] + " LIKE '%" + strArr[1] + "%' OR ";
				}
			} else {
				String[] strArr = str.split("=");
				if ("sev".equals(strArr[0]) || "severity".equals(strArr[0])) {
					sevTemp += strArr[0] + " = " + strArr[1] + " OR ";
				} else if ("protocol".equals(strArr[0])) {
					protocolTemp += strArr[0] + " = '" + strArr[1] + "' OR ";
				} else if ("appprotocol".equals(strArr[0]) || "alproto".equals(strArr[0])) {
					appProtocolTemp += strArr[0] + " = '" + strArr[1] + "' OR ";
				} else if ("src".equals(strArr[0]) || "sourceaddress".equals(strArr[0])) {
					srcTemp += strArr[0] + " = '" + strArr[1] + "' OR ";
				} else if ("dst".equals(strArr[0]) || "destinationaddress".equals(strArr[0])) {
					dstTemp += strArr[0] + " = '" + strArr[1] + "' OR ";
				} else if ("dp".equals(strArr[0]) || "destinationport".equals(strArr[0])) {
					dpTemp += strArr[0] + " = '" + strArr[1] + "' OR ";
				} else if ("collectoraddr".equals(strArr[0]) || "incidentname".equals(strArr[0])) {
					nameTemp += strArr[0] + " = '" + strArr[1] + "' OR ";
				} else if ("inccategory".equals(strArr[0]) || "category".equals(strArr[0])) {
					categoryTemp += strArr[0] + " = '" + strArr[1] + "' OR ";
				} else if ("incsubcategory".equals(strArr[0]) || "subcategory".equals(strArr[0])) {
					subCategroyTemp += strArr[0] + " = '" + strArr[1] + "' OR ";
				}
			}
		}

		if (timeTemp != "") {
			condition += timeTemp;
		}

		if (sevTemp != "") {
			condition += " AND (" + sevTemp.substring(0, sevTemp.length() - 3) + ")";
		}
		if (categoryTemp != "") {
			condition += " AND (" + categoryTemp.substring(0, categoryTemp.length() - 3) + ")";
		}
		if (subCategroyTemp != "") {
			condition += " AND (" + subCategroyTemp.substring(0, subCategroyTemp.length() - 3) + ")";
		}
		if (dstTemp != "") {
			condition += " AND (" + dstTemp.substring(0, dstTemp.length() - 3) + ")";
		}
		if (srcTemp != "") {
			condition += " AND (" + srcTemp.substring(0, srcTemp.length() - 3) + ")";
		}
		if (dpTemp != "") {
			condition += " AND (" + dpTemp.substring(0, dpTemp.length() - 3) + ")";
		}
		if (protocolTemp != "") {
			condition += " AND (" + protocolTemp.substring(0, protocolTemp.length() - 3) + ")";
		}
		if (appProtocolTemp != "") {
			condition += " AND (" + appProtocolTemp.substring(0, appProtocolTemp.length() - 3) + ")";
		}
		if (nameTemp != "") {
			condition += " AND (" + nameTemp.substring(0, nameTemp.length() - 3) + ")";
		}

		return condition;
	}

	public String toFormatTimeRange(String timeStr, String type) {

		String timeRange = "";
		String beginTime = "";
		String endTime = "";

		if (timeStr == "") {
			if ("1".equals(type)) {
				// 上一天
				Calendar c = Calendar.getInstance();
				c.add(Calendar.DAY_OF_MONTH, -1);
				beginTime = new SimpleDateFormat("yyyy-MM-dd").format(c.getTime()) + " 00:00:00";
				endTime = new SimpleDateFormat("yyyy-MM-dd").format(c.getTime()) + " 23:59:59";
			} else if ("2".equals(type)) {
				// 上一周
				SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
				Calendar calendar1 = Calendar.getInstance();
				Calendar calendar2 = Calendar.getInstance();
				int dayOfWeek = calendar1.get(Calendar.DAY_OF_WEEK) - 1;
				int offset1 = 1 - dayOfWeek;
				int offset2 = 7 - dayOfWeek;
				calendar1.add(Calendar.DATE, offset1 - 7);
				calendar2.add(Calendar.DATE, offset2 - 7);

				beginTime = format.format(calendar1.getTime()) + " 00:00:00";
				endTime = format.format(calendar2.getTime()) + " 23:59:59";
			} else if ("3".equals(type)) {
				// 上一月
				Calendar c = Calendar.getInstance();
				c.add(Calendar.MONTH, -1);
				beginTime = new SimpleDateFormat("yyyy-MM").format(c.getTime()) + "-01 00:00:00";

				SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
				int maxDay = 30;
				try {
					Date date = format.parse(beginTime);
					Calendar calendar = Calendar.getInstance();
					calendar.setTime(date);
					calendar.getActualMaximum(Calendar.DAY_OF_MONTH);
					endTime = new SimpleDateFormat("yyyy-MM").format(c.getTime()) + "-" + maxDay + " 00:00:00";
				} catch (Exception e) {
					e.printStackTrace();
				}

			} else if ("4".equals(type)) {
				// 上一年
				Calendar c = Calendar.getInstance();
				c.add(Calendar.YEAR, -1);
				beginTime = new SimpleDateFormat("yyyy").format(c.getTime()) + "-01-01 00:00:00";
				endTime = new SimpleDateFormat("yyyy").format(c.getTime()) + "-12-31 00:00:00";
			} else if ("5".equals(type)) {
				// 当年
				Calendar c = Calendar.getInstance();
				beginTime = new SimpleDateFormat("yyyy").format(c.getTime()) + "-01-01 00:00:00";
				endTime = new SimpleDateFormat("yyyy").format(c.getTime()) + "-12-31 00:00:00";
			} else if ("6".equals(type)) {
				// 当年
				beginTime = "01";
				endTime = "12";
			} else {
			}
			timeRange = beginTime + "@" + endTime;
			return timeRange;
		}

		String[] timeArr = timeStr.split("@");
		String time = timeArr[0];
		String _time = "";
		if (timeArr.length == 2) {
			_time = timeArr[1];
		}

		if ("1".equals(type)) {
			beginTime = time.substring(0, 10) + " 00:00:00";
			endTime = time.substring(0, 10) + " 23:59:59";
		} else if ("2".equals(type)) {
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			Calendar cal = Calendar.getInstance();
			try {
				Date date = sdf.parse(time);
				cal.setTime(date);

			} catch (ParseException e) {
				return time + "@" + time;
			}
			int dayWeek = cal.get(Calendar.DAY_OF_WEEK);
			if (1 == dayWeek) {
				cal.add(Calendar.DAY_OF_MONTH, -1);
			}

			cal.setFirstDayOfWeek(Calendar.MONDAY);
			int day = cal.get(Calendar.DAY_OF_WEEK);
			cal.add(Calendar.DATE, cal.getFirstDayOfWeek() - day);

			beginTime = sdf.format(cal.getTime()) + " 00:00:00";
			cal.add(Calendar.DATE, 6);
			endTime = sdf.format(cal.getTime()) + " 23:59:59";
		} else if ("3".equals(type)) {
			beginTime = time.substring(0, 8) + "01 00:00:00";
			Calendar calendar = Calendar.getInstance();
			calendar.set(Integer.parseInt(time.substring(0, 4)), Integer.parseInt(time.substring(6, 7)) - 1, 1);
			endTime = time.substring(0, 8) + calendar.getActualMaximum(Calendar.DATE) + " 23:59:59";
		} else if ("4".equals(type)) {
			beginTime = time.substring(0, 5) + "01-01 00:00:00";
			endTime = time.substring(0, 5) + "12-01 00:00:00";
		} else {
			beginTime = time;
			endTime = _time;
		}

		timeRange = beginTime + "@" + endTime;
		return timeRange;

	}
}
