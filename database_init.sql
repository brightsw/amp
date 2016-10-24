/*
Navicat MySQL Data Transfer

Source Server         : local
Source Server Version : 50512
Source Host           : localhost:3306
Source Database       : ampdb

Target Server Type    : MYSQL
Target Server Version : 50512
File Encoding         : 65001

Date: 2016-10-24 16:23:06
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
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_account
-- ----------------------------
INSERT INTO `t_account` VALUES ('4', '45567', '1', '2016-10-16', '2016-10', '2016', '2016-10-16', '1', null);
INSERT INTO `t_account` VALUES ('5', '81581', '2', '2016-10-16', '2016-10', '2016', '2016-10-16', '1', null);
INSERT INTO `t_account` VALUES ('6', '28561', '3', '2016-10-16', '2016-10', '2016', '2016-10-16', '1', null);
INSERT INTO `t_account` VALUES ('7', '11111', '1', '2016-10-17', '2016-10', '2016', '2016-10-17', '1', null);
INSERT INTO `t_account` VALUES ('8', '22222', '1', '2016-10-14', '2016-10', '2016', '2016-10-17', '1', null);
INSERT INTO `t_account` VALUES ('9', '33333', '1', '2016-10-13', '2016-10', '2016', '2016-10-17', '1', null);
INSERT INTO `t_account` VALUES ('10', '322', '5', '2016-10-18', '2016-10', '2016', '2016-10-18', '1', null);
INSERT INTO `t_account` VALUES ('11', '322', '5', '2016-10-18', '2016-10', '2016', '2016-10-18', '1', null);

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
) ENGINE=InnoDB AUTO_INCREMENT=145 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_income
-- ----------------------------
INSERT INTO `t_income` VALUES ('10', '1130', '4', '2015-01-01', '2015-01', '2015', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('11', '1270', '4', '2015-01-02', '2015-01', '2015', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('12', '1040', '4', '2015-01-03', '2015-01', '2015', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('13', '1600', '4', '2015-01-04', '2015-01', '2015', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('14', '1850', '4', '2015-01-05', '2015-01', '2015', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('15', '1930', '4', '2015-01-06', '2015-01', '2015', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('16', '1350', '4', '2015-01-07', '2015-01', '2015', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('17', '1380', '4', '2015-01-08', '2015-01', '2015', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('18', '1580', '4', '2015-01-09', '2015-01', '2015', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('19', '1350', '4', '2015-01-10', '2015-01', '2015', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('20', '1680', '4', '2015-01-11', '2015-01', '2015', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('21', '860', '4', '2015-01-12', '2015-01', '2015', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('22', '760', '4', '2015-01-13', '2015-01', '2015', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('23', '1430', '4', '2015-01-14', '2015-01', '2015', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('24', '1330', '4', '2015-01-15', '2015-01', '2015', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('25', '1700', '4', '2015-01-16', '2015-01', '2015', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('26', '1750', '4', '2015-01-17', '2015-01', '2015', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('27', '1840', '4', '2015-01-18', '2015-01', '2015', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('28', '1250', '4', '2015-01-19', '2015-01', '2015', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('29', '1840', '4', '2015-01-20', '2015-01', '2015', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('30', '890', '4', '2015-01-21', '2015-01', '2015', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('31', '1210', '4', '2015-01-22', '2015-01', '2015', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('32', '830', '4', '2015-01-23', '2015-01', '2015', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('33', '1000', '4', '2015-01-24', '2015-01', '2015', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('34', '1220', '4', '2015-01-25', '2015-01', '2015', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('35', '1170', '4', '2015-01-26', '2015-01', '2015', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('36', '1040', '4', '2015-01-27', '2015-01', '2015', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('37', '2500', '4', '2015-01-28', '2015-01', '2015', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('38', '1490', '4', '2015-01-29', '2015-01', '2015', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('39', '1100', '4', '2015-01-30', '2015-01', '2015', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('40', '1000', '4', '2015-01-31', '2015-01', '2015', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('41', '1190', '4', '2015-02-01', '2015-02', '2015', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('42', '1200', '4', '2015-02-02', '2015-02', '2015', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('43', '1300', '4', '2015-02-03', '2015-02', '2015', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('44', '1820', '4', '2015-02-04', '2015-02', '2015', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('45', '1220', '4', '2015-02-05', '2015-02', '2015', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('46', '970', '4', '2015-02-06', '2015-02', '2015', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('47', '2200', '4', '2015-02-08', '2015-02', '2015', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('48', '2420', '4', '2015-02-09', '2015-02', '2015', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('49', '1790', '4', '2015-02-10', '2015-02', '2015', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('50', '1650', '4', '2015-02-11', '2015-02', '2015', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('51', '1980', '4', '2015-02-12', '2015-02', '2015', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('52', '500', '4', '2015-02-13', '2015-02', '2015', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('53', '500', '4', '2015-02-14', '2015-02', '2015', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('54', '1570', '4', '2015-02-15', '2015-02', '2015', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('55', '2200', '4', '2015-02-16', '2015-02', '2015', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('56', '1200', '4', '2015-02-17', '2015-02', '2015', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('57', '820', '4', '2015-02-18', '2015-02', '2015', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('58', '2370', '4', '2015-02-19', '2015-02', '2015', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('59', '1590', '4', '2015-02-20', '2015-02', '2015', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('60', '2660', '4', '2015-02-21', '2015-02', '2015', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('61', '1300', '4', '2015-02-22', '2015-02', '2015', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('62', '1000', '4', '2015-02-23', '2015-02', '2015', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('63', '770', '4', '2015-02-24', '2015-02', '2015', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('64', '2000', '4', '2015-02-25', '2015-02', '2015', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('65', '1890', '4', '2015-02-26', '2015-02', '2015', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('66', '2080', '4', '2015-02-27', '2015-02', '2015', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('67', '2030', '4', '2015-02-28', '2015-02', '2015', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('69', '2130', '4', '2016-01-01', '2016-01', '2016', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('70', '2270', '4', '2016-01-02', '2016-01', '2016', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('71', '2040', '4', '2016-01-03', '2016-01', '2016', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('72', '2600', '4', '2016-01-04', '2016-01', '2016', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('73', '2850', '4', '2016-01-05', '2016-01', '2016', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('74', '2930', '4', '2016-01-06', '2016-01', '2016', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('75', '2350', '4', '2016-01-07', '2016-01', '2016', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('76', '2380', '4', '2016-01-08', '2016-01', '2016', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('77', '2580', '4', '2016-01-09', '2016-01', '2016', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('78', '2350', '4', '2016-01-10', '2016-01', '2016', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('79', '2680', '4', '2016-01-11', '2016-01', '2016', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('80', '1860', '4', '2016-01-12', '2016-01', '2016', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('81', '1760', '4', '2016-01-13', '2016-01', '2016', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('82', '2430', '4', '2016-01-14', '2016-01', '2016', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('83', '2330', '4', '2016-01-15', '2016-01', '2016', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('84', '2700', '4', '2016-01-16', '2016-01', '2016', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('85', '2750', '4', '2016-01-17', '2016-01', '2016', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('86', '2840', '4', '2016-01-18', '2016-01', '2016', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('87', '2250', '4', '2016-01-19', '2016-01', '2016', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('88', '2840', '4', '2016-01-20', '2016-01', '2016', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('89', '1890', '4', '2016-01-21', '2016-01', '2016', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('90', '2210', '4', '2016-01-22', '2016-01', '2016', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('91', '1830', '4', '2016-01-23', '2016-01', '2016', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('92', '2000', '4', '2016-01-24', '2016-01', '2016', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('93', '2220', '4', '2016-01-25', '2016-01', '2016', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('94', '2170', '4', '2016-01-26', '2016-01', '2016', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('95', '2040', '4', '2016-01-27', '2016-01', '2016', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('96', '2500', '4', '2016-01-28', '2016-01', '2016', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('97', '2490', '4', '2016-01-29', '2016-01', '2016', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('98', '2100', '4', '2016-01-30', '2016-01', '2016', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('99', '1000', '4', '2016-01-31', '2016-01', '2016', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('100', '1190', '4', '2016-02-01', '2016-02', '2016', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('101', '1200', '4', '2016-02-02', '2016-02', '2016', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('102', '1300', '4', '2016-02-03', '2016-02', '2016', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('103', '1820', '4', '2016-02-04', '2016-02', '2016', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('104', '1220', '4', '2016-02-05', '2016-02', '2016', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('105', '970', '4', '2016-02-06', '2016-02', '2016', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('106', '2200', '4', '2016-02-08', '2016-02', '2016', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('107', '2420', '4', '2016-02-09', '2016-02', '2016', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('108', '1790', '4', '2016-02-10', '2016-02', '2016', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('109', '1650', '4', '2016-02-11', '2016-02', '2016', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('110', '1980', '4', '2016-02-12', '2016-02', '2016', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('111', '500', '4', '2016-02-13', '2016-02', '2016', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('112', '500', '4', '2016-02-14', '2016-02', '2016', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('113', '1570', '4', '2016-02-15', '2016-02', '2016', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('114', '2200', '4', '2016-02-16', '2016-02', '2016', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('115', '1200', '4', '2016-02-17', '2016-02', '2016', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('116', '820', '4', '2016-02-18', '2016-02', '2016', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('117', '2370', '4', '2016-02-19', '2016-02', '2016', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('118', '2590', '4', '2016-02-20', '2016-02', '2016', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('119', '2660', '4', '2016-02-21', '2016-02', '2016', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('120', '2300', '4', '2016-02-22', '2016-02', '2016', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('121', '1000', '4', '2016-02-23', '2016-02', '2016', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('122', '1770', '4', '2016-02-24', '2016-02', '2016', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('123', '2000', '4', '2016-02-25', '2016-02', '2016', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('124', '1890', '4', '2016-02-26', '2016-02', '2016', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('125', '2080', '4', '2016-02-27', '2016-02', '2016', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('126', '2030', '4', '2016-02-28', '2016-02', '2016', '2016-10-23', '1', null);
INSERT INTO `t_income` VALUES ('127', '43201', '4', '2016-03-01', '2016-03', '2016', '2016-10-24', '1', null);
INSERT INTO `t_income` VALUES ('128', '42221', '4', '2016-04-01', '2016-04', '2016', '2016-10-24', '1', null);
INSERT INTO `t_income` VALUES ('129', '34323', '4', '2016-05-01', '2016-05', '2016', '2016-10-24', '1', null);
INSERT INTO `t_income` VALUES ('130', '56521', '4', '2016-06-01', '2016-06', '2016', '2016-10-24', '1', null);
INSERT INTO `t_income` VALUES ('131', '23212', '4', '2016-07-01', '2016-07', '2016', '2016-10-24', '1', null);
INSERT INTO `t_income` VALUES ('132', '23452', '4', '2016-08-01', '2016-08', '2016', '2016-10-24', '1', null);
INSERT INTO `t_income` VALUES ('133', '52312', '4', '2016-09-01', '2016-09', '2016', '2016-10-24', '1', null);
INSERT INTO `t_income` VALUES ('134', '44223', '4', '2016-10-01', '2016-10', '2016', '2016-10-24', '1', null);
INSERT INTO `t_income` VALUES ('135', '41211', '4', '2015-03-01', '2015-03', '2015', '2016-10-24', '1', null);
INSERT INTO `t_income` VALUES ('136', '41232', '4', '2015-04-01', '2015-04', '2015', '2016-10-24', '1', null);
INSERT INTO `t_income` VALUES ('137', '34212', '4', '2015-05-01', '2015-05', '2015', '2016-10-24', '1', null);
INSERT INTO `t_income` VALUES ('138', '47612', '4', '2015-06-01', '2015-06', '2015', '2016-10-24', '1', null);
INSERT INTO `t_income` VALUES ('139', '19123', '4', '2015-07-01', '2015-07', '2015', '2016-10-24', '1', null);
INSERT INTO `t_income` VALUES ('140', '21222', '4', '2015-08-01', '2015-08', '2015', '2016-10-24', '1', null);
INSERT INTO `t_income` VALUES ('141', '49121', '4', '2015-09-01', '2015-09', '2015', '2016-10-24', '1', null);
INSERT INTO `t_income` VALUES ('142', '41212', '4', '2015-10-01', '2015-10', '2015', '2016-10-24', '1', null);
INSERT INTO `t_income` VALUES ('143', '39128', '4', '2015-11-01', '2015-11', '2015', '2016-10-24', '1', null);
INSERT INTO `t_income` VALUES ('144', '34444', '4', '2015-12-01', '2015-12', '2015', '2016-10-24', '1', null);

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
) ENGINE=InnoDB AUTO_INCREMENT=2008 DEFAULT CHARSET=utf8 COMMENT='报表模板表\r\nWebServer:读/写\r\n';

-- ----------------------------
-- Records of t_rpt_template
-- ----------------------------
INSERT INTO `t_rpt_template` VALUES ('1001', '1', '资金汇总周趋势图', '4', 'SELECT ACCDATE AS CATEGORY,SUM(MONEY) AS VALUE FROM T_ACCOUNT GROUP BY ACCDATE ORDER BY CATEGORY', null, '', null, '2', '4', '1');
INSERT INTO `t_rpt_template` VALUES ('1002', '1', '资金汇总月趋势图', '4', 'SELECT ACCDATE AS CATEGORY,SUM(MONEY) AS VALUE FROM T_ACCOUNT GROUP BY ACCDATE ORDER BY CATEGORY', null, null, '', '3', '5', '1');
INSERT INTO `t_rpt_template` VALUES ('1003', '1', '资金汇总年趋势图', '4', 'SELECT ACCMON AS CATEGORY,SUM(MONEY) AS VALUE FROM T_ACCOUNT GROUP BY ACCMON ORDER BY CATEGORY', null, null, null, '4', '6', '1');
INSERT INTO `t_rpt_template` VALUES ('1004', '1', '资金分类周趋势图', '6', 'SELECT A.ACCDATE AS CATEGORY,A.MONEY AS VALUE,B.TYPENAME AS SERIES FROM T_ACCOUNT A,T_ACCOUNTTYPE B WHERE A.ACCTYPE=B.TYPEID GROUP BY CATEGORY,SERIES ORDER BY CATEGORY', 'SELECT TYPENAME AS SERIES FROM T_ACCOUNTTYPE WHERE CAPITALUSE=1', null, null, '2', '4', '1');
INSERT INTO `t_rpt_template` VALUES ('1005', '1', '资金分类月趋势图', '6', 'SELECT A.ACCDATE AS CATEGORY,A.MONEY AS VALUE,B.TYPENAME AS SERIES FROM T_ACCOUNT A,T_ACCOUNTTYPE B WHERE A.ACCTYPE=B.TYPEID GROUP BY CATEGORY,SERIES ORDER BY CATEGORY', 'SELECT TYPENAME AS SERIES FROM T_ACCOUNTTYPE WHERE CAPITALUSE=1', null, null, '3', '5', '1');
INSERT INTO `t_rpt_template` VALUES ('1006', '1', '资金分类年趋势图', '6', 'SELECT A.ACCDATE AS CATEGORY,A.MONEY AS VALUE,B.TYPENAME AS SERIES FROM T_ACCOUNT A,T_ACCOUNTTYPE B WHERE A.ACCTYPE=B.TYPEID GROUP BY CATEGORY,SERIES ORDER BY CATEGORY', 'SELECT TYPENAME AS SERIES FROM T_ACCOUNTTYPE WHERE CAPITALUSE=1', null, null, '4', '6', '1');
INSERT INTO `t_rpt_template` VALUES ('2001', '1', '收入汇总上周环比图', '8', 'SELECT ACCDATE AS CATEGORY,SUM(MONEY) AS VALUE FROM T_INCOME GROUP BY ACCDATE ORDER BY CATEGORY', null, '', null, '2', '4', '1');
INSERT INTO `t_rpt_template` VALUES ('2002', '1', '收入汇总上月环比图', '8', 'SELECT ACCDATE AS CATEGORY,SUM(MONEY) AS VALUE FROM T_INCOME GROUP BY ACCDATE ORDER BY CATEGORY', null, null, '', '3', '5', '1');
INSERT INTO `t_rpt_template` VALUES ('2003', '1', '收入汇总上年环比图', '8', 'SELECT ACCMON AS CATEGORY,SUM(MONEY) AS VALUE FROM T_INCOME GROUP BY ACCMON ORDER BY CATEGORY', null, null, null, '4', '6', '1');
INSERT INTO `t_rpt_template` VALUES ('2004', '1', '收入汇总上年分布图', '9', 'SELECT ACCMON AS CATEGORY,SUM(MONEY) AS VALUE FROM T_INCOME GROUP BY ACCMON ORDER BY CATEGORY', '', '', '', '4', '6', '1');
INSERT INTO `t_rpt_template` VALUES ('2005', '1', '收入汇总当年环比图', '8', 'SELECT ACCMON AS CATEGORY,SUM(MONEY) AS VALUE FROM T_INCOME GROUP BY ACCMON ORDER BY CATEGORY', null, null, '', '5', '8', '1');
INSERT INTO `t_rpt_template` VALUES ('2006', '1', '收入汇总当年分布图', '9', 'SELECT ACCMON AS CATEGORY,SUM(MONEY) AS VALUE FROM T_INCOME GROUP BY ACCMON ORDER BY CATEGORY', '', '', '', '5', '8', '1');
INSERT INTO `t_rpt_template` VALUES ('2007', '1', '收入汇总同比柱状图', '7', 'SELECT right(ACCMON,2) AS CATEGORY,SUM(MONEY) AS VALUE,ACCYEAR AS SERIES FROM T_INCOME GROUP BY CATEGORY,SERIES ORDER BY CATEGORY', 'SELECT ACCYEAR AS SERIES FROM T_INCOME GROUP BY SERIES ORDER BY SERIES', null, null, '6', '7', '1');
INSERT INTO `t_rpt_template` VALUES ('2008', '1', '收入汇总同比趋势图', '6', 'SELECT right(ACCMON,2) AS CATEGORY,SUM(MONEY) AS VALUE,ACCYEAR AS SERIES FROM T_INCOME GROUP BY CATEGORY,SERIES ORDER BY CATEGORY', 'SELECT ACCYEAR AS SERIES FROM T_INCOME GROUP BY SERIES ORDER BY SERIES', '', '', '6', '7', '1');
INSERT INTO `t_rpt_template` VALUES ('2009', '1', '收入汇总年度环比图', '3', 'SELECT ACCYEAR AS CATEGORY,SUM(MONEY) AS VALUE FROM T_INCOME GROUP BY ACCYEAR ORDER BY CATEGORY', null, null, null, '5', '7', '1');

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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_spend
-- ----------------------------
INSERT INTO `t_spend` VALUES ('10', '322', '5', '2016-10-18', '2016-10', '2016', '2016-10-18', '1', null);

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
) ENGINE=InnoDB AUTO_INCREMENT=68741 DEFAULT CHARSET=utf8 COMMENT='用户日志表\nWebServer：读\nBusinessManager：写 ';

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
INSERT INTO `t_sys_log` VALUES ('68704', 'web', '127.0.0.1', '1', '新增收入明细成功', '2016-10-18 17:53:28', 'sysadmin', '2');
INSERT INTO `t_sys_log` VALUES ('68705', 'web', '127.0.0.1', '1', '新增支出明细成功', '2016-10-18 17:53:39', 'sysadmin', '2');
INSERT INTO `t_sys_log` VALUES ('68706', 'web', '127.0.0.1', '1', '新增支出明细成功', '2016-10-18 17:53:56', 'sysadmin', '2');
INSERT INTO `t_sys_log` VALUES ('68707', 'web', '127.0.0.1', '1', '用户(sysadmin)登录成功', '2016-10-18 17:58:59', 'sysadmin', '2');
INSERT INTO `t_sys_log` VALUES ('68708', 'web', '127.0.0.1', '1', '新增支出明细成功', '2016-10-18 17:59:18', 'sysadmin', '2');
INSERT INTO `t_sys_log` VALUES ('68709', 'web', '127.0.0.1', '1', '用户(sysadmin)登录成功', '2016-10-18 18:21:03', 'sysadmin', '2');
INSERT INTO `t_sys_log` VALUES ('68710', 'web', '127.0.0.1', '1', '用户(sysadmin)登录成功', '2016-10-24 09:26:03', 'sysadmin', '2');
INSERT INTO `t_sys_log` VALUES ('68711', 'web', '127.0.0.1', '1', '用户(sysadmin)登录成功', '2016-10-24 09:45:11', 'sysadmin', '2');
INSERT INTO `t_sys_log` VALUES ('68712', 'web', '127.0.0.1', '1', '用户(sysadmin)登录成功', '2016-10-24 09:49:01', 'sysadmin', '2');
INSERT INTO `t_sys_log` VALUES ('68713', 'web', '127.0.0.1', '1', '用户(sysadmin)登录成功', '2016-10-24 09:52:55', 'sysadmin', '2');
INSERT INTO `t_sys_log` VALUES ('68714', 'web', '127.0.0.1', '1', '用户(sysadmin)登录成功', '2016-10-24 11:17:43', 'sysadmin', '2');
INSERT INTO `t_sys_log` VALUES ('68715', 'web', '127.0.0.1', '1', '新增收入明细成功', '2016-10-24 11:18:27', 'sysadmin', '2');
INSERT INTO `t_sys_log` VALUES ('68716', 'web', '127.0.0.1', '1', '新增收入明细成功', '2016-10-24 11:18:39', 'sysadmin', '2');
INSERT INTO `t_sys_log` VALUES ('68717', 'web', '127.0.0.1', '1', '新增收入明细成功', '2016-10-24 11:18:54', 'sysadmin', '2');
INSERT INTO `t_sys_log` VALUES ('68718', 'web', '127.0.0.1', '1', '新增收入明细成功', '2016-10-24 11:19:04', 'sysadmin', '2');
INSERT INTO `t_sys_log` VALUES ('68719', 'web', '127.0.0.1', '1', '新增收入明细成功', '2016-10-24 11:19:17', 'sysadmin', '2');
INSERT INTO `t_sys_log` VALUES ('68720', 'web', '127.0.0.1', '1', '新增收入明细成功', '2016-10-24 11:19:26', 'sysadmin', '2');
INSERT INTO `t_sys_log` VALUES ('68721', 'web', '127.0.0.1', '1', '新增收入明细成功', '2016-10-24 11:19:41', 'sysadmin', '2');
INSERT INTO `t_sys_log` VALUES ('68722', 'web', '127.0.0.1', '1', '新增收入明细成功', '2016-10-24 11:19:51', 'sysadmin', '2');
INSERT INTO `t_sys_log` VALUES ('68723', 'web', '127.0.0.1', '1', '新增收入明细成功', '2016-10-24 11:20:15', 'sysadmin', '2');
INSERT INTO `t_sys_log` VALUES ('68724', 'web', '127.0.0.1', '1', '新增收入明细成功', '2016-10-24 11:20:38', 'sysadmin', '2');
INSERT INTO `t_sys_log` VALUES ('68725', 'web', '127.0.0.1', '1', '新增收入明细成功', '2016-10-24 11:20:56', 'sysadmin', '2');
INSERT INTO `t_sys_log` VALUES ('68726', 'web', '127.0.0.1', '1', '新增收入明细成功', '2016-10-24 11:21:11', 'sysadmin', '2');
INSERT INTO `t_sys_log` VALUES ('68727', 'web', '127.0.0.1', '1', '新增收入明细成功', '2016-10-24 11:21:30', 'sysadmin', '2');
INSERT INTO `t_sys_log` VALUES ('68728', 'web', '127.0.0.1', '1', '新增收入明细成功', '2016-10-24 11:21:43', 'sysadmin', '2');
INSERT INTO `t_sys_log` VALUES ('68729', 'web', '127.0.0.1', '1', '新增收入明细成功', '2016-10-24 11:21:57', 'sysadmin', '2');
INSERT INTO `t_sys_log` VALUES ('68730', 'web', '127.0.0.1', '1', '新增收入明细成功', '2016-10-24 11:22:10', 'sysadmin', '2');
INSERT INTO `t_sys_log` VALUES ('68731', 'web', '127.0.0.1', '1', '新增收入明细成功', '2016-10-24 11:22:25', 'sysadmin', '2');
INSERT INTO `t_sys_log` VALUES ('68732', 'web', '127.0.0.1', '1', '新增收入明细成功', '2016-10-24 11:22:37', 'sysadmin', '2');
INSERT INTO `t_sys_log` VALUES ('68733', 'web', '127.0.0.1', '1', '用户(sysadmin)登录成功', '2016-10-24 11:42:01', 'sysadmin', '2');
INSERT INTO `t_sys_log` VALUES ('68734', 'web', '127.0.0.1', '1', '用户(sysadmin)登录成功', '2016-10-24 11:54:01', 'sysadmin', '2');
INSERT INTO `t_sys_log` VALUES ('68735', 'web', '127.0.0.1', '1', '用户(sysadmin)登录成功', '2016-10-24 11:54:31', 'sysadmin', '2');
INSERT INTO `t_sys_log` VALUES ('68736', 'web', '127.0.0.1', '1', '用户(sysadmin)登录成功', '2016-10-24 11:56:07', 'sysadmin', '2');
INSERT INTO `t_sys_log` VALUES ('68737', 'web', '127.0.0.1', '1', '用户(sysadmin)登录成功', '2016-10-24 13:16:06', 'sysadmin', '2');
INSERT INTO `t_sys_log` VALUES ('68738', 'web', '127.0.0.1', '1', '用户(sysadmin)登录成功', '2016-10-24 15:25:08', 'sysadmin', '2');
INSERT INTO `t_sys_log` VALUES ('68739', 'web', '127.0.0.1', '1', '用户(sysadmin)登录成功', '2016-10-24 15:34:29', 'sysadmin', '2');
INSERT INTO `t_sys_log` VALUES ('68740', 'web', '127.0.0.1', '1', '用户(sysadmin)登录成功', '2016-10-24 15:36:56', 'sysadmin', '2');

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
INSERT INTO `t_sys_userlogininfo` VALUES ('4', '1', '2016-10-24 15:36:56', '127.0.0.1', null, null, '0', null, '37');
