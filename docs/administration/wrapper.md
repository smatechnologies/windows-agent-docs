---
sidebar_label: "StartAllProcessWrapper"
title: StartAllProcessWrapper
description: "Use StartAllProcessWrapper to run a script or executable as a proxy for all jobs started by the Windows Agent."
tags:
  - Conceptual
  - System Administrator
  - Agents
  - System Configuration
---

# StartAllProcessWrapper

**Theme:** Configure  
**Who Is It For?** System Administrator

## What is it?

The `StartAllProcessWrapper` setting in MSLSAM.ini specifies an executable or script that the agent runs as a proxy for every job it starts. The wrapper receives the job's original command line as an argument, executes any shared pre- or post-processing steps, and then invokes the actual job. Common uses include capturing job start and stop times, environment variables, and stdout and stderr output, all of which are accessible through View Job Output.

* Apply common pre- or post-processing steps to all jobs on a machine from one configuration point
* Capture job timing, environment variables, and stdout/stderr uniformly across all jobs

## When to use

- When every job on a machine needs to follow a consistent pre- or post-execution routine, such as environment setup, logging, or notification.
- When you need to capture uniform metadata across all jobs without modifying each individual job definition.

## Benefits

- Applies consistent behavior to all jobs from a single configuration point, without changing individual job definitions in OpCon.
- Reduces duplication by centralizing shared processing logic in one script or executable on the agent machine.

## Configuration options

The following MSLSAM.ini settings configure StartAllProcessWrapper behavior. For complete setting descriptions, refer to [MSLSAM.ini configuration file](../administration/configuration).

| Setting | What It Does | Default | Notes |
|---|---|---|---|
| `StartAllProcessesWrapper` | Full path to the wrapper script or executable. The agent passes the original job command line as arguments to this program. | Blank | Requires service restart. Enclose path in double quotes. Must be a `.bat`, `.cmd`, `.exe`, or `.com` file. |
| `KillWrapperOnJobKill` | When `TRUE`, kills the wrapper process in addition to child processes when the agent receives a kill command. When `FALSE`, only child processes are killed. | `FALSE` | Dynamic — no service restart needed. |
| `UseWrapperForPreruns` | When `TRUE`, the wrapper is also applied to prerun jobs in addition to main jobs. | `FALSE` | Dynamic — no service restart needed. |

## FAQs

**Does the wrapper replace the job's command line, or does it run alongside it?**  
The wrapper acts as a proxy — the agent calls the wrapper and passes the original job command line as an argument. The wrapper is responsible for executing the actual job and must capture and send the job's termination value back to OpCon (for example, through an E.C.O.F.).

**Can the wrapper be used for prerun jobs as well?**  
By default, the wrapper applies only to main jobs. Set `UseWrapperForPreruns` to `TRUE` in MSLSAM.ini to also apply the wrapper to prerun jobs.

## Glossary

**StartAllProcessWrapper** — An MSLSAM.ini setting specifying a script or executable the agent runs as a proxy for every job it starts. The wrapper receives the original job command line as an argument.

**Proxy** — In the context of StartAllProcessWrapper, a script or executable that intercepts each job's start, applies shared pre- or post-processing steps, and then invokes the actual job command.
