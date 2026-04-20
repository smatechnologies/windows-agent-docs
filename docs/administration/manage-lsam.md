---
sidebar_label: "Manage the agent"
title: Managing the Windows Agent
description: "Start and stop the Windows Agent service using Windows Service Control Manager."
tags:
  - Procedural
  - System Administrator
  - Agents
  - System Configuration
---

# Managing the Windows Agent

**Theme:** Configure  
**Who Is It For?** System Administrator

## What is it?

The Windows Agent runs as two Windows services: **SMA OpCon Agent for Microsoft** and **SMA OpCon JORS for Microsoft**. Both services must be running for the agent to process jobs and retrieve job output.

* Start and stop the agent and JORS services using Windows Service Control Manager
* Verify service status and configure automatic startup behavior

To control the Windows Agent status, use Windows Service Control Manager. The procedures below explain how to start and stop the agent.

## When to use

- When bringing the agent online after initial installation, configuration changes, or a machine restart.
- When stopping the agent before a planned upgrade, maintenance window, or configuration change that requires a service restart.

## Benefits

- The agent and its associated JORS service can be managed independently from OpCon, providing manual control when automation is not available.
- Starting the agent with the correct startup type ensures it restarts automatically after machine reboots without manual intervention.

## Start the agent

To start the Windows Agent, complete the following steps:

1. Use menu path: **Start \> Control Panel**.
2. Select **Administrative Tools**.
3. Select **Services** to open the Service Control Manager.
4. Select **SMA OpCon Agent for Microsoft** in the **Services** list.
5. Confirm that the service **Startup Type** is set to **Automatic (Delayed Start)**. If it is not, change the startup type with the following steps:
   1. Select **Automatic (Delayed Start)** from the **Startup Type** list.
   2. Select **OK**.
6. Use menu path: **Action \> Start**.
7. Confirm the service **Status** is **Started**.
8. Select **SMA OpCon JORS for Microsoft** in the **Services** list.
9. Repeat steps 5 through 7.
10. Close the **Services** window. The Windows Agent and JORS services are running.

## Stop the agent

To stop the Windows Agent, complete the following steps:

1. Use menu path: **Start \> Control Panel**.
2. Select **Administrative Tools**.
3. Select **Services** to open the Service Control Manager.
4. Select **SMA OpCon Agent for Microsoft** in the **Services** list.
5. Use menu path: **Action \> Stop**.
6. Confirm the service **Status** is **Stopped**.
7. Close the **Services** window. The Windows Agent service is stopped.

## FAQs

**Do I need to start both services for full agent functionality?**  
Yes. Both **SMA OpCon Agent for Microsoft** and **SMA OpCon JORS for Microsoft** must be running. The agent service handles job execution, and JORS handles job output capture and retrieval. If JORS is not running, View Job Output will not work even though jobs run normally.

**Is it safe to stop the agent service while jobs are running?**  
No. Stopping the agent while jobs are active will interrupt them. Before stopping the service, use the Machines Status view in OpCon to confirm the number of running jobs is 0 for this machine.

## Glossary

**SMA OpCon Agent for Microsoft** — The Windows service that receives job requests from OpCon, starts job processes on the agent machine, and reports job status back to OpCon.

**SMA OpCon JORS for Microsoft** — The Windows service that captures job output logs while jobs run and serves them to OpCon's View Job Output feature.

**Automatic (Delayed Start)** — A Windows service startup type that starts the service automatically after machine boot, with a short delay to allow other services to initialize first. The recommended startup type for both agent services.
