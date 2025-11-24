@echo off
echo Deploying to GitHub...
git add .
set /p commit_msg="Enter commit message: "
git commit -m "%commit_msg%"
git push origin main
echo Deployment complete!
pause
