---
sidebar_label: 'Machine messages'
title: Windows Agent machine messages
description: "Reference for Windows Agent exit condition codes returned for failed jobs and File Arrival jobs."
tags:
  - Reference
  - System Administrator
  - Automation Engineer
  - Agents
---

# Windows Agent machine messages

**Theme:** Troubleshoot  
**Who Is It For?** System Administrator

## What is it?

Windows Agent machine messages are exit condition codes in the 31000 series returned by the agent when a job fails due to an agent-level problem. They are distinct from Windows OS exit codes and appear in the LSAM Feedback category in OpCon's Operations view.

* Identify agent-level failures when a job exits with a code in the 31000 series
* Distinguish between agent-managed failures and Windows OS exit codes

## When to use

- When a job fails with an exit code in the 31000 range and you need to diagnose the specific agent-level failure.
- When investigating why a File Arrival job did not complete successfully.

## Benefits

- 31000-series codes identify agent-level failures precisely, eliminating guesswork when a job fails for infrastructure reasons rather than application logic.
- Knowing the specific code meaning enables faster triage — administrators can identify at a glance whether a failure is a permissions issue, bad command line, or user profile problem.

## Exception handling

**Job fails with exit code 31001 or 31002** — The command line path (31001) or prerun command line path (31002) in the job definition is invalid. Verify that the path points to an existing executable on the agent machine and that the path is correctly formatted.

**Job fails with exit code 31007** — The agent could not create a process for the job. The executable path may be valid but the process cannot be launched due to insufficient permissions or a missing dependency. Verify that the account running the job has execute rights on the target executable and that all required dependencies are accessible.

**Job fails with exit code 31010 or 31016** — The agent could not log on as the submitted user (31010), or the user name was not found because the user has never logged on to this machine (31016). Ensure the user specified in the job definition has logged on to the agent machine at least once to create a Windows user profile, then verify the credentials are correct.

**File Arrival job fails with exit code 1** — The monitored file was not found. The file may not have arrived yet, the file name or wildcard pattern may be incorrect, or the agent service account may lack read permissions on the monitored directory. Verify the path, file name, and that the agent service account has read access.

**File Arrival job fails with exit code 2** — The monitored directory path was not found. The directory does not exist or the agent lacks access to it. Verify that the path in the job definition exists and that the agent service account has read permissions on that directory.

## FAQs

**Is exit code 31000 an error?**  
No. Code 31000 is the initial state assigned when a job is created and no exit code has been set yet. It indicates the agent has not yet recorded any failure condition for the job.

**If a job fails with exit code 1, is that a Windows Agent code or a Windows OS code?**  
For standard Windows jobs, exit code 1 is a Windows OS exit code — it is not in the 31000-series Windows Agent range. However, for File Arrival jobs, exit code 1 specifically means the file was not found.

## Glossary

**Exit condition** — A Windows Agent-defined numeric code in the 31000 series indicating a specific agent-level failure. If a code is not in this list, it is a standard Windows OS exit code.

**LSAM Feedback** — The category in OpCon's Operations view and job history where agent-generated status messages and exit codes are displayed.

The following is a list of Windows Agent exit conditions for failed jobs. If an exit condition is not in this list, it is a Windows exit code. For information on Windows errors, refer to [Windows System Errors](https://help.smatechnologies.com/opcon/core/reference/Windows-System-Errors) in the **Concepts** online help. Within the Operations view, agent messages are available under **Job Information \> Configuration** in the **LSAM Feedback** category.

| Exit condition number | Description |
|---|---|
| 31000 | This is the initial state when the job is created. No error code has been set. |
| 31001 | The path entered for the command line on the details screen is invalid. |
| 31002 | The path entered for the prerun command line on the details screen is invalid. |
| 31003 | The prerun command line entered in the details screen for this job contains too many characters. The maximum length of the prerun is 3276 characters. |
| 31004 | The command line entered in the details screen for this job contains too many characters. The maximum length of the command line is 4000 characters. |
| 31005 | The prerun working directory entered in the details screen for this job contains too many characters. The maximum length of the prerun working directory is 255 characters. |
| 31006 | The working directory entered in the details screen for this job contains too many characters. The maximum length of the working directory is 255 characters. |
| 31007 | The agent could not create a process for this job. |
| 31008 | The agent was unable to obtain the rights for the user submitted with the job. |
| 31009 | The agent was unable to grant the user rights to the process. |
| 31010 | The agent was unable to log on as the user submitted with the job. |
| 31011 | The agent was unable to load the environment for the user submitted with the job. |
| 31012 | The agent was unable to load the Windows profile for the user submitted with the job. |
| 31013 | The agent was unable to unload the Windows profile for the user submitted with the job. |
| 31014 | The agent was unable to find the E.C.O.F. specified. |
| 31015 | The agent was unable to start the job in the specified user-security context (unable to impersonate the user). |
| 31016 | The agent was unable to find the user name for this user. This may be because the user has never logged on to this machine. |
| 31017 | Unable to get user token. |

The following is a list of Windows Agent exit codes specifically for File Arrival jobs.

| Exit code | Description |
|---|---|
| 1 | The file is not found. Reasons include an invalid file name, the file has not arrived yet, or permissions. |
| 2 | The path is not found. Reasons include an invalid path or permissions. |
| 3 | A file is found but the creation date is out of range. |
