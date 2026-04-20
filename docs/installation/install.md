---
sidebar_label: 'New installation'
title: New installation
description: "Install the Windows Agent for the first time and create the corresponding machine definition in OpCon."
tags:
  - Procedural
  - System Administrator
  - Agents
  - Installation
---

# New installation

**Theme:** Configure  
**Who Is It For?** System Administrator

## What is it?

The Windows Agent is the OpCon component installed on Windows machines to run scheduled jobs. Installing the agent enables OpCon to start Windows processes, run scripts, monitor job completion, and retrieve job output from the target machine.

* Install the agent service on a Windows machine for the first time
* Configure port numbers, TLS settings, and output file location during installation
* Register the installed agent as a machine definition in OpCon to begin scheduling jobs

## When to use

- When adding a new Windows machine to an existing OpCon environment for the first time.
- When setting up a fresh machine where OpCon job execution capabilities are needed.

## Benefits

- After installation, OpCon can schedule, monitor, and manage all Windows jobs on this machine from a central location without additional configuration on the machine itself.
- The agent installs as a Windows service configured for automatic startup, ensuring job execution resumes after machine reboots without manual intervention.

If the Windows Agent has not been installed on the machine, follow these procedures for the first installation.

## Install the Windows Agent

To install the Windows Agent for the first time, complete the following steps:

1. Log in to the Windows machine as a local administrator.
2. Exit all running applications on the desktop, including OpCon applications.
3. Select the **setup.exe** on the root of the OpCon installation media. The **Choose Setup Language** screen displays.
4. Select the desired language for the installation screens and select **Next**. The **Welcome** screen displays.
5. Select **Next**. The **Select Components** screen displays.
6. Select **SMA OpCon Agents \> SMA OpCon Agent for Microsoft**.
7. Select **Install**. The **Welcome** screen displays.
8. Select **Next**. The **Destination Folder** screen displays.
9. Change the target location for the installation or retain the default location.
10. Select **Next**. The **Configure Instance Name** screen displays.
11. *(Optional)* Enter a unique instance name to identify this Windows Agent instance.
12. Select **Next**. The **Select Path for File Migration to ProgramData** screen displays.
13. Select **Skip**. The **Select Path for Output Files** screen displays.
14. Change the directory for the output files or retain the default location.
15. Select **Next**. The **Configure Ports and Encryption** screen displays.
16. Change the settings to use TLS and change the values, or retain the default values.
17. Select **Next**. The **Setup Type** screen displays.
18. Select the setup type: **Complete** or **Custom**.
    - For a Custom install, the **Custom Setup** screen displays.
19. Select **Next**. The **Ready to Install the Program** screen displays.
20. Select **Install**.
21. Select **Finish** on the **InstallShield Wizard Completed** screen. The Windows Agent is installed.

:::note
The installation writes the log file named `SMA_OpCon_Windows_LSAM_Install.log` to the Windows directory. Consult this file if any installation problems are suspected.
:::

## Service startup setup

By default, the **SMA OpCon Agent for Microsoft** service is set for Automatic (Delayed Start) startup and runs under the local system account. If you want to change the default settings, perform the procedure in this section.

:::caution
SMA Technologies recommends leaving the **SMA OpCon Agent for Microsoft** service set to Automatic (Delayed Start) to avoid potential issues at startup time while other services and programs start up.
:::

### Set up service startup

To configure the service startup settings, complete the following steps:

1. Use menu path: **Start \> Control Panel \> Administrative Tools**.
2. Select **Administrative Tools**. The **Administrative Tools** window displays.
3. Select **Services**. The **Services** window displays.
4. Select the newly installed **SMA OpCon Agent for Microsoft** service. The **SMA OpCon Agent for Microsoft Properties** dialog displays with the **General** tab in focus.
5. Select the service startup type:
   - **Automatic (Delayed Start)**
   - **Automatic**
   - **Manual**
   - **Disabled**
6. Select the **Log On** tab.
7. Select one of the following **Log on as** options for the service:
   - **Local System account**: Select this option if the service will run as the local system account.
   - **This account**: Enter a domain user in the field, enter the password, and re-enter the password to confirm.
8. Select the **OK** button. The startup settings are saved.

## Machine creation

When the Windows Agent is installed, create a machine record with a unique machine name and socket number in OpCon. If the machine was previously defined in OpCon, you may skip this procedure.

### Create the machine in OpCon

To create the machine record in OpCon, complete the following steps:

1. Use menu path: **Start \> Programs \> OpConxps \> Enterprise Manager**. The **OpCon Login** screen displays.
2. Enter a case-sensitive user login ID (for example, `ocadm`) in the **Username** field.
3. Enter the case-sensitive password for the user in the **Password** field.
4. Select the profile in the **Profile** list.
5. Select the **Login** button. Enterprise Manager opens.
6. Select **Machines** under the **Administration** topic in the Navigation Panel. The **Machines** screen displays.
7. Select the **Add** button on the **Machines** toolbar.
8. Enter the official host name or alias for the agent machine in the **Name** field.
9. Enter any relevant documentation for this machine in the **Documentation** field.
10. Select **Windows** from the **Machine Type** list.
11. Set the value to a unique number (for example, `3100`) in the **Socket Number** field. The socket number entered here must match the socket entered in the MSLSAM.ini file.
12. *(Optional)* Enter the IPv4 or IPv6 address in the **IP Address** field.
13. *(Optional)* Enter the name in the **Fully Qualified Domain Name** field.
14. Select the **Save** button on the **Machines** toolbar.
15. *(Optional)* Select **Open Advanced Settings Panel** and review and update as necessary:
    1. Under Communication Settings, update the TLS security options if necessary.
    2. Under File Transfer Settings, if the machine supports TLS security, choose the appropriate settings for each parameter.
    3. Select the Advanced Options save button to store all changes.
16. *(Optional)* Start communication with the machine:
    1. Right-click the **Communication Status** graphic to enable the menu.
    2. Select **Start Communication** from the menu.
17. Select the **x** to the right of the **Machines** tab to close the **Machines** screen. The machine is created in OpCon.

## FAQs

**Must the Socket Number in OpCon match what I configured during installation?**  
Yes. The Socket Number entered in the OpCon machine definition must exactly match the `SocketNumberToSAM` value set during installation (default: 3100).

## Glossary

**Machine definition** — A record in the OpCon database that identifies an agent machine by name and socket number, enabling OpCon to communicate with and schedule jobs on that machine.

**Automatic (Delayed Start)** — A Windows service startup type that starts the service automatically after machine boot, with a short delay to allow other services to initialize first. The recommended startup type for the Windows Agent.
