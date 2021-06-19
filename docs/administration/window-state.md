# WindowState behavior

:::note
The security model for Windows has changed in Vista and Windows 2008. Session 0 isolation was introduced in Vista or later versions and all services run in this session 0. Due to this change, the SHOW / MINIMIZE WindowState behavior will be affected when LSAM is running on Vista or Windows 2008.
:::

- To see SHOW / MINIMIZE WindowState, the LSAM must be running as a "Local System Account".
- When WindowState is set to SHOW or MINIMIZE in MSLSAM.ini file, he job window belongs to the same session as user would appear in that session.

:::info Example
Three windows jobs are submitted with three different users Tester1, Tester2 and Tester3 to run on LSAM.

During the test, if all three different user sessions are active for Tester1, Tester2 and Tester3, each user sees the window state of the job submitted with that user but not the other two user Jobs (e.g., Tester1 can see only the window state of the job that is submitted with that user (Tester1) but not the other two job Window states).
:::
