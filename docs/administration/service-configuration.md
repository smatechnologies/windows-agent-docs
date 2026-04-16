---
sidebar_label: "Service configuration"
title: Service configuration
description: "Configure the Windows Agent service to run as a Local System account or Windows domain user."
tags:
  - Procedural
  - System Administrator
  - Agents
  - System Configuration
---

# Service configuration

**Theme:** Configure  
**Who Is It For?** System Administrator

## What is it?

The Windows Agent service can run under the Local System account or a Windows domain user account. The logon type determines which resources the agent can access and which privileges must be configured.

* Configure the service to run as Local System for full system-level privileges
* Configure the service to run as a domain user when network resource access is required at the service level
* Assign the required advanced Windows privileges when using a domain user account

## When to use

- When the agent needs to access network resources or domain-authenticated systems on behalf of jobs, requiring a domain user account rather than Local System.
- When reviewing or adjusting the service logon after initial installation to match your organization's security standards.

## Benefits

- Running as Local System provides the broadest system-level privileges, reducing configuration overhead for most workloads.
- Running as a domain user allows the agent service itself to access network resources, which is necessary in environments where startup scripts cannot handle drive mapping.

## Logon type options

There are two configuration options for the Windows Agent service logon:

1. Run the service as the Local System account.
2. Run the service as a Windows domain user.

Selection of the logon type affects the security, network access, and performance of the Windows Agent.

SMA Technologies recommends running the agent as Local System because it is the only way for the agent to have all of the system-level privileges needed. Access for UNC paths and shared drives must be managed through the user account running the job and through startup scripts defined in the MSLSAM.ini file. In this mode, be sure to select a Windows user account from your network for the Windows User ID in the job definitions.

For information on configuring mapped network drives in the MSLSAM.ini file, refer to [InitializationScript and TerminationScript](scripts). For information on entering a Windows user, refer to [Adding a Batch User for Windows](https://help.smatechnologies.com/opcon/core/Files/UI/Enterprise-Manager/Adding-Batch-Users/#setting-up-a-new-microsoft-ms-lsam-batch-user) in the **Enterprise Manager** online help.

:::tip
SMA Technologies strongly recommends running as Local System account.
:::

## Configure the Windows Agent to run as a Local System account

To configure the Windows Agent to run as a Local System account, complete the following steps:

1. Use menu path: **Start \> Control Panel**.
2. Select **Administrative Tools**.
3. Select **Services** to open the Service Control Manager.
4. Select the agent in the **Services** list.
5. If not already selected, select **Automatic (Delayed Start)** from the **Startup Type** list.
6. Select the **Log On** tab.
7. Select the **Local System account** option.
8. Select **OK**.
9. Close the **Services** window. The agent is configured to run as Local System.

## Run the Windows Agent as a Windows domain user

The domain user must have the following:

- Membership in the local Administrators group
- The following advanced Windows privileges:
  - Act as part of the operating system
  - Adjust memory quotas for a process
  - Log on as a service
  - Log on as a batch job
  - Replace a process-level token

:::caution
This user must have logged on to this machine before trying to start the service. The initial login creates a Windows user profile required by the Windows Agent when running as a domain user.
:::

Refer to the domain administrator about acquiring the appropriate privileges.

### Add advanced Windows privileges

To add advanced Windows privileges for the domain user, complete the following steps:

1. Use menu path: **Start \> Control Panel**.
2. Select **Administrative Tools**.
3. Select **Local Security Policy** to open the Local Security Settings editor.
4. Select **Local Policies** under **Security Settings** and select **User Rights Assignment**.
5. Select each privilege from the list above and select the **Add User Or Group** button.
6. In the **Select Users Or Groups** dialog box, select **Locations** and select the machine or domain depending on whether you are adding a local user or a domain user.
7. In the object name field, enter the name of the user. For adding Local System account, select the current machine and enter `SYSTEM`.
8. Repeat steps 6 and 7 for each privilege. The privileges are assigned.

### Configure the Windows Agent to run as a domain user

To configure the Windows Agent to run as a domain user, complete the following steps:

1. Use menu path: **Start \> Control Panel**.
2. Select **Administrative Tools**.
3. Select **Services** to open the Service Control Manager.
4. Select the agent in the **Services** list.
5. If not already selected, select **Automatic (Delayed Start)** from the **Startup Type** list.
6. Select the **Log On** tab.
7. Select the **This account** option.
8. Select **Browse** to find the domain user.
9. Select the domain user.
10. Select **OK**.
11. Enter the password in the **Password** field.
12. Re-enter the password in the **Confirm Password** field.
13. Select **OK**.
14. Close the **Services** window. The agent is configured to run as the selected domain user.

## Exception handling

**Agent service fails to start when configured to run as a domain user** — The domain user has never logged on to this machine, so no Windows user profile exists. The service requires the profile to initialize correctly. Have the domain user log on to the machine interactively at least once to create the profile, then attempt to start the service again.

**Agent service starts but jobs fail with permission errors when running as a domain user** — The domain user is missing one or more of the required advanced Windows privileges. Verify that the account has all five: Act as part of the operating system, Adjust memory quotas for a process, Log on as a service, Log on as a batch job, and Replace a process-level token. Add any missing privileges via Local Security Policy, then restart the service.

## FAQs

**Why does SMA Technologies recommend Local System over a domain user?**  
Local System has all the system-level privileges the agent needs without additional configuration. A domain user requires specific advanced privileges and the user must have previously logged on to the machine to create a Windows profile. Local System avoids both requirements.

**What happens if a domain user has never logged on to this machine before?**  
The agent service will fail to start. Windows requires the user profile to exist before the service can use it. The domain user must log on to the machine interactively at least once to create the profile, then the service can be configured to run as that user.

## Glossary

**Local System account** — A built-in Windows account with broad system-level privileges. SMA Technologies recommends running the Windows Agent under this account.

**Domain user** — A Windows user account managed by a domain controller. Required when the agent service must access network resources or domain-authenticated systems at the service level.

**Advanced Windows privileges** — A set of specific operating system rights that must be explicitly granted to a domain user before it can run the Windows Agent service. Examples include Log on as a service and Replace a process-level token.
