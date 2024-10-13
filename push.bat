#!/bin/bash

# 获取当前时间
current_time=$(date "+%Y-%m-%d %H:%M:%S")

# 提交信息
commit_message="Update at $current_time"

# 添加所有更改到暂存区
git add .

# 提交更改
git commit -m "$commit_message"

# 推送到远程仓库
git push origin master