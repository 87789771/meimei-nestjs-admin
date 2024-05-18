/*
MySQL Backup
Database: meimei-prisma
Backup Time: 2024-05-18 10:42:47
*/

SET FOREIGN_KEY_CHECKS=0;
DROP TABLE IF EXISTS `meimei-prisma`.`_prisma_migrations`;
DROP TABLE IF EXISTS `meimei-prisma`.`_sys_dept_to_sys_role`;
DROP TABLE IF EXISTS `meimei-prisma`.`_sys_menu_to_sys_role`;
DROP TABLE IF EXISTS `meimei-prisma`.`_sys_post_to_sys_user`;
DROP TABLE IF EXISTS `meimei-prisma`.`_sys_role_to_sys_user`;
DROP TABLE IF EXISTS `meimei-prisma`.`sys_config`;
DROP TABLE IF EXISTS `meimei-prisma`.`sys_dept`;
DROP TABLE IF EXISTS `meimei-prisma`.`sys_dict_data`;
DROP TABLE IF EXISTS `meimei-prisma`.`sys_dict_type`;
DROP TABLE IF EXISTS `meimei-prisma`.`sys_job`;
DROP TABLE IF EXISTS `meimei-prisma`.`sys_job_log`;
DROP TABLE IF EXISTS `meimei-prisma`.`sys_login_infor`;
DROP TABLE IF EXISTS `meimei-prisma`.`sys_menu`;
DROP TABLE IF EXISTS `meimei-prisma`.`sys_notice`;
DROP TABLE IF EXISTS `meimei-prisma`.`sys_oper_log`;
DROP TABLE IF EXISTS `meimei-prisma`.`sys_post`;
DROP TABLE IF EXISTS `meimei-prisma`.`sys_role`;
DROP TABLE IF EXISTS `meimei-prisma`.`sys_table`;
DROP TABLE IF EXISTS `meimei-prisma`.`sys_user`;
DROP TABLE IF EXISTS `meimei-prisma`.`sys_web`;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
CREATE TABLE `_sys_dept_to_sys_role` (
  `A` int NOT NULL,
  `B` int NOT NULL,
  UNIQUE KEY `_sys_dept_to_sys_role_AB_unique` (`A`,`B`),
  KEY `_sys_dept_to_sys_role_B_index` (`B`),
  CONSTRAINT `_sys_dept_to_sys_role_A_fkey` FOREIGN KEY (`A`) REFERENCES `sys_dept` (`deptId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `_sys_dept_to_sys_role_B_fkey` FOREIGN KEY (`B`) REFERENCES `sys_role` (`roleId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
CREATE TABLE `_sys_menu_to_sys_role` (
  `A` int NOT NULL,
  `B` int NOT NULL,
  UNIQUE KEY `_sys_menu_to_sys_role_AB_unique` (`A`,`B`),
  KEY `_sys_menu_to_sys_role_B_index` (`B`),
  CONSTRAINT `_sys_menu_to_sys_role_A_fkey` FOREIGN KEY (`A`) REFERENCES `sys_menu` (`menuId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `_sys_menu_to_sys_role_B_fkey` FOREIGN KEY (`B`) REFERENCES `sys_role` (`roleId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
CREATE TABLE `_sys_post_to_sys_user` (
  `A` int NOT NULL,
  `B` int NOT NULL,
  UNIQUE KEY `_sys_post_to_sys_user_AB_unique` (`A`,`B`),
  KEY `_sys_post_to_sys_user_B_index` (`B`),
  CONSTRAINT `_sys_post_to_sys_user_A_fkey` FOREIGN KEY (`A`) REFERENCES `sys_post` (`postId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `_sys_post_to_sys_user_B_fkey` FOREIGN KEY (`B`) REFERENCES `sys_user` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
CREATE TABLE `_sys_role_to_sys_user` (
  `A` int NOT NULL,
  `B` int NOT NULL,
  UNIQUE KEY `_sys_role_to_sys_user_AB_unique` (`A`,`B`),
  KEY `_sys_role_to_sys_user_B_index` (`B`),
  CONSTRAINT `_sys_role_to_sys_user_A_fkey` FOREIGN KEY (`A`) REFERENCES `sys_role` (`roleId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `_sys_role_to_sys_user_B_fkey` FOREIGN KEY (`B`) REFERENCES `sys_user` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
CREATE TABLE `sys_config` (
  `configId` int NOT NULL AUTO_INCREMENT,
  `configName` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `configKey` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `configValue` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `configType` char(1) COLLATE utf8mb4_unicode_ci DEFAULT 'N',
  `createBy` varchar(64) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `createTime` datetime DEFAULT NULL,
  `updateBy` varchar(64) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `updateTime` datetime DEFAULT NULL,
  `remark` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`configId`),
  UNIQUE KEY `sys_config_configKey_key` (`configKey`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
CREATE TABLE `sys_dept` (
  `deptId` int NOT NULL AUTO_INCREMENT,
  `parentId` int DEFAULT NULL,
  `ancestors` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `deptName` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `orderNum` int DEFAULT '0',
  `leader` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(11) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` char(1) COLLATE utf8mb4_unicode_ci DEFAULT '0',
  `delFlag` char(1) COLLATE utf8mb4_unicode_ci DEFAULT '0',
  `createBy` varchar(64) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `createTime` datetime DEFAULT NULL,
  `updateBy` varchar(64) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `updateTime` datetime DEFAULT NULL,
  PRIMARY KEY (`deptId`),
  KEY `sys_dept_parentId_fkey` (`parentId`),
  CONSTRAINT `sys_dept_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `sys_dept` (`deptId`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=110 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
CREATE TABLE `sys_dict_data` (
  `dictCode` int NOT NULL AUTO_INCREMENT,
  `dictSort` int DEFAULT '0',
  `dictLabel` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `dictValue` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `dictType` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `cssClass` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `listClass` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `isDefault` char(1) COLLATE utf8mb4_unicode_ci DEFAULT 'N',
  `status` char(1) COLLATE utf8mb4_unicode_ci DEFAULT '0',
  `createBy` varchar(64) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `createTime` datetime DEFAULT NULL,
  `updateBy` varchar(64) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `updateTime` datetime DEFAULT NULL,
  `remark` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`dictCode`),
  KEY `sys_dict_data_dictType_fkey` (`dictType`),
  CONSTRAINT `sys_dict_data_dictType_fkey` FOREIGN KEY (`dictType`) REFERENCES `sys_dict_type` (`dictType`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
CREATE TABLE `sys_dict_type` (
  `dictId` int NOT NULL AUTO_INCREMENT,
  `dictName` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `dictType` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `status` char(1) COLLATE utf8mb4_unicode_ci DEFAULT '0',
  `createBy` varchar(64) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `createTime` datetime DEFAULT NULL,
  `updateBy` varchar(64) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `updateTime` datetime DEFAULT NULL,
  `remark` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`dictId`),
  UNIQUE KEY `dictType` (`dictType`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
CREATE TABLE `sys_job` (
  `jobId` int NOT NULL AUTO_INCREMENT,
  `jobName` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `jobGroup` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'DEFAULT',
  `invokeTarget` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cronExpression` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `misfirePolicy` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT '3',
  `concurrent` char(1) COLLATE utf8mb4_unicode_ci DEFAULT '1',
  `status` char(1) COLLATE utf8mb4_unicode_ci DEFAULT '0',
  `createBy` varchar(64) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `createTime` datetime DEFAULT NULL,
  `updateBy` varchar(64) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `updateTime` datetime DEFAULT NULL,
  `remark` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT '',
  PRIMARY KEY (`jobId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
CREATE TABLE `sys_job_log` (
  `jobLogId` int NOT NULL AUTO_INCREMENT,
  `jobName` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `jobGroup` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `invokeTarget` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `jobMessage` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` char(1) COLLATE utf8mb4_unicode_ci DEFAULT '0',
  `exceptionInfo` varchar(2000) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `createTime` datetime DEFAULT NULL,
  PRIMARY KEY (`jobLogId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
CREATE TABLE `sys_login_infor` (
  `infoId` int NOT NULL AUTO_INCREMENT,
  `userName` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `ipaddr` varchar(128) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `loginLocation` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `browser` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `os` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `status` char(1) COLLATE utf8mb4_unicode_ci DEFAULT '0',
  `msg` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `loginTime` datetime DEFAULT NULL,
  PRIMARY KEY (`infoId`),
  KEY `idxSysLogininforLt` (`loginTime`),
  KEY `idxSysLogininforS` (`status`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
CREATE TABLE `sys_menu` (
  `menuId` int NOT NULL AUTO_INCREMENT,
  `menuName` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `parentId` int DEFAULT NULL,
  `orderNum` int DEFAULT '0',
  `path` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `component` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `query` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `isFrame` char(1) COLLATE utf8mb4_unicode_ci DEFAULT '1',
  `isCache` char(1) COLLATE utf8mb4_unicode_ci DEFAULT '0',
  `menuType` char(1) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `visible` char(1) COLLATE utf8mb4_unicode_ci DEFAULT '0',
  `status` char(1) COLLATE utf8mb4_unicode_ci DEFAULT '0',
  `perms` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `icon` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT '#',
  `createBy` varchar(64) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `createTime` datetime DEFAULT NULL,
  `updateBy` varchar(64) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `updateTime` datetime DEFAULT NULL,
  `remark` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT '',
  PRIMARY KEY (`menuId`),
  KEY `sys_menu_parentId_fkey` (`parentId`),
  CONSTRAINT `sys_menu_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `sys_menu` (`menuId`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1061 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
CREATE TABLE `sys_notice` (
  `noticeId` int NOT NULL AUTO_INCREMENT,
  `noticeTitle` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `noticeType` char(1) COLLATE utf8mb4_unicode_ci NOT NULL,
  `noticeContent` longblob,
  `status` char(1) COLLATE utf8mb4_unicode_ci DEFAULT '0',
  `createBy` varchar(64) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `createTime` datetime DEFAULT NULL,
  `updateBy` varchar(64) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `updateTime` datetime DEFAULT NULL,
  `remark` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`noticeId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
CREATE TABLE `sys_oper_log` (
  `operId` int NOT NULL AUTO_INCREMENT,
  `title` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `businessType` char(2) COLLATE utf8mb4_unicode_ci DEFAULT '0',
  `method` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `requestMethod` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `operatorType` int DEFAULT '0',
  `operName` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `deptName` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `operUrl` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `operIp` varchar(128) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `operLocation` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `operParam` text COLLATE utf8mb4_unicode_ci,
  `jsonResult` text COLLATE utf8mb4_unicode_ci,
  `status` char(1) COLLATE utf8mb4_unicode_ci DEFAULT '0',
  `errorMsg` text COLLATE utf8mb4_unicode_ci,
  `operTime` datetime DEFAULT NULL,
  `costTime` int DEFAULT '0',
  PRIMARY KEY (`operId`),
  KEY `idxSysOperLogBt` (`businessType`),
  KEY `idxSysOperLogOt` (`operTime`),
  KEY `idxSysOperLogS` (`status`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
CREATE TABLE `sys_post` (
  `postId` int NOT NULL AUTO_INCREMENT,
  `postCode` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `postName` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `postSort` int NOT NULL,
  `status` char(1) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createBy` varchar(64) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `createTime` datetime DEFAULT NULL,
  `updateBy` varchar(64) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `updateTime` datetime DEFAULT NULL,
  `remark` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`postId`),
  UNIQUE KEY `sys_post_postCode_key` (`postCode`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
CREATE TABLE `sys_role` (
  `roleId` int NOT NULL AUTO_INCREMENT,
  `createBy` varchar(64) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `createTime` datetime DEFAULT NULL,
  `dataScope` char(4) COLLATE utf8mb4_unicode_ci DEFAULT '4',
  `delFlag` char(1) COLLATE utf8mb4_unicode_ci DEFAULT '0',
  `deptCheckStrictly` tinyint(1) DEFAULT '1',
  `menuCheckStrictly` tinyint(1) DEFAULT '1',
  `remark` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `roleKey` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `roleName` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `roleSort` int NOT NULL,
  `status` char(1) COLLATE utf8mb4_unicode_ci NOT NULL,
  `updateBy` varchar(64) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `updateTime` datetime DEFAULT NULL,
  PRIMARY KEY (`roleId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
CREATE TABLE `sys_table` (
  `tableId` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createBy` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createTime` datetime DEFAULT NULL,
  `updateBy` varchar(64) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `updateTime` datetime DEFAULT NULL,
  `tableJsonConfig` text COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`tableId`,`createBy`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
CREATE TABLE `sys_user` (
  `userId` int NOT NULL AUTO_INCREMENT,
  `avatar` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `createBy` varchar(64) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `createTime` datetime DEFAULT NULL,
  `delFlag` char(1) COLLATE utf8mb4_unicode_ci DEFAULT '0',
  `deptId` int DEFAULT NULL,
  `email` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `loginDate` datetime DEFAULT NULL,
  `loginIp` varchar(128) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `nickName` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `phonenumber` varchar(11) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `remark` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sex` char(1) COLLATE utf8mb4_unicode_ci DEFAULT '0',
  `status` char(1) COLLATE utf8mb4_unicode_ci DEFAULT '0',
  `updateBy` varchar(64) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `updateTime` datetime DEFAULT NULL,
  `userName` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userType` varchar(2) COLLATE utf8mb4_unicode_ci DEFAULT '00',
  PRIMARY KEY (`userId`),
  UNIQUE KEY `sys_user_userName_key` (`userName`),
  KEY `sys_user_deptId_fkey` (`deptId`),
  CONSTRAINT `sys_user_deptId_fkey` FOREIGN KEY (`deptId`) REFERENCES `sys_dept` (`deptId`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
CREATE TABLE `sys_web` (
  `webId` int NOT NULL AUTO_INCREMENT,
  `theme` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT '#409EFF',
  `sideTheme` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `topNav` tinyint(1) DEFAULT NULL,
  `tagsView` tinyint(1) DEFAULT NULL,
  `fixedHeader` tinyint(1) DEFAULT NULL,
  `sidebarLogo` tinyint(1) DEFAULT NULL,
  `dynamicTitle` tinyint(1) DEFAULT NULL,
  `createBy` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createTime` datetime DEFAULT NULL,
  `updateBy` varchar(64) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `updateTime` datetime DEFAULT NULL,
  PRIMARY KEY (`webId`),
  UNIQUE KEY `sys_web_createBy_key` (`createBy`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
BEGIN;
LOCK TABLES `meimei-prisma`.`_prisma_migrations` WRITE;
DELETE FROM `meimei-prisma`.`_prisma_migrations`;
INSERT INTO `meimei-prisma`.`_prisma_migrations` (`id`,`checksum`,`finished_at`,`migration_name`,`logs`,`rolled_back_at`,`started_at`,`applied_steps_count`) VALUES ('5844ca88-2071-435a-b0d7-1faea9b724ab', 'e408c7dc9ed071ca6895814b7c5fc5766d0bff6f84827c8496500b27fd849275', '2024-05-17 13:02:57.179', '20240517130255_inte', NULL, NULL, '2024-05-17 13:02:55.455', 1)
;
UNLOCK TABLES;
COMMIT;
BEGIN;
LOCK TABLES `meimei-prisma`.`_sys_dept_to_sys_role` WRITE;
DELETE FROM `meimei-prisma`.`_sys_dept_to_sys_role`;
INSERT INTO `meimei-prisma`.`_sys_dept_to_sys_role` (`A`,`B`) VALUES (100, 1)
;
UNLOCK TABLES;
COMMIT;
BEGIN;
LOCK TABLES `meimei-prisma`.`_sys_menu_to_sys_role` WRITE;
DELETE FROM `meimei-prisma`.`_sys_menu_to_sys_role`;
UNLOCK TABLES;
COMMIT;
BEGIN;
LOCK TABLES `meimei-prisma`.`_sys_post_to_sys_user` WRITE;
DELETE FROM `meimei-prisma`.`_sys_post_to_sys_user`;
UNLOCK TABLES;
COMMIT;
BEGIN;
LOCK TABLES `meimei-prisma`.`_sys_role_to_sys_user` WRITE;
DELETE FROM `meimei-prisma`.`_sys_role_to_sys_user`;
INSERT INTO `meimei-prisma`.`_sys_role_to_sys_user` (`A`,`B`) VALUES (1, 1)
;
UNLOCK TABLES;
COMMIT;
BEGIN;
LOCK TABLES `meimei-prisma`.`sys_config` WRITE;
DELETE FROM `meimei-prisma`.`sys_config`;
INSERT INTO `meimei-prisma`.`sys_config` (`configId`,`configName`,`configKey`,`configValue`,`configType`,`createBy`,`createTime`,`updateBy`,`updateTime`,`remark`) VALUES (1, '用户管理-账号初始密码', 'sys.user.initPassword', '123456', 'Y', 'admin', '2024-05-17 16:07:16', '', NULL, '初始化密码 123456')
;
UNLOCK TABLES;
COMMIT;
BEGIN;
LOCK TABLES `meimei-prisma`.`sys_dept` WRITE;
DELETE FROM `meimei-prisma`.`sys_dept`;
INSERT INTO `meimei-prisma`.`sys_dept` (`deptId`,`parentId`,`ancestors`,`deptName`,`orderNum`,`leader`,`phone`,`email`,`status`,`delFlag`,`createBy`,`createTime`,`updateBy`,`updateTime`) VALUES (100, NULL, ',', '槑槑科技', 0, '小蒋', '13006133172', '87789771@qq.com', '0', '0', 'admin', '2024-05-17 16:07:16', '', NULL),(101, 100, ',100,101,', '合肥总公司', 1, '小蒋', '13006133172', '87789771@qq.com', '0', '0', 'admin', '2024-05-17 16:07:16', '', NULL),(102, 100, ',100,102,', '阜阳分公司', 2, '小蒋', '13006133172', '87789771@qq.com', '0', '0', 'admin', '2024-05-17 16:07:16', '', NULL),(103, 101, ',100,101,103,', '研发部门', 1, '小蒋', '13006133172', '87789771@qq.com', '0', '0', 'admin', '2024-05-17 16:07:16', '', NULL),(104, 101, ',100,101,104,', '市场部门', 2, '小蒋', '13006133172', '87789771@qq.com', '0', '0', 'admin', '2024-05-17 16:07:16', '', NULL),(105, 101, ',100,101,105,', '测试部门', 3, '小蒋', '13006133172', '87789771@qq.com', '0', '0', 'admin', '2024-05-17 16:07:16', '', NULL),(106, 101, ',100,101,106,', '财务部门', 4, '小蒋', '13006133172', '87789771@qq.com', '0', '0', 'admin', '2024-05-17 16:07:16', '', NULL),(107, 101, ',100,101,107,', '运维部门', 5, '小蒋', '13006133172', '87789771@qq.com', '0', '0', 'admin', '2024-05-17 16:07:16', '', NULL),(108, 102, ',100,102,108,', '市场部门', 1, '小蒋', '13006133172', '87789771@qq.com', '0', '0', 'admin', '2024-05-17 16:07:16', '', NULL),(109, 102, ',100,102,109,', '财务部门', 2, '小蒋', '13006133172', '87789771@qq.com', '0', '0', 'admin', '2024-05-17 16:07:16', '', NULL)
;
UNLOCK TABLES;
COMMIT;
BEGIN;
LOCK TABLES `meimei-prisma`.`sys_dict_data` WRITE;
DELETE FROM `meimei-prisma`.`sys_dict_data`;
INSERT INTO `meimei-prisma`.`sys_dict_data` (`dictCode`,`dictSort`,`dictLabel`,`dictValue`,`dictType`,`cssClass`,`listClass`,`isDefault`,`status`,`createBy`,`createTime`,`updateBy`,`updateTime`,`remark`) VALUES (1, 1, '男', '0', 'sys_user_sex', NULL, NULL, 'Y', '0', 'admin', '2024-05-17 16:07:16', '', NULL, '性别男'),(2, 2, '女', '1', 'sys_user_sex', NULL, NULL, 'N', '0', 'admin', '2024-05-17 16:07:16', '', NULL, '性别女'),(3, 3, '未知', '2', 'sys_user_sex', NULL, NULL, 'N', '0', 'admin', '2024-05-17 16:07:16', '', NULL, '性别未知'),(4, 1, '显示', '0', 'sys_show_hide', NULL, 'primary', 'Y', '0', 'admin', '2024-05-17 16:07:16', '', NULL, '显示菜单'),(5, 2, '隐藏', '1', 'sys_show_hide', NULL, 'danger', 'N', '0', 'admin', '2024-05-17 16:07:16', '', NULL, '隐藏菜单'),(6, 1, '正常', '0', 'sys_normal_disable', NULL, 'primary', 'Y', '0', 'admin', '2024-05-17 16:07:16', '', NULL, '正常状态'),(7, 2, '停用', '1', 'sys_normal_disable', NULL, 'danger', 'N', '0', 'admin', '2024-05-17 16:07:16', '', NULL, '停用状态'),(8, 1, '正常', '0', 'sys_job_status', NULL, 'primary', 'Y', '0', 'admin', '2024-05-17 16:07:16', '', NULL, '正常状态'),(9, 2, '暂停', '1', 'sys_job_status', NULL, 'danger', 'N', '0', 'admin', '2024-05-17 16:07:16', '', NULL, '停用状态'),(10, 1, '默认', 'DEFAULT', 'sys_job_group', NULL, NULL, 'Y', '0', 'admin', '2024-05-17 16:07:16', '', NULL, '默认分组'),(11, 2, '系统', 'SYSTEM', 'sys_job_group', NULL, NULL, 'N', '0', 'admin', '2024-05-17 16:07:16', '', NULL, '系统分组'),(12, 1, '是', 'Y', 'sys_yes_no', NULL, 'primary', 'Y', '0', 'admin', '2024-05-17 16:07:16', '', NULL, '系统默认是'),(13, 2, '否', 'N', 'sys_yes_no', NULL, 'danger', 'N', '0', 'admin', '2024-05-17 16:07:16', '', NULL, '系统默认否'),(14, 1, '通知', '1', 'sys_notice_type', NULL, 'warning', 'Y', '0', 'admin', '2024-05-17 16:07:16', '', NULL, '通知'),(15, 2, '公告', '2', 'sys_notice_type', NULL, 'success', 'N', '0', 'admin', '2024-05-17 16:07:16', '', NULL, '公告'),(16, 1, '正常', '0', 'sys_notice_status', NULL, 'primary', 'Y', '0', 'admin', '2024-05-17 16:07:16', '', NULL, '正常状态'),(17, 2, '关闭', '1', 'sys_notice_status', NULL, 'danger', 'N', '0', 'admin', '2024-05-17 16:07:16', '', NULL, '关闭状态'),(18, 99, '其他', '0', 'sys_oper_type', NULL, 'info', 'N', '0', 'admin', '2024-05-17 16:07:16', '', NULL, '其他操作'),(19, 1, '新增', '1', 'sys_oper_type', NULL, 'info', 'N', '0', 'admin', '2024-05-17 16:07:16', '', NULL, '新增操作'),(20, 2, '修改', '2', 'sys_oper_type', NULL, 'info', 'N', '0', 'admin', '2024-05-17 16:07:16', '', NULL, '修改操作'),(21, 3, '删除', '3', 'sys_oper_type', NULL, 'danger', 'N', '0', 'admin', '2024-05-17 16:07:16', '', NULL, '删除操作'),(22, 4, '授权', '4', 'sys_oper_type', NULL, 'primary', 'N', '0', 'admin', '2024-05-17 16:07:16', '', NULL, '授权操作'),(23, 5, '导出', '5', 'sys_oper_type', NULL, 'warning', 'N', '0', 'admin', '2024-05-17 16:07:16', '', NULL, '导出操作'),(24, 6, '导入', '6', 'sys_oper_type', NULL, 'warning', 'N', '0', 'admin', '2024-05-17 16:07:16', '', NULL, '导入操作'),(25, 7, '强退', '7', 'sys_oper_type', NULL, 'danger', 'N', '0', 'admin', '2024-05-17 16:07:16', '', NULL, '强退操作'),(26, 8, '生成代码', '8', 'sys_oper_type', NULL, 'warning', 'N', '0', 'admin', '2024-05-17 16:07:16', '', NULL, '生成操作'),(27, 9, '清空数据', '9', 'sys_oper_type', NULL, 'danger', 'N', '0', 'admin', '2024-05-17 16:07:16', '', NULL, '清空操作'),(28, 1, '成功', '0', 'sys_common_status', NULL, 'primary', 'N', '0', 'admin', '2024-05-17 16:07:16', '', NULL, '正常状态'),(29, 2, '失败', '1', 'sys_common_status', NULL, 'danger', 'N', '0', 'admin', '2024-05-17 16:07:16', '', NULL, '停用状态')
;
UNLOCK TABLES;
COMMIT;
BEGIN;
LOCK TABLES `meimei-prisma`.`sys_dict_type` WRITE;
DELETE FROM `meimei-prisma`.`sys_dict_type`;
INSERT INTO `meimei-prisma`.`sys_dict_type` (`dictId`,`dictName`,`dictType`,`status`,`createBy`,`createTime`,`updateBy`,`updateTime`,`remark`) VALUES (1, '用户性别', 'sys_user_sex', '0', 'admin', '2024-04-18 16:07:17', '', NULL, '用户性别列表'),(2, '菜单状态', 'sys_show_hide', '0', 'admin', '2024-04-18 16:07:17', '', NULL, '菜单状态列表'),(3, '系统开关', 'sys_normal_disable', '0', 'admin', '2024-04-18 16:07:17', '', NULL, '系统开关列表'),(4, '任务状态', 'sys_job_status', '0', 'admin', '2024-04-18 16:07:17', '', NULL, '任务状态列表'),(5, '任务分组', 'sys_job_group', '0', 'admin', '2024-04-18 16:07:17', '', NULL, '任务分组列表'),(6, '系统是否', 'sys_yes_no', '0', 'admin', '2024-04-18 16:07:17', '', NULL, '系统是否列表'),(7, '通知类型', 'sys_notice_type', '0', 'admin', '2024-04-18 16:07:17', '', NULL, '通知类型列表'),(8, '通知状态', 'sys_notice_status', '0', 'admin', '2024-04-18 16:07:17', '', NULL, '通知状态列表'),(9, '操作类型', 'sys_oper_type', '0', 'admin', '2024-04-18 16:07:17', '', NULL, '操作类型列表'),(10, '系统状态', 'sys_common_status', '0', 'admin', '2024-04-18 16:07:17', '', NULL, '登录状态列表')
;
UNLOCK TABLES;
COMMIT;
BEGIN;
LOCK TABLES `meimei-prisma`.`sys_job` WRITE;
DELETE FROM `meimei-prisma`.`sys_job`;
INSERT INTO `meimei-prisma`.`sys_job` (`jobId`,`jobName`,`jobGroup`,`invokeTarget`,`cronExpression`,`misfirePolicy`,`concurrent`,`status`,`createBy`,`createTime`,`updateBy`,`updateTime`,`remark`) VALUES (1, '测试任务', 'DEFAULT', 'JobService.demo(1,2,3,true)', '0/10 * * * * ?', '1', '1', '1', 'admin', '2024-05-17 14:02:53', '', NULL, '')
;
UNLOCK TABLES;
COMMIT;
BEGIN;
LOCK TABLES `meimei-prisma`.`sys_job_log` WRITE;
DELETE FROM `meimei-prisma`.`sys_job_log`;
INSERT INTO `meimei-prisma`.`sys_job_log` (`jobLogId`,`jobName`,`jobGroup`,`invokeTarget`,`jobMessage`,`status`,`exceptionInfo`,`createTime`) VALUES (1, '测试任务', 'DEFAULT', 'JobService.demo(1,2,3,true)', '执行成功', '0', '', '2024-05-17 14:03:05')
;
UNLOCK TABLES;
COMMIT;
BEGIN;
LOCK TABLES `meimei-prisma`.`sys_login_infor` WRITE;
DELETE FROM `meimei-prisma`.`sys_login_infor`;
INSERT INTO `meimei-prisma`.`sys_login_infor` (`infoId`,`userName`,`ipaddr`,`loginLocation`,`browser`,`os`,`status`,`msg`,`loginTime`) VALUES (1, 'admin', '127.0.0.1', '内网IP', 'Edge124', 'Mac OS10.15.7', '1', '用户名或密码错误', '2024-05-17 13:10:19'),(2, 'admin', '127.0.0.1', '内网IP', 'Edge124', 'Mac OS10.15.7', '0', '登录成功', '2024-05-17 13:43:47'),(3, 'meimei', '127.0.0.1', '内网IP', 'Chrome124', 'Mac OS10.15.7', '0', '登录成功', '2024-05-18 02:11:18'),(4, 'admin', '127.0.0.1', '内网IP', 'Chrome124', 'Mac OS10.15.7', '0', '登录成功', '2024-05-18 02:14:01'),(5, 'admin', '127.0.0.1', '内网IP', 'Chrome124', 'Mac OS10.15.7', '0', '登录成功', '2024-05-18 02:16:19'),(6, 'admin', '127.0.0.1', '内网IP', 'Edge124', 'Mac OS10.15.7', '0', '登录成功', '2024-05-18 02:16:28'),(7, 'admin', '127.0.0.1', '内网IP', 'Edge124', 'Mac OS10.15.7', '1', '验证码错误', '2024-05-18 02:16:27'),(8, 'admin', '127.0.0.1', '内网IP', 'Edge124', 'Mac OS10.15.7', '0', '登录成功', '2024-05-18 02:18:01'),(9, 'admin', '127.0.0.1', '内网IP', 'Edge124', 'Mac OS10.15.7', '0', '登录成功', '2024-05-18 02:18:10'),(10, 'admin', '127.0.0.1', '内网IP', 'Edge124', 'Mac OS10.15.7', '0', '登录成功', '2024-05-18 02:18:41'),(11, 'admin', '127.0.0.1', '内网IP', 'Chrome124', 'Mac OS10.15.7', '0', '登录成功', '2024-05-18 02:27:47'),(12, 'admin', '127.0.0.1', '内网IP', 'Edge124', 'Mac OS10.15.7', '0', '登录成功', '2024-05-18 02:28:01'),(13, 'admin', '127.0.0.1', '内网IP', 'Chrome124', 'Mac OS10.15.7', '0', '登录成功', '2024-05-18 02:28:54'),(14, 'admin', '127.0.0.1', '内网IP', 'Edge124', 'Mac OS10.15.7', '0', '登录成功', '2024-05-18 02:29:45')
;
UNLOCK TABLES;
COMMIT;
BEGIN;
LOCK TABLES `meimei-prisma`.`sys_menu` WRITE;
DELETE FROM `meimei-prisma`.`sys_menu`;
INSERT INTO `meimei-prisma`.`sys_menu` (`menuId`,`menuName`,`parentId`,`orderNum`,`path`,`component`,`query`,`isFrame`,`isCache`,`menuType`,`visible`,`status`,`perms`,`icon`,`createBy`,`createTime`,`updateBy`,`updateTime`,`remark`) VALUES (1, '系统管理', NULL, 1, 'system', NULL, NULL, '1', '0', 'M', '0', '0', NULL, 'system', 'admin', '2024-04-18 16:07:17', '', NULL, '系统管理目录'),(2, '系统监控', NULL, 2, 'monitor', NULL, NULL, '1', '0', 'M', '0', '0', NULL, 'monitor', 'admin', '2024-04-18 16:07:17', '', NULL, '系统监控目录'),(3, '系统工具', NULL, 3, 'tool', NULL, NULL, '1', '0', 'M', '0', '1', NULL, 'tool', 'admin', '2024-04-18 16:07:17', 'admin', '2024-05-17 13:57:49', '系统工具目录'),(100, '用户管理', 1, 1, 'user', 'system/user/index', NULL, '1', '0', 'C', '0', '0', 'system:user:list', 'user', 'admin', '2024-04-18 16:07:17', '', NULL, '用户管理菜单'),(101, '角色管理', 1, 2, 'role', 'system/role/index', NULL, '1', '0', 'C', '0', '0', 'system:role:list', 'peoples', 'admin', '2024-04-18 16:07:17', '', NULL, '角色管理菜单'),(102, '菜单管理', 1, 3, 'menu', 'system/menu/index', NULL, '1', '0', 'C', '0', '0', 'system:menu:list', 'tree-table', 'admin', '2024-04-18 16:07:17', '', NULL, '菜单管理菜单'),(103, '部门管理', 1, 4, 'dept', 'system/dept/index', NULL, '1', '0', 'C', '0', '0', 'system:dept:list', 'tree', 'admin', '2024-04-18 16:07:17', '', NULL, '部门管理菜单'),(104, '岗位管理', 1, 5, 'post', 'system/post/index', NULL, '1', '0', 'C', '0', '0', 'system:post:list', 'post', 'admin', '2024-04-18 16:07:17', '', NULL, '岗位管理菜单'),(105, '字典管理', 1, 6, 'dict', 'system/dict/index', NULL, '1', '0', 'C', '0', '0', 'system:dict:list', 'dict', 'admin', '2024-04-18 16:07:17', '', NULL, '字典管理菜单'),(106, '参数设置', 1, 7, 'config', 'system/config/index', NULL, '1', '0', 'C', '0', '0', 'system:config:list', 'edit', 'admin', '2024-04-18 16:07:17', '', NULL, '参数设置菜单'),(107, '通知公告', 1, 8, 'notice', 'system/notice/index', NULL, '1', '0', 'C', '0', '0', 'system:notice:list', 'message', 'admin', '2024-04-18 16:07:17', '', NULL, '通知公告菜单'),(108, '日志管理', 1, 9, 'log', NULL, NULL, '1', '0', 'M', '0', '0', NULL, 'log', 'admin', '2024-04-18 16:07:17', '', NULL, '日志管理菜单'),(109, '在线用户', 2, 1, 'online', 'monitor/online/index', NULL, '1', '0', 'C', '0', '0', 'monitor:online:list', 'online', 'admin', '2024-04-18 16:07:17', '', NULL, '在线用户菜单'),(110, '定时任务', 2, 2, 'job', 'monitor/job/index', NULL, '1', '0', 'C', '0', '0', 'monitor:job:list', 'job', 'admin', '2024-04-18 16:07:17', '', NULL, '定时任务菜单'),(112, '服务监控', 2, 4, 'server', 'monitor/server/index', NULL, '1', '0', 'C', '0', '0', 'monitor:server:list', 'server', 'admin', '2024-04-18 16:07:17', '', NULL, '服务监控菜单'),(113, '缓存监控', 2, 5, 'cache', 'monitor/cache/index', NULL, '1', '0', 'C', '0', '0', 'monitor:cache:list', 'redis', 'admin', '2024-04-18 16:07:17', '', NULL, '缓存监控菜单'),(114, '缓存列表', 2, 6, 'cacheList', 'monitor/cache/list', NULL, '1', '0', 'C', '0', '0', 'monitor:cache:list', 'redis-list', 'admin', '2024-04-18 16:07:17', '', NULL, '缓存列表菜单'),(115, '表单构建', 3, 1, 'build', 'tool/build/index', NULL, '1', '0', 'C', '0', '1', 'tool:build:list', 'build', 'admin', '2024-04-18 16:07:17', 'admin', '2024-05-17 13:57:27', '表单构建菜单'),(116, '代码生成', 3, 2, 'gen', 'tool/gen/index', NULL, '1', '0', 'C', '0', '1', 'tool:gen:list', 'code', 'admin', '2024-04-18 16:07:17', 'admin', '2024-05-17 13:51:22', '代码生成菜单'),(117, '系统接口', 3, 3, 'swagger', 'tool/swagger/index', NULL, '1', '0', 'C', '0', '1', 'tool:swagger:list', 'swagger', 'admin', '2024-04-18 16:07:17', 'admin', '2024-05-17 13:51:28', '系统接口菜单'),(500, '操作日志', 108, 1, 'operlog', 'monitor/operlog/index', NULL, '1', '0', 'C', '0', '0', 'monitor:operlog:list', 'form', 'admin', '2024-04-18 16:07:17', '', NULL, '操作日志菜单'),(501, '登录日志', 108, 2, 'logininfor', 'monitor/logininfor/index', NULL, '1', '0', 'C', '0', '0', 'monitor:logininfor:list', 'logininfor', 'admin', '2024-04-18 16:07:17', '', NULL, '登录日志菜单'),(1000, '用户查询', 100, 1, NULL, NULL, NULL, '1', '0', 'F', '0', '0', 'system:user:query', '#', 'admin', '2024-04-18 16:07:17', '', NULL, NULL),(1001, '用户新增', 100, 2, NULL, NULL, NULL, '1', '0', 'F', '0', '0', 'system:user:add', '#', 'admin', '2024-04-18 16:07:17', '', NULL, NULL),(1002, '用户修改', 100, 3, NULL, NULL, NULL, '1', '0', 'F', '0', '0', 'system:user:edit', '#', 'admin', '2024-04-18 16:07:17', '', NULL, NULL),(1003, '用户删除', 100, 4, NULL, NULL, NULL, '1', '0', 'F', '0', '0', 'system:user:remove', '#', 'admin', '2024-04-18 16:07:17', '', NULL, NULL),(1004, '用户导出', 100, 5, NULL, NULL, NULL, '1', '0', 'F', '0', '0', 'system:user:export', '#', 'admin', '2024-04-18 16:07:17', '', NULL, NULL),(1005, '用户导入', 100, 6, NULL, NULL, NULL, '1', '0', 'F', '0', '0', 'system:user:import', '#', 'admin', '2024-04-18 16:07:17', '', NULL, NULL),(1006, '重置密码', 100, 7, NULL, NULL, NULL, '1', '0', 'F', '0', '0', 'system:user:resetPwd', '#', 'admin', '2024-04-18 16:07:17', '', NULL, NULL),(1007, '角色查询', 101, 1, NULL, NULL, NULL, '1', '0', 'F', '0', '0', 'system:role:query', '#', 'admin', '2024-04-18 16:07:17', '', NULL, NULL),(1008, '角色新增', 101, 2, NULL, NULL, NULL, '1', '0', 'F', '0', '0', 'system:role:add', '#', 'admin', '2024-04-18 16:07:17', '', NULL, NULL),(1009, '角色修改', 101, 3, NULL, NULL, NULL, '1', '0', 'F', '0', '0', 'system:role:edit', '#', 'admin', '2024-04-18 16:07:17', '', NULL, NULL),(1010, '角色删除', 101, 4, NULL, NULL, NULL, '1', '0', 'F', '0', '0', 'system:role:remove', '#', 'admin', '2024-04-18 16:07:17', '', NULL, NULL),(1011, '角色导出', 101, 5, NULL, NULL, NULL, '1', '0', 'F', '0', '0', 'system:role:export', '#', 'admin', '2024-04-18 16:07:17', '', NULL, NULL),(1012, '菜单查询', 102, 1, NULL, NULL, NULL, '1', '0', 'F', '0', '0', 'system:menu:query', '#', 'admin', '2024-04-18 16:07:17', '', NULL, NULL),(1013, '菜单新增', 102, 2, NULL, NULL, NULL, '1', '0', 'F', '0', '0', 'system:menu:add', '#', 'admin', '2024-04-18 16:07:17', '', NULL, NULL),(1014, '菜单修改', 102, 3, NULL, NULL, NULL, '1', '0', 'F', '0', '0', 'system:menu:edit', '#', 'admin', '2024-04-18 16:07:17', '', NULL, NULL),(1015, '菜单删除', 102, 4, NULL, NULL, NULL, '1', '0', 'F', '0', '0', 'system:menu:remove', '#', 'admin', '2024-04-18 16:07:17', '', NULL, NULL),(1016, '部门查询', 103, 1, NULL, NULL, NULL, '1', '0', 'F', '0', '0', 'system:dept:query', '#', 'admin', '2024-04-18 16:07:17', '', NULL, NULL),(1017, '部门新增', 103, 2, NULL, NULL, NULL, '1', '0', 'F', '0', '0', 'system:dept:add', '#', 'admin', '2024-04-18 16:07:17', '', NULL, NULL),(1018, '部门修改', 103, 3, NULL, NULL, NULL, '1', '0', 'F', '0', '0', 'system:dept:edit', '#', 'admin', '2024-04-18 16:07:17', '', NULL, NULL),(1019, '部门删除', 103, 4, NULL, NULL, NULL, '1', '0', 'F', '0', '0', 'system:dept:remove', '#', 'admin', '2024-04-18 16:07:17', '', NULL, NULL),(1020, '岗位查询', 104, 1, NULL, NULL, NULL, '1', '0', 'F', '0', '0', 'system:post:query', '#', 'admin', '2024-04-18 16:07:17', '', NULL, NULL),(1021, '岗位新增', 104, 2, NULL, NULL, NULL, '1', '0', 'F', '0', '0', 'system:post:add', '#', 'admin', '2024-04-18 16:07:17', '', NULL, NULL),(1022, '岗位修改', 104, 3, NULL, NULL, NULL, '1', '0', 'F', '0', '0', 'system:post:edit', '#', 'admin', '2024-04-18 16:07:17', '', NULL, NULL),(1023, '岗位删除', 104, 4, NULL, NULL, NULL, '1', '0', 'F', '0', '0', 'system:post:remove', '#', 'admin', '2024-04-18 16:07:17', '', NULL, NULL),(1024, '岗位导出', 104, 5, NULL, NULL, NULL, '1', '0', 'F', '0', '0', 'system:post:export', '#', 'admin', '2024-04-18 16:07:17', '', NULL, NULL),(1025, '字典查询', 105, 1, '#', NULL, NULL, '1', '0', 'F', '0', '0', 'system:dict:query', '#', 'admin', '2024-04-18 16:07:17', '', NULL, NULL),(1026, '字典新增', 105, 2, '#', NULL, NULL, '1', '0', 'F', '0', '0', 'system:dict:add', '#', 'admin', '2024-04-18 16:07:17', '', NULL, NULL),(1027, '字典修改', 105, 3, '#', NULL, NULL, '1', '0', 'F', '0', '0', 'system:dict:edit', '#', 'admin', '2024-04-18 16:07:17', '', NULL, NULL),(1028, '字典删除', 105, 4, '#', NULL, NULL, '1', '0', 'F', '0', '0', 'system:dict:remove', '#', 'admin', '2024-04-18 16:07:17', '', NULL, NULL),(1029, '字典导出', 105, 5, '#', NULL, NULL, '1', '0', 'F', '0', '0', 'system:dict:export', '#', 'admin', '2024-04-18 16:07:17', '', NULL, NULL),(1030, '参数查询', 106, 1, '#', NULL, NULL, '1', '0', 'F', '0', '0', 'system:config:query', '#', 'admin', '2024-04-18 16:07:17', '', NULL, NULL),(1031, '参数新增', 106, 2, '#', NULL, NULL, '1', '0', 'F', '0', '0', 'system:config:add', '#', 'admin', '2024-04-18 16:07:17', '', NULL, NULL),(1032, '参数修改', 106, 3, '#', NULL, NULL, '1', '0', 'F', '0', '0', 'system:config:edit', '#', 'admin', '2024-04-18 16:07:17', '', NULL, NULL),(1033, '参数删除', 106, 4, '#', NULL, NULL, '1', '0', 'F', '0', '0', 'system:config:remove', '#', 'admin', '2024-04-18 16:07:17', '', NULL, NULL),(1034, '参数导出', 106, 5, '#', NULL, NULL, '1', '0', 'F', '0', '0', 'system:config:export', '#', 'admin', '2024-04-18 16:07:17', '', NULL, NULL),(1035, '公告查询', 107, 1, '#', NULL, NULL, '1', '0', 'F', '0', '0', 'system:notice:query', '#', 'admin', '2024-04-18 16:07:17', '', NULL, NULL),(1036, '公告新增', 107, 2, '#', NULL, NULL, '1', '0', 'F', '0', '0', 'system:notice:add', '#', 'admin', '2024-04-18 16:07:17', '', NULL, NULL),(1037, '公告修改', 107, 3, '#', NULL, NULL, '1', '0', 'F', '0', '0', 'system:notice:edit', '#', 'admin', '2024-04-18 16:07:17', '', NULL, NULL),(1038, '公告删除', 107, 4, '#', NULL, NULL, '1', '0', 'F', '0', '0', 'system:notice:remove', '#', 'admin', '2024-04-18 16:07:17', '', NULL, NULL),(1039, '操作查询', 500, 1, '#', NULL, NULL, '1', '0', 'F', '0', '0', 'monitor:operlog:query', '#', 'admin', '2024-04-18 16:07:17', '', NULL, NULL),(1040, '操作删除', 500, 2, '#', NULL, NULL, '1', '0', 'F', '0', '0', 'monitor:operlog:remove', '#', 'admin', '2024-04-18 16:07:17', '', NULL, NULL),(1041, '日志导出', 500, 3, '#', NULL, NULL, '1', '0', 'F', '0', '0', 'monitor:operlog:export', '#', 'admin', '2024-04-18 16:07:17', '', NULL, NULL),(1042, '登录查询', 501, 1, '#', NULL, NULL, '1', '0', 'F', '0', '0', 'monitor:logininfor:query', '#', 'admin', '2024-04-18 16:07:17', '', NULL, NULL),(1043, '登录删除', 501, 2, '#', NULL, NULL, '1', '0', 'F', '0', '0', 'monitor:logininfor:remove', '#', 'admin', '2024-04-18 16:07:17', '', NULL, NULL),(1044, '日志导出', 501, 3, '#', NULL, NULL, '1', '0', 'F', '0', '0', 'monitor:logininfor:export', '#', 'admin', '2024-04-18 16:07:17', '', NULL, NULL),(1045, '账户解锁', 501, 4, '#', NULL, NULL, '1', '0', 'F', '0', '0', 'monitor:logininfor:unlock', '#', 'admin', '2024-04-18 16:07:17', '', NULL, NULL),(1046, '在线查询', 109, 1, '#', NULL, NULL, '1', '0', 'F', '0', '0', 'monitor:online:query', '#', 'admin', '2024-04-18 16:07:17', '', NULL, NULL),(1047, '批量强退', 109, 2, '#', NULL, NULL, '1', '0', 'F', '0', '0', 'monitor:online:batchLogout', '#', 'admin', '2024-04-18 16:07:17', '', NULL, NULL),(1048, '单条强退', 109, 3, '#', NULL, NULL, '1', '0', 'F', '0', '0', 'monitor:online:forceLogout', '#', 'admin', '2024-04-18 16:07:17', '', NULL, NULL),(1049, '任务查询', 110, 1, '#', NULL, NULL, '1', '0', 'F', '0', '0', 'monitor:job:query', '#', 'admin', '2024-04-18 16:07:17', '', NULL, NULL),(1050, '任务新增', 110, 2, '#', NULL, NULL, '1', '0', 'F', '0', '0', 'monitor:job:add', '#', 'admin', '2024-04-18 16:07:17', '', NULL, NULL),(1051, '任务修改', 110, 3, '#', NULL, NULL, '1', '0', 'F', '0', '0', 'monitor:job:edit', '#', 'admin', '2024-04-18 16:07:17', '', NULL, NULL),(1052, '任务删除', 110, 4, '#', NULL, NULL, '1', '0', 'F', '0', '0', 'monitor:job:remove', '#', 'admin', '2024-04-18 16:07:17', '', NULL, NULL),(1053, '状态修改', 110, 5, '#', NULL, NULL, '1', '0', 'F', '0', '0', 'monitor:job:changeStatus', '#', 'admin', '2024-04-18 16:07:17', '', NULL, NULL),(1054, '任务导出', 110, 6, '#', NULL, NULL, '1', '0', 'F', '0', '0', 'monitor:job:export', '#', 'admin', '2024-04-18 16:07:17', '', NULL, NULL),(1055, '生成查询', 116, 1, '#', NULL, NULL, '1', '0', 'F', '0', '0', 'tool:gen:query', '#', 'admin', '2024-04-18 16:07:17', '', NULL, NULL),(1056, '生成修改', 116, 2, '#', NULL, NULL, '1', '0', 'F', '0', '0', 'tool:gen:edit', '#', 'admin', '2024-04-18 16:07:17', '', NULL, NULL),(1057, '生成删除', 116, 3, '#', NULL, NULL, '1', '0', 'F', '0', '0', 'tool:gen:remove', '#', 'admin', '2024-04-18 16:07:17', '', NULL, NULL),(1058, '导入代码', 116, 4, '#', NULL, NULL, '1', '0', 'F', '0', '0', 'tool:gen:import', '#', 'admin', '2024-04-18 16:07:17', '', NULL, NULL),(1059, '预览代码', 116, 5, '#', NULL, NULL, '1', '0', 'F', '0', '0', 'tool:gen:preview', '#', 'admin', '2024-04-18 16:07:17', '', NULL, NULL),(1060, '生成代码', 116, 6, '#', NULL, NULL, '1', '0', 'F', '0', '0', 'tool:gen:code', '#', 'admin', '2024-04-18 16:07:17', '', NULL, NULL)
;
UNLOCK TABLES;
COMMIT;
BEGIN;
LOCK TABLES `meimei-prisma`.`sys_notice` WRITE;
DELETE FROM `meimei-prisma`.`sys_notice`;
INSERT INTO `meimei-prisma`.`sys_notice` (`noticeId`,`noticeTitle`,`noticeType`,`noticeContent`,`status`,`createBy`,`createTime`,`updateBy`,`updateTime`,`remark`) VALUES (1, '测试一个小公告', '1', 0x3C703EE6B58BE8AF95E4B880E4B88BE585ACE5918A2E2E2E2E2E2020203C2F703E, '0', 'admin', '2024-05-17 13:50:01', '', NULL, NULL)
;
UNLOCK TABLES;
COMMIT;
BEGIN;
LOCK TABLES `meimei-prisma`.`sys_oper_log` WRITE;
DELETE FROM `meimei-prisma`.`sys_oper_log`;
INSERT INTO `meimei-prisma`.`sys_oper_log` (`operId`,`title`,`businessType`,`method`,`requestMethod`,`operatorType`,`operName`,`deptName`,`operUrl`,`operIp`,`operLocation`,`operParam`,`jsonResult`,`status`,`errorMsg`,`operTime`,`costTime`) VALUES (1, '菜单管理', '3', 'SysMenuController.delete()', 'DELETE', 0, 'admin', '研发部门', '/system/menu/4', '127.0.0.1', '内网IP', '{\"params\":{\"menuIds\":\"4\"},\"query\":{},\"body\":{}}', '{\"code\":200,\"msg\":\"操作成功\"}', '0', NULL, '2024-05-17 13:44:03', 323),(2, '菜单管理', '3', 'SysMenuController.delete()', 'DELETE', 0, 'admin', '研发部门', '/system/menu/111', '127.0.0.1', '内网IP', '{\"params\":{\"menuIds\":\"111\"},\"query\":{},\"body\":{}}', '{\"code\":200,\"msg\":\"操作成功\"}', '0', NULL, '2024-05-17 13:44:13', 326),(3, '系统参数', '3', 'SysConfigController.delete()', 'DELETE', 0, 'admin', '研发部门', '/system/config/1,3,5,6', '127.0.0.1', '内网IP', '{\"params\":{\"configIds\":\"1,3,5,6\"},\"query\":{},\"body\":{}}', '{\"code\":200,\"msg\":\"操作成功\"}', '0', NULL, '2024-05-17 13:47:25', 113),(4, '公告管理', '1', 'SysNoticeController.add()', 'POST', 0, 'admin', '研发部门', '/system/notice', '127.0.0.1', '内网IP', NULL, '{\"code\":200,\"msg\":\"操作成功\"}', '0', NULL, '2024-05-17 13:50:01', 260),(5, '菜单管理', '2', 'SysMenuController.uplate()', 'PUT', 0, 'admin', '研发部门', '/system/menu', '127.0.0.1', '内网IP', '{\"params\":{},\"query\":{},\"body\":{\"menuId\":115,\"menuName\":\"表单构建\",\"parentId\":3,\"orderNum\":1,\"path\":\"build\",\"component\":\"tool/build/index\",\"query\":null,\"isFrame\":\"1\",\"isCache\":\"0\",\"menuType\":\"C\",\"visible\":\"0\",\"status\":\"1\",\"perms\":\"tool:build:list\",\"icon\":\"build\",\"createBy\":\"admin\",\"createTime\":\"2024-04-18T16:07:17.000Z\",\"updateBy\":\"\",\"updateTime\":null,\"remark\":\"表单构建菜单\"}}', '{\"code\":200,\"msg\":\"操作成功\"}', '0', NULL, '2024-05-17 13:51:17', 361),(6, '菜单管理', '2', 'SysMenuController.uplate()', 'PUT', 0, 'admin', '研发部门', '/system/menu', '127.0.0.1', '内网IP', '{\"params\":{},\"query\":{},\"body\":{\"menuId\":116,\"menuName\":\"代码生成\",\"parentId\":3,\"orderNum\":2,\"path\":\"gen\",\"component\":\"tool/gen/index\",\"query\":null,\"isFrame\":\"1\",\"isCache\":\"0\",\"menuType\":\"C\",\"visible\":\"0\",\"status\":\"1\",\"perms\":\"tool:gen:list\",\"icon\":\"code\",\"createBy\":\"admin\",\"createTime\":\"2024-04-18T16:07:17.000Z\",\"updateBy\":\"\",\"updateTime\":null,\"remark\":\"代码生成菜单\"}}', '{\"code\":200,\"msg\":\"操作成功\"}', '0', NULL, '2024-05-17 13:51:22', 350),(7, '菜单管理', '2', 'SysMenuController.uplate()', 'PUT', 0, 'admin', '研发部门', '/system/menu', '127.0.0.1', '内网IP', '{\"params\":{},\"query\":{},\"body\":{\"menuId\":117,\"menuName\":\"系统接口\",\"parentId\":3,\"orderNum\":3,\"path\":\"swagger\",\"component\":\"tool/swagger/index\",\"query\":null,\"isFrame\":\"1\",\"isCache\":\"0\",\"menuType\":\"C\",\"visible\":\"0\",\"status\":\"1\",\"perms\":\"tool:swagger:list\",\"icon\":\"swagger\",\"createBy\":\"admin\",\"createTime\":\"2024-04-18T16:07:17.000Z\",\"updateBy\":\"\",\"updateTime\":null,\"remark\":\"系统接口菜单\"}}', '{\"code\":200,\"msg\":\"操作成功\"}', '0', NULL, '2024-05-17 13:51:28', 249),(8, '菜单管理', '2', 'SysMenuController.uplate()', 'PUT', 0, 'admin', '研发部门', '/system/menu', '127.0.0.1', '内网IP', '{\"params\":{},\"query\":{},\"body\":{\"menuId\":3,\"menuName\":\"系统工具\",\"parentId\":0,\"orderNum\":3,\"path\":\"tool\",\"component\":null,\"query\":null,\"isFrame\":\"1\",\"isCache\":\"0\",\"menuType\":\"M\",\"visible\":\"0\",\"status\":\"1\",\"perms\":null,\"icon\":\"tool\",\"createBy\":\"admin\",\"createTime\":\"2024-04-18T16:07:17.000Z\",\"updateBy\":\"\",\"updateTime\":null,\"remark\":\"系统工具目录\"}}', '{\"code\":200,\"msg\":\"操作成功\"}', '0', NULL, '2024-05-17 13:51:32', 247),(9, '菜单管理', '2', 'SysMenuController.uplate()', 'PUT', 0, 'admin', '研发部门', '/system/menu', '127.0.0.1', '内网IP', '{\"params\":{},\"query\":{},\"body\":{\"menuId\":3,\"menuName\":\"系统工具\",\"parentId\":0,\"orderNum\":3,\"path\":\"tool\",\"component\":null,\"query\":null,\"isFrame\":\"1\",\"isCache\":\"0\",\"menuType\":\"M\",\"visible\":\"0\",\"status\":\"0\",\"perms\":null,\"icon\":\"tool\",\"createBy\":\"admin\",\"createTime\":\"2024-04-18T16:07:17.000Z\",\"updateBy\":\"admin\",\"updateTime\":\"2024-05-17T13:51:31.000Z\",\"remark\":\"系统工具目录\"}}', '{\"code\":200,\"msg\":\"操作成功\"}', '0', NULL, '2024-05-17 13:51:41', 214),(10, '菜单管理', '2', 'SysMenuController.uplate()', 'PUT', 0, 'admin', '研发部门', '/system/menu', '127.0.0.1', '内网IP', '{\"params\":{},\"query\":{},\"body\":{\"menuId\":3,\"menuName\":\"系统工具\",\"parentId\":0,\"orderNum\":3,\"path\":\"tool\",\"component\":null,\"query\":null,\"isFrame\":\"1\",\"isCache\":\"0\",\"menuType\":\"M\",\"visible\":\"0\",\"status\":\"1\",\"perms\":null,\"icon\":\"tool\",\"createBy\":\"admin\",\"createTime\":\"2024-04-18T16:07:17.000Z\",\"updateBy\":\"admin\",\"updateTime\":\"2024-05-17T13:51:40.000Z\",\"remark\":\"系统工具目录\"}}', '{\"code\":200,\"msg\":\"操作成功\"}', '0', NULL, '2024-05-17 13:51:44', 213),(11, '菜单管理', '2', 'SysMenuController.uplate()', 'PUT', 0, 'admin', '研发部门', '/system/menu', '127.0.0.1', '内网IP', '{\"params\":{},\"query\":{},\"body\":{\"menuId\":115,\"menuName\":\"表单构建\",\"parentId\":3,\"orderNum\":1,\"path\":\"build\",\"component\":\"tool/build/index\",\"query\":null,\"isFrame\":\"1\",\"isCache\":\"0\",\"menuType\":\"C\",\"visible\":\"0\",\"status\":\"0\",\"perms\":\"tool:build:list\",\"icon\":\"build\",\"createBy\":\"admin\",\"createTime\":\"2024-04-18T16:07:17.000Z\",\"updateBy\":\"admin\",\"updateTime\":\"2024-05-17T13:51:17.000Z\",\"remark\":\"表单构建菜单\"}}', '{\"code\":200,\"msg\":\"操作成功\"}', '0', NULL, '2024-05-17 13:51:50', 249),(12, '菜单管理', '2', 'SysMenuController.uplate()', 'PUT', 0, 'admin', '研发部门', '/system/menu', '127.0.0.1', '内网IP', '{\"params\":{},\"query\":{},\"body\":{\"menuId\":3,\"menuName\":\"系统工具\",\"parentId\":0,\"orderNum\":3,\"path\":\"tool\",\"component\":null,\"query\":null,\"isFrame\":\"1\",\"isCache\":\"0\",\"menuType\":\"M\",\"visible\":\"0\",\"status\":\"1\",\"perms\":null,\"icon\":\"tool\",\"createBy\":\"admin\",\"createTime\":\"2024-04-18T16:07:17.000Z\",\"updateBy\":\"admin\",\"updateTime\":\"2024-05-17T13:51:44.000Z\",\"remark\":\"系统工具目录\"}}', '{\"code\":500,\"msg\":\"该菜单下存在其他正在使用的菜单，无法停用！\"}', '1', '该菜单下存在其他正在使用的菜单，无法停用！', '2024-05-17 13:57:15', 174),(13, '菜单管理', '2', 'SysMenuController.uplate()', 'PUT', 0, 'admin', '研发部门', '/system/menu', '127.0.0.1', '内网IP', '{\"params\":{},\"query\":{},\"body\":{\"menuId\":115,\"menuName\":\"表单构建\",\"parentId\":3,\"orderNum\":1,\"path\":\"build\",\"component\":\"tool/build/index\",\"query\":null,\"isFrame\":\"1\",\"isCache\":\"0\",\"menuType\":\"C\",\"visible\":\"0\",\"status\":\"1\",\"perms\":\"tool:build:list\",\"icon\":\"build\",\"createBy\":\"admin\",\"createTime\":\"2024-04-18T16:07:17.000Z\",\"updateBy\":\"admin\",\"updateTime\":\"2024-05-17T13:51:50.000Z\",\"remark\":\"表单构建菜单\"}}', '{\"code\":200,\"msg\":\"操作成功\"}', '0', NULL, '2024-05-17 13:57:27', 442),(14, '菜单管理', '2', 'SysMenuController.uplate()', 'PUT', 0, 'admin', '研发部门', '/system/menu', '127.0.0.1', '内网IP', '{\"params\":{},\"query\":{},\"body\":{\"menuId\":3,\"menuName\":\"系统工具\",\"parentId\":0,\"orderNum\":3,\"path\":\"tool\",\"component\":null,\"query\":null,\"isFrame\":\"1\",\"isCache\":\"0\",\"menuType\":\"M\",\"visible\":\"0\",\"status\":\"1\",\"perms\":null,\"icon\":\"tool\",\"createBy\":\"admin\",\"createTime\":\"2024-04-18T16:07:17.000Z\",\"updateBy\":\"admin\",\"updateTime\":\"2024-05-17T13:51:44.000Z\",\"remark\":\"系统工具目录\"}}', '{\"code\":200,\"msg\":\"操作成功\"}', '0', NULL, '2024-05-17 13:57:49', 292),(15, '用户管理', '2', 'SysUserController.uplate()', 'PUT', 0, 'admin', '研发部门', '/system/user', '127.0.0.1', '内网IP', '{\"params\":{},\"query\":{},\"body\":{\"userId\":2,\"avatar\":null,\"createBy\":\"admin\",\"createTime\":\"2024-04-18T16:07:16.000Z\",\"delFlag\":\"0\",\"deptId\":105,\"email\":\"87789771@qq.com\",\"loginDate\":null,\"loginIp\":\"\",\"nickName\":\"槑槑\",\"password\":\"$2b$10$eOA3TW08QKta3zRSlhY6f.RXnOuzDwM0OGWAYh8zwVYMFwCkF.dme\",\"phonenumber\":\"15666666666\",\"remark\":\"测试员\",\"sex\":\"1\",\"status\":\"0\",\"updateBy\":\"\",\"updateTime\":null,\"userName\":\"meimei\",\"userType\":\"00\",\"dept\":{\"deptId\":105,\"parentId\":101,\"ancestors\":\",100,101,105,\",\"deptName\":\"测试部门\",\"orderNum\":3,\"leader\":\"若依\",\"phone\":\"15888888888\",\"email\":\"ry@qq.com\",\"status\":\"0\",\"delFlag\":\"0\",\"createBy\":\"admin\",\"createTime\":\"2024-04-18T16:07:16.000Z\",\"updateBy\":\"\",\"updateTime\":null},\"posts\":[],\"roles\":[{\"roleId\":2,\"createBy\":\"admin\",\"createTime\":\"2024-04-18T16:07:17.000Z\",\"dataScope\":\"2\",\"delFlag\":\"0\",\"deptCheckStrictly\":true,\"menuCheckStrictly\":true,\"remark\":\"普通角色\",\"roleKey\":\"common\",\"roleName\":\"普通角色\",\"roleSort\":2,\"status\":\"0\",\"updateBy\":\"\",\"updateTime\":null}],\"postIds\":[],\"roleIds\":[2]}}', '{\"code\":200,\"msg\":\"操作成功\"}', '0', NULL, '2024-05-18 02:16:38', 771)
;
UNLOCK TABLES;
COMMIT;
BEGIN;
LOCK TABLES `meimei-prisma`.`sys_post` WRITE;
DELETE FROM `meimei-prisma`.`sys_post`;
INSERT INTO `meimei-prisma`.`sys_post` (`postId`,`postCode`,`postName`,`postSort`,`status`,`createBy`,`createTime`,`updateBy`,`updateTime`,`remark`) VALUES (1, 'ceo', '董事长', 1, '0', 'admin', '2024-04-18 16:07:16', '', NULL, NULL),(2, 'se', '项目经理', 2, '0', 'admin', '2024-04-18 16:07:16', '', NULL, NULL),(3, 'hr', '人力资源', 3, '0', 'admin', '2024-04-18 16:07:16', '', NULL, NULL),(4, 'user', '普通员工', 4, '0', 'admin', '2024-04-18 16:07:16', '', NULL, NULL)
;
UNLOCK TABLES;
COMMIT;
BEGIN;
LOCK TABLES `meimei-prisma`.`sys_role` WRITE;
DELETE FROM `meimei-prisma`.`sys_role`;
INSERT INTO `meimei-prisma`.`sys_role` (`roleId`,`createBy`,`createTime`,`dataScope`,`delFlag`,`deptCheckStrictly`,`menuCheckStrictly`,`remark`,`roleKey`,`roleName`,`roleSort`,`status`,`updateBy`,`updateTime`) VALUES (1, 'admin', '2024-05-17 16:07:16', '1', '0', 1, 1, '超级管理员', 'admin', '超级管理员', 1, '0', '', NULL),(2, 'admin', '2024-05-17 16:07:16', '2', '0', 1, 1, '普通角色', 'common', '普通角色', 2, '0', '', NULL)
;
UNLOCK TABLES;
COMMIT;
BEGIN;
LOCK TABLES `meimei-prisma`.`sys_table` WRITE;
DELETE FROM `meimei-prisma`.`sys_table`;
INSERT INTO `meimei-prisma`.`sys_table` (`tableId`,`createBy`,`createTime`,`updateBy`,`updateTime`,`tableJsonConfig`) VALUES ('system_user_1', 'admin', '2024-05-17 14:11:38', '', NULL, '[{\"minWidth\":40,\"showOverflowTooltip\":false,\"align\":\"center\",\"hide\":false,\"noExport\":false,\"sort\":0,\"prop\":\"勾选框\",\"label\":\"勾选框\",\"type\":\"selection\"},{\"minWidth\":100,\"showOverflowTooltip\":true,\"align\":\"center\",\"hide\":false,\"noExport\":false,\"sort\":1,\"prop\":\"userId\",\"label\":\"用户编号\"},{\"minWidth\":100,\"showOverflowTooltip\":true,\"align\":\"left\",\"hide\":false,\"noExport\":false,\"sort\":2,\"prop\":\"userName\",\"label\":\"用户名称\"},{\"minWidth\":100,\"showOverflowTooltip\":true,\"align\":\"left\",\"hide\":false,\"noExport\":false,\"sort\":3,\"prop\":\"nickName\",\"label\":\"用户昵称\"},{\"minWidth\":140,\"showOverflowTooltip\":true,\"align\":\"left\",\"hide\":false,\"noExport\":false,\"sort\":4,\"prop\":\"dept.deptName\",\"label\":\"部门\"},{\"minWidth\":80,\"showOverflowTooltip\":true,\"align\":\"center\",\"hide\":false,\"noExport\":false,\"sort\":5,\"prop\":\"status\",\"label\":\"状态\",\"slot\":\"status\"},{\"minWidth\":160,\"showOverflowTooltip\":true,\"align\":\"center\",\"hide\":false,\"noExport\":false,\"sort\":6,\"prop\":\"createTime\",\"label\":\"创建时间\",\"slot\":\"createTime\"},{\"minWidth\":160,\"showOverflowTooltip\":false,\"align\":\"center\",\"hide\":false,\"noExport\":false,\"sort\":7,\"prop\":\"操作\",\"label\":\"操作\",\"slot\":\"operate\"}]')
;
UNLOCK TABLES;
COMMIT;
BEGIN;
LOCK TABLES `meimei-prisma`.`sys_user` WRITE;
DELETE FROM `meimei-prisma`.`sys_user`;
INSERT INTO `meimei-prisma`.`sys_user` (`userId`,`avatar`,`createBy`,`createTime`,`delFlag`,`deptId`,`email`,`loginDate`,`loginIp`,`nickName`,`password`,`phonenumber`,`remark`,`sex`,`status`,`updateBy`,`updateTime`,`userName`,`userType`) VALUES (1, NULL, 'admin', '2024-05-17 16:07:16', '0', 103, '87789771@qq.com', NULL, '', '小蒋', '$2b$10$dfDByASRziLltpJ9OQ8cTuSeaz3Kqv.BR1MWQoQ1bR3UfgEKYE0w6', '15888888888', '管理员', '1', '0', 'admin', NULL, 'admin', '00'),(2, NULL, 'admin', '2024-05-17 16:07:16', '0', 105, '87789771@qq.com', NULL, '', '槑槑', '$2b$10$eOA3TW08QKta3zRSlhY6f.RXnOuzDwM0OGWAYh8zwVYMFwCkF.dme', '15666666666', '测试员', '1', '0', 'admin', '2024-05-18 02:16:37', 'meimei', '00')
;
UNLOCK TABLES;
COMMIT;
BEGIN;
LOCK TABLES `meimei-prisma`.`sys_web` WRITE;
DELETE FROM `meimei-prisma`.`sys_web`;
UNLOCK TABLES;
COMMIT;
