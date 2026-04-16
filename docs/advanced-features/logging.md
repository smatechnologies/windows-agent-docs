---
sidebar_label: "Logging"
title: Logging
description: "Understand the Windows Agent log files, their locations, archive behavior, and how to configure log retention."
tags:
  - Reference
  - System Administrator
  - Agents
  - System Configuration
---

# Logging

**Theme:** Troubleshoot  
**Who Is It For?** System Administrator

## What is it?

The Windows Agent and its supporting components write several log files to record processing activity, configuration changes, and errors. All logs are written to the `<Output Directory>\MSLSAM\Log\` directory.

* Review MSLSAM.log for agent processing and configuration information
* Enable trace logging to capture detailed diagnostic messages in MSLSAMTrace.log
* Access archived logs in date-organized folders under the Archives directory

## When to use

- When troubleshooting agent startup failures, job execution problems, or communication issues with the OpCon server.
- When diagnosing JORS output retrieval failures or file transfer errors using the component-specific log files.
- When enabling trace logging temporarily to capture detailed diagnostic information for support.

## Benefits

- Log files are automatically archived when they reach maximum size, preventing disk fill while maintaining a rolling history of agent activity.
- Each agent component writes to its own log file, making it straightforward to isolate whether a problem is in the agent, JORS, or SMAFT.

:::note
The Output Directory was configured during the installation. For more information, refer to [File Locations](https://help.smatechnologies.com/opcon/core/file-locations) in the **Concepts** online help.
:::

The log files include:

- **MSLSAM.log**: The agent writes processing information to the MSLSAM.log file. The agent also writes all configuration information to the log when it starts or when it detects a change to the MSLSAM.ini file.
- **MSLSAMTrace.log**: If tracing is activated, the agent writes detailed messages to the MSLSAMTrace.log file.
- **SMAFTAgent.log**: The SMAFTAgent writes processing information to the SMAFTAgent.log file.
- **SMAFTAgentTrace.log**: If tracing is activated, the SMAFTAgent writes detailed messages to the SMAFTAgentTrace.log file.
- **MSJORS.log**: The MSJORS service writes processing information to the MSJORS.log file. This information includes job output requests and file transfer requests.

When log files reach a user-configured maximum size, the agent archives them. The `<Output Directory>\MSLSAM\Log\Archives\` folder is the location of all archived log files.

A folder exists in the Archives folder for each day the agent processes. The folder names use the following naming convention: `yyyy_mm_dd (Weekday)`. For example, the folder name for January 11, 2008 would be `2008_01_11 (Friday)`.

As each log file fills up, the agent moves the log file into the current archive folder and renames it using the following naming convention: `LogName StartTime - StopTime.log`. For example, an MSLSAM archive file for the time range of 12:58:16 to 13:58:00 would be `MSLSAM 125816 - 135800.log`.

By default, the agent retains 10 days of archived logs. Configure the MSLSAM.ini file to adjust this setting. For information on log and debug settings, refer to [Debug options](../administration/configuration#debug-options).

:::note
The agent does not purge any archive folders if files other than archived files are present.
:::

## Configuration options

The following MSLSAM.ini settings control log file behavior. For complete setting descriptions, refer to [MSLSAM.ini configuration file](../administration/configuration).

| Setting | What It Does | Default | Notes |
|---|---|---|---|
| `MaximumLogFileSize` | Maximum size in bytes for each log file before it is archived and a new file is started. | `150000` | Dynamic — no service restart needed. |
| `ArchiveDaysToKeep` | Number of days of archived log folders to retain before automatic cleanup. | `10` | Dynamic — no service restart needed. |
| `TraceLevel` | Logging detail level. `0` = standard logging; `1` = more detailed logging written to MSLSAM.log. | `0` | Dynamic — no service restart needed. |
| `TraceSAMMessages` | When `ON`, traces SMANetCom communication messages to MSLSAMTrace.log. Useful for diagnosing communication issues. | `ON` | Dynamic — no service restart needed. Case-sensitive. |

## Glossary

**MSLSAMTrace.log** — A log file written when trace logging is enabled. Captures detailed SMANetCom messages useful for diagnosing communication issues between the agent and OpCon.

**Archives** — The subdirectory under the agent's Log folder where log files are automatically moved and renamed when they reach the configured maximum size. Organized into date-named subfolders.

**ArchiveDaysToKeep** — The MSLSAM.ini setting that controls how many days of archived log folders the agent retains before automatic cleanup.
