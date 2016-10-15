package com.bright.amp.web.util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class MySQLTest {

	public static void main(String[] args) {
		Connection conn = null;
		Statement stmt = null;
		ResultSet rs = null;
		String url = null;
		String user = null;
		String password = null;
		String sql = null;
		try {
			Class.forName("com.mysql.jdbc.Driver");
		} catch (ClassNotFoundException e) {
			System.out.println("驱动加载错误");
			e.printStackTrace();
		}
		try {
			url = "jdbc:mysql://192.168.25.55/polydata?user=root&password=polydata&useUnicode=true&&characterEncoding=gb2312&autoReconnect=true";
			user = "root";
			password = "polydata";
			conn = DriverManager.getConnection(url, user, password);
		} catch (SQLException e) {
			System.out.println("数据库链接错误");
			e.printStackTrace();
		}
		try {
			stmt = conn.createStatement();
			
			for(int i=0;i<800;i++){
				int count =  (int)(Math.random() * 100);
				int port = (int)(Math.random() * 23);
				int sip = (int)(Math.random() * 20);
				int dip = (int)(Math.random() * 50);
				
				int receiveFlow = (int)(Math.random() * 12380500);
				int sendFlow = (int)(Math.random() * 12231000);
				int receivePacket = (int)(Math.random() * 2000);
				int sendPacket = (int)(Math.random() * 1200);
				
				int ps = (int)(Math.random() * 4);
				String appprotocol = "";
				if(ps==0){
					appprotocol = "ftp";
				}else if(ps==1){
					appprotocol = "http";
				}else if(ps==2){
					appprotocol = "ssh";
				}else if(ps==3){
					appprotocol = "telnet";
				}else if(ps==4){
					appprotocol = "sftp";
				}else if(ps==5){
					appprotocol = "ssl";
				}
				
				int pp = (int)(Math.random() * 3);
				String protocol = "";
				if(pp==0){
					protocol = "tcp";
				}else if(pp==1){
					protocol = "udp";
				}else if(pp==2){
					protocol = "spx";
				}
				int x = (int)(Math.random() * 2);
				if(x==0){
					x=1;
				}else{
					x=2;
				}
				/*sql  = "INSERT INTO `t_mis_scanfile` (`gid`,`fileName`,`malwareName`,`md5`,`sessionID`,`infected`,`fileType`,`scanTime`,`scanTool`,`reserved1`,`reserved2`,`reserved3`) "
						+ "VALUES ("+5*(i+1)+",'JSDFHX', 'SAFSADF', 'SADFSADFSADF', '1213', '"+x+"', '"+(int)(Math.random() * 5)+"', now(), '1', '2', '3', '4')";
				
				sql = "INSERT INTO `t_sta_ssn_basicstatistics` (`staCount`, `updateTime`, `sourceAddress`, `destinationAddress`, `destinationPort`, `collectorName`, `collectorAddress`, `protocol`, `appProtocol`, `appSubprotocol`, `receiveFlow`, `sendFlow`, `receivePacket`, `sendPacket`, `metadata1`, `metadata2`, `metadata3`, `metadata4`) "
						+ "VALUES ("+count+", now(), '192.168.25."+sip+"', '192.168.25."+dip+"', '"+port+"', 'test', '192.168.25."+dip+"', '"+protocol+"', '"+appprotocol+"', 'tcp', "+receiveFlow+", "+sendFlow+", "+receivePacket+", "+sendPacket+", '112', '2', '3', '4');";
				
				sql = "INSERT INTO `t_sta_inc_basicstatistics` (`staCount`,`unitTime`,`updateTime`,`incidentName`,`category`,`subcategory`,`severity`) "
						+ "VALUES ('"+count+"',  now(),  now(), '恶意访问"+(int)(Math.random() * 100)+"', 'DDOS"+(int)(Math.random() * 10)+"', 'DOS"+(int)(Math.random() * 100)+"', '"+ps+"')";
				
				*/
				sql = "INSERT INTO `t_sta_evt_basicstatistics` (`staCount`,`unitTime`,`updateTime`,`eventName`,`category`,"
						+ "`subcategory`,`deviceType`,`deviceName`,`severity`,`sourceAddress`,`destinationAddress`,`destinationPort`,`sourceUser`,`destinationUser`,`sourceHostName`,"
						+ "`destinationHostName`,`collectorName`,`collectorAddress`,`protocol`,`appProtocol`,"
						+ "`appSubprotocol`,`receiveFlow`,`sendFlow`,`receivePacket`,`sendPacket`) VALUES ("+count+", now(), now(), 'ssh login"+(int)(Math.random() * 10)+"', '网络攻击',"
						+ " '干扰攻击', 'linux"+(int)(Math.random() * 10)+"', 'linux"+(int)(Math.random() * 10)+"', '"+ps+"', '"+(int)(Math.random() * 255)+"."+(int)(Math.random() * 255)+"."+(int)(Math.random() * 255)+"."+(int)(Math.random() * 255)+"', '192.168.25."+sip+"', '"+port+"', 'root', 'root', 'ligj', 'polydata', 'test',"
						+ " '192.168.25.55', '"+protocol+"', '"+appprotocol+"', 'sftp', '25526', '84815', '14555', '41414')";
				/*sql = "INSERT INTO `t_sta_pkt_basicstatistics` (staCount,interface,updateTime,tcpFlag,sourceMAC,destinationMAC,sourceAddress,"
						+ "destinationAddress,destinationPort,collectorName,collectorAddress,layer2Protocol,protocol,appProtocol,appSubprotocol,inOctet,outOctet,inPacket,outPacket) VALUES (NULL, NULL, now(), "+(int)(Math.random() * 100)+", NULL, NULL, '192.168.25."+(int)(Math.random() * 255)+"', "
						+ "'192.168.25."+(int)(Math.random() * 255)+"', NULL, NULL, '192.168.25."+(int)(Math.random() * 255)+"', NULL, '"+protocol+"', NULL, NULL, "+(int)(Math.random() * 1000)+", "+(int)(Math.random() * 10000)+", "+(int)(Math.random() * 1000)+", "+(int)(Math.random() * 1000)+")";
				*/
				stmt.executeUpdate(sql);
				System.out.println(sql);
			}
			
		} catch (SQLException e) {
			System.out.println("数据操作错误");
			e.printStackTrace();
		}
		// 关闭数据库
		try {
			if (stmt != null) {
				stmt.close();
				stmt = null;
			}
			if (conn != null) {
				conn.close();
				conn = null;
			}
		} catch (Exception e) {
			System.out.println("数据库关闭错误");
			e.printStackTrace();
		}
	}
}
