package com.bright.amp.web.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.bright.amp.report.model.TrptTemplate;
import com.bright.amp.report.model.TstaCommon;
import com.bright.amp.report.service.RptTemplateService;
import com.polydata.commons.util.StringUtil;

@Controller
public class ReportController extends BaseController {

	@Resource(name = "rptTemplateService")
	private RptTemplateService rptTemplateService;

	@RequestMapping(value = "/getTemplateById", method = RequestMethod.GET)
	public void getTemplateById(HttpServletResponse response, String templateid) {
		TrptTemplate template = rptTemplateService.getById(Integer.parseInt(templateid));
		renderJson(template, response);
	}

	@RequestMapping(value = "/getReportTempalteChartData", method = RequestMethod.POST)
	public void getReportTempalteChartData(String templateid, HttpServletResponse response) {

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("templateid", templateid);
		TrptTemplate template = rptTemplateService.getById(templateid);

		List<HashMap<String, String>> charts = new ArrayList<HashMap<String, String>>();
		HashMap<String, String> jsonMap = new HashMap<String, String>();
		String legend = "[ ";
		String value = "[ ";

		String timeRange = rptTemplateService.toTimeRange(template);
		jsonMap.put("title", template.getTemplatename() + " (" + timeRange + ")");
		map.put("querySQL", template.getChartsql());
		List<TstaCommon> categorys = rptTemplateService.querySql(map);
		if (categorys.size() == 0) {
			TstaCommon staC = new TstaCommon();
			staC.setCategory("NO DATA");
			staC.setValue("0");
			categorys.add(staC);
		}

		if (template.getCharttype() == 5) {
			// 饼图
			int otherValue = 0;
			for (int i = 0; i < categorys.size(); i++) {
				String record = categorys.get(i).getValue();
				if (record == null) {
					record = "0";
				}
				if (i < 10) {
					value += "['" + StringUtil.IPv6toIPv4(categorys.get(i).getCategory()) + "'," + record + "],";
				} else {
					otherValue += Integer.parseInt(record);
				}
			}

			if (categorys.size() >= 10) {
				value += "['others'," + otherValue + "],";
			}

			jsonMap.put("charttype", "pie");
			jsonMap.put("seriesName", template.getTemplatename() + " (" + timeRange + ")");
			jsonMap.put("seriesData", value.substring(0, value.length() - 1) + "]");
			charts.add(jsonMap);

		} else if (template.getCharttype() == 4) {
			// 趋势图
			String time = "";
			if (template.getGranularity() == 7) {
				for (String str : template.getRptcondition().split(";")) {
					if ("time".equals(str.split("_=")[0])) {
						time = str.split("_=")[1];
					}
				}
			}
			ArrayList<String> xdatas = rptTemplateService.generatorxAxis(time, template.getReserved());

			for (int x = 0; x < xdatas.size(); x++) {
				legend += "'" + xdatas.get(x) + "',";
				boolean flag = true;
				for (int j = 0; j < categorys.size(); j++) {
					if (categorys.get(j).getCategory().equals(xdatas.get(x))) {
						value += categorys.get(j).getValue() + ",";
						flag = false;
					}
				}
				if (flag) {
					value += "0,";
				}
			}
			if ("3".equals(template.getReserved())) {
				jsonMap.put("rotation", "60");
			} else {
				jsonMap.put("rotation", "0");
			}

			jsonMap.put("charttype", "line");
			jsonMap.put("category", legend.substring(0, legend.length() - 1) + "]");
			jsonMap.put("seriesName", template.getTemplatename() + " (" + timeRange + ")");
			jsonMap.put("seriesData", value.substring(0, value.length() - 1) + "]");
			charts.add(jsonMap);

		} else if (template.getCharttype() == 3) {
			// 柱状图
			int otherValue = 0;
			for (int i = 0; i < categorys.size(); i++) {
				if (i < 10) {
					legend += "'" + StringUtil.IPv6toIPv4(categorys.get(i).getCategory()) + "',";
					value += categorys.get(i).getValue() + ",";
				} else {
					otherValue += Integer.parseInt(categorys.get(i).getValue());
				}
			}

			if (categorys.size() >= 10) {
				legend += "'others',";
				value += otherValue + ",";
			}

			jsonMap.put("category", legend.substring(0, legend.length() - 1) + "]");
			jsonMap.put("charttype", "column");
			jsonMap.put("seriesName", template.getTemplatename() + " (" + timeRange + ")");
			jsonMap.put("seriesData", value.substring(0, value.length() - 1) + "]");
			charts.add(jsonMap);

		} else if (template.getCharttype() == 6) {
			// 多线趋势图
			String time = "";
			if (template.getGranularity() == 7) {
				for (String str : template.getRptcondition().split(";")) {
					if ("time".equals(str.split("_=")[0])) {
						time = str.split("_=")[1];
					}
				}
			}
			ArrayList<String> xdatas = rptTemplateService.generatorxAxis(time, template.getReserved());

			if ("3".equals(template.getReserved())) {
				jsonMap.put("rotation", "60");
			} else {
				jsonMap.put("rotation", "0");
			}
			jsonMap.put("charttype", "line");

			map.put("querySQL", template.getListsql());
			List<TstaCommon> serieses = rptTemplateService.querySql(map);

			for (TstaCommon series : serieses) {
				for (int x = 0; x < xdatas.size(); x++) {
					legend += "'" + xdatas.get(x) + "',";
					boolean flag = true;
					for (int j = 0; j < categorys.size(); j++) {
						if (categorys.get(j).getCategory().equals(xdatas.get(x))
						        && categorys.get(j).getSeries().equals(series.getSeries())) {
							value += categorys.get(j).getValue() + ",";
							flag = false;
						}
					}
					if (flag) {
						value += "0,";
					}
				}

				jsonMap.put("category", legend.substring(0, legend.length() - 1) + "]");
				jsonMap.put("seriesName", series.getSeries());
				jsonMap.put("seriesData", value.substring(0, value.length() - 1) + "]");
				charts.add(jsonMap);
				jsonMap = new HashMap<String, String>();
				legend = "[ ";
				value = "[ ";
			}

		}
		renderJson(charts, response);
	}

	@RequestMapping(value = "/getReportTemplateTree", method = RequestMethod.POST)
	public void getReportTemplateTree(HttpServletResponse response) throws Exception {
		Map<String, Object> map = new HashMap<String, Object>();
		renderJson(rptTemplateService.query(map), response);
	}

	@RequestMapping(value = "/getTemplates", method = RequestMethod.GET)
	public void getTemplates(HttpServletResponse response) {
		Map<String, Object> map = new HashMap<String, Object>();
		// 状态在用的
		map.put("status", "1");
		List<TrptTemplate> templates = rptTemplateService.query(map);
		this.renderJson(templates, response);
	}

}
