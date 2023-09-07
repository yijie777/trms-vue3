-- 注意：该页面对应的前台目录为views/trms文件夹下
-- 如果你想更改到其他目录，请修改sql中component字段对应的值


INSERT INTO sys_permission(id, parent_id, name, url, component, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_route, is_leaf, keep_alive, hidden, hide_tab, description, status, del_flag, rule_flag, create_by, create_time, update_by, update_time, internal_or_external) 
VALUES ('2023090611215730300', NULL, '容器管理', '/trms/trmsDockerContainerList', 'trms/TrmsDockerContainerList', NULL, NULL, 0, NULL, '1', 0.00, 0, NULL, 1, 0, 0, 0, 0, NULL, '1', 0, 0, 'admin', '2023-09-06 23:21:30', NULL, NULL, 0);

-- 权限控制sql
-- 新增
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2023090611215730301', '2023090611215730300', '添加容器管理', NULL, NULL, 0, NULL, NULL, 2, 'trms:trms_docker_container:add', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2023-09-06 23:21:30', NULL, NULL, 0, 0, '1', 0);
-- 编辑
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2023090611215730302', '2023090611215730300', '编辑容器管理', NULL, NULL, 0, NULL, NULL, 2, 'trms:trms_docker_container:edit', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2023-09-06 23:21:30', NULL, NULL, 0, 0, '1', 0);
-- 删除
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2023090611215730303', '2023090611215730300', '删除容器管理', NULL, NULL, 0, NULL, NULL, 2, 'trms:trms_docker_container:delete', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2023-09-06 23:21:30', NULL, NULL, 0, 0, '1', 0);
-- 批量删除
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2023090611215730304', '2023090611215730300', '批量删除容器管理', NULL, NULL, 0, NULL, NULL, 2, 'trms:trms_docker_container:deleteBatch', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2023-09-06 23:21:30', NULL, NULL, 0, 0, '1', 0);
-- 导出excel
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2023090611215730305', '2023090611215730300', '导出excel_容器管理', NULL, NULL, 0, NULL, NULL, 2, 'trms:trms_docker_container:exportXls', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2023-09-06 23:21:30', NULL, NULL, 0, 0, '1', 0);
-- 导入excel
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2023090611215730306', '2023090611215730300', '导入excel_容器管理', NULL, NULL, 0, NULL, NULL, 2, 'trms:trms_docker_container:importExcel', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2023-09-06 23:21:30', NULL, NULL, 0, 0, '1', 0);