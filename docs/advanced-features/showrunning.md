---
sidebar_label: "ShowRunning"
title: ShowRunning command
description: "Display the process IDs and command lines for all jobs currently running on the Windows Agent."
tags:
  - Reference
  - Automation Engineer
  - Agents
---

# ShowRunning command

**Theme:** Troubleshoot  
**Who Is It For?** Automation Engineer

## What is it?

`ShowRunning.exe` is a command-line utility used to display the Windows process ID (PID) numbers of Windows Agent jobs. ShowRunning reads the agent tracking file and lists the Windows PID number and the command line for each job currently processing. Administrators can use this information to kill any unwanted jobs. For more information on the kill command, refer to [Kill command](kill).

* List all running job PIDs and their command lines in one command
* Identify the PID of a specific job before using the Kill command to terminate it

## When to use

- Before using the Kill command, when you need to identify the exact process ID of a specific running job.
- When diagnosing which jobs are currently active on the agent, for example during an unexpected outage or performance event.

## Benefits

- Lists all running job PIDs and command lines in one command without needing access to Windows Task Manager or a remote desktop session.
- Works from any command prompt on the agent machine, including remote or scripted sessions.

## Run ShowRunning

To display the list of running jobs, complete the following steps:

1. Use menu path: **Start \> Run**.
2. Enter `cmd` to open a command window. The command window opens.
3. Change the directory to the agent's directory.
4. Enter `showrunning`.
5. View the list of PID numbers and command lines of jobs being run by the agent.
6. Close the command window.

## FAQs

**Does ShowRunning display jobs from all agents on this machine?**  
No. ShowRunning reads the local agent tracking file and lists only the jobs managed by the agent instance in the current directory. If multiple agent instances are installed, run ShowRunning from each instance's directory to see its jobs.

**Can I run ShowRunning remotely?**  
ShowRunning requires command-line access to the agent machine and reads the local tracking file. It cannot query agent state from a remote machine directly. Remote access (such as a remote desktop or SSH session) is required to run it on the agent machine.

## Glossary

**PID** — Process ID; the unique integer the operating system assigns to each running process. Use ShowRunning or Windows Task Manager to find the PID of a job started by the agent.
