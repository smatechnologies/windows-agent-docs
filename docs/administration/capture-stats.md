---
sidebar_label: "CaptureJobStatistics"
title: CaptureJobStatistics
description: "Enable CaptureJobStatistics to collect performance counters for Windows Agent jobs and view them in Daily Job Operations."
tags:
  - Reference
  - System Administrator
  - Agents
  - System Configuration
---

# CaptureJobStatistics

**Theme:** Configure  
**Who Is It For?** System Administrator

## What is it?

`CaptureJobStatistics` is a Windows Agent setting that enables collection of performance metrics for each job the agent runs. When active, the agent records CPU, memory, and I/O counters for each job and makes them available in the OpCon Daily Job Operations view under the **LSAM Feedback** category.

* Enable or disable job performance capture with a single MSLSAM.ini setting
* View CPU, memory, and I/O metrics per job in the LSAM Feedback category in Daily Job Operations

## When to use

- When you need to identify which scheduled jobs are consuming the most CPU or memory on the agent machine.
- When troubleshooting performance degradation in a production environment and need to correlate resource usage with specific job executions.

## Benefits

- Provides performance visibility without requiring custom monitoring scripts or third-party tools on the agent machine.
- Makes resource consumption data available in OpCon's standard job views alongside other job details, keeping operational information in one place.

If `CaptureJobStatistics` is set to `TRUE`, the agent captures the performance details for the following performance counters:

- Total Processor Time
- User Processor Time
- Virtual Memory Size
- Physical Memory Size
- Job End Time
- % Process Usage
- I/O Data Bytes/Sec
- I/O Data Operations/Sec
- I/O Other Bytes/Sec
- I/O Other Operations/Sec
- I/O Read Bytes/Sec
- I/O Read Operations/Sec
- I/O Write Bytes/Sec
- I/O Write Operations/Sec

The captured information is available in Daily Job Operations and History under the **LSAM Feedback** category.

## Configuration options

The following MSLSAM.ini setting enables job statistics capture. For the complete setting description, refer to [MSLSAM.ini configuration file](../administration/configuration).

| Setting | What It Does | Default | Notes |
|---|---|---|---|
| `CaptureJobStatistics` | Enables or disables collection of CPU, memory, and I/O performance counters for each job. When `TRUE`, data is available in the LSAM Feedback category in Daily Job Operations and History. | `FALSE` | Dynamic — no service restart needed. |

## Glossary

**CaptureJobStatistics** — The MSLSAM.ini setting that enables or disables collection of performance counters for each job run by the agent. Default is `FALSE`.

**LSAM Feedback** — The category in OpCon's Daily Job Operations and History views where agent-generated data such as job statistics and exit codes are displayed.
