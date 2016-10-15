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
  `recdate` date NOT NULL,
  `recuser` int(10) NOT NULL,
  PRIMARY KEY (`gid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_account
-- ----------------------------

-- ----------------------------
-- Table structure for t_accounttype
-- ----------------------------
DROP TABLE IF EXISTS `t_accounttype`;
CREATE TABLE `t_accounttype` (
  `typeid` int(10) NOT NULL AUTO_INCREMENT,
  `typename` varchar(200) NOT NULL,
  PRIMARY KEY (`typeid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_accounttype
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
) ENGINE=InnoDB AUTO_INCREMENT=68664 DEFAULT CHARSET=utf8 COMMENT='用户日志表\nWebServer：读\nBusinessManager：写 ';

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
INSERT INTO `t_sys_module` VALUES ('6', '全局设置', '1', '0', '', '1', 'app.system', 'fa-gear', '6');
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
INSERT INTO `t_sys_role_module` VALUES ('1', '6', 'app.system');
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='用户登录信息表\nWebServer：读/写 ';
