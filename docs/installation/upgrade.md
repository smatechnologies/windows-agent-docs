---
sidebar_label: 'Upgrade'
title: Upgrade installation
description: "Upgrade an existing Windows Agent installation to a new version."
tags:
  - Procedural
  - System Administrator
  - Agents
  - Installation
---

# Upgrade installation

**Theme:** Configure  
**Who Is It For?** System Administrator

## What is it?

Upgrading the Windows Agent replaces the installed service files with the latest version. Before starting, confirm that no jobs are running on the agent and note any service account passwords in use, as the upgrade process may affect service logon configuration.

* Stop all running jobs and the agent service before applying the upgrade
* Run the installation media against an existing instance to update it in place
* Verify port configuration and restart the service after the upgrade completes

## When to use

- When a new version of the Windows Agent is available and needs to be applied to an existing installation.
- When a fix or feature in an updated agent version is required on this machine.

## Benefits

- Upgrading in place preserves the existing MSLSAM.ini configuration, avoiding the need to reconfigure the agent from scratch.
- The upgrade reuses the same installation media and workflow as a new install, reducing the procedure overhead for administrators who manage multiple machines.

:::caution
Before proceeding, check the services settings for "Log on as" in the service's properties. If any of the services log on as a domain user with password, make sure you have the password before proceeding with the upgrade. If multiple instances of the agent are installed on the machine, be sure to note this information for every instance.
:::

## Check for running jobs

To confirm no jobs are running before upgrading, complete the following steps:

1. Select **Machines Status** under the **Operation** topic. The **Machines Status** screen displays.
2. Confirm the number of running jobs is **0** for the Windows machine.
3. If running jobs exist, contact the OpCon administrator to determine whether to:
   - Wait for the processes to end **— or —**
   - Kill the processes on the Windows side. For more information, refer to [Kill command](../advanced-features/kill).
4. Repeat step 3 until the **Machines Status** screen indicates **Running Jobs** of **0/\<max\>**.
5. Right-click the machine and select **Stop Communication** from the menu.

## Stop the service

To stop the agent service, complete the following steps:

1. Use menu path: **Start \> Administrative Tools \> Server Manager**. The **Administrative Tools** window displays.
2. Select **Configuration** to expand it.
3. Select the **Services** icon. The **Services** window displays.
4. In the **Services** list, select **SMA OpCon Agent for Microsoft**.
5. Use menu path: **Action \> Stop**.
6. Confirm the service **Status** is **Stopped**.

## Stop the JORS service

To stop the JORS service, complete the following steps:

1. In the **Services** list, select **SMA OpCon JORS for Microsoft**.
2. Use menu path: **Action \> Stop**.
3. Confirm the service **Status** is **Stopped**.
4. Close the **Services** window.
5. Repeat this procedure for each instance of the agent on the machine.

## Install the Windows Agent

To upgrade the Windows Agent, complete the following steps:

1. Log in to the Windows machine as a local administrator.
2. Exit all running applications on the desktop, including OpCon applications.
3. Select the **setup.exe** on the root of the OpCon installation media. The **Choose Setup Language** screen displays.
4. Select the desired language for the installation screens and select **Next**. The **Program Maintenance** screen displays.
5. Select **Modify**. The **Select Components** screen displays.
6. Select **SMA OpCon Agents \> SMA OpCon Agent for Microsoft**.
7. Select **Install**. The **Multi-instance Maintenance** screen displays.
8. Select the **Maintain or upgrade an existing instance** option.
9. Select the instance you want to upgrade from the table below the options.
10. Select **Next**. The **Welcome** screen displays.
11. Select **Next**. The **Select Path for Output Files** screen displays.
12. Change the directory for the output files or retain the default location.
13. Select **Next**. The **Configure Ports and Encryption** screen displays.
14. Change the settings to use TLS and change the values, or retain the default values.
15. Select **Next**. The **Ready to Install the Program** screen displays.
16. Select **Install**.
17. Select **Finish** on the **InstallShield Wizard Completed** screen. The Windows Agent is upgraded.

:::note
The installation writes the log file named `SMA_OpCon_Windows_LSAM_Install.log` to the Windows directory. Consult this file if any installation problems are suspected.
:::

## Restart the service

To restart the agent service after upgrade, complete the following steps:

1. Use menu path: **Start \> Administrative Tools \> Server Manager**. The **Administrative Tools** window displays.
2. Select **Configuration** to expand it.
3. Select the **Services** icon. The **Services** window displays.
4. In the **Services** list, select **SMA OpCon Agent for Microsoft**.
5. Use menu path: **Action \> Start**.
6. Confirm the service **Status** is **Started**.

## Change the file transfer port numbers

To update the file transfer port numbers after upgrade, complete the following steps:

1. Log in to **Enterprise Manager**.
2. Select **Machines** under the **Administration** topic in the Navigation Panel. The **Machines** screen displays.
3. Select the Windows machine from the **Select Machine** list.
4. Select **Open Advanced Settings Panel** in the **Advanced Settings** frame. The **Advanced Machine Properties** screen displays.
5. Select the **File Transfer Settings** tab. The **File Transfer Settings** screen displays.
6. Select **File Transfer Port Number**.
7. Change the value in the **File Transfer Port Number** field to a unique port number. The default port number for SMAFT is 3111, but the value can be set to match the machine's configuration.
8. Select **Update**.
9. Select **Save**. The file transfer port numbers are updated.

## Start communication with the agent

To resume communication with the agent after upgrade, complete the following steps:

1. Select **Machines Status** under the **Operation** topic. The **Machines Status** screen displays.
2. Right-click the machine and select **Start Communication** from the menu. Communication with the agent is restored.

## Exception handling

**Upgrade installer cannot replace service files** — One or both agent services are still running, causing file-in-use conflicts. Stop both the SMA OpCon Agent for Microsoft and SMA OpCon JORS for Microsoft services and confirm all running jobs have completed before running the installer again.

**Agent service fails to start after upgrade** — The service was configured to run as a domain user and the password was not re-entered or was entered incorrectly during the upgrade. Open Service Control Manager, locate the agent service, select the Log On tab, and re-enter the correct password.

**Expected new settings are missing from the running configuration after upgrade** — The `NewMSLSAM.ini` file placed in the configuration directory after the upgrade contains settings not present in the existing MSLSAM.ini. Compare the two files and copy any new required settings into the active MSLSAM.ini. Restart the service for any non-dynamic settings to take effect.

## FAQs

**How do I know if the upgrade added new configuration settings I need to apply?**  
After upgrading, a `NewMSLSAM.ini` file is placed in the first instance's configuration directory. Compare it with your existing MSLSAM.ini and copy any new settings that apply to your environment.

**Why must I stop all running jobs before upgrading?**  
Stopping jobs before the upgrade ensures they are not interrupted mid-execution and that the service files can be cleanly replaced without file-in-use conflicts.

## Glossary

**In-place upgrade** — An upgrade that replaces the existing service files while preserving the current MSLSAM.ini configuration, so the agent does not need to be reconfigured from scratch after upgrading.

**NewMSLSAM.ini** — A reference configuration file written to the installation directory during an upgrade. Contains all current settings with their defaults and is used to identify new settings introduced in the upgraded version.
