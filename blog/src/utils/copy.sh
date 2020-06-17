#!/bin/zsh
cd /Users/hxy_nuc/WebstormProjects/nodejs_blog/logs/
cp access.log $(date +%Y-%m-%d).access.log
echo "" > access.log