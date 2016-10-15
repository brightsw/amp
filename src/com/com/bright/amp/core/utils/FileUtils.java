package com.com.bright.amp.core.utils;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

public class FileUtils {
    public static byte[] readFileToByteArray(File file) throws IOException {
        FileInputStream fileInputStream = new FileInputStream(file);  
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();  
        int i;  
        //转化为字节数组流 
        while ((i = fileInputStream.read()) != -1) {  
            byteArrayOutputStream.write(i);  
        }  
        // 把文件存在一个字节数组中  
        byte[] data = byteArrayOutputStream.toByteArray();
        
        fileInputStream.close();
        byteArrayOutputStream.close();
        
        return data;
    }
}
