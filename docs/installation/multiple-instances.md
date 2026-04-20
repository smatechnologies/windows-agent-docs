---
sidebar_label: 'Multiple instances'
title: Install additional Windows Agent instances
description: "Install and configure multiple Windows Agent instances on a single machine."
tags:
  - Procedural
  - System Administrator
  - Agents
  - Installation
---

# Install additional Windows Agent instances

**Theme:** Configure  
**Who Is It For?** System Administrator

## What is it?

Multiple instances of the Windows Agent can be installed on a single machine, each listening on a different port. This allows one physical server to appear as multiple machines in OpCon, enabling job isolation, port separation, or independent configuration between workloads.

* Install additional instances using the same installation media that created the first instance
* Assign each instance a unique service name, port number, and JORS socket to avoid conflicts
* Register each instance as a separate machine definition in OpCon

## When to use

- When different teams or applications need separate agent configurations on the same machine.
- When jobs must be isolated across different port numbers for security, monitoring, or maintenance reasons.

## Benefits

- Reduces hardware costs by running multiple logical agents on one physical machine rather than provisioning separate servers for each workload.
- Each instance is independently configurable with its own service account, port number, and output directory, so changes to one instance do not affect others.

## New installation

If additional agent instances are needed after installing the initial Windows Agent, repeat the [Install the Windows Agent](install#install-the-windows-agent) procedure. The installation package automatically transforms to install new instances of the agent. After installing each new instance, define a new machine in OpCon with a unique name and port number using the procedure for [Machine creation](install#machine-creation).

## Manually install additional instances to unique directories

If you have previously installed additional instances to unique directories, you can continue using this method. This causes more overhead for maintenance than the automatic method described previously; however, SMA Technologies supports this method of manual installation.

### Create a new directory

To create the directories for the new agent instance, complete the following steps:

1. Right-click the **Start** button on the application server.
2. Select **Explore** from the menu.
3. Go to the OpConxps `<Target Directory>` in the explorer window.
4. Use menu path: **File \> New \> Folder**.
5. Name the new folder `MSLSAM<custom directory>` (for example, `MSLSAM4100`).
6. Go to the OpConxps `<Configuration Directory>`.
7. Use menu path: **File \> New \> Folder**.
8. Name the new folder the same as the new program file directory (for example, `MSLSAM4100`). Both directories are created.

### Copy required files

To copy the required files to the new directories, complete the following steps:

1. Go to the first instance's `<Target Directory>` in the explorer window.
2. Use menu path: **Edit \> Select All**.
3. Use menu path: **Edit \> Copy**.
4. Go to the new instance's `<Target Directory>`.
5. Use menu path: **Edit \> Paste**.
6. Go to the first instance's `<Configuration Directory>`.
7. Use menu path: **Edit \> Select All**.
8. Use menu path: **Edit \> Copy**.
9. Go to the new instance's `<Configuration Directory>`.
10. Use menu path: **Edit \> Paste**. All required files are copied.

### Modify the new instance's configuration file

To configure the new agent instance, complete the following steps:

1. Go to `<Configuration Directory>\<custom directory>\` in the explorer window.
2. Find the **MSLSAM.ini** file.
3. Right-click the file, and select **Open With**.
4. Select an ASCII text editor (for example, Notepad) from the menu.
5. In the text editor, make any necessary modifications to the configuration options. For more information, refer to [MSLSAM.ini file configuration](../administration/configuration).
6. Define a unique **ShortServiceName** in the General Settings section.
7. Define a unique **DisplayServiceName**.
8. Define a unique **SocketNumberToSAM** in the TCP/IP Parameters section.
9. Define a unique **JORSSocket** in the JORS Settings section.
10. Define a **SmaftServerSocket**. This socket number may match the JORSSocket or be a unique number.
11. Use menu path: **File \> Save**.
12. Close the **Explorer** window. The configuration file is saved.

### Register the new instance as a service and start

To register and start the new agent instance, complete the following steps:

1. Select **Start**.
2. Enter `cmd` in the search box to open a command window.
3. Change the directory to the new instance's directory in the command window.
4. Enter the following command: `regsvc.cmd -install`.
5. Close the command window.
6. Use menu path: **Start \> Administrative Tools \> Server Manager**.
7. Select **Configuration** to expand it in the Administrative Tools window.
8. Select **Services**.
9. In the **Services** list, select the new display service name for the agent.
10. Use menu path: **Action \> Start**.
11. Confirm the service **Status** is **Started**. The new agent instance is running.

### Create the machine in OpCon

When an agent instance is installed, create a machine record with a unique machine name and socket number in OpCon. If the machine was previously defined in OpCon, you may skip this procedure.

To create the machine record in OpCon, complete the following steps:

1. Use menu path: **Start \> Programs \> OpConxps \> Enterprise Manager**. The **OpCon Login** screen displays.
2. Enter a case-sensitive user login ID (for example, `ocadm`) in the **Username** field.
3. Enter the case-sensitive password for the user in the **Password** field.
4. Select the profile in the **Profile** list.
5. Select the **Login** button. Enterprise Manager opens.
6. Select **Machines** under the **Administration** topic in the **Navigation Panel**. The **Machines** screen displays.
7. Select the **Add** button on the Machines toolbar.
8. Enter the official host name or alias for the agent machine in the **Name** field.
9. Enter any relevant documentation for this machine in the **Documentation** field.
10. Select **Windows** from the **Machine Type** list.
11. Set the value to a unique number (for example, `4100`) in the **Socket Number** field.
12. *(Optional)* Enter the IPv4 or IPv6 address in the **IP Address** field.
13. *(Optional)* Enter the name in the **Fully Qualified Domain Name** field.
14. Select the **Save** button on the Machines toolbar.
15. *(Optional)* Select **Open Advanced Settings Panel** and review and update as necessary:
    1. Under Communication Settings, update the TLS security options if necessary.
    2. Under File Transfer Settings, if the machine supports TLS security, choose the appropriate settings for each parameter.
    3. Select the Advanced Options save button to store all changes.
16. *(Optional)* Start communication with the machine:
    1. Right-click the **Communication Status** graphic to enable the menu.
    2. Select **Start Communication** from the menu.
17. Select the **x** to the right of the **Machines** tab to close the **Machines** screen. The machine is created in OpCon.

## Manually upgrade an additional instance

A manual upgrade is required for each additional instance that was manually installed to a unique directory. After upgrading the first instance from the installation media, complete the steps in this section for each additional instance.

### Check for running jobs

To confirm no jobs are running before upgrading, complete the following steps:

1. Select **Machines Status** under the **Operation** topic. The **Machines Status** screen displays.
2. Confirm the number of running jobs is **0** for the agent machine.
3. If running jobs exist, contact the OpCon administrator to determine whether to:
   - Wait for the jobs to end **— or —**
   - Kill the jobs. For more information, refer to [Kill command](../advanced-features/kill).
4. Repeat step 3 until the **Machines Status** screen indicates **Running Jobs** of **0/\<max\>**.
5. Right-click the machine and select **Stop Communication** from the menu.

### Stop the service

To stop the agent service, complete the following steps:

1. Use menu path: **Start \> Administrative Tools \> Server Manager**. The **Administrative Tools** window displays.
2. Select **Configuration** to expand it.
3. Select **Services**. The **Services** window displays.
4. In the **Services** list, select the additional display service name for the instance.
5. Use menu path: **Action \> Stop**.
6. Confirm the service **Status** is **Stopped**.

### Stop the JORS service

To stop the JORS service, complete the following steps:

1. In the **Services** list, select the JORS Service.
2. Use menu path: **Action \> Stop**.
3. Confirm the service **Status** is **Stopped**.
4. Close the **Services** window.
5. Repeat this procedure for each instance on the machine.

### Copy upgrade files

To copy the upgrade files to the additional instance, complete the following steps:

1. Go to the first instance's directory in the explorer window.
2. Use menu path: **Edit \> Select All**.
3. Use menu path: **Edit \> Copy**.
4. Go to the additional instance directory.
5. Use menu path: **Edit \> Paste**. All upgrade files are copied.

### Confirm the additional instance's configuration settings

To verify the configuration settings after upgrade, complete the following steps:

1. Go to `<Configuration Directory>\MSLSAM\` in the explorer window.
2. Find the **MSLSAM.ini** file.
3. Right-click the file, and select **Open With**.
4. Select an ASCII text editor (for example, Notepad) from the menu.
5. Find the **NewMSLSAM.ini** file in the first instance's `<Configuration Directory>`.
6. Right-click the file, and select **Open With**.
7. Select an ASCII text editor (for example, Notepad) from the menu.
8. In the text editor, compare the NewMSLSAM.ini file with the MSLSAM.ini file and copy any new settings from the new version into your existing MSLSAM.ini file. For more information, refer to [MSLSAM.ini file configuration](../administration/configuration).

### Restart the service

To restart the agent service after upgrade, complete the following steps:

1. Use menu path: **Start \> Administrative Tools \> Server Manager**. The **Administrative Tools** window displays.
2. Select **Configuration** to expand it.
3. Select **Services**. The **Services** window displays.
4. In the **Services** list, select the display service name for the instance.
5. Use menu path: **Action \> Start**.
6. Confirm the service **Status** is **Started**.

### Start communication with the agent

To resume communication with the agent, complete the following steps:

1. Select **Machines Status** under the **Operation** topic. The **Machines Status** screen displays.
2. Right-click the machine and select **Start Communication** from the menu. Communication with the agent is restored.

## FAQs

**Do multiple instances on the same machine share an MSLSAM.ini file?**  
No. Each instance has its own configuration directory and its own MSLSAM.ini file. Changes to one instance's configuration file do not affect other instances.

**What settings must be unique per instance?**  
`ShortServiceName`, `DisplayServiceName`, `SocketNumberToSAM`, and `JORSSocket` must each have unique values across all instances on the machine. `SmaftServerSocket` may match `JORSSocket` or be a separate unique port.

**How does OpCon distinguish between instances on the same physical machine?**  
Each instance is registered as a separate machine definition in OpCon with its own unique machine name and socket number. OpCon communicates with each instance independently over its assigned port.

## Glossary

**ShortServiceName** — The internal Windows registry name for a Windows Agent service instance. Must be unique across all instances on the same machine.

**DisplayServiceName** — The label shown for a Windows Agent instance in Service Control Manager. Must be unique across all instances on the same machine.

**Instance** — A single installation of the Windows Agent running as its own Windows service with its own configuration directory, port numbers, and machine definition in OpCon.
