---
sidebar_label: 'Environment variables'
---

# Windows LSAM Environment Variables

A job may adapt to its environment, and the MSLSAM defines several environment variables for a started job. Refer to the table for a description of these variables.

|Environment Variable|Description|
|--- |--- |
|SMA_MSLSAM_JOB_NAME|The name of the Job defined in OpCon.|
|SMA_MSLSAM_JOBOUTPUT_FILENAME|This variable contains the full path of the job output file that is created for the current job.|
|SMA_MSLSAM_LSAM_NAME|This variable contains the name defined in the OpCon database for this LSAM.|
|SMA_MSLSAM_PRERUN_ACTIVE|This variable indicates a value of TRUE or FALSE based on whether currently running Job process is a prerun job or a main job.|
|SMA_MSLSAM_RESTART_STEP|The optional restart step sent to the MSLSAM for the job in the <SMA_MSLSAM_JOB_NAME> variable.|
|SMA_MSLSAM_ROOT_DIRECTORY|The path to the directory where the MSLSAM is installed.|
|SMA_MSLSAM_SAM_JOB_ID|27 character unique Job ID comprising of 12 character jobname, 5 Character space, and 10 digit JobNumber.|
|SMA_MSLSAM_SCHEDULE_DATE|The date of the schedule containing the job in the <SMA_MSLSAM_JOB_NAME> variable.|
|SMA_MSLSAM_SCHEDULE_FREQ|The schedule frequency of the job in the <SMA_MSLSAM_JOB_NAME> variable.|
|SMA_MSLSAM_SCHEDULE_NAME|The name of the schedule containing the job in the <SMA_MSLSAM_JOB_NAME> variable.|
