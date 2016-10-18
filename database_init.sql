/*
Navicat MySQL Data Transfer

Source Server         : local
Source Server Version : 50512
Source Host           : localhost:3306
Source Database       : ampdb

Target Server Type    : MYSQL
Target Server Version : 50512
File Encoding         : 65001

Date: 2016-10-18 17:31:41
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for t_account
-- ----------------------------
DROP TABLE IF EXISTS `t_account`;
CREATE TABLE `t_account` (
  `gid` int(10) NOT NULL AUTO_INCREMENT,
  `money` int(10) NOT NULL,
  `acctype` int(2) NOT NULL,
  `accdate` date NOT NULL,
  `accmon` varchar(255) NOT NULL,
  `accyear` varchar(255) NOT NULL,
  `recdate` date NOT NULL,
  `recuser` int(10) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`gid`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_account
-- ----------------------------
INSERT INTO `t_account` VALUES ('4', '45567', '1', '2016-10-16', '2016-10', '2016', '2016-10-16', '1', null);
INSERT INTO `t_account` VALUES ('5', '81581', '2', '2016-10-16', '2016-10', '2016', '2016-10-16', '1', null);
INSERT INTO `t_account` VALUES ('6', '28561', '3', '2016-10-16', '2016-10', '2016', '2016-10-16', '1', null);
INSERT INTO `t_account` VALUES ('7', '11111', '1', '2016-10-17', '2016-10', '2016', '2016-10-17', '1', null);
INSERT INTO `t_account` VALUES ('8', '22222', '1', '2016-10-14', '2016-10', '2016', '2016-10-17', '1', null);
INSERT INTO `t_account` VALUES ('9', '33333', '1', '2016-10-13', '2016-10', '2016', '2016-10-17', '1', null);

-- ----------------------------
-- Table structure for t_accounttype
-- ----------------------------
DROP TABLE IF EXISTS `t_accounttype`;
CREATE TABLE `t_accounttype` (
  `typeid` int(10) NOT NULL AUTO_INCREMENT,
  `typename` varchar(200) NOT NULL,
  `capitaluse` tinyint(1) DEFAULT '0' COMMENT '1是0否',
  `incomeuse` tinyint(1) DEFAULT '0' COMMENT '1是0否',
  `spenduse` tinyint(1) DEFAULT '0' COMMENT '1是0否',
  `description` varchar(400) DEFAULT NULL,
  PRIMARY KEY (`typeid`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_accounttype
-- ----------------------------
INSERT INTO `t_accounttype` VALUES ('1', '余额宝', '1', '0', '0', null);
INSERT INTO `t_accounttype` VALUES ('2', '易付宝', '1', '0', '0', null);
INSERT INTO `t_accounttype` VALUES ('3', '证券市值', '1', '0', '0', null);
INSERT INTO `t_accounttype` VALUES ('4', '营业额', '0', '1', '0', null);
INSERT INTO `t_accounttype` VALUES ('5', '进货', '0', '0', '1', null);

-- ----------------------------
-- Table structure for t_income
-- ----------------------------
DROP TABLE IF EXISTS `t_income`;
CREATE TABLE `t_income` (
  `gid` int(10) NOT NULL AUTO_INCREMENT,
  `money` int(10) NOT NULL,
  `acctype` int(2) NOT NULL,
  `accdate` date NOT NULL,
  `accmon` varchar(255) NOT NULL,
  `accyear` varchar(255) NOT NULL,
  `recdate` date NOT NULL,
  `recuser` int(10) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`gid`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_income
-- ----------------------------

-- ----------------------------
-- Table structure for t_rpt_template
-- ----------------------------
DROP TABLE IF EXISTS `t_rpt_template`;
CREATE TABLE `t_rpt_template` (
  `templateID` int(11) NOT NULL AUTO_INCREMENT COMMENT '模板编号',
  `typeID` int(11) DEFAULT NULL COMMENT '模板类别编号',
  `templateName` varchar(300) DEFAULT NULL COMMENT '模板名称',
  `chartType` int(11) DEFAULT NULL COMMENT '统计图类型：  3柱状图4趋势图5饼图',
  `chartSQL` text COMMENT '图表数据生成SQL',
  `listSQL` text COMMENT '列表生成SQL',
  `tableName` varchar(300) DEFAULT NULL COMMENT '表名',
  `rptcondition` text COMMENT '过滤条件',
  `reserved` text COMMENT '保留字段',
  `granularity` int(11) DEFAULT NULL COMMENT '1：5分钟  2：小时  3：天 4：周\n 5：月\n 6：年\n 7：自定义',
  `status` int(11) DEFAULT NULL COMMENT '状态：\n            1正常2删除',
  PRIMARY KEY (`templateID`),
  KEY `FK_Reference_100` (`typeID`)
) ENGINE=InnoDB AUTO_INCREMENT=1007 DEFAULT CHARSET=utf8 COMMENT='报表模板表\r\nWebServer:读/写\r\n';

-- ----------------------------
-- Records of t_rpt_template
-- ----------------------------
INSERT INTO `t_rpt_template` VALUES ('1001', '1', '资金汇总周趋势图', '4', 'SELECT ACCDATE AS CATEGORY,SUM(MONEY) AS VALUE FROM T_ACCOUNT GROUP BY ACCDATE ORDER BY CATEGORY', null, '', null, '2', '4', '1');
INSERT INTO `t_rpt_template` VALUES ('1002', '1', '资金汇总月趋势图', '4', 'SELECT ACCDATE AS CATEGORY,SUM(MONEY) AS VALUE FROM T_ACCOUNT GROUP BY ACCDATE ORDER BY CATEGORY', null, null, '', '3', '5', '1');
INSERT INTO `t_rpt_template` VALUES ('1003', '1', '资金汇总年趋势图', '4', 'SELECT ACCDATE AS CATEGORY,SUM(MONEY) AS VALUE FROM T_ACCOUNT GROUP BY ACCDATE ORDER BY CATEGORY', null, null, null, '4', '6', '1');
INSERT INTO `t_rpt_template` VALUES ('1004', '1', '资金分类周趋势图', '6', 'SELECT A.ACCDATE AS CATEGORY,A.MONEY AS VALUE,B.TYPENAME AS SERIES FROM T_ACCOUNT A,T_ACCOUNTTYPE B WHERE A.ACCTYPE=B.TYPEID GROUP BY CATEGORY,SERIES ORDER BY CATEGORY', 'SELECT TYPENAME AS SERIES FROM T_ACCOUNTTYPE WHERE CAPITALUSE=1', null, null, '2', '4', '1');
INSERT INTO `t_rpt_template` VALUES ('1005', '1', '资金分类月趋势图', '6', 'SELECT A.ACCDATE AS CATEGORY,A.MONEY AS VALUE,B.TYPENAME AS SERIES FROM T_ACCOUNT A,T_ACCOUNTTYPE B WHERE A.ACCTYPE=B.TYPEID GROUP BY CATEGORY,SERIES ORDER BY CATEGORY', 'SELECT TYPENAME AS SERIES FROM T_ACCOUNTTYPE WHERE CAPITALUSE=1', null, null, '3', '5', '1');
INSERT INTO `t_rpt_template` VALUES ('1006', '1', '资金分类年趋势图', '6', 'SELECT A.ACCDATE AS CATEGORY,A.MONEY AS VALUE,B.TYPENAME AS SERIES FROM T_ACCOUNT A,T_ACCOUNTTYPE B WHERE A.ACCTYPE=B.TYPEID GROUP BY CATEGORY,SERIES ORDER BY CATEGORY', 'SELECT TYPENAME AS SERIES FROM T_ACCOUNTTYPE WHERE CAPITALUSE=1', null, null, '4', '6', '1');

-- ----------------------------
-- Table structure for t_spend
-- ----------------------------
DROP TABLE IF EXISTS `t_spend`;
CREATE TABLE `t_spend` (
  `gid` int(10) NOT NULL AUTO_INCREMENT,
  `money` int(10) NOT NULL,
  `acctype` int(2) NOT NULL,
  `accdate` date NOT NULL,
  `accmon` varchar(255) NOT NULL,
  `accyear` varchar(255) NOT NULL,
  `recdate` date NOT NULL,
  `recuser` int(10) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`gid`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_spend
-- ----------------------------

-- ----------------------------
-- Table structure for t_sys_log
-- ----------------------------
DROP TABLE IF EXISTS `t_sys_log`;
CREATE TABLE `t_sys_log` (
  `logID` int(11) NOT NULL AUTO_INCREMENT COMMENT '唯一标识，流水号',
  `componentName` varchar(300) NOT NULL COMMENT '日志来源组件名称',
  `ipAddress` char(48) DEFAULT NULL COMMENT '日志来源IP',
  `logLevel` int(11) NOT NULL COMMENT '日志级别\n            0 ：致命\n            1 ：严重\n            2 ：警告\n            3 ：信息\n            4 ：调试\n            ',
  `logContent` text COMMENT '日志内容',
  `createTime` datetime NOT NULL COMMENT '日志产生时间',
  `operatorUser` varchar(300) DEFAULT NULL COMMENT '操作用户名',
  `logType` int(11) NOT NULL COMMENT '日志类型：\n            1：系统日志\n            2：用户日志',
  PRIMARY KEY (`logID`)
) ENGINE=InnoDB AUTO_INCREMENT=68704 DEFAULT CHARSET=utf8 COMMENT='用户日志表\nWebServer：读\nBusinessManager：写 ';

-- ----------------------------
-- Records of t_sys_log
-- ----------------------------
INSERT INTO `t_sys_log` VALUES ('68664', 'web', '127.0.0.1', '1', '用户(sysadmin)登录成功', '2016-10-15 22:38:04', 'sysadmin', '2');
INSERT INTO `t_sys_log` VALUES ('68665', 'web', '127.0.0.1', '1', '用户(sysadmin)登录成功', '2016-10-16 00:33:37', 'sysadmin', '2');
INSERT INTO `t_sys_log` VALUES ('68666', 'web', '127.0.0.1', '1', '用户(sysadmin)登录成功', '2016-10-16 00:35:02', 'sysadmin', '2');
INSERT INTO `t_sys_log` VALUES ('68667', 'web', '127.0.0.1', '1', '用户(sysadmin)登录成功', '2016-10-16 00:47:33', 'sysadmin', '2');
INSERT INTO `t_sys_log` VALUES ('68668', 'web', '127.0.0.1', '1', '新增账目错误', '2016-10-16 00:50:22', 'sysadmin', '2');
INSERT INTO `t_sys_log` VALUES ('68669', 'web', '127.0.0.1', '1', '新增账目错误', '2016-10-16 00:51:14', 'sysadmin', '2');
INSERT INTO `t_sys_log` VALUES ('68670', 'web', '127.0.0.1', '1', '新增账目成功', '2016-10-16 00:51:37', 'sysadmin', '2');
INSERT INTO `t_sys_log` VALUES ('68671', 'web', '127.0.0.1', '1', '用户(sysadmin)登录成功', '2016-10-16 00:57:17', 'sysadmin', '2');
INSERT INTO `t_sys_log` VALUES ('68672', 'web', '127.0.0.1', '1', '修改账目成功', '2016-10-16 00:57:23', 'sysadmin', '2');
INSERT INTO `t_sys_log` VALUES ('68673', 'web', '127.0.0.1', '1', '删除账目成功', '2016-10-16 00:57:29', 'sysadmin', '2');
INSERT INTO `t_sys_log` VALUES ('68674', 'web', '127.0.0.1', '1', '新增账目成功', '2016-10-16 00:57:44', 'sysadmin', '2');
INSERT INTO `t_sys_log` VALUES ('68675', 'web', '127.0.0.1', '1', '新增账目成功', '2016-10-16 00:58:19', 'sysadmin', '2');
INSERT INTO `t_sys_log` VALUES ('68676', 'web', '127.0.0.1', '1', '删除账目成功', '2016-10-16 01:00:02', 'sysadmin', '2');
INSERT INTO `t_sys_log` VALUES ('68677', 'web', '127.0.0.1', '1', '新增账目成功', '2016-10-16 01:00:14', 'sysadmin', '2');
INSERT INTO `t_sys_log` VALUES ('68678', 'web', '127.0.0.1', '1', '新增账目成功', '2016-10-16 01:07:14', 'sysadmin', '2');
INSERT INTO `t_sys_log` VALUES ('68679', 'web', '127.0.0.1', '1', '新增账目成功', '2016-10-16 01:10:04', 'sysadmin', '2');
INSERT INTO `t_sys_log` VALUES ('68680', 'web', '127.0.0.1', '1', '用户(sysadmin)登录成功', '2016-10-16 01:35:40', 'sysadmin', '2');
INSERT INTO `t_sys_log` VALUES ('68681', 'web', '127.0.0.1', '1', '用户(sysadmin)登录成功', '2016-10-17 10:34:28', 'sysadmin', '2');
INSERT INTO `t_sys_log` VALUES ('68682', 'web', '127.0.0.1', '1', '用户(sysadmin)登录成功', '2016-10-17 17:22:23', 'sysadmin', '2');
INSERT INTO `t_sys_log` VALUES ('68683', 'web', '127.0.0.1', '1', '用户(sysadmin)登录成功', '2016-10-17 17:32:59', 'sysadmin', '2');
INSERT INTO `t_sys_log` VALUES ('68684', 'web', '127.0.0.1', '1', '用户(sysadmin)登录成功', '2016-10-17 17:42:07', 'sysadmin', '2');
INSERT INTO `t_sys_log` VALUES ('68685', 'web', '127.0.0.1', '1', '用户(sysadmin)登录成功', '2016-10-17 18:06:51', 'sysadmin', '2');
INSERT INTO `t_sys_log` VALUES ('68686', 'web', '127.0.0.1', '1', '新增账目成功', '2016-10-17 18:07:01', 'sysadmin', '2');
INSERT INTO `t_sys_log` VALUES ('68687', 'web', '127.0.0.1', '1', '新增账目成功', '2016-10-17 18:07:12', 'sysadmin', '2');
INSERT INTO `t_sys_log` VALUES ('68688', 'web', '127.0.0.1', '1', '新增账目成功', '2016-10-17 18:07:19', 'sysadmin', '2');
INSERT INTO `t_sys_log` VALUES ('68689', 'web', '127.0.0.1', '1', '用户(sysadmin)登录成功', '2016-10-17 18:09:07', 'sysadmin', '2');
INSERT INTO `t_sys_log` VALUES ('68690', 'web', '127.0.0.1', '1', '用户(sysadmin)登录成功', '2016-10-17 18:23:33', 'sysadmin', '2');
INSERT INTO `t_sys_log` VALUES ('68691', 'web', '127.0.0.1', '1', '用户(sysadmin)登录成功', '2016-10-18 11:00:20', 'sysadmin', '2');
INSERT INTO `t_sys_log` VALUES ('68692', 'web', '127.0.0.1', '1', '用户(sysadmin)登录成功', '2016-10-18 14:07:29', 'sysadmin', '2');
INSERT INTO `t_sys_log` VALUES ('68693', 'web', '127.0.0.1', '1', '用户(sysadmin)登录成功', '2016-10-18 14:30:04', 'sysadmin', '2');
INSERT INTO `t_sys_log` VALUES ('68694', 'web', '127.0.0.1', '1', '新增账目类型错误', '2016-10-18 14:40:52', 'sysadmin', '2');
INSERT INTO `t_sys_log` VALUES ('68695', 'web', '127.0.0.1', '1', '用户(sysadmin)登录成功', '2016-10-18 14:42:26', 'sysadmin', '2');
INSERT INTO `t_sys_log` VALUES ('68696', 'web', '127.0.0.1', '1', '新增账目类型成功', '2016-10-18 14:43:34', 'sysadmin', '2');
INSERT INTO `t_sys_log` VALUES ('68697', 'web', '127.0.0.1', '1', '新增账目类型成功', '2016-10-18 14:46:44', 'sysadmin', '2');
INSERT INTO `t_sys_log` VALUES ('68698', 'web', '127.0.0.1', '1', '用户(sysadmin)登录成功', '2016-10-18 15:11:30', 'sysadmin', '2');
INSERT INTO `t_sys_log` VALUES ('68699', 'web', '127.0.0.1', '1', '用户(sysadmin)登录成功', '2016-10-18 16:53:56', 'sysadmin', '2');
INSERT INTO `t_sys_log` VALUES ('68700', 'web', '127.0.0.1', '1', '用户(sysadmin)登录成功', '2016-10-18 17:06:26', 'sysadmin', '2');
INSERT INTO `t_sys_log` VALUES ('68701', 'web', '127.0.0.1', '1', '用户(sysadmin)登录成功', '2016-10-18 17:10:36', 'sysadmin', '2');
INSERT INTO `t_sys_log` VALUES ('68702', 'web', '127.0.0.1', '1', '用户(sysadmin)登出成功', '2016-10-18 17:13:51', 'sysadmin', '2');
INSERT INTO `t_sys_log` VALUES ('68703', 'web', '127.0.0.1', '1', '用户(sysadmin)登录成功', '2016-10-18 17:13:53', 'sysadmin', '2');

-- ----------------------------
-- Table structure for t_sys_module
-- ----------------------------
DROP TABLE IF EXISTS `t_sys_module`;
CREATE TABLE `t_sys_module` (
  `modID` int(11) NOT NULL COMMENT '标识',
  `modName` varchar(60) DEFAULT NULL COMMENT '模块名称',
  `modLevel` int(11) DEFAULT NULL COMMENT '模块级别',
  `parentID` int(11) DEFAULT NULL COMMENT '上级模块序号',
  `url` varchar(100) DEFAULT NULL,
  `isValid` tinyint(4) DEFAULT NULL COMMENT '是否有效 0:否 1:是',
  `modCode` varchar(100) DEFAULT NULL COMMENT '模块编码',
  `iconName` varchar(60) DEFAULT NULL COMMENT '图标名称',
  `displayOrder` int(11) DEFAULT NULL COMMENT '显示顺序',
  PRIMARY KEY (`modID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='模块菜单表\r\nWebServer：读';

-- ----------------------------
-- Records of t_sys_module
-- ----------------------------
INSERT INTO `t_sys_module` VALUES ('3', '账目管理', '1', '0', null, '1', 'app.account', 'fa-list', '3');
INSERT INTO `t_sys_module` VALUES ('4', '报表管理', '1', '0', null, '1', 'app.report', 'fa-bar-chart-o', '4');
INSERT INTO `t_sys_module` VALUES ('6', '全局设置', '1', '0', '', '1', 'app.system', 'fa-gear', '6');
INSERT INTO `t_sys_module` VALUES ('301', '资金管理', '2', '3', null, '1', 'app.account.capital', null, '301');
INSERT INTO `t_sys_module` VALUES ('302', '收入管理', '2', '3', null, '1', 'app.account.income', null, '302');
INSERT INTO `t_sys_module` VALUES ('303', '支出管理', '2', '3', null, '1', 'app.account.spend', null, '303');
INSERT INTO `t_sys_module` VALUES ('304', '类别管理', '2', '3', null, '1', 'app.account.type', null, '304');
INSERT INTO `t_sys_module` VALUES ('601', '用户管理', '2', '6', '', '1', 'app.system.user', null, '601');
INSERT INTO `t_sys_module` VALUES ('603', '日志管理', '2', '6', '', '1', 'app.system.log.operatelog', null, '603');

-- ----------------------------
-- Table structure for t_sys_role
-- ----------------------------
DROP TABLE IF EXISTS `t_sys_role`;
CREATE TABLE `t_sys_role` (
  `roleID` int(11) NOT NULL AUTO_INCREMENT COMMENT '角色标识：\n            1：系统管理员\n            2：管理员\n            3：审计管理员\n            4：审计员\n            5：一般用户',
  `roleName` varchar(300) NOT NULL COMMENT '角色名称',
  `roleNameEN` varchar(300) DEFAULT NULL,
  `description` text COMMENT '描述',
  `descriptionEN` text,
  `roleCategory` int(11) DEFAULT NULL COMMENT '1 系统管理员（拥有所有菜单功能，除日志管理）\n            2 审计管理员（拥有用户管理和日志管理功能，但只能创建审计用户）\n            3 普通管理员（只能进配置管理且无用户管理功能） \n            4 普通用户（无配置管理菜单功能）\n            5 审计用户',
  `isSysDefault` tinyint(1) DEFAULT '0' COMMENT '是否系统内置\n            0 : 不内置\n            1 : 内置',
  `status` int(11) DEFAULT '1' COMMENT '状态\n            1 : 正常\n            2 : 删除',
  PRIMARY KEY (`roleID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COMMENT='角色表\nWebServer：读/写 ';

-- ----------------------------
-- Records of t_sys_role
-- ----------------------------
INSERT INTO `t_sys_role` VALUES ('1', '系统管理员', 'System Admin', null, null, '1', '1', '1');
INSERT INTO `t_sys_role` VALUES ('2', '审计管理员', 'Audit Admin', null, null, '2', '1', '1');
INSERT INTO `t_sys_role` VALUES ('3', '管理员', 'Admin', null, null, '3', '1', '1');
INSERT INTO `t_sys_role` VALUES ('4', '审计员', 'Auditor', null, null, '4', '1', '1');
INSERT INTO `t_sys_role` VALUES ('5', '普通用户', 'User', null, null, '5', '1', '1');

-- ----------------------------
-- Table structure for t_sys_role_module
-- ----------------------------
DROP TABLE IF EXISTS `t_sys_role_module`;
CREATE TABLE `t_sys_role_module` (
  `roleID` int(11) NOT NULL COMMENT '角色ID',
  `modID` int(11) NOT NULL COMMENT '模块ID',
  `modCode` varchar(100) DEFAULT NULL COMMENT '模块编码',
  PRIMARY KEY (`roleID`,`modID`),
  KEY `FK_Reference_44` (`modID`),
  CONSTRAINT `FK_Reference_43` FOREIGN KEY (`roleID`) REFERENCES `t_sys_role` (`roleID`),
  CONSTRAINT `FK_Reference_44` FOREIGN KEY (`modID`) REFERENCES `t_sys_module` (`modID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='角色模块关联表\r\nWebServer：读';

-- ----------------------------
-- Records of t_sys_role_module
-- ----------------------------
INSERT INTO `t_sys_role_module` VALUES ('1', '3', 'app.account');
INSERT INTO `t_sys_role_module` VALUES ('1', '4', 'app.report');
INSERT INTO `t_sys_role_module` VALUES ('1', '6', 'app.system');
INSERT INTO `t_sys_role_module` VALUES ('1', '301', null);
INSERT INTO `t_sys_role_module` VALUES ('1', '302', null);
INSERT INTO `t_sys_role_module` VALUES ('1', '303', null);
INSERT INTO `t_sys_role_module` VALUES ('1', '304', null);
INSERT INTO `t_sys_role_module` VALUES ('1', '601', 'app.system.user');
INSERT INTO `t_sys_role_module` VALUES ('1', '603', 'app.system.log.operatelog');

-- ----------------------------
-- Table structure for t_sys_user
-- ----------------------------
DROP TABLE IF EXISTS `t_sys_user`;
CREATE TABLE `t_sys_user` (
  `userID` int(11) NOT NULL AUTO_INCREMENT COMMENT '标识',
  `userGroupID` int(11) DEFAULT NULL COMMENT '用户组id',
  `roleID` int(11) NOT NULL,
  `loginName` varchar(300) NOT NULL COMMENT '登录名',
  `userName` varchar(300) NOT NULL COMMENT '用户名',
  `jobNum` varchar(300) DEFAULT NULL COMMENT '工号',
  `email` varchar(300) DEFAULT NULL COMMENT '邮箱',
  `telephone` varchar(20) DEFAULT NULL COMMENT '电话',
  `mobilePhone` varchar(20) DEFAULT NULL COMMENT '手机',
  `ipAddress` char(48) DEFAULT NULL COMMENT 'ip范围',
  `policyID` int(11) DEFAULT NULL COMMENT '口令策略标识',
  `password` varchar(300) NOT NULL COMMENT '密码',
  `description` text COMMENT '描述',
  `status` int(11) DEFAULT '1' COMMENT '状态\n            1 : 正常\n            2 : 删除\n            3 : 锁定',
  `isSysDefault` tinyint(1) DEFAULT '0' COMMENT '是否系统内置\n            0 : 不内置\n            1 : 内置',
  `createTime` datetime DEFAULT NULL COMMENT '创建时间',
  `lastLoginTime` datetime DEFAULT NULL COMMENT '最近登录时间',
  `themeType` varchar(300) DEFAULT NULL COMMENT '填写的采用主题的css样式名称',
  `preFix` int(11) DEFAULT NULL COMMENT 'IP前缀',
  `startStandardIP` char(48) DEFAULT NULL,
  `endStandardIP` char(48) DEFAULT NULL,
  `verifyIPAddr` tinyint(1) DEFAULT NULL,
  `updatePwdCount` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='用户表\nWebServer：读/写 ';

-- ----------------------------
-- Records of t_sys_user
-- ----------------------------
INSERT INTO `t_sys_user` VALUES ('1', '1', '1', 'sysadmin', 'sysadmin', null, '', null, null, null, null, '21232f297a57a5a743894a0e4a801fc3', null, '1', '1', null, null, null, null, null, null, null, '0');
INSERT INTO `t_sys_user` VALUES ('2', '1', '2', 'auditadmin', 'auditadmin', null, null, null, null, null, null, '21232f297a57a5a743894a0e4a801fc3', null, '1', '1', null, null, null, null, null, null, null, '0');

-- ----------------------------
-- Table structure for t_sys_usergroup
-- ----------------------------
DROP TABLE IF EXISTS `t_sys_usergroup`;
CREATE TABLE `t_sys_usergroup` (
  `userGroupID` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户组标识',
  `groupName` varchar(300) NOT NULL COMMENT '用户组名',
  `groupNameEN` varchar(300) DEFAULT NULL,
  `description` text COMMENT '描述',
  `isSysDefault` tinyint(1) DEFAULT '0' COMMENT '是否系统内置\n            0 : 不内置\n            1 : 内置',
  `status` int(11) DEFAULT '1' COMMENT '状态\n            1 : 正常\n            2 : 删除',
  `roldID` int(11) DEFAULT NULL,
  PRIMARY KEY (`userGroupID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='用户组\nWebServer：读/写 ';

-- ----------------------------
-- Records of t_sys_usergroup
-- ----------------------------
INSERT INTO `t_sys_usergroup` VALUES ('1', '默认', 'Default', null, '1', '1', null);

-- ----------------------------
-- Table structure for t_sys_userlogininfo
-- ----------------------------
DROP TABLE IF EXISTS `t_sys_userlogininfo`;
CREATE TABLE `t_sys_userlogininfo` (
  `loginID` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户登录标识',
  `userID` int(11) NOT NULL COMMENT '用户标识',
  `lastLoginTime` datetime DEFAULT NULL COMMENT '最近登录时间',
  `lastLoginIP` char(48) DEFAULT NULL COMMENT '最近登录IP',
  `lastLoginFailTime` datetime DEFAULT NULL COMMENT '最近登录失败时间',
  `lastLoginFailIP` char(48) DEFAULT NULL COMMENT '最近登录失败IP',
  `availLoginFailCount` int(11) DEFAULT NULL COMMENT '可用登录失败次数',
  `lastLockTime` datetime DEFAULT NULL COMMENT '最近锁定时间',
  `successCount` int(11) NOT NULL DEFAULT '0' COMMENT '用登录成功次数',
  PRIMARY KEY (`loginID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COMMENT='用户登录信息表\nWebServer：读/写 ';

-- ----------------------------
-- Records of t_sys_userlogininfo
-- ----------------------------
INSERT INTO `t_sys_userlogininfo` VALUES ('4', '1', '2016-10-18 17:13:53', '127.0.0.1', null, null, '0', null, '22');
