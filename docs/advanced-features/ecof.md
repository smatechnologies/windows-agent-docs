---
sidebar_label: "Exit Code Override File"
---

# Exit Code Override File (E.C.O.F.)

Since some jobs do not return a meaningful termination status to the operating system, SMA Technologies provides the E.C.O.F. (Exit Code Override File) feature to help create informative feedback from jobs. The use of the E.C.O.F feature is optional for each job. If a job uses this feature, the value in the E.C.O.F. supersedes the job's standard termination value. Upon termination, the job produces the E.C.O.F. The MSLSAM reads the E.C.O.F. and compares the value in the file to the Failure Criteria (defined on the Details screen) to determine the job's final status. The MSLSAM deletes the E.C.O.F. after returning the termination status to the SAM.

For each job, choose between two methods for implementing the E.C.O.F.:

- The E.C.O.F. line in the Job Definition **- or -**
- The DefaultECOFDirectory setting in the MSLSAM configuration file.

## E.C.O.F. data format

To use the E.C.O.F. feature, a job must produce an E.C.O.F. containing properly formatted data. The program must write a numeric termination status that may be followed by an optional text message. To add an error description, append a pipe symbol (|) and a text message to the E.C.O.F. integer exit code (e.g., 5 | JobFailed). The text message may be up to 20 characters long. When the job finishes, EM Operation displays this message instead of the exit code. To include the exit code with the description, repeat the exit code after the pipe symbol.

:::info Example
The following example shows entries in an E.C.O.F:
:::

```console
5 | 5 - Job Failed
6 | 6 - Finished OK
```

## The E.C.O.F. in the Job Definition

For a job to use the E.C.O.F. field in the Details screen, the executable in the Command Line must produce a valid E.C.O.F. The E.C.O.F. field in the Details screen must reference the same directory and filename specified by the executable. If the MSLSAM cannot find the E.C.O.F., the FailJobWithMissingECOF setting in the MSLSAM configuration file determines the behavior of the MSLSAM:

- If the FailJobWithMissingECOF setting is TRUE, the MSLSAM regards the job as Failed.
- If the FailJobWithMissingECOF setting is FALSE, the MSLSAM uses the job\'s termination status.

:::note
The E.C.O.F. file path must be enclosed in double quotes (e.g., "C:\\program files\\OpconXps\\OpconXps\\Scripts\\ecof.txt").
:::

## The Default E.C.O.F. Directory feature

If and only if the E.C.O.F. is unspecified in the job definition, the DefaultECOFDirectory setting in the MSLSAM configuration file determines where the MSLSAM looks for Exit Code Override Files. If this setting is blank, the MSLSAM uses the termination status returned to the operating system.

A job must produce an E.C.O.F. name in the format "*job name* *job number*.txt" in the default E.C.O.F. directory.

:::danger
If the DefaultECOFDirectory setting refers to a nonexistent directory, the MSLSAM shuts down. If this occurs, refer to the appropriate logs (e.g., MSLSAM.log) for debugging information.
:::

## Filename and directory variables

SMA suggests that executables use two variables when producing an E.C.O.F.:

- SMA_MSLSAM_JOB_NAME to create the E.C.O.F. name.
- SMA_ECOF_DIRECTORY to write into the default E.C.O.F. directory.

:::note
Programs may use these variables for reasons other than producing an E.C.O.F.
:::

### SMA_MSLSAM_JOB_NAME

The MSLSAM defines a variable called SMA_MSLSAM_JOB_NAME for every new job environment. Containing the job name and the unique job number from the SAM, this variable helps write the E.C.O.F. name required by the Default E.C.O.F. Directory.

The value for the variable is in the format of *12-character job name* *unique job number*. If the job name is less than 12 characters, spaces fill the extra character positions. For example, a job named BACKUP would have an SMA_MSLSAM_JOB_NAME value of "BACKUP 12345". For a complete list of environment variables defined by the MSLSAM, refer to [Windows LSAM Environment Variables](../reference/environment-variables).

### SMA_ECOF_DIRECTORY

For all executables on a machine to easily reference the DefaultECOFDirectory setting in the MSLSAM configuration file, SMA Technologies recommends creating a system variable called SMA_ECOF_DIRECTORY. When defined, the SMA_ECOF_DIRECTORY variable simplifies the modification of programs/scripts employing the Default E.C.O.F. Directory feature.

:::info Example
The following command file example shows modifying an E.C.O.F. script in the default E.C.O.F. directory:
:::

```console
ECHO "1| 1 : Failed" > %SMA_ECOF_DIRECTORY%\%SMA_MSLSAM_JOB_NAME%.txt
```

#### Set up the SMA_ECOF_DIRECTORY variable

1. Right-click **My Computer**.
2. Select **Properties**.
3. Click the **Advanced** tab.
4. Click the **Environment Variables** button.
5. Click **New** in the **System variables** frame.
6. Enter **SMA_ECOF_DIRECTORY** for the **Variable Name**.
7. Enter the DefaultECOFDirectory for the **Variable Value**.
8. Click **OK**.
9. **Close ☒** the **Environment Variables** screen.
10 **Close ☒** the **System Properties** screen.
