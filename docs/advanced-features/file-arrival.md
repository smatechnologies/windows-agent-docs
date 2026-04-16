---
sidebar_label: "File Arrival"
title: File Arrival
description: "Monitor for file arrivals using the Windows Agent File Arrival job type, with support for wildcards, sub-directories, and stable-size checking."
tags:
  - Conceptual
  - Automation Engineer
  - Agents
  - Jobs
---

# File Arrival

**Theme:** Overview  
**Who Is It For?** Automation Engineer

## What is it?

The Windows Agent includes components that support the File Arrival job type. File Arrival jobs monitor a file system location and hold downstream processing until a file matching the defined criteria arrives. This eliminates the need for polling loops or fixed-time scheduling when file delivery times are variable.

* Monitor for files by exact name, wildcard pattern, or UNC path
* Verify that a file's size is stable for a defined period before reporting arrival
* Trigger downstream jobs only after the file is confirmed as fully written

## When to use

- When downstream jobs depend on files delivered by external systems or upstream batch processes with unpredictable delivery windows.
- When you need to verify that a file has finished writing before allowing dependent jobs to process it.
- When file names follow a pattern that varies by date or other dynamic values and cannot be specified exactly in advance.

## Benefits

- Removes the need for custom polling scripts or time-padded schedules around file deliveries.
- Prevents premature processing by confirming file stability — via size check — before releasing dependent jobs.

## Glossary

**SMAFilewatcher.exe** — The Windows Agent component responsible for monitoring file system locations for the File Arrival job type.

**Stable time** — The period a file must remain unchanged in size before File Arrival considers it fully written and reports successful arrival. `SMAFilewatcher.exe` is the main program responsible for file-watching functions. Supported File Arrival features include:

- Watching for a specific file name, a file name with wildcards, or a UNC path name
- Watching sub-directories
- Watching for a file's creation stamp to be within a specific time frame
- Watching for a file's size to be stable for a specific amount of time before reporting the file's successful arrival
- Using tokens for the time frame and stable time
- Defining advanced failure criteria

For information on creating File Arrival jobs, refer to [Defining Job Action: File Arrival Job Details](https://help.smatechnologies.com/opcon/core/Files/UI/Enterprise-Manager/Job-Type-Management/#defining-job-action-file-arrival-job-details-1) in the **Enterprise Manager** online help.
