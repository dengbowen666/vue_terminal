
# 获取当前时间，格式为 "YYYY-MM-DD HH:MM:SS"
current_time=$(date "+%Y-%m-%d %H:%M:%S")

# 检查是否有未提交的更改
  # 添加所有更改到暂存区
  git add .
  # 提交更改，使用当前时间作为提交信息
  git commit -m "$current_time"
  # 推送到远程仓库，默认为origin分支
  git push origin master
