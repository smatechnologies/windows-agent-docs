# Managing the LSAM

To control the Windows LSAM status, use the Windows Service Control Manager. The procedures below explain the process of starting and stopping the MSLSAM.

## Start the LSAM

1. Use menu path: **Start \> Control Panel**.
2. Double-click the **Administrative Tools** icon.
3. Double-click the **Services** icon to run the Service Control Manager.
4. Double-click **SMA OpCon Agent for Microsoft** in the **Services** list.
5. Confirm that the *Service's* **Startup Type** is set to **Automatic (Delayed Start)**. If it is not, change the Startup type with the following steps:
   1. Select **Automatic (Delayed Start)** from the **Startup Type** drop-down list box.
   2. Click **OK**.
6. Use menu path: **Action \> Start**.
7. Confirm the *Service's* **Status** is **Started**.
8. Double-click **SMA OpCon JORS for Microsoft** in the **Services** list.
9. Repeat steps 5) through 7).
10. **Close ☒** the **Services** window.

## Stop the LSAM

1. Use menu path: **Start \> Control Panel**.
2. Double-click the **Administrative Tools** icon.
3. Double-click the **Services** icon to run the Service Control Manager.
4. Click **SMA OpCon Agent for Microsoft** in the **Services** list.
5. Use menu path: **Action \> Stop**.
6. Confirm the *LSAM's* **Status** is **Stopped**.
7. **Close ☒** the **Services** window.
