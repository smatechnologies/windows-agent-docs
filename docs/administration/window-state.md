---
sidebar_label: "WindowState behavior"
title: WindowState behavior
description: "Understand how the WindowState setting controls job window visibility on the Windows desktop."
tags:
  - Conceptual
  - System Administrator
  - Agents
  - System Configuration
---

# WindowState behavior

**Theme:** Overview  
**Who Is It For?** System Administrator

## What is it?

The `WindowState` setting in MSLSAM.ini controls whether a job's window appears on the Windows desktop when the agent starts the job. Due to Session 0 isolation introduced in Windows Vista and Windows Server 2008, visible window behavior depends on both the Windows version and how the agent service is configured.

* Control job window visibility with SHOW, MINIMIZE, or HIDE settings
* Understand how Windows version and service logon account affect window behavior

## When to use

- When running interactive or semi-interactive jobs that require a visible window on the desktop for operator interaction.
- When testing jobs during development and you want to observe window behavior under different user sessions.

## Benefits

- Understanding Session 0 isolation behavior prevents confusion when SHOW or MINIMIZE settings appear to have no effect in a service-based installation.
- Knowing which combinations of agent logon type and WindowState produce visible windows helps match the agent configuration to the job's interaction requirements.

## Configuration options

The following MSLSAM.ini setting controls window visibility behavior. For the complete setting description, refer to [MSLSAM.ini configuration file](../administration/configuration).

| Setting | What It Does | Default | Notes |
|---|---|---|---|
| `WindowState` | Controls how job windows appear on the desktop. Valid values: `HIDE` (background, no window), `SHOW` (visible in the job user's session), `MINIMIZE` (visible on Task Bar), `INTERACTIVEHIDE` (interactive but not visible). | `HIDE` | Dynamic — no service restart needed. Case-sensitive. |

## FAQs

**I set WindowState to SHOW, but no window appears on the desktop — why?**  
Due to Session 0 isolation introduced in Windows Vista and Server 2008, SHOW and MINIMIZE only work when the agent runs as Local System. Additionally, the user submitting the job must have an active session on the machine. If these conditions are not met, the window will not be visible on the desktop.

**Does WindowState apply per job or machine-wide?**  
WindowState is a machine-wide setting in MSLSAM.ini. It applies to all jobs run by the agent on that machine. It cannot be configured per individual job.

## Glossary

**Session 0 isolation** — A Windows security feature introduced in Vista and Server 2008 that runs services in a separate session from interactive users. This prevents service-started windows from appearing on the user's desktop by default.

**WindowState** — An MSLSAM.ini setting that controls job window visibility. Valid values are `SHOW`, `MINIMIZE`, and `HIDE`.

:::note
The security model for Windows changed in Vista and Windows 2008. Session 0 isolation was introduced in Vista or later versions and all services run in this session. Due to this change, the SHOW and MINIMIZE WindowState behavior is affected when the agent is running on Vista or Windows 2008.
:::

- To see SHOW or MINIMIZE WindowState, the agent must be running as a Local System Account.
- When WindowState is set to SHOW or MINIMIZE in the MSLSAM.ini file, the job window belongs to the same session as the user and appears in that session.

:::info Example
Three Windows jobs are submitted with three different users — Tester1, Tester2, and Tester3 — to run on the agent.

During the test, if all three user sessions are active, each user sees the window state only for the job submitted under their own user account. For example, Tester1 sees only the window state of the job submitted with Tester1, not the window states for Tester2 or Tester3.
:::
