/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 80403 (8.4.3)
 Source Host           : localhost:3306
 Source Schema         : meimei

 Target Server Type    : MySQL
 Target Server Version : 80403 (8.4.3)
 File Encoding         : 65001

 Date: 25/11/2024 23:48:17
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for biz_nav_category
-- ----------------------------
DROP TABLE IF EXISTS `biz_nav_category`;
CREATE TABLE `biz_nav_category`  (
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `update_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `create_by` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '' COMMENT '创建人',
  `update_by` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '' COMMENT '更新人',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '' COMMENT '备注',
  `version` int NOT NULL COMMENT '版本号',
  `id` int NOT NULL AUTO_INCREMENT COMMENT '分类ID',
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '分类名称和图标',
  `sort` int NOT NULL DEFAULT 0 COMMENT '排序',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of biz_nav_category
-- ----------------------------
INSERT INTO `biz_nav_category` VALUES ('2024-11-25 15:44:38.329114', '2024-11-25 15:44:38.329114', 'system', 'system', '', 1, 1, '🤖 AI 工具', 0);
INSERT INTO `biz_nav_category` VALUES ('2024-11-25 15:44:38.329114', '2024-11-25 15:44:38.329114', 'system', 'system', '', 1, 2, '👥 社区资讯', 1);
INSERT INTO `biz_nav_category` VALUES ('2024-11-25 15:44:38.329114', '2024-11-25 15:44:38.329114', 'system', 'system', '', 1, 3, '🎨 设计资源', 2);
INSERT INTO `biz_nav_category` VALUES ('2024-11-25 15:44:38.329114', '2024-11-25 15:44:38.329114', 'system', 'system', '', 1, 4, '🔧 开发工具', 3);
INSERT INTO `biz_nav_category` VALUES ('2024-11-25 15:44:38.329114', '2024-11-25 15:44:38.329114', 'system', 'system', '', 1, 5, '📚 学习平台', 4);
INSERT INTO `biz_nav_category` VALUES ('2024-11-25 15:44:38.329114', '2024-11-25 15:44:38.329114', 'system', 'system', '', 1, 6, '⚡ 效率工具', 5);
INSERT INTO `biz_nav_category` VALUES ('2024-11-25 15:44:38.329114', '2024-11-25 15:44:38.329114', 'system', 'system', '', 1, 7, '📖 阅读资源', 6);
INSERT INTO `biz_nav_category` VALUES ('2024-11-25 15:44:38.329114', '2024-11-25 15:44:38.329114', 'system', 'system', '', 1, 8, '💻 前端开发', 7);
INSERT INTO `biz_nav_category` VALUES ('2024-11-25 15:44:38.329114', '2024-11-25 15:44:38.329114', 'system', 'system', '', 1, 9, '🔋 后端开发', 8);
INSERT INTO `biz_nav_category` VALUES ('2024-11-25 15:44:38.329114', '2024-11-25 15:44:38.329114', 'system', 'system', '', 1, 10, '📱 移动开发', 9);

-- ----------------------------
-- Table structure for biz_nav_website
-- ----------------------------
DROP TABLE IF EXISTS `biz_nav_website`;
CREATE TABLE `biz_nav_website`  (
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `update_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `create_by` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '' COMMENT '创建人',
  `update_by` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '' COMMENT '更新人',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '' COMMENT '备注',
  `version` int NOT NULL COMMENT '版本号',
  `id` int NOT NULL AUTO_INCREMENT COMMENT '网站ID',
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '网站名称',
  `description` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '' COMMENT '网站描述',
  `url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '网站链接',
  `color` varchar(7) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '图标背景色',
  `sort` int NOT NULL DEFAULT 0 COMMENT '排序',
  `categoryId` int NOT NULL COMMENT '分类ID',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 35 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of biz_nav_website
-- ----------------------------
INSERT INTO `biz_nav_website` VALUES ('2024-11-25 15:44:38.344333', '2024-11-25 15:44:38.344333', 'system', 'system', '', 1, 1, 'ChatGPT', 'OpenAI 开发的 AI 助手', 'https://chat.openai.com', '#74AA9C', 0, 1);
INSERT INTO `biz_nav_website` VALUES ('2024-11-25 15:44:38.344333', '2024-11-25 15:44:38.344333', 'system', 'system', '', 1, 2, 'Midjourney', 'AI 绘画工具', '#', '#0000FF', 1, 1);
INSERT INTO `biz_nav_website` VALUES ('2024-11-25 15:44:38.344333', '2024-11-25 15:44:38.344333', 'system', 'system', '', 1, 3, 'Claude', 'Anthropic 开发的 AI 助手', '#', '#8E44AD', 2, 1);
INSERT INTO `biz_nav_website` VALUES ('2024-11-25 15:44:38.344333', '2024-11-25 15:44:38.344333', 'system', 'system', '', 1, 4, 'Stable Diffusion', 'AI 图像生成模型', '#', '#E74C3C', 3, 1);
INSERT INTO `biz_nav_website` VALUES ('2024-11-25 15:44:38.344333', '2024-11-25 15:44:38.344333', 'system', 'system', '', 1, 5, 'Bard', 'Google 开发的 AI 助手', '#', '#4285F4', 4, 1);
INSERT INTO `biz_nav_website` VALUES ('2024-11-25 15:44:38.344333', '2024-11-25 15:44:38.344333', 'system', 'system', '', 1, 6, 'DALL-E', 'OpenAI 图像生成模型', '#', '#FF6B6B', 5, 1);
INSERT INTO `biz_nav_website` VALUES ('2024-11-25 15:44:38.344333', '2024-11-25 15:44:38.344333', 'system', 'system', '', 1, 7, '掘金', '开发者社区', '#', '#007FFF', 0, 2);
INSERT INTO `biz_nav_website` VALUES ('2024-11-25 15:44:38.344333', '2024-11-25 15:44:38.344333', 'system', 'system', '', 1, 8, '36kr', '创业资讯、科技新闻', '#', '#4ECDC4', 1, 2);
INSERT INTO `biz_nav_website` VALUES ('2024-11-25 15:44:38.344333', '2024-11-25 15:44:38.344333', 'system', 'system', '', 1, 9, 'V2EX', '创意工作者社区', '#', '#333333', 2, 2);
INSERT INTO `biz_nav_website` VALUES ('2024-11-25 15:44:38.344333', '2024-11-25 15:44:38.344333', 'system', 'system', '', 1, 10, 'InfoQ', '软件开发资讯', '#', '#FF5733', 3, 2);
INSERT INTO `biz_nav_website` VALUES ('2024-11-25 15:44:38.344333', '2024-11-25 15:44:38.344333', 'system', 'system', '', 1, 11, 'Figma', '在线设计工具', '#', '#FF4785', 0, 3);
INSERT INTO `biz_nav_website` VALUES ('2024-11-25 15:44:38.344333', '2024-11-25 15:44:38.344333', 'system', 'system', '', 1, 12, 'Dribbble', '设计师作品分享平台', '#', '#EA4C89', 1, 3);
INSERT INTO `biz_nav_website` VALUES ('2024-11-25 15:44:38.344333', '2024-11-25 15:44:38.344333', 'system', 'system', '', 1, 13, 'Behance', '创意设计社区', '#', '#1769FF', 2, 3);
INSERT INTO `biz_nav_website` VALUES ('2024-11-25 15:44:38.344333', '2024-11-25 15:44:38.344333', 'system', 'system', '', 1, 14, 'GitHub', '代码托管平台', '#', '#333', 0, 4);
INSERT INTO `biz_nav_website` VALUES ('2024-11-25 15:44:38.344333', '2024-11-25 15:44:38.344333', 'system', 'system', '', 1, 15, 'VS Code', '代码编辑器', '#', '#007ACC', 1, 4);
INSERT INTO `biz_nav_website` VALUES ('2024-11-25 15:44:38.344333', '2024-11-25 15:44:38.344333', 'system', 'system', '', 1, 16, 'GitLab', '代码托管平台', '#', '#FCA121', 2, 4);
INSERT INTO `biz_nav_website` VALUES ('2024-11-25 15:44:38.344333', '2024-11-25 15:44:38.344333', 'system', 'system', '', 1, 17, 'Coursera', '全球在线教育平台', '#', '#0056D2', 0, 5);
INSERT INTO `biz_nav_website` VALUES ('2024-11-25 15:44:38.344333', '2024-11-25 15:44:38.344333', 'system', 'system', '', 1, 18, 'Udemy', '在线课程平台', '#', '#A435F0', 1, 5);
INSERT INTO `biz_nav_website` VALUES ('2024-11-25 15:44:38.344333', '2024-11-25 15:44:38.344333', 'system', 'system', '', 1, 19, 'edX', '免费在线课程', '#', '#02262B', 2, 5);
INSERT INTO `biz_nav_website` VALUES ('2024-11-25 15:44:38.344333', '2024-11-25 15:44:38.344333', 'system', 'system', '', 1, 20, 'Notion', '全能工作空间', '#', '#000000', 0, 6);
INSERT INTO `biz_nav_website` VALUES ('2024-11-25 15:44:38.344333', '2024-11-25 15:44:38.344333', 'system', 'system', '', 1, 21, 'Trello', '项目管理工具', '#', '#0079BF', 1, 6);
INSERT INTO `biz_nav_website` VALUES ('2024-11-25 15:44:38.344333', '2024-11-25 15:44:38.344333', 'system', 'system', '', 1, 22, 'Slack', '团队协作平台', '#', '#4A154B', 2, 6);
INSERT INTO `biz_nav_website` VALUES ('2024-11-25 15:44:38.344333', '2024-11-25 15:44:38.344333', 'system', 'system', '', 1, 23, 'Vue.js', '渐进式 JavaScript 框架', '#', '#42b883', 0, 8);
INSERT INTO `biz_nav_website` VALUES ('2024-11-25 15:44:38.344333', '2024-11-25 15:44:38.344333', 'system', 'system', '', 1, 24, 'React', 'JavaScript UI 库', '#', '#61dafb', 1, 8);
INSERT INTO `biz_nav_website` VALUES ('2024-11-25 15:44:38.344333', '2024-11-25 15:44:38.344333', 'system', 'system', '', 1, 25, 'Angular', 'Web 应用框架', '#', '#dd1b16', 2, 8);
INSERT INTO `biz_nav_website` VALUES ('2024-11-25 15:44:38.344333', '2024-11-25 15:44:38.344333', 'system', 'system', '', 1, 26, 'Node.js', 'JavaScript 运行时', '#', '#339933', 0, 9);
INSERT INTO `biz_nav_website` VALUES ('2024-11-25 15:44:38.344333', '2024-11-25 15:44:38.344333', 'system', 'system', '', 1, 27, 'Django', 'Python Web 框架', '#', '#092E20', 1, 9);
INSERT INTO `biz_nav_website` VALUES ('2024-11-25 15:44:38.344333', '2024-11-25 15:44:38.344333', 'system', 'system', '', 1, 28, 'Spring Boot', 'Java 应用框架', '#', '#6DB33F', 2, 9);
INSERT INTO `biz_nav_website` VALUES ('2024-11-25 15:44:38.344333', '2024-11-25 15:44:38.344333', 'system', 'system', '', 1, 29, 'Flutter', '跨平台开发框架', '#', '#02569B', 0, 10);
INSERT INTO `biz_nav_website` VALUES ('2024-11-25 15:44:38.344333', '2024-11-25 15:44:38.344333', 'system', 'system', '', 1, 30, 'React Native', '移动应用开发框架', '#', '#61dafb', 1, 10);
INSERT INTO `biz_nav_website` VALUES ('2024-11-25 15:44:38.344333', '2024-11-25 15:44:38.344333', 'system', 'system', '', 1, 31, 'Swift', 'iOS 开发语言', '#', '#FA7343', 2, 10);
INSERT INTO `biz_nav_website` VALUES ('2024-11-25 15:44:38.344333', '2024-11-25 15:44:38.344333', 'system', 'system', '', 1, 32, 'Medium', '优质文章平台', '#', '#000000', 0, 7);
INSERT INTO `biz_nav_website` VALUES ('2024-11-25 15:44:38.344333', '2024-11-25 15:44:38.344333', 'system', 'system', '', 1, 33, 'Dev.to', '开发者博客平台', '#', '#0A0A0A', 1, 7);
INSERT INTO `biz_nav_website` VALUES ('2024-11-25 15:44:38.344333', '2024-11-25 15:44:38.344333', 'system', 'system', '', 1, 34, 'HashNode', '技术博客社区', '#', '#2962FF', 2, 7);

-- ----------------------------
-- Table structure for config
-- ----------------------------
DROP TABLE IF EXISTS `config`;
CREATE TABLE `config`  (
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `update_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '备注',
  `config_id` int NOT NULL AUTO_INCREMENT COMMENT '参数主键',
  `config_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '参数名称',
  `config_key` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '参数键名',
  `config_value` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '参数键值',
  `config_type` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'N' COMMENT '系统内置（Y是 N否）',
  `version` int NOT NULL COMMENT '版本号',
  `create_by` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '创建人',
  `update_by` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '更新人',
  PRIMARY KEY (`config_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of config
-- ----------------------------
INSERT INTO `config` VALUES ('2022-01-06 13:39:57.695833', '2022-01-06 13:39:57.695833', '初始化密码 123456', 1, '用户管理-账号初始密码', 'sys.user.initPassword', '123456', 'Y', 0, '', '');

-- ----------------------------
-- Table structure for dept
-- ----------------------------
DROP TABLE IF EXISTS `dept`;
CREATE TABLE `dept`  (
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `update_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '备注',
  `dept_id` int NOT NULL AUTO_INCREMENT COMMENT '部门id',
  `dept_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '部门名称',
  `order_num` int NOT NULL DEFAULT 0 COMMENT '显示顺序',
  `leader` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '负责人',
  `phone` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '联系电话',
  `email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '邮箱',
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '0' COMMENT '部门状态（0正常 1停用）',
  `del_flag` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '0' COMMENT '删除标志（0代表存在 2代表删除）',
  `mpath` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '',
  `parentDeptId` int NULL DEFAULT NULL COMMENT '部门id',
  `version` int NOT NULL COMMENT '版本号',
  `create_by` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '创建人',
  `update_by` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '更新人',
  PRIMARY KEY (`dept_id`) USING BTREE,
  INDEX `FK_427c332b4ebe1147caa3328adfa`(`parentDeptId` ASC) USING BTREE,
  CONSTRAINT `FK_427c332b4ebe1147caa3328adfa` FOREIGN KEY (`parentDeptId`) REFERENCES `dept` (`dept_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of dept
-- ----------------------------
INSERT INTO `dept` VALUES ('2021-12-29 16:36:06.320221', '2022-01-06 13:39:00.000000', '', 1, '槑槑总部', 1, '槑槑', '13006133172', '87789771@qq.com', '0', '0', '1.', NULL, 0, '', '');

-- ----------------------------
-- Table structure for dict_data
-- ----------------------------
DROP TABLE IF EXISTS `dict_data`;
CREATE TABLE `dict_data`  (
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `update_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '备注',
  `dict_data` int NOT NULL AUTO_INCREMENT COMMENT '字典编码',
  `dict_sort` int NOT NULL DEFAULT 0 COMMENT '字典排序',
  `dict_label` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '字典标签',
  `dict_value` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '字典键值',
  `css_class` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '样式属性（其他样式扩展）',
  `list_class` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '表格回显样式',
  `is_default` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'N' COMMENT '是否默认（Y是 N否）',
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '0' COMMENT '状态（0正常 1停用）',
  `dictTypeDictId` int NULL DEFAULT NULL COMMENT '字典类型ID',
  `version` int NOT NULL COMMENT '版本号',
  `create_by` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '创建人',
  `update_by` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '更新人',
  PRIMARY KEY (`dict_data`) USING BTREE,
  INDEX `FK_bddc8251ad1c1ed3bcad5208a15`(`dictTypeDictId` ASC) USING BTREE,
  CONSTRAINT `FK_bddc8251ad1c1ed3bcad5208a15` FOREIGN KEY (`dictTypeDictId`) REFERENCES `dict_type` (`dict_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 29 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of dict_data
-- ----------------------------
INSERT INTO `dict_data` VALUES ('2022-01-06 17:22:28.610065', '2022-01-06 17:22:28.610065', '正常状态', 1, 1, '正常', '0', NULL, 'primary', 'N', '0', 1, 0, '', '');
INSERT INTO `dict_data` VALUES ('2022-01-06 17:22:46.633485', '2022-01-06 17:22:46.633485', '停用状态', 2, 2, '停用', '1', NULL, 'danger', 'N', '0', 1, 0, '', '');
INSERT INTO `dict_data` VALUES ('2022-01-06 17:23:10.503824', '2022-01-06 17:23:10.503824', '系统默认是', 3, 1, '是', 'Y', NULL, 'primary', 'N', '0', 2, 0, '', '');
INSERT INTO `dict_data` VALUES ('2022-01-06 17:23:27.925513', '2022-01-06 17:23:27.925513', '系统默认否', 4, 2, '否', 'N', NULL, 'danger', 'N', '0', 2, 0, '', '');
INSERT INTO `dict_data` VALUES ('2022-01-06 17:23:53.124506', '2022-01-06 17:23:53.124506', '通知', 5, 1, '通知', '1', NULL, 'warning', 'N', '0', 3, 0, '', '');
INSERT INTO `dict_data` VALUES ('2022-01-06 17:24:48.108480', '2022-01-06 17:24:48.108480', '公告', 6, 2, '公告', '2', NULL, 'success', 'N', '0', 3, 0, '', '');
INSERT INTO `dict_data` VALUES ('2022-01-06 17:25:16.677767', '2022-01-06 17:25:16.677767', '正常状态', 7, 1, '正常', '0', NULL, 'primary', 'N', '0', 4, 0, '', '');
INSERT INTO `dict_data` VALUES ('2022-01-06 17:25:31.685121', '2022-01-06 17:25:31.685121', '关闭状态', 8, 2, '关闭', '1', NULL, 'danger', 'N', '0', 4, 0, '', '');
INSERT INTO `dict_data` VALUES ('2022-01-06 17:26:13.034016', '2022-01-06 17:26:13.034016', '显示菜单', 9, 1, '显示', '0', NULL, 'primary', 'N', '0', 5, 0, '', '');
INSERT INTO `dict_data` VALUES ('2022-01-06 17:26:28.928726', '2022-01-06 17:26:28.928726', '隐藏菜单', 10, 2, '隐藏', '1', NULL, 'danger', 'N', '0', 5, 0, '', '');
INSERT INTO `dict_data` VALUES ('2022-01-06 17:26:53.936024', '2022-01-06 17:26:53.936024', '性别男', 11, 1, '男', '0', NULL, 'default', 'N', '0', 6, 0, '', '');
INSERT INTO `dict_data` VALUES ('2022-01-06 17:27:09.341366', '2022-01-06 17:27:09.341366', '', 12, 2, '女', '1', NULL, 'default', 'N', '0', 6, 0, '', '');
INSERT INTO `dict_data` VALUES ('2022-01-06 17:27:26.557747', '2022-01-06 17:27:26.557747', '', 13, 3, '未知', '2', NULL, 'default', 'N', '0', 6, 0, '', '');
INSERT INTO `dict_data` VALUES ('2022-01-06 17:28:03.075867', '2022-01-06 17:28:03.075867', '其他操作', 14, 1, '其他', '1', '', 'default', 'N', '0', 7, 0, '', '');
INSERT INTO `dict_data` VALUES ('2022-01-06 17:28:17.031908', '2022-01-06 17:28:17.031908', '插入操作', 15, 2, '插入', '2', NULL, 'primary', 'N', '0', 7, 0, '', '');
INSERT INTO `dict_data` VALUES ('2022-01-06 17:28:31.698386', '2022-01-06 17:28:31.698386', '更新操作', 16, 3, '更新', '3', NULL, 'success', 'N', '0', 7, 0, '', '');
INSERT INTO `dict_data` VALUES ('2022-01-06 17:28:47.336031', '2022-01-06 17:28:47.336031', '删除操作', 17, 4, '删除', '4', NULL, 'danger', 'N', '0', 7, 0, '', '');
INSERT INTO `dict_data` VALUES ('2022-01-06 17:29:02.638173', '2022-01-06 17:29:02.638173', '授权操作', 18, 5, '授权', '5', NULL, 'info', 'N', '0', 7, 0, '', '');
INSERT INTO `dict_data` VALUES ('2022-01-06 17:29:17.692132', '2022-01-06 17:29:17.692132', '导出操作', 19, 6, '导出', '6', NULL, 'primary', 'N', '0', 7, 0, '', '');
INSERT INTO `dict_data` VALUES ('2022-01-06 17:29:32.192795', '2022-01-06 17:29:32.192795', '导入操作', 20, 7, '导入', '7', NULL, 'success', 'N', '0', 7, 0, '', '');
INSERT INTO `dict_data` VALUES ('2022-01-06 17:29:47.511268', '2022-01-06 17:29:47.511268', '强退操作', 21, 8, '强退', '8', NULL, 'info', 'N', '0', 7, 0, '', '');
INSERT INTO `dict_data` VALUES ('2022-01-06 17:30:06.376073', '2022-01-06 17:30:06.376073', '清除操作', 22, 9, '清除', '9', NULL, 'danger', 'N', '0', 7, 0, '', '');
INSERT INTO `dict_data` VALUES ('2022-01-06 17:30:29.075463', '2022-01-06 17:30:29.075463', '正常状态', 23, 1, '成功', '0', NULL, 'primary', 'N', '0', 8, 0, '', '');
INSERT INTO `dict_data` VALUES ('2022-01-06 17:30:44.318238', '2022-01-06 17:30:57.000000', '停用状态', 24, 2, '失败', '1', NULL, 'danger', 'N', '0', 8, 0, '', '');
INSERT INTO `dict_data` VALUES ('2022-01-06 17:31:19.931468', '2022-01-06 17:31:19.931468', '正常状态', 25, 1, '正常', '0', NULL, 'primary', 'N', '0', 9, 0, '', '');
INSERT INTO `dict_data` VALUES ('2022-01-06 17:31:34.260922', '2022-01-06 17:31:34.260922', '停用状态', 26, 2, '暂停', '1', NULL, 'danger', 'N', '0', 9, 0, '', '');
INSERT INTO `dict_data` VALUES ('2022-01-06 17:31:54.560801', '2022-01-06 17:31:54.560801', '默认分组', 27, 1, '默认', 'DEFAULT', NULL, 'default', 'N', '0', 10, 0, '', '');
INSERT INTO `dict_data` VALUES ('2022-01-06 17:32:11.831282', '2022-01-06 17:32:11.831282', '系统分组', 28, 2, '系统', 'SYSTEM', NULL, 'default', 'N', '0', 10, 0, '', '');

-- ----------------------------
-- Table structure for dict_type
-- ----------------------------
DROP TABLE IF EXISTS `dict_type`;
CREATE TABLE `dict_type`  (
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `update_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '备注',
  `dict_id` int NOT NULL AUTO_INCREMENT COMMENT '字典类型ID',
  `dict_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '字典名称',
  `dict_type` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '字典类型',
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '0' COMMENT '状态（0正常 1停用）',
  `version` int NOT NULL COMMENT '版本号',
  `create_by` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '创建人',
  `update_by` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '更新人',
  PRIMARY KEY (`dict_id`) USING BTREE,
  UNIQUE INDEX `IDX_003e8d417dc1f24cd03575cb9e`(`dict_type` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of dict_type
-- ----------------------------
INSERT INTO `dict_type` VALUES ('2022-01-06 17:19:32.611851', '2022-01-06 17:19:32.611851', '系统开关列表', 1, '系统开关', 'sys_normal_disable', '0', 0, '', '');
INSERT INTO `dict_type` VALUES ('2022-01-06 17:19:55.785151', '2022-01-06 17:19:55.785151', '系统是否列表', 2, '系统是否', 'sys_yes_no', '0', 0, '', '');
INSERT INTO `dict_type` VALUES ('2022-01-06 17:20:09.089782', '2022-01-06 17:20:09.089782', '通知类型列表', 3, '通知类型', 'sys_notice_type', '0', 0, '', '');
INSERT INTO `dict_type` VALUES ('2022-01-06 17:20:20.222661', '2022-01-06 17:20:20.222661', '通知状态列表', 4, '通知状态', 'sys_notice_status', '0', 0, '', '');
INSERT INTO `dict_type` VALUES ('2022-01-06 17:20:43.378711', '2022-01-06 17:20:43.378711', '菜单状态列表', 5, '菜单状态', 'sys_show_hide', '0', 0, '', '');
INSERT INTO `dict_type` VALUES ('2022-01-06 17:20:58.306460', '2022-01-06 17:20:58.306460', '用户性别列表', 6, '用户性别', 'sys_user_sex', '0', 0, '', '');
INSERT INTO `dict_type` VALUES ('2022-01-06 17:21:17.184524', '2022-01-06 17:21:17.184524', '操作类型列表', 7, '操作类型', 'sys_oper_type', '0', 0, '', '');
INSERT INTO `dict_type` VALUES ('2022-01-06 17:21:34.350301', '2022-01-06 17:21:34.350301', '登录状态列表', 8, '系统状态', 'sys_common_status', '0', 0, '', '');
INSERT INTO `dict_type` VALUES ('2022-01-06 17:21:49.814326', '2022-01-06 17:21:49.814326', '任务状态列表', 9, '任务状态', 'sys_job_status', '0', 0, '', '');
INSERT INTO `dict_type` VALUES ('2022-01-06 17:22:00.163750', '2022-01-06 17:22:00.163750', '任务分组列表', 10, '任务分组', 'sys_job_group', '0', 0, '', '');

-- ----------------------------
-- Table structure for job
-- ----------------------------
DROP TABLE IF EXISTS `job`;
CREATE TABLE `job`  (
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `update_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '备注',
  `job_id` int NOT NULL AUTO_INCREMENT COMMENT '任务ID',
  `job_name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '任务名称',
  `job_group` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'DEFAULT' COMMENT '任务组名',
  `invoke_target` varchar(225) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '调用目标字符串',
  `cron_expression` varchar(225) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT 'cron执行表达式',
  `misfire_policy` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '3' COMMENT '计划执行错误策略（1立即执行 2执行一次 3放弃执行）',
  `concurrent` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '1' COMMENT '是否并发执行（0允许 1禁止）',
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '0' COMMENT '状态（0正常 1暂停）',
  `version` int NOT NULL COMMENT '版本号',
  `create_by` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '创建人',
  `update_by` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '更新人',
  PRIMARY KEY (`job_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of job
-- ----------------------------
INSERT INTO `job` VALUES ('2022-01-06 17:35:01.664486', '2024-08-30 04:52:55.000000', '', 1, '测试定时任务', 'DEFAULT', 'JobService.ceshi(1,2,3,true)', '0/15 * * * * ?', '3', '1', '1', 4, '', 'admin');

-- ----------------------------
-- Table structure for job_log
-- ----------------------------
DROP TABLE IF EXISTS `job_log`;
CREATE TABLE `job_log`  (
  `job_log_id` int NOT NULL AUTO_INCREMENT COMMENT '任务日志ID',
  `job_name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '任务名称',
  `job_group` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '任务组名',
  `invoke_target` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '调用目标字符串',
  `job_message` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '日志信息',
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '0' COMMENT '执行状态（0正常 1失败）',
  `exception_info` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '异常信息',
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  PRIMARY KEY (`job_log_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1952 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of job_log
-- ----------------------------

-- ----------------------------
-- Table structure for logininfor
-- ----------------------------
DROP TABLE IF EXISTS `logininfor`;
CREATE TABLE `logininfor`  (
  `info_id` int NOT NULL AUTO_INCREMENT COMMENT '访问ID',
  `user_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '用户账号',
  `ipaddr` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '登录IP地址',
  `login_location` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '登录地点',
  `browser` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '浏览器类型',
  `os` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '浏览器操作系统类型',
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '0' COMMENT '登录状态（0成功 1失败）',
  `msg` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '提示消息',
  `login_time` datetime NOT NULL COMMENT '访问时间',
  PRIMARY KEY (`info_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 21 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of logininfor
-- ----------------------------

-- ----------------------------
-- Table structure for menu
-- ----------------------------
DROP TABLE IF EXISTS `menu`;
CREATE TABLE `menu`  (
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `update_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '备注',
  `menu_id` int NOT NULL AUTO_INCREMENT COMMENT '菜单ID',
  `menu_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '菜单名称',
  `order_num` int NOT NULL COMMENT '显示顺序',
  `path` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '路由地址',
  `component` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '组件路径',
  `query` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '路由参数',
  `is_frame` int NOT NULL DEFAULT 1 COMMENT '是否为外链（0是 1否）',
  `menu_type` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '菜单类型（M目录 C菜单 F按钮）',
  `visible` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '0' COMMENT '菜单状态（0显示 1隐藏）',
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '0' COMMENT '菜单状态（0正常 1停用）',
  `perms` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '权限标识',
  `icon` char(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '#' COMMENT '菜单图标',
  `mpath` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '',
  `parentMenuId` int NULL DEFAULT NULL COMMENT '菜单ID',
  `version` int NOT NULL COMMENT '版本号',
  `create_by` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '创建人',
  `update_by` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '更新人',
  `is_cache` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '0' COMMENT '是否缓存（0缓存 1不缓存）',
  PRIMARY KEY (`menu_id`) USING BTREE,
  INDEX `FK_fbe2023241bd4c612415c080cc6`(`parentMenuId` ASC) USING BTREE,
  CONSTRAINT `FK_fbe2023241bd4c612415c080cc6` FOREIGN KEY (`parentMenuId`) REFERENCES `menu` (`menu_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 76 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of menu
-- ----------------------------
INSERT INTO `menu` VALUES ('2021-12-22 10:43:24.401465', '2021-12-22 10:43:24.401465', '', 1, '系统管理', 1, 'system', NULL, NULL, 1, 'M', '0', '0', NULL, 'system', '1.', NULL, 0, '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-22 10:43:24.406615', '2021-12-22 10:43:24.406615', '', 2, '系统监控', 2, 'monitor', NULL, NULL, 1, 'M', '0', '0', NULL, 'monitor', '2.', NULL, 0, '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-22 10:43:24.411039', '2021-12-22 10:43:24.411039', '', 4, '用户管理', 1, 'user', 'system/user/index', NULL, 1, 'C', '0', '0', 'system:user:list', 'user', '1.4.', 1, 0, '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-22 10:43:24.412951', '2021-12-22 10:43:24.412951', '', 5, '角色管理', 2, 'role', 'system/role/index', NULL, 1, 'C', '0', '0', 'system:role:list', 'peoples', '1.5.', 1, 0, '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-22 10:43:24.414663', '2021-12-22 10:43:24.414663', '', 6, '菜单管理', 3, 'menu', 'system/menu/index', NULL, 1, 'C', '0', '0', 'system:menu:list', 'tree-table', '1.6.', 1, 0, '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-22 10:43:24.416394', '2021-12-22 10:43:24.416394', '', 7, '部门管理', 4, 'dept', 'system/dept/index', NULL, 1, 'C', '0', '0', 'system:dept:list', 'tree', '1.7.', 1, 0, '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-22 10:43:24.418494', '2021-12-22 10:43:24.418494', '', 8, '岗位管理', 5, 'post', 'system/post/index', NULL, 1, 'C', '0', '0', 'system:post:list', 'post', '1.8.', 1, 0, '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-22 10:43:24.420750', '2021-12-29 15:06:18.000000', '', 9, '字典管理', 6, 'dict', 'system/dict/index', NULL, 1, 'C', '0', '0', 'system:dict:list', 'dict', '1.9.', 1, 0, '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-22 10:43:24.422744', '2021-12-22 10:43:24.422744', '', 10, '参数设置', 7, 'config', 'system/config/index', NULL, 1, 'C', '0', '0', 'system:config:list', 'edit', '1.10.', 1, 0, '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-22 10:43:24.424344', '2021-12-22 10:43:24.424344', '', 11, '通知公告', 8, 'notice', 'system/notice/index', NULL, 1, 'C', '0', '0', 'system:notice:list', 'message', '1.11.', 1, 0, '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-22 10:43:24.426038', '2021-12-22 10:43:24.426038', '', 12, '日志管理', 9, 'log', NULL, NULL, 1, 'M', '0', '0', NULL, 'log', '1.12.', 1, 0, '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-22 10:43:24.427903', '2021-12-22 10:43:24.427903', '', 13, '操作日志', 1, 'operlog', 'monitor/operlog/index', NULL, 1, 'C', '0', '0', 'monitor:operlog:list', 'form', '1.12.13.', 12, 0, '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-22 10:43:24.429545', '2021-12-22 10:43:24.429545', '', 14, '登录日志', 2, 'logininfor', 'monitor/logininfor/index', NULL, 1, 'C', '0', '0', 'monitor:logininfor:list', 'logininfor', '1.12.14.', 12, 0, '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-22 10:43:24.431236', '2021-12-22 10:43:24.431236', '', 15, '用户查询', 1, '', NULL, NULL, 1, 'F', '0', '0', 'system:user:query', '#', '1.4.15.', 4, 0, '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-22 10:43:24.432834', '2021-12-22 10:43:24.432834', '', 16, '用户新增', 2, '', NULL, NULL, 1, 'F', '0', '0', 'system:user:add', '#', '1.4.16.', 4, 0, '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-22 10:43:24.434472', '2021-12-22 10:43:24.434472', '', 17, '用户修改', 3, '', NULL, NULL, 1, 'F', '0', '0', 'system:user:edit', '#', '1.4.17.', 4, 0, '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-22 10:43:24.436075', '2021-12-22 10:43:24.436075', '', 18, '用户删除', 4, '', NULL, NULL, 1, 'F', '0', '0', 'system:user:remove', '#', '1.4.18.', 4, 0, '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-22 10:43:24.437847', '2021-12-22 10:43:24.437847', '', 19, '用户导出', 5, '', NULL, NULL, 1, 'F', '0', '0', 'system:user:export', '#', '1.4.19.', 4, 0, '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-22 10:43:24.439590', '2021-12-22 10:43:24.439590', '', 20, '用户导入', 6, '', NULL, NULL, 1, 'F', '0', '0', 'system:user:import', '#', '1.4.20.', 4, 0, '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-22 10:43:24.441327', '2021-12-22 10:43:24.441327', '', 21, '重置密码', 7, '', NULL, NULL, 1, 'F', '0', '0', 'system:user:resetPwd', '#', '1.4.21.', 4, 0, '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-22 10:43:24.443415', '2021-12-22 10:43:24.443415', '', 22, '角色查询', 1, '', NULL, NULL, 1, 'F', '0', '0', 'system:role:query', '#', '1.5.22.', 5, 0, '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-22 10:43:24.445096', '2021-12-22 10:43:24.445096', '', 23, '角色新增', 2, '', NULL, NULL, 1, 'F', '0', '0', 'system:role:add', '#', '1.5.23.', 5, 0, '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-22 10:43:24.446669', '2021-12-22 10:43:24.446669', '', 24, '角色修改', 3, '', NULL, NULL, 1, 'F', '0', '0', 'system:role:edit', '#', '1.5.24.', 5, 0, '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-22 10:43:24.448225', '2021-12-22 10:43:24.448225', '', 25, '角色删除', 4, '', NULL, NULL, 1, 'F', '0', '0', 'system:role:remove', '#', '1.5.25.', 5, 0, '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-22 10:43:24.449790', '2021-12-22 10:43:24.449790', '', 26, '菜单查询', 1, '', NULL, NULL, 1, 'F', '0', '0', 'system:menu:query', '#', '1.6.26.', 6, 0, '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-22 10:43:24.451476', '2021-12-22 10:43:24.451476', '', 27, '菜单新增', 2, '', NULL, NULL, 1, 'F', '0', '0', 'system:menu:add', '#', '1.6.27.', 6, 0, '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-22 10:43:24.453462', '2021-12-22 10:43:24.453462', '', 28, '菜单修改', 3, '', NULL, NULL, 1, 'F', '0', '0', 'system:menu:edit', '#', '1.6.28.', 6, 0, '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-22 10:43:24.455110', '2021-12-22 10:43:24.455110', '', 29, '菜单删除', 4, '', NULL, NULL, 1, 'F', '0', '0', 'system:menu:remove', '#', '1.6.29.', 6, 0, '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-22 10:43:24.456866', '2021-12-22 10:43:24.456866', '', 30, '部门查询', 1, '', NULL, NULL, 1, 'F', '0', '0', 'system:dept:query', '#', '1.7.30.', 7, 0, '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-22 10:43:24.459044', '2021-12-22 10:43:24.459044', '', 31, '部门新增', 2, '', NULL, NULL, 1, 'F', '0', '0', 'system:dept:add', '#', '1.7.31.', 7, 0, '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-22 10:43:24.461136', '2021-12-22 10:43:24.461136', '', 32, '部门修改', 3, '', NULL, NULL, 1, 'F', '0', '0', 'system:dept:edit', '#', '1.7.32.', 7, 0, '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-22 10:43:24.463219', '2021-12-22 10:43:24.463219', '', 33, '部门删除', 4, '', NULL, NULL, 1, 'F', '0', '0', 'system:dept:remove', '#', '1.7.33.', 7, 0, '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-22 10:43:24.465120', '2021-12-22 10:43:24.465120', '', 34, '公告新增', 2, '', NULL, NULL, 1, 'F', '0', '0', 'system:notice:add', '#', '1.11.34.', 11, 0, '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-22 10:43:24.467050', '2021-12-22 10:43:24.467050', '', 35, '公告查询', 1, '', NULL, NULL, 1, 'F', '0', '0', 'system:notice:query', '#', '1.11.35.', 11, 0, '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-22 10:43:24.468696', '2021-12-22 10:43:24.468696', '', 36, '公告修改', 3, '', NULL, NULL, 1, 'F', '0', '0', 'system:notice:edit', '#', '1.11.36.', 11, 0, '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-22 10:43:24.470360', '2021-12-22 10:43:24.470360', '', 37, '公告删除', 4, '', NULL, NULL, 1, 'F', '0', '0', 'system:notice:remove', '#', '1.11.37.', 11, 0, '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-22 13:42:28.347454', '2021-12-22 13:42:28.000000', '', 38, '岗位查询', 1, '', NULL, NULL, 1, 'F', '0', '0', 'system:post:query', '#', '1.8.38.', 8, 0, '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-22 13:42:49.571121', '2021-12-22 13:42:49.000000', '', 39, '岗位新增', 2, '', NULL, NULL, 1, 'F', '0', '0', 'system:post:add', '#', '1.8.39.', 8, 0, '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-22 13:43:08.812751', '2021-12-22 13:43:08.000000', '', 40, '岗位修改', 3, '', NULL, NULL, 1, 'F', '0', '0', 'system:post:edit', '#', '1.8.40.', 8, 0, '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-22 13:43:42.637215', '2021-12-22 13:43:42.000000', '', 41, '岗位删除', 4, '', NULL, NULL, 1, 'F', '0', '0', 'system:post:remove', '#', '1.8.41.', 8, 0, '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-22 13:45:04.046592', '2021-12-22 13:45:04.000000', '', 42, '岗位导出', 5, '', NULL, NULL, 1, 'F', '0', '0', 'system:post:export', '#', '1.8.42.', 8, 0, '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-23 21:10:14.216043', '2021-12-23 21:10:14.000000', '', 43, '在线用户', 1, 'online', 'monitor/online/index', NULL, 1, 'C', '0', '0', 'monitor:online:list', 'online', '2.43.', 2, 0, '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-24 11:53:23.946743', '2021-12-24 11:53:23.000000', '', 46, '定时任务', 2, 'job', 'monitor/job/index', NULL, 1, 'C', '0', '0', 'monitor:job:list', 'job', '2.46.', 2, 0, '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-24 11:55:16.294232', '2021-12-24 11:55:16.000000', '', 48, '服务监控', 4, 'server', 'monitor/server/index', NULL, 1, 'C', '0', '0', 'monitor:server:list', 'server', '2.48.', 2, 0, '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-29 14:58:27.385651', '2021-12-29 14:58:27.000000', '', 49, '字典查询', 1, '', NULL, NULL, 1, 'F', '0', '0', 'system:dict:query', '#', '1.9.49.', 9, 0, '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-29 14:59:15.101581', '2021-12-29 14:59:15.000000', '', 50, '字典新增', 2, '', NULL, NULL, 1, 'F', '0', '0', 'system:dict:add', '#', '1.9.50.', 9, 0, '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-29 15:01:07.839872', '2021-12-29 15:01:07.000000', '', 51, '字典修改', 3, '', NULL, NULL, 1, 'F', '0', '0', 'system:dict:edit', '#', '1.9.51.', 9, 0, '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-29 15:03:36.875756', '2021-12-29 15:03:36.000000', '', 52, '字典删除', 4, '', NULL, NULL, 1, 'F', '0', '0', 'system:dict:remove', '#', '1.9.52.', 9, 0, '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-29 15:06:53.986748', '2021-12-29 15:06:53.000000', '', 53, '字典导出', 5, '', NULL, NULL, 1, 'F', '0', '0', 'system:dict:export', '#', '1.9.53.', 9, 0, '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-29 15:07:37.134365', '2021-12-29 15:07:37.000000', '', 54, '参数查询', 1, '', NULL, NULL, 1, 'F', '0', '0', 'system:config:query', '#', '1.10.54.', 10, 0, '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-29 15:15:50.914599', '2021-12-29 15:15:50.000000', '', 55, '参数新增', 2, '', NULL, NULL, 1, 'F', '0', '0', 'system:config:add', '#', '1.10.55.', 10, 0, '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-29 15:29:36.089648', '2021-12-29 15:29:36.000000', '', 56, '参数修改', 3, '', NULL, NULL, 1, 'F', '0', '0', 'system:config:edit', '#', '1.10.56.', 10, 0, '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-29 15:30:04.673290', '2021-12-29 15:30:04.000000', '', 57, '参数删除', 4, '', NULL, NULL, 1, 'F', '0', '0', 'system:config:remove', '#', '1.10.57.', 10, 0, '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-29 15:30:32.500905', '2021-12-29 15:30:32.000000', '', 58, '参数导出', 5, '', NULL, NULL, 1, 'F', '0', '0', 'system:config:export', '#', '1.10.58.', 10, 0, '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-29 15:31:40.135159', '2021-12-29 15:31:40.000000', '', 59, '操作查询', 1, '', NULL, NULL, 1, 'F', '0', '0', 'monitor:operlog:query', '#', '1.12.13.59.', 13, 0, '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-29 15:33:25.097943', '2021-12-29 15:33:25.000000', '', 60, '操作删除', 2, '', NULL, NULL, 1, 'F', '0', '0', 'monitor:operlog:remove', '#', '1.12.13.60.', 13, 0, '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-29 15:33:57.738551', '2021-12-29 15:33:57.000000', '', 61, '日志导出', 4, '', NULL, NULL, 1, 'F', '0', '0', 'monitor:operlog:export', '#', '1.12.13.61.', 13, 0, '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-29 15:34:24.310074', '2021-12-29 15:34:24.000000', '', 62, '登录查询', 1, '', NULL, NULL, 1, 'F', '0', '0', 'monitor:logininfor:query', '#', '1.12.14.62.', 14, 0, '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-29 15:34:36.220728', '2021-12-29 15:34:36.000000', '', 63, '登录删除', 2, '', NULL, NULL, 1, 'F', '0', '0', 'monitor:logininfor:remove', '#', '1.12.14.63.', 14, 0, '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-29 15:34:46.269560', '2021-12-29 15:34:46.000000', '', 64, '日志导出', 3, '', NULL, NULL, 1, 'F', '0', '0', 'monitor:logininfor:export', '#', '1.12.14.64.', 14, 0, '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-29 15:35:26.165014', '2021-12-29 15:35:26.000000', '', 65, '在线查询', 1, '', NULL, NULL, 1, 'F', '0', '0', 'monitor:online:query', '#', '2.43.65.', 43, 0, '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-29 15:35:40.022195', '2021-12-29 15:35:40.000000', '', 66, '批量强退', 2, '', NULL, NULL, 1, 'F', '0', '0', 'monitor:online:batchLogout', '#', '2.43.66.', 43, 0, '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-29 15:35:50.997042', '2021-12-29 15:35:50.000000', '', 67, '单条强退', 3, '', NULL, NULL, 1, 'F', '0', '0', 'monitor:online:forceLogout', '#', '2.43.67.', 43, 0, '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-29 15:36:12.590058', '2021-12-29 15:36:12.000000', '', 68, '任务查询', 1, '', NULL, NULL, 1, 'F', '0', '0', 'monitor:job:query', '#', '2.46.68.', 46, 0, '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-29 15:36:25.111759', '2021-12-29 15:36:25.000000', '', 69, '任务新增', 2, '', NULL, NULL, 1, 'F', '0', '0', 'monitor:job:add', '#', '2.46.69.', 46, 0, '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-29 15:36:36.070927', '2021-12-29 15:36:36.000000', '', 70, '任务修改', 3, '', NULL, NULL, 1, 'F', '0', '0', '	 monitor:job:edit', '#', '2.46.70.', 46, 0, '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-29 15:36:47.605200', '2021-12-29 15:37:14.000000', '', 71, '任务删除', 4, '', NULL, NULL, 1, 'F', '0', '0', 'monitor:job:remove', '#', '2.46.71.', 46, 0, '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-29 15:36:57.920063', '2021-12-29 15:37:18.000000', '', 72, '状态修改', 5, '', NULL, NULL, 1, 'F', '0', '0', 'monitor:job:changeStatus', '#', '2.46.72.', 46, 0, '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-29 15:37:31.201464', '2021-12-29 15:37:31.000000', '', 73, '任务导出', 7, '', NULL, NULL, 1, 'F', '0', '0', 'monitor:job:export', '#', '2.46.73.', 46, 0, '', '', '0');
INSERT INTO `menu` VALUES ('2024-11-15 10:48:41.818687', '2024-11-15 10:53:36.000000', '', 74, '业务管理', 3, 'biz', NULL, NULL, 1, 'M', '0', '0', NULL, 'guide', '74.', NULL, 10, 'admin', 'admin', '0');
INSERT INTO `menu` VALUES ('2024-11-15 10:52:26.949389', '2024-11-15 10:53:51.000000', '', 75, '导航管理', 1, 'nav', 'biz/nav/index', NULL, 1, 'C', '0', '0', 'biz:nav:list', 'tab', '74.75.', 74, 6, 'admin', 'admin', '0');

-- ----------------------------
-- Table structure for notice
-- ----------------------------
DROP TABLE IF EXISTS `notice`;
CREATE TABLE `notice`  (
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `update_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '备注',
  `notice_id` int NOT NULL AUTO_INCREMENT COMMENT '公告id',
  `notice_title` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '公告标题',
  `notice_type` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '公告类型（1通知 2公告）',
  `notice_content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '公告内容',
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '0' COMMENT '公告状态（0正常 1关闭）',
  `version` int NOT NULL COMMENT '版本号',
  `create_by` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '创建人',
  `update_by` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '更新人',
  PRIMARY KEY (`notice_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of notice
-- ----------------------------

-- ----------------------------
-- Table structure for oper_log
-- ----------------------------
DROP TABLE IF EXISTS `oper_log`;
CREATE TABLE `oper_log`  (
  `oper_id` int NOT NULL AUTO_INCREMENT COMMENT '日志主键',
  `title` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '模块标题',
  `business_type` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '0' COMMENT '业务类型',
  `method` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '方法名称',
  `request_method` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '请求方式',
  `operator_type` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '0' COMMENT '操作类别（0其它 1后台用户 2手机端用户）',
  `oper_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '操作人员',
  `dept_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '部门名称',
  `oper_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '请求URL',
  `oper_ip` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '主机地址',
  `oper_location` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '操作地点',
  `oper_param` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '请求参数',
  `json_result` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '返回参数',
  `status` int NOT NULL DEFAULT 0 COMMENT '操作状态（0正常 1异常）',
  `errorMsg` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '返回参数',
  `oper_time` datetime NOT NULL COMMENT '操作时间',
  PRIMARY KEY (`oper_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of oper_log
-- ----------------------------
INSERT INTO `oper_log` VALUES (7, '日志管理', '9', 'LogController.cleanOperLog()', 'DELETE', '0', 'admin', '槑槑总部', '/api/monitor/operlog/clean', '127.0.0.1', '内网IP', '{\"params\":{},\"query\":{},\"body\":{}}', '{\"code\":200,\"msg\":\"Ok\"}', 0, '', '2024-11-25 23:36:23');

-- ----------------------------
-- Table structure for post
-- ----------------------------
DROP TABLE IF EXISTS `post`;
CREATE TABLE `post`  (
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `update_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '备注',
  `post_id` int NOT NULL AUTO_INCREMENT COMMENT '岗位ID',
  `post_code` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '岗位编码',
  `post_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '岗位名称',
  `post_sort` int NOT NULL COMMENT '显示顺序',
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '状态（0正常 1停用）',
  `version` int NOT NULL COMMENT '版本号',
  `create_by` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '创建人',
  `update_by` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '更新人',
  PRIMARY KEY (`post_id`) USING BTREE,
  UNIQUE INDEX `IDX_4365bf877a23182bde2156ec6e`(`post_code` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of post
-- ----------------------------
INSERT INTO `post` VALUES ('2022-01-06 13:39:28.615762', '2024-11-15 16:20:50.000000', '', 1, 'ceo', '董事长', 1, '0', 2, '', 'admin');

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role`  (
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `update_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '备注',
  `role_id` int NOT NULL AUTO_INCREMENT COMMENT '角色ID',
  `role_name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '角色名称',
  `role_key` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '角色权限字符串',
  `role_sort` int NOT NULL COMMENT '显示顺序',
  `data_scope` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '1' COMMENT '数据范围（1：全部数据权限 2：自定数据权限 3：本部门数据权限 4：本部门及以下数据权限 5：仅本人数据权限）',
  `menu_check_strictly` tinyint NOT NULL DEFAULT 1 COMMENT '菜单树选择项是否关联显示',
  `dept_check_strictly` tinyint NOT NULL DEFAULT 1 COMMENT '菜单树选择项是否关联显示',
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '角色状态（0正常 1停用）',
  `del_flag` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '0' COMMENT '删除标志（0代表存在 2代表删除）',
  `version` int NOT NULL COMMENT '版本号',
  `create_by` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '创建人',
  `update_by` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '更新人',
  PRIMARY KEY (`role_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO `role` VALUES ('2021-12-29 16:34:08.369206', '2022-01-06 13:38:18.155638', '', 1, '超级管理员', 'admin', 1, '1', 0, 1, '0', '0', 0, '', '');

-- ----------------------------
-- Table structure for role_depts_dept
-- ----------------------------
DROP TABLE IF EXISTS `role_depts_dept`;
CREATE TABLE `role_depts_dept`  (
  `roleRoleId` int NOT NULL,
  `deptDeptId` int NOT NULL,
  PRIMARY KEY (`roleRoleId`, `deptDeptId`) USING BTREE,
  INDEX `IDX_c38adaee013585bdc3f36a4edc`(`roleRoleId` ASC) USING BTREE,
  INDEX `IDX_a6df3f8f1af0e6fcd2424ff467`(`deptDeptId` ASC) USING BTREE,
  CONSTRAINT `FK_a6df3f8f1af0e6fcd2424ff467c` FOREIGN KEY (`deptDeptId`) REFERENCES `dept` (`dept_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FK_c38adaee013585bdc3f36a4edcf` FOREIGN KEY (`roleRoleId`) REFERENCES `role` (`role_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of role_depts_dept
-- ----------------------------

-- ----------------------------
-- Table structure for role_menus_menu
-- ----------------------------
DROP TABLE IF EXISTS `role_menus_menu`;
CREATE TABLE `role_menus_menu`  (
  `roleRoleId` int NOT NULL,
  `menuMenuId` int NOT NULL,
  PRIMARY KEY (`roleRoleId`, `menuMenuId`) USING BTREE,
  INDEX `IDX_d770d9678ced1d5a050126672f`(`roleRoleId` ASC) USING BTREE,
  INDEX `IDX_5b29b58ccc52b56f0a1ad62920`(`menuMenuId` ASC) USING BTREE,
  CONSTRAINT `FK_5b29b58ccc52b56f0a1ad629209` FOREIGN KEY (`menuMenuId`) REFERENCES `menu` (`menu_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FK_d770d9678ced1d5a050126672fa` FOREIGN KEY (`roleRoleId`) REFERENCES `role` (`role_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of role_menus_menu
-- ----------------------------

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `update_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '备注',
  `user_id` int NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `user_name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '用户账号',
  `nick_name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '用户昵称',
  `user_type` varchar(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '00' COMMENT '用户类型（00系统用户）',
  `email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '用户邮箱',
  `phonenumber` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '手机号码',
  `sex` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '0' COMMENT '用户性别（0男 1女 2未知）',
  `avatar` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '头像地址',
  `password` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '密码',
  `salt` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '盐加密',
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '0' COMMENT '帐号状态（0正常 1停用）',
  `del_flag` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '0' COMMENT '删除标志（0代表存在 2代表删除）',
  `login_ip` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '最后登录IP',
  `login_date` datetime NULL DEFAULT NULL COMMENT '最后登录时间',
  `deptDeptId` int NULL DEFAULT NULL COMMENT '部门id',
  `version` int NOT NULL COMMENT '版本号',
  `create_by` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '创建人',
  `update_by` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '更新人',
  PRIMARY KEY (`user_id`) USING BTREE,
  INDEX `FK_d61db9f4f5464b51df4bd6f2332`(`deptDeptId` ASC) USING BTREE,
  CONSTRAINT `FK_d61db9f4f5464b51df4bd6f2332` FOREIGN KEY (`deptDeptId`) REFERENCES `dept` (`dept_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('2021-12-29 16:12:02.053561', '2022-01-06 13:42:55.000000', '', 1, 'admin', 'admin', '00', '87789771@qq.com', '13006133172', '0', '', '9c68fb331431f8dcfb7defef22b0c527', 'Y2uPc7hyq8Vi5qBc879Ut', '0', '0', '', NULL, 1, 0, '', '');

-- ----------------------------
-- Table structure for user_posts_post
-- ----------------------------
DROP TABLE IF EXISTS `user_posts_post`;
CREATE TABLE `user_posts_post`  (
  `userUserId` int NOT NULL,
  `postPostId` int NOT NULL,
  PRIMARY KEY (`userUserId`, `postPostId`) USING BTREE,
  INDEX `IDX_28fca0ded6fc3ab66b451623f0`(`userUserId` ASC) USING BTREE,
  INDEX `IDX_3511ec6a3e38572359525a8550`(`postPostId` ASC) USING BTREE,
  CONSTRAINT `FK_28fca0ded6fc3ab66b451623f05` FOREIGN KEY (`userUserId`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_3511ec6a3e38572359525a85502` FOREIGN KEY (`postPostId`) REFERENCES `post` (`post_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of user_posts_post
-- ----------------------------
INSERT INTO `user_posts_post` VALUES (1, 1);

-- ----------------------------
-- Table structure for user_roles_role
-- ----------------------------
DROP TABLE IF EXISTS `user_roles_role`;
CREATE TABLE `user_roles_role`  (
  `userUserId` int NOT NULL,
  `roleRoleId` int NOT NULL,
  PRIMARY KEY (`userUserId`, `roleRoleId`) USING BTREE,
  INDEX `IDX_0bd606ba8531dd93b457b8486d`(`userUserId` ASC) USING BTREE,
  INDEX `IDX_56f8ede2f2e059d4db74591c53`(`roleRoleId` ASC) USING BTREE,
  CONSTRAINT `FK_0bd606ba8531dd93b457b8486d9` FOREIGN KEY (`userUserId`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_56f8ede2f2e059d4db74591c533` FOREIGN KEY (`roleRoleId`) REFERENCES `role` (`role_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of user_roles_role
-- ----------------------------
INSERT INTO `user_roles_role` VALUES (1, 1);

SET FOREIGN_KEY_CHECKS = 1;
