---
sidebar_label: 'Multiple instances'
---

# Install Additional Windows LSAM Instances

## New installation

If additional LSAMs are needed after installing the initial Windows LSAM, repeat the [Install the Windows LSAM](install#install-the-windows-lsam). The installation package will automatically transform to install new instances of the LSAM. After installing each new instance, define a new machine in OpCon with a unique name and port number using the procedure for [Machine creation](install#machine).

## Manually install additional LSAMs to unique directories

If you have previously installed additional LSAMs to unique directories, you can continue using this method if you desire. This causes more overhead for maintenance than the automatic method as described previously; however, SMA Technologies will support this method of manual installation.

### Create a new directory

1. Right-click on the **Start** button on the application server.
2. Select **Explore** from the menu.
3. Browse to the OpConxps <Target Directory\> in the explorer window.
4. Use menu path: **File \> New \> Folder**.
5. Name the new *MSLSAM <custom directory\>* (e.g., MSLSAM4100).
6. Browse to the OpConxps \<Configuration Directory\>
7. Use menu path: **File \> New \> Folder**.
8. Name the new MSLSAM directory the same as the new program file directory (e.g., MSLSAM4100).

### Copy required files

1. Browse to the first MSLSAM's <Target Directory\> in the explorer window.
2. Use menu path: **Edit \> Select All**.
3. Use menu path: **Edit \> Copy**.
4. Browse to the new MSLSAM's <Target Directory\>.
5. Use menu path: **Edit \> Paste**.
6. Browse to the first MSLSAM's <Configuration Directory\>.
7. Use menu path: **Edit \> Select All**. Use menu path: **Edit \> Copy**.
8. Browse to the new MSLSAM's <Configuration Directory\>.
9. Use menu path: **Edit \> Paste**.

### Modify the new LSAM's configuration file

1. Browse to <Configuration Directory\>\\\<custom directory\>\\ in the explorer window.
2. Find the **MSLSAM.ini** file.
3. Right-click the file, and select **Open With**.
4. Select an ASCII text editor (e.g., Notepad) from the menu.
5. In the text editor, make any necessary modifications to the configuration options. For more information about editing the MSLSAM.ini file, refer to [MSLSAM.ini File Configuration](../administration/configuration)
6. Define a unique **ShortServiceName** in the General Settings section.
7. Define a unique **DisplayServiceName**.
8. Define a unique **SocketNumberToSAM** in the TCP/IP Parameters section.
9. Define a unique **JORSSocket** in the JORS Settings section.
10. Define a **SmaftServerSocket**. This socket number may match the JORSSocket or be a unique number.
11. Use menu path: **File \> Save**.
12. **Close ☒** the **Explorer** window.

### Register the new LSAM as a service and start

1. Click **Start**.
2. Enter **cmd** in the search box to open a command window.
3. Change the directory to the new LSAM's directory in the Command window.
4. Enter the following command: **regsvc.cmd -install**.
5. **Close ☒** the command window.
6. Use menu path: **Start \> Administrative Tools \> Server Manager**.
7. Expand (+) the **Configuration** option in the Administrative Tools window.
8. Click the **Services** icon.
9. In the **Services** list, select the New Display Service Name for the LSAM.
10. Use menu path: **Action \> Start**.
11. Confirm the *Service's* **Status** is **Started**.

### Create the Machine in OpCon

When a Windows LSAM is installed, create a machine record with a unique Machine name and Socket number in OpCon. If the machine was previously defined in OpCon, you may skip this procedure.

1. Use menu path: **Start \> Programs \> OpConxps \> Enterprise Manager**. The **OpCon Login** screen displays.
2. Enter a *case-sensitive User Login ID* (e.g., ocadm) in the **Username** text box.
3. Enter the *case-sensitive password for the user* in the **Password** text box.
4. Select the *Profile* in the **Profile** drop-down list.
5. Click the **Login** button to log in to the Enterprise Manager.
6. Double-click on **Machines** under the **Administration** topic in  the **Navigation Panel**. The **Machines** screen displays.
7. Click the **Add** button on the Machines toolbar.
8. Enter the *official host name or alias based on the LSAM machine* in the **Name** text box.
9. Enter *any relevant documentation* for this LSAM machine in the **Documentation** text box.
10. Select **Windows** in the **Machine Type** drop-down list.
11. Set the *value* to a unique number (e.g., 4100) in the **Socket Number** box.
12. *(Optional)* Enter the *IPv4* or *IPv6 address* in the **IP Address** field.
13. *(Optional)* Enter the *name* in the **Fully Qualified Domain Name** field.
14. Click **Save** button on the **Machines** toolbar.
15. *(Optional)* Click **Open Advanced Settings Panel** and review and update as necessary:
    1. Under the Communications Settings, update the TLS Security options if necessary.
    2. Under the File Transfer Settings, if the machine can support TLS Security, choose the appropriate settings for each parameter.
    3. Click the Advanced Options save button to store all changes.
16. *(Optional)* Start communication with the machine by:
    1. Right-clicking over the graphic to enable the menu in the **Communication Status** frame.
    2. Selecting **Start Communication** from the menu.
17. Click on the **x** to the right of the **Machines** tab to close the **Machines** screen.

## Manually upgrade an additional LSAM

A manual upgrade is a requirement for each additional MSLSAM that was manually installed to a unique directory. After upgrading the first MSLSAM from the DVD installation, complete the steps in this section for each additional MSLSAM.

### Check for running Jobs

1. Double-click on **Machines Status** under the **Operation** topic. The **Machines Status** screen displays.
2. Confirm the number of running jobs is **0** for the MSLSAM machine.
3. If running jobs exists, contact the OpCon administrator if you should:
   - Wait for the processes to end **- or -**
   - **Kill** the processes on the MSLSAM side. For more information, refer to [Kill command](../advanced-features/kill).
4. Repeat step 3 until the **Machines Status** screen indicates **Running Jobs** of **0/<max\>**.
5. Right-click the machine and select **Stop Communication** from the menu.

### Stop the service

1. Use the following menu path on the Application server: **Start \> Administrative Tools \> Server Manager**. The **Administrative Tools** window displays.
2. Expand (**+**) the **Configuration** option.
3. Click the **Services** icon. The **Services** window displays.
4. In the **Services** list, select the Additional Display Service Name for the LSAM.
5. Use menu path: **Action \> Stop**.
6. Confirm the *Service's* **Status** is **Stopped**.

### Stop the JORS Service

1. In the **Services** list, select the JORS Service.
2. Use menu path: **Action \> Stop**.
3. Confirm the *Service's* **Status** is **Stopped**.
4. Close the **Services** window.
5. Repeat this procedure for each instance of the LSAM on the machine.

### Copy upgrade files

1. Browse to the first MSLSAM's directory in the explorer window.
2. Use menu path: **Edit \> Select All**. Use menu path: **Edit \> Copy**.
3. Browse to the additional MSLSAM directory.
4. Use menu path: **Edit \> Paste**.

### Confirm the additional LSAM's configuration settings

1. Browse to <Configuration Directory\>\\**MSLSAM\\** in the explorer window.
2. Find the **MSLSAM.ini** file.
3. Right-click the file, and select **Open With**.
4. Select an ASCII text editor (e.g., Notepad) from the menu.
5. Find the **NewMSLSAM.ini** file in the first MSLSAM's <Configuration Directory\> in the additional LSAM directory.
6. Right-click the file, and select **Open With**.
7. Select an ASCII text editor (e.g., Notepad) from the menu.
8. In the text editor, compare the NewMSLSAM.ini file with the MSLSAM.ini file so you can copy any new settings into from the new version of the LSAM to your existing MSLSAM.ini file. Make any necessary modifications to the configuration options. For more information about editing the MSLSAM.ini file, refer to [MSLSAM.ini File Configuration](../administration/configuration)

### Restart the service

1. Use the following menu path on the Application server: **Start \> Administrative Tools \> Server Manager**. The **Administrative Tools** window displays.
2. Expand (**+**) the **Configuration** option.
3. Click the **Services** icon. The **Services** window displays.
4. In the **Services** list, select the New Display Service Name for the LSAM.
5. Use menu path: **Action \> Start**.
6. Confirm the *Service's* **Status** is **Started**.

### Start communication with the LSAM

1. Double-click on **Machines Status** under the **Operation** topic. The **Machines Status** screen displays.
2. Right-click the machine and select **Start Communication** from the menu.
