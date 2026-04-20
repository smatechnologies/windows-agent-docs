---
sidebar_label: "InitializationScript and TerminationScript"
title: InitializationScript and TerminationScript
description: "Configure InitializationScript and TerminationScript to map network drives and printers when the Windows Agent starts and stops."
tags:
  - Conceptual
  - System Administrator
  - Agents
  - System Configuration
---

# InitializationScript and TerminationScript

**Theme:** Configure  
**Who Is It For?** System Administrator

## What is it?

The `InitializationScript` and `TerminationScript` settings in MSLSAM.ini specify scripts that run automatically when the Windows Agent starts and stops. The InitializationScript is most commonly used to map network drives or printers that jobs need during execution, and the TerminationScript unmaps them when the agent stops.

* Map network drives and printer shares when the agent starts using an InitializationScript
* Unmap shared resources cleanly when the agent stops using a TerminationScript

## When to use

- When the agent runs as Local System and jobs need access to UNC paths or mapped network drives that are not accessible in a service session by default.
- When shared resources such as network drives or printers need to be reliably cleaned up whenever the agent stops.

## Benefits

- Ensures network resources are available before any job runs, without requiring each individual job to manage its own drive mapping.
- Provides a single configuration point for resource setup and teardown that applies to all jobs on the machine.

## Configuration options

The following MSLSAM.ini settings configure the initialization and termination scripts. For complete setting descriptions, refer to [MSLSAM.ini configuration file](../administration/configuration).

| Setting | What It Does | Default | Notes |
|---|---|---|---|
| `InitializationScript` | Full path to a script the agent runs when the service starts, before any jobs begin. Commonly used to map network drives. | Blank | Requires service restart. Enclose path in double quotes. |
| `TerminationScript` | Full path to a script the agent runs when the service stops. Commonly used to disconnect network drives and printer shares. | Blank | Requires service restart. Enclose path in double quotes. |

## FAQs

**Why can't each job map its own network drives?**  
Windows uses session-based drive mapping. Drives mapped in one session are not accessible from another session for the same user. The agent's InitializationScript runs in the service session at startup, making those drives available to all jobs running under that session.

**Does the InitializationScript run for every job?**  
No. It runs once when the agent service starts. It is not re-executed for each individual job.

## Glossary

**InitializationScript** — An MSLSAM.ini setting specifying a script or executable the agent runs at startup, before any jobs begin.

**TerminationScript** — An MSLSAM.ini setting specifying a script or executable the agent runs at shutdown, after all jobs have stopped.

**UNC path** — A Universal Naming Convention path in the format `\\ComputerName\ShareName` used to reference network resources without relying on a drive letter mapping.

From Windows XP onwards, Microsoft introduced the concept of user session-based mapping, which means drives mapped from one user session are not accessible to another session for the same user. If the agent is running as a domain account and needs to access programs on a network, map those network paths using an InitializationScript that runs on agent startup.

A TerminationScript is used to unmap any network drives or printers mapped during agent initialization.

:::info Example
InitializationScript for mapping drives:
:::

```bat
///// Join a file share (Drive MAP) - with a long share name
NET USE Z: "\\ComputerName\ShareName"
 
///// Join a Printer Share
NET USE LPT1: "\\ComputerName\printer_share"
 
///// Join an unprotected network share
NET USE Z: "\\ComputerName\ShareName"
 
///// Join a password protected file share (Drive MAP)
NET USE Z: \\ComputerName\ShareName[\volume] [password | *] [/USER:[domainname\]username]
 
///// Send notification to a user or computer
net send machine/username "Agent Started"
```

:::info Example
TerminationScript for unmapping drives and printer shares:
:::

```bat
///// Disconnect from a share
NET USE Z: /DELETE
 
///// Disconnect from a printer share
NET USE LPT1 /DELETE
 
///// Send notification to a user or computer
net send machine/username "Agent Stopped"
```
