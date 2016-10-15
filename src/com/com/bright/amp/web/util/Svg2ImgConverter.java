package com.com.bright.amp.web.util;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;

import org.apache.batik.apps.rasterizer.DestinationType;
import org.apache.batik.apps.rasterizer.SVGConverter;
import org.apache.batik.apps.rasterizer.SVGConverterException;

public class Svg2ImgConverter extends SVGConverter {

	public String conver(String path, String tmpName, String svg) {
		try {
			String temp = path + tmpName + ".svg";
			
			File svgTempFile = new File(temp);
			OutputStreamWriter svgFileOsw = new OutputStreamWriter(new FileOutputStream(svgTempFile), "UTF-8");
			svgFileOsw.write(svg);
			svgFileOsw.flush();
			svgFileOsw.close();

			SVGConverter converter = new Svg2ImgConverter();
			converter.setHeight(800);
			String[] src = {temp};
			converter.setSources(src);
			
			converter.setQuality(MAXIMUM_QUALITY);
			converter.setDestinationType(DestinationType.PNG);
			converter.setDst(new File(path + tmpName + ".png"));
			
			converter.execute();
			svgTempFile.delete();
			return tmpName + ".png";
		} catch (SVGConverterException e) {
			return "";
		} catch (IOException e1) {
			return "";
		}
	}
}
