---
sidebar_label: "Kill"
title: Kill command
description: "Force-end a running process by process ID using the kill.exe command-line utility included with the Windows Agent."
tags:
  - Reference
  - Automation Engineer
  - Agents
---

# Kill command

**Theme:** Troubleshoot  
**Who Is It For?** Automation Engineer

## What is it?

SMA Technologies provides a `kill.exe` command that forcibly ends a process by its process ID (PID). The command is in the `<Target Directory>\OpConxps\MSLSAM\` directory. It is intended for situations where a job process must be ended outside of the normal OpCon job management interface.

* Terminate a specific process by PID from the command line
* End processes that cannot be stopped through the OpCon Operations view or a `$JOB:KILL` event

## When to use

- When a job process is hung and cannot be terminated through the Operations view or a `$JOB:KILL` event.
- When you need to free a specific PID immediately from the command line.

## Benefits

- Provides a direct command-line option to end a specific process without needing GUI access to Windows Task Manager or the OpCon Operations view.
- Useful in scripted recovery procedures where interactive access to management tools is not available.

:::tip
To make `kill.exe` easier to access, copy the file into the Windows or WINNT directory. Because the Windows/WINNT directories are in the default path statement, the kill command is available for execution from any directory on the machine.
:::

This kill command only kills a specific PID and does not kill any child processes. If the job was started through OpCon, SMA Technologies strongly recommends killing the job through the Operations view or a `$JOB:KILL` event to ensure child processes are also killed. For more information on killing jobs from the Operations view, refer to [Jobs Status Change Commands](https://help.smatechnologies.com/opcon/core/operations/status-change-commands#jobs-status-change-commands) in the **Concepts** online help. The MSLSAM.ini file contains a setting named [KillWrapperOnJobKill](../administration/configuration#general-settings) that should be configured for the desired behavior with the OpCon Kill options.

## Syntax

```bat
kill <pid>
```

- **kill**: The name of the command.
- **\<pid\>**: The process ID of the process to kill.

To obtain the ID number of the process to kill, view the processes in Windows Task Manager or view the list of process IDs displayed by the ShowRunning command. For more information, refer to [ShowRunning](showrunning).

## FAQs

**Does kill.exe terminate child processes?**  
No. The kill command only terminates the specific PID provided. Child processes started by that process are not affected. To ensure child processes are also killed, use the Operations view or a `$JOB:KILL` event in OpCon instead.

**When would I use kill.exe instead of the OpCon Operations view?**  
Use kill.exe when GUI access to OpCon or a remote desktop session is unavailable, for example in scripted recovery procedures or when the Operations view cannot reach the agent.
