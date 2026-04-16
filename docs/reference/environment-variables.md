---
sidebar_label: 'Environment variables'
title: Windows Agent environment variables
description: "Reference for all environment variables the Windows Agent defines for each job it starts."
tags:
  - Reference
  - Automation Engineer
  - Agents
  - Jobs
---

# Windows Agent environment variables

**Theme:** Overview  
**Who Is It For?** Automation Engineer

## What is it?

The Windows Agent defines several environment variables for each job it starts. These variables give jobs access to OpCon execution context — such as job name, schedule, and output paths — without requiring that information to be passed as command-line arguments.

* Access the OpCon job name, schedule name, schedule date, and frequency from within any running job
* Reference the agent's installation directory and job output file path dynamically, without hardcoding values

## When to use

- When a script or program needs to know its OpCon job name, schedule name, or schedule date at runtime.
- When building portable scripts that reference the agent's installation directory or job output file path without hardcoding values.

## Benefits

- Jobs can reference OpCon execution context without requiring metadata to be explicitly passed as command-line arguments, simplifying job definitions.
- Scripts become portable across agent machines because paths like the installation directory and job output file are resolved dynamically at runtime.

| Environment variable | Description |
|---|---|
| `SMA_MSLSAM_JOB_NAME` | The name of the job defined in OpCon. |
| `SMA_MSLSAM_JOBOUTPUT_FILENAME` | The full path of the job output file created for the current job. |
| `SMA_MSLSAM_LSAM_NAME` | The name defined in the OpCon database for this agent. |
| `SMA_MSLSAM_PRERUN_ACTIVE` | A value of `TRUE` or `FALSE` indicating whether the currently running job process is a prerun job or a main job. |
| `SMA_MSLSAM_RESTART_STEP` | The optional restart step sent to the agent for the job in the `SMA_MSLSAM_JOB_NAME` variable. |
| `SMA_MSLSAM_ROOT_DIRECTORY` | The path to the directory where the agent is installed. |
| `SMA_MSLSAM_SAM_JOB_ID` | A 27-character unique job ID comprising a 12-character job name, 5 spaces, and a 10-digit job number. |
| `SMA_MSLSAM_SCHEDULE_DATE` | The date of the schedule containing the job in the `SMA_MSLSAM_JOB_NAME` variable. |
| `SMA_MSLSAM_SCHEDULE_FREQ` | The schedule frequency of the job in the `SMA_MSLSAM_JOB_NAME` variable. |
| `SMA_MSLSAM_SCHEDULE_NAME` | The name of the schedule containing the job in the `SMA_MSLSAM_JOB_NAME` variable. |

## FAQs

**Are these environment variables available in all job types, including scripts and executables?**  
Yes. The agent defines these variables for every job process it starts, regardless of whether the job runs a batch script, executable, or command line. Any process started by the agent inherits these variables.

**How do I reference these variables in a batch script?**  
Use standard Windows batch variable syntax: `%SMA_MSLSAM_JOB_NAME%`, `%SMA_MSLSAM_SCHEDULE_DATE%`, etc.

