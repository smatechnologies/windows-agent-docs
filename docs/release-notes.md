---
sidebar_label: 'Release notes'
title: Windows Agent release notes
description: "Version history and change details for the Windows Agent, including new features, improvements, and bug fixes."
tags:
  - Reference
  - System Administrator
  - Agents
---

# Windows Agent release notes

## 25

### 25.1.0

2026 April

### What's new

:eight_spoked_asterisk: **OCAG-160**: FileWatcher job now finishes with an error when the monitored network path goes offline and the monitoring window expires.

:eight_spoked_asterisk: **OCAG-669**: Removed the redundant RemoveJobTracking call where the job is not found in internal tables. Eliminates a 1-second-per-message delay when processing TX2 messages for jobs not found in the agent's internal tables, improving throughput in high job volume environments where such messages are frequent.

### Why this matters

FileWatcher now reports an error when a monitored network path goes offline before the monitoring window expires, giving operations teams an immediate, actionable failure rather than a silent timeout. Removing the redundant internal tracking call eliminates a one-second processing delay per message, improving agent throughput in environments where TX2 messages for untracked jobs are frequent.

### 25.0.0

2026 February

### What's new

:eight_spoked_asterisk: **OCAG-292**: The target .NET framework for the Windows Agent, JORS, and SMAFT has been updated to .NET Framework 4.8 and TLS 1.3 support has been added across these components.

### Why this matters

Upgrading to .NET Framework 4.8 and adding TLS 1.3 support across the agent, JORS, and SMAFT aligns the Windows Agent with current security standards and prepares it for environments that require modern TLS configurations.

## 20

### 20.4.0

2023 March

:eight_spoked_asterisk: **WIN-613**: Fixed an issue for FileWatcher to resume processing start and end offsets based on schedule date value after a machine restart.

:eight_spoked_asterisk: **WIN-619**: Fixed an issue in Windows agent upgrades to prevent a collision of app ids during installation and throwing an error.

### 20.3.0

2022 October

:eight_spoked_asterisk: **WIN-612**: Fixed an issue where advanced failure criteria submitted with a missing sequence number results in a null reference exception when trying to evaluate exit condition.

:eight_spoked_asterisk: **WIN-604**: Fixed an issue where resource monitor looped with a null reference error in event log after reboots.

:eight_spoked_asterisk: **WIN-615**: Fixed an issue in file receive in SMAFT that failed with "This implementation is not part of the Windows Platform FIPS validated cryptographic algorithms" in the SMAFT log.

:eight_spoked_asterisk: **WIN-616**: Fixed an issue in SMAFT where non-binary transfers with record separators corrupted the file transfer.

### 20.2.0

:eight_spoked_asterisk: **WIN-608**: Fixed an issue in the Windows agent where a Windows update (KB5001879) on Windows Server 2019 caused the agent to not start up correctly.

:eight_spoked_asterisk: **WIN-607**: Fixed an issue in the Windows Agent where a post process would not accept any arguments passed to it. Now, if the post process defined in the config has arguments, you may specify them after enclosing the full post process path in double quotes, followed by the list of arguments.

### 20.1.0

2021 April

### What's new

:eight_spoked_asterisk: **WIN-597**: Exit codes for Chronoman are updated to match the ones available on the Linux platform, since Chronoman is now also available in the OpCon Docker image, that runs as a Linux job. For older error codes, see [Chronoman documentation](https://help.smatechnologies.com/opcon/core/v19.1/index.htm#Files/Utilities/Command-line%20Utilities/Chronoman.htm#Chronoman_Command_Line_and_Command_File_Errors).

### Why this matters

Chronoman exit codes now match the Linux platform, making behavior consistent for customers running OpCon in Docker where Chronoman operates as a Linux job. Fixes in this release also address job output directory purging and a range of file transfer reliability issues for transfers from UNIX and length-based-record platforms to Windows.

#### Fixes

:eight_spoked_asterisk: **WIN-602**: Fixed an issue in Windows Agent where it failed to purge job output directory.

:eight_spoked_asterisk: **WIN-601**: Fixed an issue with file transfer where a UNIX to Windows transfer in ASCII mode, using compression sometimes resulted in UNIX line endings in part of the file, instead of all Windows line endings.

:eight_spoked_asterisk: **WIN-593**: Fixed an issue in file transfer from length-based-record platforms (e.g. IBMi, MCP, etc.) to Windows where the record separator was inserted in the wrong location resulting in Index Out of Bound exception.

:eight_spoked_asterisk: **WIN-581**: Fixed an issue in Windows Agent where after a system reboot, the agent did not start up if the TCP/IP stack was not initialized. Now agent has retry logic to attempt listening on the socket few times before erroring or starting up.

:eight_spoked_asterisk: **WIN-566**: Updated SMADirectory to reference a .Net library locally rather than depend on the one installed on the target system, which may cause issues if it is not found or has a different version.

:eight_spoked_asterisk: **WIN-564**: Fixed an issue in Windows Agent where encrypted global properties in embedded scripts did not get decrypted correctly.

### 20.0.0

2020 July

:eight_spoked_asterisk: Fixed an issue where SMAFT jobs needing data transformations on large files took too long to complete.

:eight_spoked_asterisk: Fixed an issue where the Windows LSAM failed to start up because it could not create a log file.

## 19

### 19.0.0

2019 July

:eight_spoked_asterisk: Fixed a timer issue in SMA Resource Monitor where if MaxConcurrentFiles was set to process one file at a time, this was ignored and two files attempted to process at once, which caused a failure.

:eight_spoked_asterisk: Fixed an issue where File Arrival would not work with negative Start Time and End Time offsets for decimal separators other than a period (.).

:eight_spoked_asterisk: Fixed an issue with the Windows LSAM recovery code where the LSAM crashed when a job finished but its status had not been reported back to SMANetCom and the job was in the tracking file with an empty Exit status description.

## 18

### 18.3.2

2019 May

:eight_spoked_asterisk: Fixed a timer issue in SMA Resource Monitor where if MaxConcurrentFiles was set to process one file at a time, this was ignored and two files attempted to process at once, which caused a failure.

### 18.3.1

2018 December

:eight_spoked_asterisk: Fixed an issue with Job Output Parsing where jobs would fail due to a problem accessing in-use files under the JobOutput directory.

:eight_spoked_asterisk: Fixed an issue with File Arrival where there was a timing issue when handling one matching file out of multiple pre-existing wildcard pattern matching files.

### 18.3.0

2018 November

:eight_spoked_asterisk: Fixed an issue with SMA File Transfer where including at least four periods (.) in a folder name caused it to be considered an IP address.

:eight_spoked_asterisk: Fixed an issue with the Windows LSAM where a "System.ArgumentException: Item has already been added" error would be thrown if TRK files were placed in the Tracking directory and the service was started.

:eight_spoked_asterisk: Fixed an issue where the log file locking mechanism clashed across multiple software instances on the same machine.

### 18.2.0

2018 September

:eight_spoked_asterisk: Fixed an issue with the Windows LSAM where an EBCIDIC file came over to Windows as UTF-8 instead of staying ANSI. This was also delivered in the **17.1.4** version.

:eight_spoked_asterisk: Fixed an issue with File Transfer jobs where files containing a wildcard going to a single file failed with an exit code 14099 "compression not supported" error.

### 18.1.0

2018 June

### What's new

:eight_spoked_asterisk: Added the ability to define Environment Variables to Windows Job Action: Embedded Script.

### Why this matters

Environment Variables can now be defined for Windows Job Action: Embedded Script, making behavior consistent with Run Program jobs and eliminating the need to hard-code values in scripts. Fixes in this release also address TLS connection stability, file transfer naming, agent tracking file reliability, and File Arrival monitoring of UNC paths.

#### Fixes

:eight_spoked_asterisk: Fixed an issue with the Windows LSAM where it sometimes shutdown if it received a bad TLS connection request from SMANetCom.

:eight_spoked_asterisk: Fixed an issue with File Transfer jobs where sometimes the destination file name was incorrect.

:eight_spoked_asterisk: Fixed an issue in the ShowRunning utility where it threw an exception when invoked.

:eight_spoked_asterisk: Fixed an issue with the Windows LSAM where the tracking file sometimes had erroneous data.

:eight_spoked_asterisk: Fixed an issue in LSAM agent where an embedded script was not getting deleted from the temp location after job is completed.

:eight_spoked_asterisk: Fixed an issue where Job Action: File Arrival was not able to monitor UNC paths.

### 18.0.0

2018 February

### What's new

:eight_spoked_asterisk: Added the ability to define Environment Variables to Windows Job Action: Run Program.

### Why this matters

Environment Variables are now available for Windows Job Action: Run Program, allowing jobs to pass runtime context to programs without modifying command lines or scripts.

#### Fixes

:eight_spoked_asterisk: Fixed an issue where the Windows LSAM was sending messages with invalid encoding to OpCon which caused problems in SMANetCom.

:eight_spoked_asterisk: Fixed an issue where Job Output Parsing was not performed with batch user permissions.

:eight_spoked_asterisk: Fixed an issue in SMAHoliday where it sometimes displayed an incorrect message about dates being added to the calendar.

## 17

### 17.1.0

2017 December

### What's new

:eight_spoked_asterisk: Added the ability to define a RangeHoliday in the SMAHoliday utility.

:eight_spoked_asterisk: Updated Job Output Parsing in Job Action: Run Program to add the ability to use a wildcard to append multiple application logs.

:eight_spoked_asterisk: Added the ability to define more than two conditions for VariableHoliday settings in the SMAHoliday utility.

:eight_spoked_asterisk: Added support for Advanced Failure Criteria to Windows Job Action: File Arrival.

:eight_spoked_asterisk: Updated the Windows LSAM to return new exit codes for Windows Job Action: File Arrival.

### Why this matters

The Windows Agent adds advanced scheduling capabilities: range-based holidays and expanded VariableHoliday conditions in SMAHoliday, wildcard-based appending of multiple application logs in Job Output Parsing, Advanced Failure Criteria for File Arrival jobs, and updated exit codes for File Arrival. Together these changes give operations teams more control over schedule management, job monitoring, and failure classification.

#### Fixes

:eight_spoked_asterisk: Fixed an issue where during multi-file transfers, if the target platform did not support gzip, the data in all files was concatenated into a single file instead of the job failing.

:eight_spoked_asterisk: Fixed an issue with Job Action: File Arrival where sometimes, if simultaneous files arrived, only one file was detected while others would not be processed after the restart of the job.

:eight_spoked_asterisk: Fixed the description for the SMADirectory utility -c parameter to clarify that X represents month and M represents minute for the timespan.

:eight_spoked_asterisk: Fixed an issue where use of an XML character in a path caused the JI.$ARRIVED FILE NAME property to be incorrect.

:eight_spoked_asterisk: Fixed an issue where a job using a UNC path would sometimes fail if the UNC path was not manually mapped in a script. Now the job will work without any mapping script.

:eight_spoked_asterisk: Fixed an issue with Job Action: File Arrival where a job would be marked "Finished OK" if a file with an old creation timestamp was moved into the watched folder.

:eight_spoked_asterisk: Updated the description for Advanced Failure Criteria to note that job-related customized log entries will not be added to the Windows Event Log if Advanced Failure Criteria is used.

:eight_spoked_asterisk: Fixed an issue in the Windows LSAM where certain VBScripts would hang if there was no active connected user session for the user who ran the VBScript via OpCon. This was also released as part of **16.2.11**.

:eight_spoked_asterisk: Fixed an issue with the Windows LSAM where sometimes the tracking file data was not flushed. As a result, the agent would throw a "root element missing" exception and would not process further jobs. This was also released as part of **16.2.11**.

### 17.0.2

2017 July

:eight_spoked_asterisk: Fixed an issue where use of an XML character in a path caused the JI.$ARRIVED FILE NAME property to be incorrect.

:eight_spoked_asterisk: Fixed an issue with Job Action: File Arrival where sometimes, if simultaneous files arrived, only one file was detected while others would not be processed after the restart of the job. This was also released as part of **16.2.7**.

:eight_spoked_asterisk: Fixed the description for the SMADirectory utility -c parameter to clarify that X represents month and M represents minute for the timespan.

### 17.0.0

2017 May

### What's new

:eight_spoked_asterisk: Enhanced the Windows Agent to be able to decrypt any encrypted token values sent in OpCon messages.

:eight_spoked_asterisk: Added a new field to Windows Job Details: Custom Application Log. This option allows users to attach an external application log to a job's output to be searched for a matching string.

:eight_spoked_asterisk: If using a 32-bit Windows LSAM, the following compatibility requirements apply:

- Microsoft .NET Framework version 4.0
- TLS 1.1 and lower

### Why this matters

Encrypted token values sent in OpCon messages are now decrypted automatically by the agent, and the new Custom Application Log field in Windows Job Details lets users attach external application logs to job output for string matching — reducing manual intervention during execution and enabling more targeted failure analysis.

#### Fixes

:eight_spoked_asterisk: Fixed an issue where the Windows LSAM failed to run commands using a UNC path. This was also released as part of **16.2.3**.

:eight_spoked_asterisk: Fixed an issue where File Transfer jobs threw an error when transferring a large number of files. This was also released as part of **16.2.3**.

:eight_spoked_asterisk: Fixed an issue where the SMADirectory utility could not process files without an extension. This was also released as part of **16.2.3**.

:eight_spoked_asterisk: Fixed an issue where the SMADirectory utility could not qualify files that contained more than one period (.) in the file name, e.g., SMACL-Good.20170419012828.0038752515.cde.

:eight_spoked_asterisk: Fixed an issue where the Job Output Retrieval Service (JORS) would sometimes fail to start if TLS was configured. This was also released as part of **16.2.2**.

:eight_spoked_asterisk: Fixed an issue where an Embedded Script job would fail if the path to the script file contained a space.

:eight_spoked_asterisk: Fixed an issue where, if the tracking file had been corrupted, the Windows LSAM would not start, but loop endlessly and create log files.

:eight_spoked_asterisk: Fixed an issue where a comma separator in the start and end offsets in a File Arrival job did not work correctly on a French OS machine.

:eight_spoked_asterisk: Fixed an issue where the Windows LSAM would not recover active jobs properly upon service restart and would stop responding during recovery processing, preventing a connection from SMANetCom and any further activity from the LSAM. This was also released as part of **16.2.3**.

:eight_spoked_asterisk: Fixed an issue where file transfers of several thousand files from UNIX to Windows would throw a socket error with exit code 14007.

:eight_spoked_asterisk: Fixed an issue where multi-instance log file access errors lead to the message, "The process cannot access the file."

:eight_spoked_asterisk: Fixed an issue where the SMAFT agent was picking up the temporary folder for file transfer from the wrong section in the INI file.

## 16

### 16.2.0

2016 December

### What's new

:eight_spoked_asterisk: Added a new field to Windows Job Details: Run in Command Shell. This option allows users to run a defined Windows command in a command shell.

:eight_spoked_asterisk: Added the ability for users to define a global post process to run after a Job's execution at the agent level.

:eight_spoked_asterisk: The Windows LSAM will now use the default Working Directory as the location of the program run by the job.

:eight_spoked_asterisk: Added the ability to include Schedule Name in a Job Output filename.

:eight_spoked_asterisk: Added the ability to parse job output for Windows jobs to determine an exit code.

### Why this matters

Windows Agent 16.2.0 adds five capabilities for more flexible job execution: a Run in Command Shell job action for native Windows commands, a global post process at the agent level, automatic use of the Working Directory as the program location, Schedule Name in job output filenames, and exit-code-based job output parsing. Together these changes reduce the need for wrapper scripts and give operations teams more context in job output.

#### Fixes

:eight_spoked_asterisk: Fixed an issue where File Arrival jobs were using Offsets relative to the current date instead of the Schedule date.

:eight_spoked_asterisk: Fixed an issue where Jobs on the Windows LSAM, using various types of runners, could not be killed if they were running a script stored centrally in OpCon.

### 16.0.1

2016 August

:eight_spoked_asterisk: Fixed an issue with the shared stdInHandle where all jobs using the stdInHandle hung if one job hung.

:eight_spoked_asterisk: Fixed an issue in the SMADirectory utility where files were copied into the ProgramData directory although the Non-Recovery option was enabled.

### 16.0.0

2016 June

### What's new

:eight_spoked_asterisk: File transfer jobs can now use TLS 1.2 when going between Windows machines.

:eight_spoked_asterisk: Deployed with the Windows LSAM will be the SMADirectory utility that replaces the SMADeleteOldFiles utility used regularly with the SMAUtility schedule to keep directories clean and the cleardir (FR) program deployed overseas at customer sites. This new utility merges the features of both programs:

- Delete
- Zip
- Move
- Copy

The Move and Copy features are for full recursive directories.

:eight_spoked_asterisk: Added new SMAFT Configuration Setting, TlsSmaftServerSocket, and updated SmaftServerSocket to support TLS 1.2 File Transfer protocol.

### Why this matters

File transfers between Windows machines now support TLS 1.2, meeting security requirements for environments that mandate encrypted transport. The new SMADirectory utility replaces SMADeleteOldFiles and the cleardir program with a single tool supporting delete, zip, move, and copy operations — including recursive directory moves and copies — simplifying directory management in the SMAUtility schedule.
