---
sidebar_label: "Kill"
---

# Kill command

SMA Technologies provides a kill.exe command that forcibly ends a process. The command is in the <Target Directory\>\\OpConxps\\MSLSAM\\ directory.

:::tip
To make kill.exe easier to access, copy the file into the Windows or WINNT directory. Because the Windows/WINNT directories are in the default path statement, the kill command is available for execution from any directory on the machine.
:::

This kill command only kills a specific PID, and does not kill any child processes. If the job was started through OpCon, SMA Technologies strongly recommends killing the job through EM Operation or a $JOB:KILL event to ensure children processes are also killed. For more information on killing jobs from EM Operation, please refer to [Jobs Status Change Commands](https://help.smatechnologies.com/opcon/core/latest/Files/Concepts/Schedule%20and%20Job%20Status%20Change%20Commands.htm#Jobs) in the **Concepts** online help. The MSLSAM configuration file contains a setting named [KillWrapperOnJobKill](../administration/configuration#general-settings) that should be configured for the desired behavior with the OpCon Kill options.

## Syntax

```bat
kill <pid\>
```

- **kill**: The name of the command.
- **<pid\>**: The process ID of the process to kill.

To obtain the ID number of the process to kill, view the processes in the Windows Task Manager or view the list of process IDs displayed by the showrunning command. For more information on the showrunning command, refer to [ShowRunning](showrunning).
