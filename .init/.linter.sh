#!/bin/bash
cd /home/kavia/workspace/code-generation/responsive-tic-tac-toe-platform-287230-287239/tic_tac_toe_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

