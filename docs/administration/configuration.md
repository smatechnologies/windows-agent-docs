---
sidebar_label: 'Configuration file'
---

# MSLSAM.ini configuration file

The MSLSAM.ini is the MSLSAM configuration file name. The location of the MSLSAM.ini file is in the <Configuration Directory\>\\MSLSAM\\ directory.

:::note
The Configuration Directory is based on where you installed your programs. For more information, refer to [File Locations](https://help.smatechnologies.com/opcon/core/latest/Files/Concepts/File%20Locations.htm) in the **Concepts** online help.
:::

The following settings are critical to the operation of the LSAM with OpCon:

- **MaximumNumberOfJobs**: This value determines the maximum number of jobs the LSAM is allowed to process concurrently.
- **SocketNumberToSAM**: This value is used for communication between the LSAM and the SMANetCom; consequently, the value for this setting and the value for the Socket Number on the Machines screen in the Enterprise Manager must match.
- **JORSSocket**: This value defines the socket number through which the JORS Service communicates; consequently, the value for this setting and the value for the JORS Port Number in the Advanced Machine Properties screen in the Enterprise Manager must match.
- **SmaftServerSocket**: This value defines the socket number through which the SMAFT Agent communicates; consequently, the value for this setting and the value for the File Transfer Port Number in the Advanced Machine Properties screen in the Enterprise Manager must match.

## Modify the MSLSAM.ini file

1. Right-click on the **Start** button.
2. Select **Explore** from the menu.
3. Browse to <Configuration Directory\>\\MSLSAM\\ for the desired MSLSAM instance.
4. Find the **MSLSAM.ini** file.
5. Right-click the file and select **Open With**.
6. Select an ASCII text editor (e.g., Notepad) from the **Choose the program you want use** list box.
7. In the text editor, make any necessary modifications to the .ini file. For complete information on the MSLSAM.ini settings, refer to the related topics.
8. Use menu path: **File \> Save**.
9. **Close ☒** the text editor.

## General settings

The table contains the basic settings for the MSLSAM.

|[General Settings]|Default|Dynamic|Required|Description|
|--- |--- |--- |--- |--- |
|DisplayServiceName|SMA OpCon Agent for Microsoft|N|Y|The service name displayed in the Service Control Manager. The name must be unique for each MSLSAM. Do not change this unless there is more than one LSAM on this physical machine.|
|ShortServiceName|SMA_MSLSAMNET|N|Y|The hidden, internal (i.e., registry) service name Windows refers to. The name must be unique for each MSLSAM. Do not change this unless there is more than one LSAM on this physical machine.|
|MaximumNumberOfJobs|50|Y|Y|Defines the maximum number of jobs the LSAM can simultaneously manage. When setting the MaximumNumberOfJobs, consider the MSLSAM machine's processor speed and memory (RAM) size. No job is processed when this setting is 0. Although the maximum value allowed is 500, typical customer usage ranges from 10 to 30 jobs.|
|DefaultECOFDirectory|Blank|Y|N|The default E.C.O.F. (Exit Code Override File) directory for the MSLSAM. An E.C.O.F. in a job definition nullifies the DefaultECOFDirectory setting for that job. If this setting is blank or if the job does not create an E.C.O.F., the MSLSAM uses the standard termination status of the job from the operating system. The E.C.O.F. name must be in the format of "*Jobname* *SAM Job ID Number*.txt". For more information on the E.C.O.F., refer to Exit Code Override File (E.C.O.F.).|
|InitializationScript|Blank|N|N|The full path to the initialization script. The initialization script executes when the MSLSAM service starts. SMA Technologies recommends using this script to map network drives or to perform any other required initialization procedure. Enclose the path in double quotes ("*path*"). Refer to WindowState Behavior.|
|TerminationScript|Blank|N|N|The full path to the termination script. The termination script executes when the MSLSAM service stops.  SMA Technologies recommends using this script to disconnect network drives or to perform any other required termination procedure. Enclose the path in double quotes ("*path*"). Refer to Modify the MSLSAM.ini File.|
|StartAllProcessesWrapper|Blank|N|N|The full path to a wrapper script or to a wrapper executable used as a "proxy" to start all jobs. The job information on the Job Detail screen is sent as arguments to this script or executable. The wrapper script/executable must capture and send the job's termination value to OpCon (e.g., through an E.C.O.F.). The wrapper script/executable must be either a .bat, .cmd, .exe, or a .com image. Enclose the path in double quotes ("*path*"). Refer to Using the StartAllProcessWrapper.|
|CaptureJobStatistics|FALSE|Y|N|Enables/disables the LSAM to capture additional job statistics information to send back with Job tracking information to OpCon. The job statistics display in the LSAM Feedback category in the Job Configuration view. Refer to Using the CaptureJobStatistics.|
|KillWrapperOnJobKill|FALSE|Y|N|Determines the behavior of the LSAM when "StartAllProcessesWrapper" setting is configured, and it receives a Kill command from OpCon. If TRUE, the LSAM will kill the wrapper process in addition to the child processes. If FALSE, the LSAM will only kill the child processes.|
|UseWrapperForPreruns|FALSE|Y|N|Determines if the StartAllProcessWrapper specified should be used for prerun jobs. If TRUE the wrapper is used for starting the prerun as well as main jobs. If FALSE only main jobs are started using the wrapper.|
|UseSecureSocket|FALSE|N|Y|Specifies whether this machine should use TLS Security. This setting can be either TRUE or FALSE.|
|TLSCertificateSerial|Blank|N|Y|An identifier for the locally stored digital certificate that identifies this LSAM to the OpCon SMANetCom communications program. This serial number can be found in the certificate store of the local machine where the MSLSAM software is installed. This field may only be left blank if UseSecureSocket is set to FALSE. Otherwise, it must not be blank.|
|TLSClientValidation|FALSE|N|Y|If FALSE, TLS client validation will not be performed. If TRUE, the LSAM (as TLS server) validates the certificate presented by the OpCon server's SMANetCom program (as TLS client). Note: On the LSAM machine, an administrator must install a copy of the OpCon server's self-signed or CA (Certificate Authority) digital certificate.|
|TLSCheckCertificateRevocation|FALSE|N|Y|If FALSE, do not validate certificates against the local certificate store's revocation list. If TRUE, the connection will fail if any certificate has been revoked. Note: To use this option, refer to Microsoft documentation about maintaining a certificate revocation list in the local certificate store.|
|DefaultWorkingDirectoryAsProgram|FALSE|Y|N|If TRUE, the Working Directory for Windows jobs (if left empty) will be treated the same as the location of the program run by the job. If FALSE, the setting will follow backwards compatibility where it assumes the Working Directory (when un-configured) is the same as the Current Directory for the agent (the location of MSLsam.exe).|
|PostProcess|Blank|Y|N|Specifies the path to any script or executable file the user wants to run as a postprocess for all jobs started through this agent.|
|UseScheduleNameInOutputFile|FALSE|Y|N|Specifies whether the Job Output file name created under the <Configuration Directory\>\MSLSAM\JobOutput folder will contain the name of the schedule in addition to JobName and SAMJobID. This setting can be either TRUE or FALSE.|

## TCP/IP parameters

The table contains the network settings for the MSLSAM.

:::caution
Enter all alphabetic TCP/IP parameter values in uppercase. The MSLSAM service does not start if the values are in lowercase.
:::

|[TCP/IP Parameters]|Default|Dynamic|Required|Description|
|--- |--- |--- |--- |--- |
|SocketNumberToSAM|3100|N|Y|Defines the socket number through which the LSAM and the SMANetCom communicate. This number must match the Machine's socket number defined in the Enterprise Manager. If there are multiple MSLSAMs installed on one machine, each LSAM must have a unique value. For an up-to-date list of unused ports, please refer to the Internet Assigned Numbers Authority at www.iana.org.|
|AllowedIPAddress_1|ANY|Y|N|Determines if communication from the SMANetCom to the LSAM is restricted to one or more TCP/IP addresses. If ANY is specified, the LSAM accepts communication from any TCP/IP address. If a specific TCP/IP address is defined (e.g., 126.40.90.231), the LSAM only accepts communication from the specified address. The LSAM refuses a connection if communication is attempted from another address. This definition enhances communication security by refusing communications from other TCP/IP addresses. If multiple SAMs are on a network, this address ensures the LSAM is only accepting messages from the intended SMANetCom. This parameter is case-sensitive.|
|AllowedIPAddress_2|Blank|Y|N|Same as Address_1 explanation.|
|AllowedIPAddress_3|Blank|Y|N|Same as Address_1 explanation.|
|AllowedIPAddress_4|Blank|Y|N|Same as Address_1 explanation.|
|CheckCRC|TRUE|Y|N|Indicates if a CRC validation should be performed on messages sent between the LSAM and SMANetcom. If TRUE, all messages will be validated and error messages written if a CRC check fails. If FALSE, messages are not validated.|
|InboundBufferCount|250|Y|N|Sets the number of inbound TCP/IP buffers for this connection. The typical size of one TCP/IP buffer is 8192 bytes. A change to this parameter only takes effect when the socket is reopened.|

## Process creation parameters

The table contains the process settings involved in the execution of MSLSAM jobs.

:::caution
Enter all process creation parameter values in uppercase. The MSLSAM service cannot start if the values are in lowercase.
:::

|[Process Creation Parameters]|Default|Dynamic|Required|Description|
|--- |--- |--- |--- |--- |
|WindowState|HIDE|Y|N|Determines how MSLSAM jobs interact with the desktop. If HIDE, jobs started by the LSAM run in the background and are not visible on the logged-on desktop. Note: If HIDE, the processes are only seen in the Task Manager. If SHOW, jobs started by the LSAM appear on the currently logged-on desktop. If INTERACTIVEHIDE, jobs started by the LSAM run in the background, but Windows will treat them as interactive. If MINIMIZE, jobs started by the LSAM appear on the Task Bar of the currently logged-on desktop. This parameter is case-sensitive. SHOW / MINIMIZE setting is usually used for debugging a process or if the process requires user intervention. For more information, refer to General Settings.|
|FailJobWithMissingECOF|FALSE|Y|N|Decides the MSLSAM response when the E.C.O.F. (Exit Code Override File) is missing. This setting only applies to the E.C.O.F. in the job definition (not to the DefaultECOFDirectory). If TRUE and the E.C.O.F. is not present, the LSAM marks the job as Failed. If FALSE and the E.C.O.F. is not present, the LSAM compares the Failure Criteria with the job's standard termination status. This parameter is case-sensitive. For more information on the E.C.O.F., refer to Exit Code Override File (E.C.O.F.).|
|CaptureJobOutput|TRUE|Y|N|Enables/disables the creation of job output files for each OpCon job. If set to TRUE, the LSAM saves the output from each started job in a subdirectory (under the MSLSAM directory) called JobOutput. The LSAM saves each job's output to unique files named with the following syntax:"*OpConxps job name up to 12 chars* *unique number*.TXT". View Job Output feature works only if this setting is TRUE.|

## Debug options

The table contains the log and trace settings for troubleshooting the MSLSAM.

:::caution
Enter all alphabetic debug option parameter values in uppercase. The MSLSAM service cannot start if the values are in lowercase.
:::

|[Debug Options]|Default|Dynamic|Required|Description|
|--- |--- |--- |--- |--- |
|ArchiveDaysToKeep|10|Y|N|Determine how many archive folders should be retained. Each time it archives a log, the MSLSAM checks for expired archive folders to delete.|
|MaximumLogFileSize|150000|Y|N|Sets the maximum size in bytes for each LSAM log file. Prevents the accumulation of log messages in a single file. This is a site-specific setting.|
|TraceLevel|0|Y|N|Determines the detail in the information written to the MSLSAM.log file. 0 is standard logging level. 1 is more detailed logging.|
|TraceSAMMessages|ON|Y|N|Enables/Disables tracing of SMANetCom communication messages sent to/from the LSAM. The MSLSAMTrace.log file contains the traced messages. If ON, the incoming SMANetCom messages are traced. If OFF, the incoming SMANetCom messages are not traced. This parameter is case-sensitive. Note: This trace file is helpful for troubleshooting and debugging.|
|DumpJobDetails|OFF|Y|N|Enables the dumping of job details into the log each time the status of a job changes. Note: This trace file is helpful for troubleshooting and debugging. If ON, the MSLSAM dumps the job details. If OFF, the MSLSAM does not dump the job details. Dumping job details can produce a very large amount of data. Do not turn this option on unless directed by SMA Technologies.|
|LogCriticalErrorsAsEvents|OFF|Y|N|Enables/Disables the LSAM to send critical errors to the Event Log. If ON, the LSAM sends critical errors to the Event Log. If OFF, the LSAM does not send critical errors to the Event Log.|

## JORS settings

The table contains settings for configuring JORS for job output retrieval.

|[JORS Settings]|Default|Dynamic|Required|Description|
|--- |--- |--- |--- |--- |
|JORSSocket|3110|N|Y|Defines the socket number through which the JORS Service communicates. This number must match the JORS Port Number defined in the Enterprise Manager under the Advanced Machine Settings in the Communication Settings category. If there are multiple MSLSAMs installed on one machine, each LSAM'sJORS Service must have a unique port. For an up-to-date list of unused ports, please refer to the Internet Assigned Numbers Authority at www.iana.org.|
|MaxJorsFileSize|65536|N|N|Indicates the maximum size of Job Output file that will be retrieved for viewing in OpCon. If the output file is larger than the MaxJorsFile Size, it will be truncated while viewing. The minimum and default value for this is 65536 bytes (which is 64K) and maximum value is 52428800 bytes (which is 50MB). If an invalid value is specified, the file will default to 65536.|
|LogComposition|MIX|N|N|LogComposition only applies when a job output file larger than the MaxJorsFileSize is being viewed. START indicates that MaxJorsFileSize bytes from start of the job output file will be presented in OpCon. END indicates that MaxJorsFileSize bytes at the end of the job output file will be presented in OpCon. MIX indicates that half of MaxJorsFileSizebytes from the start of the file and half of MaxJorsFileSize bytes at the end of the job output file will be presented in OpCon.|

## SMAFT settings

The table contains settings for configuring File Transfer.

:::caution
For a File Transfer job to function properly, ensure that any firewall on the Windows machine allows the TlsSmaftServerSocket number to be open.
:::

|[SMAFT Settings]|Default|Dynamic|Required|Description|
|--- |--- |--- |--- |--- |
|TlsSmaftServerSocket|0|N|Y|Defines the TLS socket number through which all SMA File Transfer communication occurs. This number must match the TLS File Transfer Port Number defined in the Enterprise Manager under the Advanced Machine Settings in the File Transfer Settings category. If UseSecureSocket is disabled, this port number should be configured different from JORSSocket. If UseSecureSocket is enabled, this port number can be configured to match JORSSocket. This port number should always be different from SmaftServerSocket. A zero value configured for this setting indicates TLS File Transfers are disabled from this server. If there are multiple MSLSAMs installed on one machine, each LSAM's FT Server Service must have a unique port. This socket number may match the JORSSocket for the same instance (if satisfying conditions listed above), or be a unique number. For an up-to-date list of unused ports, please refer to the Internet Assigned Numbers Authority at www.iana.org.|
|SmaftServerSocket|3110|N|Y|Defines the non-TLS socket number through which all SMA File Transfer communication occurs. This number must match the non-TLS File Transfer Port Number defined in the Enterprise Manager under the Advanced Machine Settings in the File Transfer Settings category. If UseSecureSocket is enabled, this port number should be configured different from JORSSocket. If UseSecureSocket is disabled, this port number can be configured to match JORSSocket. This port number should always be different from TlsSmaftServerSocket. A zero value configured for this setting indicates non-TLS File Transfers are disabled from this server. If there are multiple MSLSAMs installed on one machine, each LSAM's FT Server Service must have a unique port. This socket number may match the JORSSocket for the same instance, or be a unique number. For an up-to-date list of unused ports, please refer to the Internet Assigned Numbers Authority at www.iana.org.|
|TemporaryFolderName|OpConTemp|N|Y|Defines the folder name inside which the SMAFT Components will create the temporary file while handling a file transfer. The folder name defined will be created in the root of the logical drive letter matching the destination for the file. For example, if the destination file is 'C:\My Files\ProgramGroup1\Test.txt'', then 'C:\OpConTemp' would be created to store the temporary file during the transfer process. Alternately, you may specify a full path to the temporary file, but this may affect performance. If the temporary file is not created on the same logical drive letter as the destination file, the file must be copied to the final destination after transfer. Note: SMA Technologies does not recommend changing this value; therefore, this setting does not appear in the MSLSAM.ini file with the installation. If recommended by SMA Technologies Customer Support, add this setting to the MSLSAM.ini file.|
|PacketSize|65536|N|Y|This sets the packetsize for the file data packet exchanged between FTServer and FTAgent. Minimum Value: 65536. Maximum Value: 999999.|
|MaskGTBandwidth|FALSE|N|N|When set to TRUE, this masks the > symbol in the SMA File Transfer Job Bandwidth value from being sent to the SMAFT Server. Valid Values: TRUE or FALSE.|
|ZipSupport|YES|N|N|Specifies if JORS has the zip (WinZip) capability for file compression. Valid Values: NO or YES.|
|CompressSupport|YES|N|N|Specifies if the JORS has the gzip compression capability. Valid Values: NO or YES.|
|AesSupport|YES|N|N|Indicates whether the LSAM supports or does not support Aes encryption for SMAFT. Valid Values: NO or YES.|
|DesSupport|YES|N|N|Indicates whether the LSAM supports or does not support Des encryption for SMAFT. Valid Values: NO or YES.|
|TripleDesSupport|YES|N|N|Indicates whether the LSAM supports or does not support TripleDes encryption for SMAFT. Valid Values: NO or YES.|

## Event Log Settings for MSLSAM Configuration

The tables provide settings to customize logging in the Application Log of the Windows Event Viewer.

|[Service Start]|Default|Dynamic|Required|Description|
|--- |--- |--- |--- |--- |
|Msg|$SERVICENAME started.|Y|N|Defines the log message indicating the MSLSAM has started. Modify the text for a different message. Set to NULL to disable this setting. $SERVICENAME is a supported token for this message type.|
|Type|4|Y|N|Defines the message type: 1 equals Error. 2 equals Warning. 4 equals Information.|

|[Service Stop]|Default|Dynamic|Required|Description|
|--- |--- |--- |--- |--- |
|Msg|$SERVICENAME stopped.|Y|N|Defines the log message indicating the MSLSAM has stopped. Modify the text for a different message. Set to NULL to disable this setting. $SERVICENAME is a supported token for this message type.|
|Type|4|Y|N|Defines the message type: 1 equals Error. 2 equals Warning. 4 equals Information.|

|[Job Start]|Default|Dynamic|Required|Description|
|--- |--- |--- |--- |--- |
|Msg|NULL|Y|N|Defines the log message indicating the MSLSAM has submitted a job. Modify the text for a different log message. Set to NULL to disable this setting. $JOBNAME is a supported token for this message type.|
|Type|4|Y|N|Defines the message type: 1 equals Error. 2 equals Warning. 4 equals Information.|

|[Job Finished OK]|Default|Dynamic|Required|Description|
|--- |--- |--- |--- |--- |
|Msg|NULL|Y|N|Defines the log message indicating the MSLSAM-submitted job has completed successfully. Modify the text for a different log message. Set to NULL to disable this setting. $JOBNAME is a supported token for this message type.|
|Type|4|Y|N|Defines the message type: 1 equals Error. 2 equals Warning. 4 equals Information.|

|[Job Prerun Failed]|Default|Dynamic|Required|Description|
|--- |--- |--- |--- |--- |
|Msg|NULL|Y|N|Defines the log message indicating the MSLSAM-submitted prerun job has failed. Modify the text for a different log message. Set to NULL to disable this setting. $JOBNAME is a supported token for this message type.|
|Type|4|Y|N|Defines the message type: 1 equals Error. 2 equals Warning. 4 equals Information.|

|[Job Initialization Error]|Default|Dynamic|Required|Description|
|--- |--- |--- |--- |--- |
|Msg|NULL|Y|N|Defines the log message indicating the MSLSAM-submitted prerun job has had an initialization error. Modify the text for a different log message. Set to NULL to disable this setting. $JOBNAME is a supported token for this message type.|
|Type|4|Y|N|Defines the message type: 1 equals Error. 2 equals Warning. 4 equals Information.|

|[Job Errored]|Default|Dynamic|Required|Description|
|--- |--- |--- |--- |--- |
|Msg|NULL|Y|N|Defines the log message indicating the MSLSAM-submitted prerun job has failed. Modify the text for a different log message. Set to NULL to disable this setting. $JOBNAME is a supported token for this message type.|
|Type|4|Y|N|Defines the message type: 1 equals Error. 2 equals Warning. 4 equals Information.|

|[No Access To ECOF Directory]|Default|Dynamic|Required|Description|
|--- |--- |--- |--- |--- |
|Msg|The DefaultECOFDirectory is not valid or this service lacks read/write access to it.|Y|N|Defines the log message indicating an invalid E.C.O.F. directory. Modify the text for a different log message. Set to NULL to disable this setting.|
|Type|4|Y|N|Defines the message type: 1 equals Error. 2 equals Warning. 4 equals Information.|
