---
sidebar_label: 'Upgrade'
---

# Upgrade installation

:::caution
Before proceeding, check the services settings for "Log on as" in the service's properties. If any of the services log on as a domain user with password, make sure you have the password before proceeding with the upgrade. If multiple instances of the LSAM are installed on the machine, be sure to note this information for [every instance.
:::

## Check for Running Jobs

1. Double-click on **Machines Status** under the **Operation** topic. The **Machines Status** screen displays.
2. Confirm the number of running jobs is **0** for the Windows machine.
3. If running jobs exists, contact the OpCon administrator if you should:
   - Wait for the processes to end **- or -**
   - **Kill** the processes on the Windows side. For more information, refer to [Kill command](../advanced-features/kill)
4. Repeat steps 3 a) or b) until the **Machines Status** screen indicates **Running Jobs** of **0/\<max\>**.
5. Right-click the machine and select **Stop Communication** from the menu.

## Stop the service

1. Use the following menu path on the Application server: **Start \> Administrative Tools \> Server Manager**. The **Administrative Tools** window displays.
2. Expand (**+**) the **Configuration** option.
3. Click the **Services** icon. The **Services** window displays.
4. In the **Services** list, select **SMA OpCon Agent for Microsoft**.
5. Use menu path: **Action \> Stop**.
6. Confirm the *Service's* **Status** is **Stopped**.

## Stop the JORS service

1. In the **Services** list, select **SMA OpCon JORS for Microsoft**.
2. Use menu path: **Action \> Stop**.
3. Confirm the *Service's* **Status** is **Stopped**.
4. Close the **Services** window.
5. Repeat this procedure for each instance of the LSAM on the machine.

## Install the Windows LSAM

1. On the machine requiring the Windows LSAM, log in as a Windows user with Local Administrative Rights.
2. Exit all running applications on the desktop (including OpCon applications).
3. Double-click the **setup**.exe on the root of the OpCon/xps installation media. The **Choose Setup Language** screen displays.
4. Select the desired language for the installation screens and click **Next**. The **Program Maintenance** screen displays.
5. Click **Modify**. The **Select Components** screen displays.
6. Select **SMA OpCon Agents \> SMA OpCon Agent for Microsoft**.
7. Click **Install**. The **Multi-instance Maintenance** screen displays.
8. Select the **Maintain or upgrade an existing instance** radio button.
9. Select the instance you want to upgrade from the table below the radio buttons.
10. Click **Next**. The **Welcome** screen displays.
11. Click **Next**. The **Select Path for Output Files** screen displays.
12. Change the directory for the output files or retain the default location.
13. Click **Next**. The **Configure Ports and Encryption** screen displays.
14. Change the settings if you wish to use TLS and change the values or retain the default values.
15. Click **Next**. The **Ready to Install the Program** screen displays.
16. Click **Install**.
17. Click **Finish** on the **InstallShield Wizard Completed** screen.

:::note
The installation writes the log file named SMA_OpCon_Windows_LSAM_Install.log to the Windows directory. Consult this file if any installation problems are suspected.
:::

## Restart the service

1. Use the following menu path on the Application server: **Start \> Administrative Tools \> Server Manager**. The **Administrative Tools** window displays.
2. Expand (**+**) the **Configuration** option.
3. Click the **Services** icon. The **Services** window displays.
4. In the **Services** list, select **SMA OpCon Agent for Microsoft**.
5. Use menu path: **Action \> Start**.
6. Confirm the *Service's* **Status** is **Started**.

## Change the File Transfer port numbers

1. After upgrading the software, log in to **Enterprise Manager**.
2. Double-click on **Machines** on the Enterprise Manager Navigation under Administration. The **Machines** screen displays.
3. Select the Windows machine in the **Select Machine** drop-down list.
4. Click **Open Advanced Settings Panel** in the **Advanced Settings** frame. The **Advanced Machine Properties** screen displays.
5. Click the **File Transfer Settings** tab. The **File Transfer Settings** screen displays.
6. Select **File Transfer Port Number**.
7. Change the value in the **File Transfer Port Number** field near the bottom of the screen to a unique **Port** number. The new default port number for SMAFT is 3111, yet the value can be set to match the machine's configuration.
8. Click the **Update** button.
9. Click **Save**.

## Start communication with the LSAM

1. Double-click on **Machines Status** under the **Operation** topic. The **Machines Status** screen displays.
2. Right-click the machine and select **Start Communication** from the menu.
