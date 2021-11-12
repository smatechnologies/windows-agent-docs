# Logging

The MSLSAM and its supporting components write several log files to record information. The logs reside in the <Output Directory\>\\MSLSAM\\Log\\ directory.

:::note
The Output Directory was configured during the installation. For more information, refer to [File Locations](https://help.smatechnologies.com/opcon/core/file-locations) in the **Concepts** online help.
:::

The log files include:

- **MSLSAM.log**: The MSLSAM writes processing information to the MSLSAM.log file. Additionally, the MSLSAM writes all configuration information to the log when it starts or when it detects a change to the MSLSAM.ini file.
- **MSLSAMTrace.log**: If tracing is activated, the MSLSAM writes detailed messages to the MSLSAMTrace.log file.
- **SMAFTAgent.log**: The SMAFTAgent writes processing information to the SMAFTAgent.log file.
- **SMAFTAgentTrace.log**: If tracing is activated, the SMAFTAgent writes detailed messages to the SMAFTAgentTrace.log file.
- **MSJORS.log**: The MSJORS service writes processing information to the MSJORS.log file. This information includes Job Output requests as well as file transfer request.

When log files reach a user-configured maximum size, the MSLSAM archives them. The <Output Directory\>\\MSLSAM\\Log\\Archives\\ folder is the location of all archived log files.

A folder exists in the Archives folder for each day the MSLSAM processes. The folder names use the following naming convention: yyyy_mm_dd (Weekday). For example, the folder name for January 11, 2008 would be 2008_01_11 (Friday).

As each log file fills up, the MSLSAM moves the log file into the current archive folder and renames it using the following naming convention: LogName StartTime - StopTime.log. For example, an MSLSAM archive file for the time range of 12:58:16 to 13:58:00 would be MSLSAM 125816 - 135800.log.

By default, the MSLSAM retains 10 days of Archived logs. Configure the MSLSAM.ini file to adjust this setting. For information on the Configuration of debug/log settings, refer to [Debug Options](../administration/configuration#debug-options).

:::note
The MSLSAM does not purge any archive folders if any files other than archived files are present.
:::
