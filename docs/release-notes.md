---
sidebar_label: "Release notes"
---

# Windows LSAM release notes

## Windows Agent 20.2.0

:white_check_mark: **WIN-608**: Fixed an issue in the Windows agent where a Windows update (KB5001879) on Windows Server 2019 caused the agent to not start up correctly.

:white_check_mark: **WIN-607**: Fixed an issue in the Windows Agent where a post process would not accept any arguments passed to it. Now, if the post process defined in the config has arguments, you may specify them after enclosing the full post process path in double quotes, followed by the list of arguments.

## Windows Agent 20.1.0

2021 April

:eight_spoked_asterisk: **WIN-597**: Exit codes for Chronoman are updated (given in OpCon 20.0.0 documentation) to match the ones available on the Linux platform, since Chronoman is now also available in the OpCon Docker image, that runs as a Linux job. For older error codes, see [Chronoman documentation](https://help.smatechnologies.com/opcon/core/v19.1/index.htm#Files/Utilities/Command-line%20Utilities/Chronoman.htm#Chronoman_Command_Line_and_Command_File_Errors).

:white_check_mark: **WIN-602**: Fixed an issue in Windows Agent where it failed to purge job output directory.

:white_check_mark: **WIN-601**: Fixed an issue with file transfer where a UNIX to Windows transfer in ASCII mode, using compression sometimes resulted in UNIX line endings in part of the file, instead of all Windows line endings.

:white_check_mark: **WIN-593**: Fixed an issue in file transfer from length-based-record platforms (e.g. IBMi, MCP, etc.) to Windows where the record separator was inserted in the wrong location resulting in Index Out of Bound exception.

:white_check_mark: **WIN-581**: Fixed an issue in Windows Agent where after a system reboot, the agent did not start up if the TCP/IP stack was not initialized. Now agent has retry logic to attempt listening on the socket few times before erroring or starting up.

:white_check_mark: **WIN-566**: Updated SMADirectory to reference a .Net library locally rather than depend on the one installed on the target system, which may cause issues if it is not found or has a different version.

:white_check_mark: **WIN-564**: Fixed an issue in Windows Agent where encrypted global properties in embedded scripts did not get decrypted correctly.

## Windows Agent 20.0.0

2020 July

:white_check_mark: Fixed an issue where SMAFT jobs needing data transformations on large files took too long to complete.

:white_check_mark: Fixed an issue where the Windows LSAM failed to start up because it could not create a log file.

## Windows Agent 19.0.0

2019 July

:white_check_mark: Fixed a timer issue in SMA Resource Monitor where if MaxConcurrentFiles was set to process one file at a time, this was ignored and two files attempted to process at once, which caused a failure.

:white_check_mark: Fixed an issue where File Arrival would not work with negative Start Time and End Time offsets for decimal separators other than a period (.).

:white_check_mark: Fixed an issue with the Windows LSAM recovery code where the LSAM crashed when a job finished but its status had not been reported back to SMANetCom and the job was in the tracking file with an empty Exit status description.

## Windows Agent 18.3.2

2019 May

:white_check_mark: Fixed a timer issue in SMA Resource Monitor where if MaxConcurrentFiles was set to process one file at a time, this was ignored and two files attempted to process at once, which caused a failure.

## Windows Agent 18.3.1

2018 December

:white_check_mark: Fixed an issue with Job Output Parsing where jobs would fail due to a problem accessing in-use files under the JobOutput directory.

:white_check_mark: Fixed an issue with File Arrival where there was a timing issue when handling one matching file out of multiple pre-existing wildcard pattern matching files.

## Windows Agent 18.3.0

2018 November

:white_check_mark: Fixed an issue with SMA File Transfer where including at least four periods (.) in a folder name caused it to be considered an IP address.

:white_check_mark: Fixed an issue with the Windows LSAM where a "System.ArgumentException: Item has already been added" error would be thrown if TRK files were placed in the Tracking directory and the service was started.

:white_check_mark: Fixed an issue where the log file locking mechanism clashed across multiple software instances on the same machine.

## Older Versions

<details>
<summary>See all</summary>
<br />

#### Windows Agent 18.2.0

2018 September

:white_check_mark: Fixed an issue with the Windows LSAM where an EBCIDIC file came over to Windows as UTF‌-8 instead of staying ANSI.  This was also delivered in the **17.1.4** version.

:white_check_mark: Fixed an issue with File Transfer jobs where files containing a wildcard going to a single file failed with an exit code 14099 "compression not supported" error.

#### Windows Agent 18.1.0

2018 June

:eight_spoked_asterisk: Added the ability to define Environment Variables to Windows Job Action: Embedded Script.

:white_check_mark: Fixed an issue with the Windows LSAM where it sometimes shutdown if it received a bad TLS connection request from SMANetCom.

:white_check_mark: Fixed an issue with File Transfer jobs where sometimes the destination file name was incorrect.

:white_check_mark: Fixed an issue in the ShowRunning utility where it threw an exception when invoked.

:white_check_mark: Fixed an issue with the Windows LSAM where the tracking file sometimes had erroneous data.

:white_check_mark: Fixed an issue in LSAM agent where an embedded script was not getting deleted from the temp location after job is completed.

:white_check_mark: Fixed an issue where Job Action: File Arrival was not able to monitor UNC paths.

#### Windows Agent 18.0.0

2018 February

:eight_spoked_asterisk: Added the ability to define Environment Variables to Windows Job Action: Run Program.

:white_check_mark: Fixed an issue where the Windows LSAM was sending messages with invalid encoding to OpCon which caused problems in SMANetCom.

:white_check_mark: Fixed an issue where Job Output Parsing was not performed with batch user permissions.

:white_check_mark: Fixed an issue in SMAHoliday where it sometimes displayed an incorrect message about dates being added to the calendar.

#### Windows Agent 17.1.0

2017 December

:eight_spoked_asterisk: Added the ability to define a RangeHoliday in the SMAHoliday utility.

:eight_spoked_asterisk: Updated Job Output Parsing in Job Action: Run Program to add the ability to use a wildcard to append multiple application logs.

:eight_spoked_asterisk: Added the ability to define more than two conditions for VariableHoliday settings in the SMAHoliday utility.

:eight_spoked_asterisk: Added support for Advanced Failure Criteria to Windows Job Action: File Arrival.

:eight_spoked_asterisk: Updated the Windows LSAM to return new exit codes for Windows Job Action: File Arrival.

:white_check_mark: Fixed an issue where during multi-file transfers, if the target platform did not support gzip, the data in all files was concatenated into a single file instead of the job failing.

:white_check_mark: Fixed an issue with Job Action: File Arrival where sometimes, if simultaneous files arrived, only one file was detected while others would not be processed after the restart of the job.

:white_check_mark: Fixed the description for the SMADirectory utility -c parameter to clarify that X represents month and M represents minute for the timespan.

:white_check_mark: Fixed an issue where use of an XML character in a path caused the JI.$ARRIVED FILE NAME property to be incorrect.

:white_check_mark: Fixed an issue where a job using a UNC path would sometimes fail if the UNC path was not manually mapped in a script. Now the job will work without any mapping script.

:white_check_mark: Fixed an issue with Job Action: File Arrival where a job would be marked "Finished OK" if a file with an old creation timestamp was moved into the watched folder.

:white_check_mark: Updated the description for Advanced Failure Criteria to note that job-related customized log entries will not be added to the Windows Event Log if Advanced Failure Criteria is used.

:white_check_mark: Fixed an issue in the Windows LSAM where certain VBScripts would hang if there was no active connected user session for the user who ran the VBScript via OpCon.  This was also released as part of **16.2.11**.

:white_check_mark: Fixed an issue with the Windows LSAM where sometimes the tracking file data was not flushed. As a result, the agent would throw a "root element missing" exception and would not process further jobs. This was also released as part of **16.2.11**.

#### Windows Agent 17.0.2

2017 July

:white_check_mark: Fixed an issue where use of an XML character in a path caused the JI.$ARRIVED FILE NAME property to be incorrect.

:white_check_mark: Fixed an issue with Job Action: File Arrival where sometimes, if simultaneous files arrived, only one file was detected while others would not be processed after the restart of the job.  This as also released as part of **16.2.7**.

:white_check_mark: Fixed the description for the SMADirectory utility -c parameter to clarify that X represents month and M represents minute for the timespan.

#### Windows Agent 17.0.0

2017 May

:eight_spoked_asterisk: Enhanced the Windows Agent to be able to decrypt any encrypted token values sent in OpCon messages.

:eight_spoked_asterisk: Added a new field to Windows Job Details: Custom Application Log. This option allows users to attach an external application log to a job's output to be searched for a matching string.

:eight_spoked_asterisk: If using a 32-bit Windows LSAM, the following compatibility requirements apply:

- Microsoft .NET Framework version 4.0
- TLS 1.1 and lower

:white_check_mark: Fixed an issue where the Windows LSAM failed to run commands using a UNC path. This was also released as part of **16.2.3**.

:white_check_mark: Fixed an issue where File Transfer jobs threw an error when transferring a large number of files. This was also released as part of **16.2.3**.

:white_check_mark: Fixed an issue where the SMADirectory utility could not process files without an extension. This was also released as part of **16.2.3**.

:white_check_mark: Fixed an issue where the SMADirectory utility could not qualify files that contained more than one period (.) in the file name, e.g., SMACL-Good.20170419012828.0038752515.cde.

:white_check_mark: Fixed an issue where the Job Output Retrieval Service (JORS) would sometimes fail to start if TLS was configured.  This was also released as part of **16.2.2**.

:white_check_mark: Fixed an issue where an Embedded Script job would fail if the path to the script file contained a space.

:white_check_mark: Fixed an issue where, if the tracking file had been corrupted, the Windows LSAM would not start, but loop endlessly and create log files.

:white_check_mark: Fixed an issue where a comma separator in the start and end offsets in a File Arrival job did not work correctly on a French OS machine.

:white_check_mark: Fixed an issue where the Windows LSAM would not recover active jobs properly upon service restart and would stop responding during recovery processing, preventing a connection from SMANetCom and any further any activity from the LSAM. This was also released as part of **16.2.3**.

:white_check_mark: Fixed an issue where file transfers of several thousand files from UNIX to Windows would throw a socket error with exit code 14007.

:white_check_mark: Fixed an issue where multi-instance log file access errors lead to the message, "The process cannot access the file."

:white_check_mark: Fixed an issue where the SMAFT agent was picking up the temporary folder for file transfer from the wrong section in the INI file.

#### Windows Agent 16.2.0

2016 December

:eight_spoked_asterisk: Added a new field to Windows Job Details: Run in Command Shell. This option allows users to run a defined Windows command in a command shell.

:eight_spoked_asterisk: Added the ability for users to define a global post process to run after a Job's execution at the agent level.

:eight_spoked_asterisk: The Windows LSAM will now use the default Working Directory as the location of the program run by the job.

:eight_spoked_asterisk: Added the ability to include Schedule Name in a Job Output filename.

:eight_spoked_asterisk: Added the ability to parse job output for Windows jobs to determine an exit code.

:white_check_mark: Fixed an issue where File Arrival jobs were using Offsets relative to the current date instead of the Schedule date.

:white_check_mark: Fixed an issue where Jobs on the Windows LSAM, using various types of runners, could not be killed if they were running a script stored centrally in OpCon.

#### Windows Agent 16.0.1

2016 August

:white_check_mark: Fixed an issue with the shared stdInHandle where all jobs using the stdInHandle hung if one job hung.

:white_check_mark: Fixed an issue in the SMADirectory utility where files were copied into the ProgramData directory although the Non-Recovery option was enabled.

#### Windows Agent 16.0.0

2016 June

:eight_spoked_asterisk: File transfer jobs can now use TLS 1.2 when going between Windows machines.

:eight_spoked_asterisk: Deployed with the Windows LSAM will be the SMADirectory utility that replaces the SMADeleteOldFiles utility used regularly with the SMAUtility schedule to keep directories clean and the cleardir (FR) program deployed overseas at customer sites. This new utility merges the features of both programs:

- Delete
- Zip
- Move
- Copy
The Move and Copy features are for full recursive directories.

:eight_spoked_asterisk: Added new SMAFT Configuration Setting, TlsSmaftServerSocket, and updated SmaftServerSocket to support TLS 1.2 File Transfer protocol.

</details>
