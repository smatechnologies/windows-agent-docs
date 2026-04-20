---
sidebar_label: 'Configuration file'
title: MSLSAM.ini configuration file
description: "Reference for all MSLSAM.ini settings that control Windows Agent behavior, including network, process, logging, JORS, and SMAFT configuration."
tags:
  - Reference
  - System Administrator
  - Agents
  - System Configuration
---

# MSLSAM.ini configuration file

**Theme:** Configure  
**Who Is It For?** System Administrator

## What is it?

MSLSAM.ini is the Windows Agent configuration file. It contains all settings that control how the agent communicates with OpCon, executes jobs, manages log files, and handles output. The file is located in the `<Configuration Directory>\MSLSAM\` directory.

* Configure the OpCon server address, port numbers, and TLS settings
* Set logging levels, archive retention, and output file directories
* Define job execution behavior including timeout, kill handling, and capture options

:::note
The Configuration Directory is based on where you installed your programs. For more information, refer to [File Locations](https://help.smatechnologies.com/opcon/core/file-locations) in the **Concepts** online help.
:::

## When to use

- When configuring the agent for the first time after installation to connect it to the OpCon server.
- When changing port numbers, TLS settings, logging behavior, or job execution options without reinstalling the agent.

## Benefits

- The agent detects changes to MSLSAM.ini automatically, so most settings take effect on the next service restart without requiring reinstallation.
- All agent behavior is controlled from a single file, reducing the number of places to check when troubleshooting communication or job execution issues.

The following settings are critical to the operation of the agent with OpCon:

- **MaximumNumberOfJobs**: This value determines the maximum number of jobs the agent is allowed to process concurrently.
- **SocketNumberToSAM**: This value is used for communication between the agent and SMANetCom. The value for this setting and the value for the Socket Number on the Machines screen must match.
- **JORSSocket**: This value defines the socket number through which the JORS Service communicates. The value for this setting and the value for the JORS Port Number in Advanced Machine Properties must match.
- **SmaftServerSocket**: This value defines the socket number through which the SMAFT Agent communicates. The value for this setting and the value for the File Transfer Port Number in Advanced Machine Properties must match.

## Modify the MSLSAM.ini file

To modify the MSLSAM.ini file, complete the following steps:

1. Right-click the **Start** button.
2. Select **Explore** from the menu.
3. Go to `<Configuration Directory>\MSLSAM\` for the desired instance.
4. Find the **MSLSAM.ini** file.
5. Right-click the file and select **Open With**.
6. Select an ASCII text editor (for example, Notepad) from the **Choose the program you want to use** list.
7. In the text editor, make any necessary modifications to the file. For complete information on the MSLSAM.ini settings, refer to the related topics.
8. Use menu path: **File \> Save**.
9. Close the text editor. The changes are saved.

## General settings

The table contains the basic settings for the Windows Agent.

| [General Settings] | Default | Dynamic | Required | Description |
|---|---|---|---|---|
| DisplayServiceName | SMA OpCon Agent for Microsoft | N | Y | The service name displayed in the Service Control Manager. The name must be unique for each agent instance. Do not change this unless there is more than one agent on this physical machine. |
| ShortServiceName | SMA_MSLSAMNET | N | Y | The hidden, internal (registry) service name Windows refers to. The name must be unique for each agent instance. Do not change this unless there is more than one agent on this physical machine. |
| MaximumNumberOfJobs | 50 | Y | Y | Defines the maximum number of jobs the agent can simultaneously manage. When setting the MaximumNumberOfJobs, consider the machine's processor speed and memory (RAM) size. No job is processed when this setting is 0. Although the maximum value allowed is 500, typical customer usage ranges from 10 to 30 jobs. |
| DefaultECOFDirectory | Blank | Y | N | The default E.C.O.F. (Exit Code Override File) directory for the agent. An E.C.O.F. in a job definition nullifies the DefaultECOFDirectory setting for that job. If this setting is blank or if the job does not create an E.C.O.F., the agent uses the standard termination status of the job from the operating system. The E.C.O.F. name must be in the format of `Jobname SAM Job ID Number.txt`. For more information on the E.C.O.F., refer to [Exit Code Override File (E.C.O.F.)](../advanced-features/ecof). |
| InitializationScript | Blank | N | N | The full path to the initialization script. The initialization script runs when the agent service starts. SMA Technologies recommends using this script to map network drives or to perform any other required initialization. Enclose the path in double quotes. Refer to [WindowState behavior](window-state). |
| TerminationScript | Blank | N | N | The full path to the termination script. The termination script runs when the agent service stops. SMA Technologies recommends using this script to disconnect network drives or to perform any other required termination procedure. Enclose the path in double quotes. |
| StartAllProcessesWrapper | Blank | N | N | The full path to a wrapper script or wrapper executable used as a proxy to start all jobs. The job information on the Job Detail screen is sent as arguments to this script or executable. The wrapper script/executable must capture and send the job's termination value to OpCon (for example, through an E.C.O.F.). The wrapper script/executable must be either a `.bat`, `.cmd`, `.exe`, or `.com` image. Enclose the path in double quotes. Refer to [StartAllProcessWrapper](wrapper). |
| CaptureJobStatistics | FALSE | Y | N | Enables or disables the agent to capture additional job statistics information to send back with job tracking information to OpCon. The job statistics display in the **LSAM Feedback** category in the Job Configuration view. Refer to [CaptureJobStatistics](capture-stats). |
| KillWrapperOnJobKill | FALSE | Y | N | Determines the behavior of the agent when the `StartAllProcessesWrapper` setting is configured and it receives a kill command from OpCon. If `TRUE`, the agent kills the wrapper process in addition to the child processes. If `FALSE`, the agent only kills the child processes. |
| UseWrapperForPreruns | FALSE | Y | N | Determines if the StartAllProcessWrapper should be used for prerun jobs. If `TRUE`, the wrapper is used for starting the prerun as well as main jobs. If `FALSE`, only main jobs are started using the wrapper. |
| UseSecureSocket | FALSE | N | Y | Specifies whether this machine should use TLS security. Valid values: `TRUE` or `FALSE`. |
| TLSCertificateSerial | Blank | N | Y | An identifier for the locally stored digital certificate that identifies this agent to SMANetCom. This serial number can be found in the certificate store of the local machine where the agent software is installed. This field may only be left blank if `UseSecureSocket` is set to `FALSE`. |
| TLSClientValidation | FALSE | N | Y | If `FALSE`, TLS client validation is not performed. If `TRUE`, the agent (as TLS server) validates the certificate presented by SMANetCom (as TLS client). An administrator must install a copy of the OpCon server's self-signed or CA digital certificate on the agent machine. |
| TLSCheckCertificateRevocation | FALSE | N | Y | If `FALSE`, do not validate certificates against the local certificate store's revocation list. If `TRUE`, the connection fails if any certificate has been revoked. To use this option, refer to Microsoft documentation about maintaining a certificate revocation list in the local certificate store. |
| DefaultWorkingDirectoryAsProgram | FALSE | Y | N | If `TRUE`, the Working Directory for Windows jobs (if left empty) is treated the same as the location of the program run by the job. If `FALSE`, the setting follows backwards compatibility where it assumes the Working Directory (when unconfigured) is the same as the current directory for the agent (the location of `MSLsam.exe`). |
| PostProcess | Blank | Y | N | Specifies the path to any script or executable file to run as a post process for all jobs started through this agent. |
| UseScheduleNameInOutputFile | FALSE | Y | N | Specifies whether the job output file name created under the `<Configuration Directory>\MSLSAM\JobOutput` folder includes the name of the schedule in addition to job name and SAM job ID. Valid values: `TRUE` or `FALSE`. |

## TCP/IP parameters

The table contains the network settings for the Windows Agent.

:::caution
Enter all alphabetic TCP/IP parameter values in uppercase. The agent service does not start if the values are in lowercase.
:::

| [TCP/IP Parameters] | Default | Dynamic | Required | Description |
|---|---|---|---|---|
| SocketNumberToSAM | 3100 | N | Y | Defines the socket number through which the agent and SMANetCom communicate. This number must match the machine's socket number defined in OpCon. If there are multiple agent instances installed on one machine, each instance must have a unique value. For an up-to-date list of unused ports, refer to the Internet Assigned Numbers Authority at www.iana.org. |
| AllowedIPAddress_1 | ANY | Y | N | Determines if communication from SMANetCom to the agent is restricted to one or more TCP/IP addresses. If `ANY` is specified, the agent accepts communication from any TCP/IP address. If a specific TCP/IP address is defined (for example, `126.40.90.231`), the agent only accepts communication from that address. This parameter is case-sensitive. |
| AllowedIPAddress_2 | Blank | Y | N | Same as AllowedIPAddress_1. |
| AllowedIPAddress_3 | Blank | Y | N | Same as AllowedIPAddress_1. |
| AllowedIPAddress_4 | Blank | Y | N | Same as AllowedIPAddress_1. |
| CheckCRC | TRUE | Y | N | Indicates if a CRC validation should be performed on messages sent between the agent and SMANetCom. If `TRUE`, all messages are validated and error messages are written if a CRC check fails. If `FALSE`, messages are not validated. |
| InboundBufferCount | 250 | Y | N | Sets the number of inbound TCP/IP buffers for this connection. The typical size of one TCP/IP buffer is 8192 bytes. A change to this parameter only takes effect when the socket is reopened. |

## Process creation parameters

The table contains the process settings involved in the execution of Windows Agent jobs.

:::caution
Enter all process creation parameter values in uppercase. The agent service cannot start if the values are in lowercase.
:::

| [Process Creation Parameters] | Default | Dynamic | Required | Description |
|---|---|---|---|---|
| WindowState | HIDE | Y | N | Determines how Windows Agent jobs interact with the desktop. If `HIDE`, jobs run in the background and are not visible on the logged-on desktop. If `SHOW`, jobs appear on the currently logged-on desktop. If `INTERACTIVEHIDE`, jobs run in the background but Windows treats them as interactive. If `MINIMIZE`, jobs appear on the Task Bar of the currently logged-on desktop. This parameter is case-sensitive. `SHOW` and `MINIMIZE` are typically used for debugging. For more information, refer to [WindowState behavior](window-state). |
| FailJobWithMissingECOF | FALSE | Y | N | Decides the agent's response when the E.C.O.F. is missing. This setting only applies to the E.C.O.F. in the job definition (not to the DefaultECOFDirectory). If `TRUE` and the E.C.O.F. is not present, the agent marks the job as Failed. If `FALSE` and the E.C.O.F. is not present, the agent compares the Failure Criteria with the job's standard termination status. This parameter is case-sensitive. For more information on the E.C.O.F., refer to [Exit Code Override File (E.C.O.F.)](../advanced-features/ecof). |
| CaptureJobOutput | TRUE | Y | N | Enables or disables the creation of job output files for each OpCon job. If `TRUE`, the agent saves the output from each started job in a subdirectory called `JobOutput`. The View Job Output feature only works if this setting is `TRUE`. |

## Debug options

The table contains the log and trace settings for troubleshooting the Windows Agent.

:::caution
Enter all alphabetic debug option parameter values in uppercase. The agent service cannot start if the values are in lowercase.
:::

| [Debug Options] | Default | Dynamic | Required | Description |
|---|---|---|---|---|
| ArchiveDaysToKeep | 10 | Y | N | Determines how many archive folders to retain. Each time the agent archives a log, it checks for expired archive folders to delete. |
| MaximumLogFileSize | 150000 | Y | N | Sets the maximum size in bytes for each log file. Prevents the accumulation of log messages in a single file. This is a site-specific setting. |
| TraceLevel | 0 | Y | N | Determines the detail in the information written to the MSLSAM.log file. `0` is standard logging level. `1` is more detailed logging. |
| TraceSAMMessages | ON | Y | N | Enables or disables tracing of SMANetCom communication messages sent to and from the agent. The MSLSAMTrace.log file contains the traced messages. If `ON`, incoming SMANetCom messages are traced. If `OFF`, they are not. This parameter is case-sensitive. This trace file is helpful for troubleshooting and debugging. |
| DumpJobDetails | OFF | Y | N | Enables the dumping of job details into the log each time the status of a job changes. If `ON`, the agent dumps the job details. If `OFF`, it does not. Dumping job details can produce a large amount of data. Do not turn this option on unless directed by SMA Technologies. |
| LogCriticalErrorsAsEvents | OFF | Y | N | Enables or disables the agent sending critical errors to the Event Log. If `ON`, the agent sends critical errors to the Event Log. If `OFF`, it does not. |

## JORS settings

The table contains settings for configuring JORS for job output retrieval.

| [JORS Settings] | Default | Dynamic | Required | Description |
|---|---|---|---|---|
| JORSSocket | 3110 | N | Y | Defines the socket number through which the JORS Service communicates. This number must match the JORS Port Number defined in the Advanced Machine Settings under Communication Settings. If there are multiple agent instances installed on one machine, each instance's JORS Service must have a unique port. For an up-to-date list of unused ports, refer to the Internet Assigned Numbers Authority at www.iana.org. |
| MaxJorsFileSize | 65536 | N | N | Indicates the maximum size of a job output file that will be retrieved for viewing in OpCon. If the output file is larger than MaxJorsFileSize, it will be truncated while viewing. The minimum and default value is 65536 bytes (64K) and the maximum value is 52428800 bytes (50MB). |
| LogComposition | MIX | N | N | Only applies when a job output file larger than MaxJorsFileSize is being viewed. `START` presents MaxJorsFileSize bytes from the start of the file. `END` presents MaxJorsFileSize bytes at the end of the file. `MIX` presents half from the start and half from the end. |

## SMAFT settings

The table contains settings for configuring file transfer.

:::caution
For a File Transfer job to function properly, ensure that any firewall on the Windows machine allows the TlsSmaftServerSocket number to be open.
:::

| [SMAFT Settings] | Default | Dynamic | Required | Description |
|---|---|---|---|---|
| TlsSmaftServerSocket | 0 | N | Y | Defines the TLS socket number through which all SMA File Transfer communication occurs. This number must match the TLS File Transfer Port Number defined in Advanced Machine Settings under File Transfer Settings. A zero value indicates TLS File Transfers are disabled from this server. If there are multiple agent instances installed on one machine, each instance's FT Server Service must have a unique port. For an up-to-date list of unused ports, refer to the Internet Assigned Numbers Authority at www.iana.org. |
| SmaftServerSocket | 3110 | N | Y | Defines the non-TLS socket number through which all SMA File Transfer communication occurs. This number must match the non-TLS File Transfer Port Number defined in Advanced Machine Settings under File Transfer Settings. A zero value indicates non-TLS File Transfers are disabled from this server. For an up-to-date list of unused ports, refer to the Internet Assigned Numbers Authority at www.iana.org. |
| TemporaryFolderName | OpConTemp | N | Y | Defines the folder name inside which SMAFT components create the temporary file while handling a file transfer. The folder is created in the root of the logical drive matching the destination file. SMA Technologies does not recommend changing this value. If recommended by SMA Technologies Support, add this setting to the MSLSAM.ini file. |
| PacketSize | 65536 | N | Y | Sets the packet size for the file data packet exchanged between FTServer and FTAgent. Minimum value: 65536. Maximum value: 999999. |
| MaskGTBandwidth | FALSE | N | N | When set to `TRUE`, masks the `>` symbol in the SMA File Transfer job bandwidth value from being sent to the SMAFT Server. Valid values: `TRUE` or `FALSE`. |
| ZipSupport | YES | N | N | Specifies if JORS has zip (WinZip) capability for file compression. Valid values: `NO` or `YES`. |
| CompressSupport | YES | N | N | Specifies if JORS has gzip compression capability. Valid values: `NO` or `YES`. |
| AesSupport | YES | N | N | Indicates whether the agent supports AES encryption for SMAFT. Valid values: `NO` or `YES`. |
| DesSupport | YES | N | N | Indicates whether the agent supports DES encryption for SMAFT. Valid values: `NO` or `YES`. |
| TripleDesSupport | YES | N | N | Indicates whether the agent supports TripleDES encryption for SMAFT. Valid values: `NO` or `YES`. |

## Event Log settings

The tables provide settings to customize logging in the Application Log of the Windows Event Viewer.

| [Service Start] | Default | Dynamic | Required | Description |
|---|---|---|---|---|
| Msg | $SERVICENAME started. | Y | N | Defines the log message indicating the agent has started. Set to `NULL` to disable. `$SERVICENAME` is a supported token for this message type. |
| Type | 4 | Y | N | Defines the message type: `1` = Error, `2` = Warning, `4` = Information. |

| [Service Stop] | Default | Dynamic | Required | Description |
|---|---|---|---|---|
| Msg | $SERVICENAME stopped. | Y | N | Defines the log message indicating the agent has stopped. Set to `NULL` to disable. `$SERVICENAME` is a supported token for this message type. |
| Type | 4 | Y | N | Defines the message type: `1` = Error, `2` = Warning, `4` = Information. |

| [Job Start] | Default | Dynamic | Required | Description |
|---|---|---|---|---|
| Msg | NULL | Y | N | Defines the log message indicating the agent has submitted a job. Set to `NULL` to disable. `$JOBNAME` is a supported token for this message type. |
| Type | 4 | Y | N | Defines the message type: `1` = Error, `2` = Warning, `4` = Information. |

| [Job Finished OK] | Default | Dynamic | Required | Description |
|---|---|---|---|---|
| Msg | NULL | Y | N | Defines the log message indicating the agent-submitted job has completed successfully. Set to `NULL` to disable. `$JOBNAME` is a supported token for this message type. |
| Type | 4 | Y | N | Defines the message type: `1` = Error, `2` = Warning, `4` = Information. |

| [Job Prerun Failed] | Default | Dynamic | Required | Description |
|---|---|---|---|---|
| Msg | NULL | Y | N | Defines the log message indicating the agent-submitted prerun job has failed. Set to `NULL` to disable. `$JOBNAME` is a supported token for this message type. |
| Type | 4 | Y | N | Defines the message type: `1` = Error, `2` = Warning, `4` = Information. |

| [Job Initialization Error] | Default | Dynamic | Required | Description |
|---|---|---|---|---|
| Msg | NULL | Y | N | Defines the log message indicating the agent-submitted job has had an initialization error. Set to `NULL` to disable. `$JOBNAME` is a supported token for this message type. |
| Type | 4 | Y | N | Defines the message type: `1` = Error, `2` = Warning, `4` = Information. |

| [Job Errored] | Default | Dynamic | Required | Description |
|---|---|---|---|---|
| Msg | NULL | Y | N | Defines the log message indicating the agent-submitted job has failed. Set to `NULL` to disable. `$JOBNAME` is a supported token for this message type. |
| Type | 4 | Y | N | Defines the message type: `1` = Error, `2` = Warning, `4` = Information. |

| [No Access To ECOF Directory] | Default | Dynamic | Required | Description |
|---|---|---|---|---|
| Msg | The DefaultECOFDirectory is not valid or this service lacks read/write access to it. | Y | N | Defines the log message indicating an invalid E.C.O.F. directory. Set to `NULL` to disable. |
| Type | 4 | Y | N | Defines the message type: `1` = Error, `2` = Warning, `4` = Information. |

## Exception handling

**Agent service does not start** — An alphabetic value in the TCP/IP parameters, process creation parameters, or debug options section of MSLSAM.ini is in lowercase. All alphabetic values in these sections must be uppercase (for example, `TRUE` not `true`, `ON` not `on`, `HIDE` not `hide`). Review MSLSAM.ini, correct any lowercase values, and attempt to start the service again.

**Agent does not receive jobs from OpCon and is not reachable from the Operations view** — The `SocketNumberToSAM` value in MSLSAM.ini does not match the Socket Number configured on the machine definition in OpCon. Verify that both values are identical, then restart the agent service for the change to take effect.

**File transfer jobs do not function** — A firewall on the Windows machine is blocking the port configured in `TlsSmaftServerSocket`. Ensure the firewall allows inbound and outbound traffic on that port number.

**Event log shows "No Access To ECOF Directory"** — The path set in `DefaultECOFDirectory` does not exist or the account running the agent service lacks read/write access to it. Verify the directory exists and that the service account has read and write permissions on it.

## FAQs

**Do MSLSAM.ini changes take effect immediately?**  
Settings marked **Y** in the Dynamic column take effect without restarting the agent service. Settings marked **N** require a service restart to apply.

**What happens if SocketNumberToSAM does not match the Socket Number in OpCon?**  
Communication between the agent and SMANetCom will fail. The agent will not receive job start requests from OpCon and will not be reachable from the OpCon Operations view.

## Glossary

**Dynamic setting** — An MSLSAM.ini setting marked Y in the Dynamic column that takes effect on the next agent cycle without restarting the service. Settings marked N require a service restart to apply.

**SocketNumberToSAM** — The MSLSAM.ini setting that defines the port through which the Windows Agent and the OpCon SMANetCom service communicate. Must match the Socket Number in the OpCon machine definition.
