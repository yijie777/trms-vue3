-- 注意：该页面对应的前台目录为views/trms文件夹下
-- 如果你想更改到其他目录，请修改sql中component字段对应的值


INSERT INTO sys_permission(id, parent_id, name, url, component, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_route, is_leaf, keep_alive, hidden, hide_tab, description, status, del_flag, rule_flag, create_by, create_time, update_by, update_time, internal_or_external) 
VALUES ('2023090611212080430', NULL, '镜像管理', '/trms/trmsDockerImageList', 'trms/TrmsDockerImageList', NULL, NULL, 0, NULL, '1', 0.00, 0, NULL, 1, 0, 0, 0, 0, NULL, '1', 0, 0, 'admin', '2023-09-06 23:21:43', NULL, NULL, 0);

-- 权限控制sql
-- 新增
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2023090611212080431', '2023090611212080430', '添加镜像管理', NULL, NULL, 0, NULL, NULL, 2, 'trms:trms_docker_image:add', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2023-09-06 23:21:43', NULL, NULL, 0, 0, '1', 0);
-- 编辑
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2023090611212080432', '2023090611212080430', '编辑镜像管理', NULL, NULL, 0, NULL, NULL, 2, 'trms:trms_docker_image:edit', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2023-09-06 23:21:43', NULL, NULL, 0, 0, '1', 0);
-- 删除
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2023090611212080433', '2023090611212080430', '删除镜像管理', NULL, NULL, 0, NULL, NULL, 2, 'trms:trms_docker_image:delete', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2023-09-06 23:21:43', NULL, NULL, 0, 0, '1', 0);
-- 批量删除
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2023090611212080434', '2023090611212080430', '批量删除镜像管理', NULL, NULL, 0, NULL, NULL, 2, 'trms:trms_docker_image:deleteBatch', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2023-09-06 23:21:43', NULL, NULL, 0, 0, '1', 0);
-- 导出excel
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2023090611212080435', '2023090611212080430', '导出excel_镜像管理', NULL, NULL, 0, NULL, NULL, 2, 'trms:trms_docker_image:exportXls', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2023-09-06 23:21:43', NULL, NULL, 0, 0, '1', 0);
-- 导入excel
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2023090611212080436', '2023090611212080430', '导入excel_镜像管理', NULL, NULL, 0, NULL, NULL, 2, 'trms:trms_docker_image:importExcel', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2023-09-06 23:21:43', NULL, NULL, 0, 0, '1', 0);