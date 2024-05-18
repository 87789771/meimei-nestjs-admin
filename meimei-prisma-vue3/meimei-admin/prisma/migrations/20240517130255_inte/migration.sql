-- CreateTable
CREATE TABLE `sys_web` (
    `webId` INTEGER NOT NULL AUTO_INCREMENT,
    `theme` VARCHAR(50) NULL DEFAULT '#409EFF',
    `sideTheme` VARCHAR(50) NULL DEFAULT '',
    `topNav` BOOLEAN NULL,
    `tagsView` BOOLEAN NULL,
    `fixedHeader` BOOLEAN NULL,
    `sidebarLogo` BOOLEAN NULL,
    `dynamicTitle` BOOLEAN NULL,
    `createBy` VARCHAR(64) NOT NULL,
    `createTime` DATETIME NULL,
    `updateBy` VARCHAR(64) NULL DEFAULT '',
    `updateTime` DATETIME NULL,

    UNIQUE INDEX `sys_web_createBy_key`(`createBy`),
    PRIMARY KEY (`webId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sys_table` (
    `tableId` VARCHAR(100) NOT NULL,
    `createBy` VARCHAR(64) NOT NULL,
    `createTime` DATETIME NULL,
    `updateBy` VARCHAR(64) NULL DEFAULT '',
    `updateTime` DATETIME NULL,
    `tableJsonConfig` TEXT NULL,

    PRIMARY KEY (`tableId`, `createBy`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sys_config` (
    `configId` INTEGER NOT NULL AUTO_INCREMENT,
    `configName` VARCHAR(100) NULL DEFAULT '',
    `configKey` VARCHAR(100) NULL,
    `configValue` VARCHAR(500) NULL DEFAULT '',
    `configType` CHAR(1) NULL DEFAULT 'N',
    `createBy` VARCHAR(64) NULL DEFAULT '',
    `createTime` DATETIME NULL,
    `updateBy` VARCHAR(64) NULL DEFAULT '',
    `updateTime` DATETIME NULL,
    `remark` VARCHAR(500) NULL,

    UNIQUE INDEX `sys_config_configKey_key`(`configKey`),
    PRIMARY KEY (`configId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sys_dept` (
    `deptId` INTEGER NOT NULL AUTO_INCREMENT,
    `parentId` INTEGER NULL,
    `ancestors` VARCHAR(50) NOT NULL DEFAULT '',
    `deptName` VARCHAR(30) NULL DEFAULT '',
    `orderNum` INTEGER NULL DEFAULT 0,
    `leader` VARCHAR(20) NULL,
    `phone` VARCHAR(11) NULL,
    `email` VARCHAR(50) NULL,
    `status` CHAR(1) NULL DEFAULT '0',
    `delFlag` CHAR(1) NULL DEFAULT '0',
    `createBy` VARCHAR(64) NULL DEFAULT '',
    `createTime` DATETIME NULL,
    `updateBy` VARCHAR(64) NULL DEFAULT '',
    `updateTime` DATETIME NULL,

    PRIMARY KEY (`deptId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sys_dict_data` (
    `dictCode` INTEGER NOT NULL AUTO_INCREMENT,
    `dictSort` INTEGER NULL DEFAULT 0,
    `dictLabel` VARCHAR(100) NULL DEFAULT '',
    `dictValue` VARCHAR(100) NULL DEFAULT '',
    `dictType` VARCHAR(100) NULL DEFAULT '',
    `cssClass` VARCHAR(100) NULL,
    `listClass` VARCHAR(100) NULL,
    `isDefault` CHAR(1) NULL DEFAULT 'N',
    `status` CHAR(1) NULL DEFAULT '0',
    `createBy` VARCHAR(64) NULL DEFAULT '',
    `createTime` DATETIME NULL,
    `updateBy` VARCHAR(64) NULL DEFAULT '',
    `updateTime` DATETIME NULL,
    `remark` VARCHAR(500) NULL,

    INDEX `sys_dict_data_dictType_fkey`(`dictType`),
    PRIMARY KEY (`dictCode`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sys_dict_type` (
    `dictId` INTEGER NOT NULL AUTO_INCREMENT,
    `dictName` VARCHAR(100) NULL DEFAULT '',
    `dictType` VARCHAR(100) NULL DEFAULT '',
    `status` CHAR(1) NULL DEFAULT '0',
    `createBy` VARCHAR(64) NULL DEFAULT '',
    `createTime` DATETIME NULL,
    `updateBy` VARCHAR(64) NULL DEFAULT '',
    `updateTime` DATETIME NULL,
    `remark` VARCHAR(500) NULL,

    UNIQUE INDEX `dictType`(`dictType`),
    PRIMARY KEY (`dictId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sys_job` (
    `jobId` INTEGER NOT NULL AUTO_INCREMENT,
    `jobName` VARCHAR(64) NOT NULL DEFAULT '',
    `jobGroup` VARCHAR(64) NOT NULL DEFAULT 'DEFAULT',
    `invokeTarget` VARCHAR(500) NOT NULL,
    `cronExpression` VARCHAR(255) NULL DEFAULT '',
    `misfirePolicy` VARCHAR(20) NULL DEFAULT '3',
    `concurrent` CHAR(1) NULL DEFAULT '1',
    `status` CHAR(1) NULL DEFAULT '0',
    `createBy` VARCHAR(64) NULL DEFAULT '',
    `createTime` DATETIME NULL,
    `updateBy` VARCHAR(64) NULL DEFAULT '',
    `updateTime` DATETIME NULL,
    `remark` VARCHAR(500) NULL DEFAULT '',

    PRIMARY KEY (`jobId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sys_job_log` (
    `jobLogId` INTEGER NOT NULL AUTO_INCREMENT,
    `jobName` VARCHAR(64) NOT NULL,
    `jobGroup` VARCHAR(64) NOT NULL,
    `invokeTarget` VARCHAR(500) NOT NULL,
    `jobMessage` VARCHAR(500) NULL,
    `status` CHAR(1) NULL DEFAULT '0',
    `exceptionInfo` VARCHAR(2000) NULL DEFAULT '',
    `createTime` DATETIME NULL,

    PRIMARY KEY (`jobLogId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sys_login_infor` (
    `infoId` INTEGER NOT NULL AUTO_INCREMENT,
    `userName` VARCHAR(50) NULL DEFAULT '',
    `ipaddr` VARCHAR(128) NULL DEFAULT '',
    `loginLocation` VARCHAR(255) NULL DEFAULT '',
    `browser` VARCHAR(50) NULL DEFAULT '',
    `os` VARCHAR(50) NULL DEFAULT '',
    `status` CHAR(1) NULL DEFAULT '0',
    `msg` VARCHAR(255) NULL DEFAULT '',
    `loginTime` DATETIME NULL,

    INDEX `idxSysLogininforLt`(`loginTime`),
    INDEX `idxSysLogininforS`(`status`),
    PRIMARY KEY (`infoId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sys_menu` (
    `menuId` INTEGER NOT NULL AUTO_INCREMENT,
    `menuName` VARCHAR(50) NOT NULL,
    `parentId` INTEGER NULL,
    `orderNum` INTEGER NULL DEFAULT 0,
    `path` VARCHAR(200) NULL DEFAULT '',
    `component` VARCHAR(255) NULL,
    `query` VARCHAR(255) NULL,
    `isFrame` CHAR(1) NULL DEFAULT '1',
    `isCache` CHAR(1) NULL DEFAULT '0',
    `menuType` CHAR(1) NULL DEFAULT '',
    `visible` CHAR(1) NULL DEFAULT '0',
    `status` CHAR(1) NULL DEFAULT '0',
    `perms` VARCHAR(100) NULL,
    `icon` VARCHAR(100) NULL DEFAULT '#',
    `createBy` VARCHAR(64) NULL DEFAULT '',
    `createTime` DATETIME NULL,
    `updateBy` VARCHAR(64) NULL DEFAULT '',
    `updateTime` DATETIME NULL,
    `remark` VARCHAR(500) NULL DEFAULT '',

    PRIMARY KEY (`menuId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sys_notice` (
    `noticeId` INTEGER NOT NULL AUTO_INCREMENT,
    `noticeTitle` VARCHAR(50) NOT NULL,
    `noticeType` CHAR(1) NOT NULL,
    `noticeContent` LONGBLOB NULL,
    `status` CHAR(1) NULL DEFAULT '0',
    `createBy` VARCHAR(64) NULL DEFAULT '',
    `createTime` DATETIME NULL,
    `updateBy` VARCHAR(64) NULL DEFAULT '',
    `updateTime` DATETIME NULL,
    `remark` VARCHAR(255) NULL,

    PRIMARY KEY (`noticeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sys_oper_log` (
    `operId` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(50) NULL DEFAULT '',
    `businessType` CHAR(2) NULL DEFAULT '0',
    `method` VARCHAR(100) NULL DEFAULT '',
    `requestMethod` VARCHAR(10) NULL DEFAULT '',
    `operatorType` INTEGER NULL DEFAULT 0,
    `operName` VARCHAR(50) NULL DEFAULT '',
    `deptName` VARCHAR(50) NULL DEFAULT '',
    `operUrl` VARCHAR(255) NULL DEFAULT '',
    `operIp` VARCHAR(128) NULL DEFAULT '',
    `operLocation` VARCHAR(255) NULL DEFAULT '',
    `operParam` TEXT NULL,
    `jsonResult` TEXT NULL,
    `status` CHAR(1) NULL DEFAULT '0',
    `errorMsg` TEXT NULL,
    `operTime` DATETIME NULL,
    `costTime` INTEGER NULL DEFAULT 0,

    INDEX `idxSysOperLogBt`(`businessType`),
    INDEX `idxSysOperLogOt`(`operTime`),
    INDEX `idxSysOperLogS`(`status`),
    PRIMARY KEY (`operId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sys_post` (
    `postId` INTEGER NOT NULL AUTO_INCREMENT,
    `postCode` VARCHAR(64) NOT NULL,
    `postName` VARCHAR(50) NOT NULL,
    `postSort` INTEGER NOT NULL,
    `status` CHAR(1) NOT NULL,
    `createBy` VARCHAR(64) NULL DEFAULT '',
    `createTime` DATETIME NULL,
    `updateBy` VARCHAR(64) NULL DEFAULT '',
    `updateTime` DATETIME NULL,
    `remark` VARCHAR(500) NULL,

    UNIQUE INDEX `sys_post_postCode_key`(`postCode`),
    PRIMARY KEY (`postId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sys_role` (
    `roleId` INTEGER NOT NULL AUTO_INCREMENT,
    `createBy` VARCHAR(64) NULL DEFAULT '',
    `createTime` DATETIME NULL,
    `dataScope` CHAR(4) NULL DEFAULT '4',
    `delFlag` CHAR(1) NULL DEFAULT '0',
    `deptCheckStrictly` BOOLEAN NULL DEFAULT true,
    `menuCheckStrictly` BOOLEAN NULL DEFAULT true,
    `remark` VARCHAR(500) NULL,
    `roleKey` VARCHAR(100) NOT NULL,
    `roleName` VARCHAR(30) NOT NULL,
    `roleSort` INTEGER NOT NULL,
    `status` CHAR(1) NOT NULL,
    `updateBy` VARCHAR(64) NULL DEFAULT '',
    `updateTime` DATETIME NULL,

    PRIMARY KEY (`roleId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sys_user` (
    `userId` INTEGER NOT NULL AUTO_INCREMENT,
    `avatar` VARCHAR(100) NULL DEFAULT '',
    `createBy` VARCHAR(64) NULL DEFAULT '',
    `createTime` DATETIME NULL,
    `delFlag` CHAR(1) NULL DEFAULT '0',
    `deptId` INTEGER NULL,
    `email` VARCHAR(50) NULL DEFAULT '',
    `loginDate` DATETIME NULL,
    `loginIp` VARCHAR(128) NULL DEFAULT '',
    `nickName` VARCHAR(30) NOT NULL,
    `password` VARCHAR(100) NULL DEFAULT '',
    `phonenumber` VARCHAR(11) NULL DEFAULT '',
    `remark` VARCHAR(500) NULL,
    `sex` CHAR(1) NULL DEFAULT '0',
    `status` CHAR(1) NULL DEFAULT '0',
    `updateBy` VARCHAR(64) NULL DEFAULT '',
    `updateTime` DATETIME NULL,
    `userName` VARCHAR(30) NOT NULL,
    `userType` VARCHAR(2) NULL DEFAULT '00',

    UNIQUE INDEX `sys_user_userName_key`(`userName`),
    INDEX `sys_user_deptId_fkey`(`deptId`),
    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_sys_dept_to_sys_role` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_sys_dept_to_sys_role_AB_unique`(`A`, `B`),
    INDEX `_sys_dept_to_sys_role_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_sys_menu_to_sys_role` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_sys_menu_to_sys_role_AB_unique`(`A`, `B`),
    INDEX `_sys_menu_to_sys_role_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_sys_post_to_sys_user` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_sys_post_to_sys_user_AB_unique`(`A`, `B`),
    INDEX `_sys_post_to_sys_user_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_sys_role_to_sys_user` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_sys_role_to_sys_user_AB_unique`(`A`, `B`),
    INDEX `_sys_role_to_sys_user_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `sys_dept` ADD CONSTRAINT `sys_dept_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `sys_dept`(`deptId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sys_dict_data` ADD CONSTRAINT `sys_dict_data_dictType_fkey` FOREIGN KEY (`dictType`) REFERENCES `sys_dict_type`(`dictType`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sys_menu` ADD CONSTRAINT `sys_menu_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `sys_menu`(`menuId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sys_user` ADD CONSTRAINT `sys_user_deptId_fkey` FOREIGN KEY (`deptId`) REFERENCES `sys_dept`(`deptId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_sys_dept_to_sys_role` ADD CONSTRAINT `_sys_dept_to_sys_role_A_fkey` FOREIGN KEY (`A`) REFERENCES `sys_dept`(`deptId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_sys_dept_to_sys_role` ADD CONSTRAINT `_sys_dept_to_sys_role_B_fkey` FOREIGN KEY (`B`) REFERENCES `sys_role`(`roleId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_sys_menu_to_sys_role` ADD CONSTRAINT `_sys_menu_to_sys_role_A_fkey` FOREIGN KEY (`A`) REFERENCES `sys_menu`(`menuId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_sys_menu_to_sys_role` ADD CONSTRAINT `_sys_menu_to_sys_role_B_fkey` FOREIGN KEY (`B`) REFERENCES `sys_role`(`roleId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_sys_post_to_sys_user` ADD CONSTRAINT `_sys_post_to_sys_user_A_fkey` FOREIGN KEY (`A`) REFERENCES `sys_post`(`postId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_sys_post_to_sys_user` ADD CONSTRAINT `_sys_post_to_sys_user_B_fkey` FOREIGN KEY (`B`) REFERENCES `sys_user`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_sys_role_to_sys_user` ADD CONSTRAINT `_sys_role_to_sys_user_A_fkey` FOREIGN KEY (`A`) REFERENCES `sys_role`(`roleId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_sys_role_to_sys_user` ADD CONSTRAINT `_sys_role_to_sys_user_B_fkey` FOREIGN KEY (`B`) REFERENCES `sys_user`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;
