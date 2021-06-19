---
sidebar_label: 'Machine messages'
---

# Windows LSAM machine messages

The following is a list of MSLSAM exit conditions for failed jobs. If an exit condition is not in this list, it is a Windows exit code. For information on Windows Errors, refer to [Windows System Errors](https://help.smatechnologies.com/opcon/core/latest/Files/Concepts/Windows%20System%20Errors.htm) in the **Concepts** online help. Within the Enterprise Manager, the LSAM Messages are available in Operation \> Job Information \> Configuration ("LSAM Feedback" Category).

|MSLSAM Exit Condition Number|Description|
|--- |--- |
|31000|This is the initial state when the job is created. No error code has been set.|
|31001|The path entered for the command line on the details screen is invalid.|
|31002|The path entered for the prerun command line on the details screen is invalid.|
|31003|The prerun command line entered in the details screen for this job contains too many characters. The maximum length of the prerun is 3276 characters.|
|31004|The command line entered in the details screen for this job contains too many characters. The maximum length of the command line is 4000 characters.|
|31005|The prerun working directory entered in the details screen for this job contains too many characters. The maximum length of the prerun working directory is 255 characters.|
|31006|The working directory entered in the details screen for this job contains too many characters. The maximum length of the working directory is 255 characters.|
|31007|The LSAM could not create a process for this job.|
|31008|The LSAM was unable to obtain the rights for the user submitted with the job.|
|31009|The LSAM was unable to grant the user rights to the process.|
|31010|The LSAM was unable to log on as the user submitted with the job.|
|31011|The LSAM was unable to load the environment for the user submitted with the job.|
|31012|The LSAM was unable to load the Windows profile for the user submitted with the job.|
|31013|The LSAM was unable to unload the Windows profile for the user submitted with the job.|
|31014|The LSAM was unable to find the E.C.O.F. specified.|
|31015|The LSAM was unable to start the job in the specified user-security context (unable to impersonate the user).|
|31016|The LSAM was unable to find the user name for this user. This may be because the user has never logged onto this machine.|
|31017|Unable to get user token.|

The following is a list of Windows LSAM exit codes specifically for File Arrival jobs.

|Exit Code|Description|
|--- |--- |
|1|The file is not found. Reasons include an invalid file name, the file has not arrived yet, or permissions.|
|2|The path is not found. Reasons include an invalid path or permissions.|
|3|A file is found but the creation date is out of range.|
