package com.bright.amp.report.model;

import org.apache.ibatis.type.Alias;

@Alias("TstaCommon")
public class TstaCommon {

	private String series;
	private String value;
	private String category;

	public String getSeries() {
		return series;
	}

	public void setSeries(String series) {
		this.series = series;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

}
