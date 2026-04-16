---
sidebar_label: "Exit Code Override File"
title: Exit Code Override File (E.C.O.F.)
description: "Use the Exit Code Override File (E.C.O.F.) to return custom exit codes from jobs that do not produce meaningful termination statuses."
tags:
  - Conceptual
  - Automation Engineer
  - Agents
  - Jobs
---

# Exit Code Override File (E.C.O.F.)

**Theme:** Overview  
**Who Is It For?** Automation Engineer

## What is it?

Since some jobs do not return a meaningful termination status to the operating system, SMA Technologies provides the E.C.O.F. (Exit Code Override File) feature to create informative feedback from jobs. Use of the E.C.O.F. feature is optional for each job. If a job uses this feature, the value in the E.C.O.F. supersedes the job's standard termination value. Upon termination, the job produces the E.C.O.F. The agent reads the E.C.O.F. and compares the value in the file to the Failure Criteria defined on the Details screen to determine the job's final status. The agent deletes the E.C.O.F. after returning the termination status to OpCon.

* Return a specific numeric exit code to OpCon from any program, regardless of its native behavior
* Include a custom status message that appears in the Operations view instead of a raw exit code
* Apply to individual jobs or configure a default directory to apply E.C.O.F. behavior to all jobs on a machine

## When to use

- When the program you are scheduling does not produce meaningful exit codes — for example, returning only 0 regardless of whether it succeeded or failed.
- When you want to display a human-readable status message in the Operations view instead of a numeric exit code.

## Benefits

- Enables jobs with limited native exit code support to provide precise success or failure information to OpCon without modifying the underlying program.
- Custom status descriptions appear directly to operators in the Operations view, reducing ambiguity about job outcomes.

For each job, choose between two methods for implementing the E.C.O.F.:

- The E.C.O.F. line in the job definition **— or —**
- The `DefaultECOFDirectory` setting in the MSLSAM.ini file

## E.C.O.F. data format

To use the E.C.O.F. feature, a job must produce an E.C.O.F. containing properly formatted data. The program must write a numeric termination status that may be followed by an optional text message. To add an error description, append a pipe symbol (`|`) and a text message to the E.C.O.F. integer exit code (for example, `5 | JobFailed`). The text message may be up to 20 characters long. When the job finishes, the Operations view displays this message instead of the exit code. To include the exit code with the description, repeat the exit code after the pipe symbol.

:::info Example
The following example shows entries in an E.C.O.F:
:::

```console
5 | 5 - Job Failed
6 | 6 - Finished OK
```

## The E.C.O.F. in the job definition

For a job to use the E.C.O.F. field in the Details screen, the executable in the command line must produce a valid E.C.O.F. The E.C.O.F. field in the Details screen must reference the same directory and filename specified by the executable. If the agent cannot find the E.C.O.F., the `FailJobWithMissingECOF` setting in the MSLSAM.ini file determines the behavior of the agent:

- If `FailJobWithMissingECOF` is `TRUE`, the agent regards the job as Failed.
- If `FailJobWithMissingECOF` is `FALSE`, the agent uses the job's termination status.

:::note
The E.C.O.F. file path must be enclosed in double quotes (for example, `"C:\program files\OpconXps\OpconXps\Scripts\ecof.txt"`).
:::

## The default E.C.O.F. directory feature

If the E.C.O.F. is unspecified in the job definition, the `DefaultECOFDirectory` setting in the MSLSAM.ini file determines where the agent looks for Exit Code Override Files. If this setting is blank, the agent uses the termination status returned to the operating system.

A job must produce an E.C.O.F. name in the format `"job name job number.txt"` in the default E.C.O.F. directory.

:::danger
If the `DefaultECOFDirectory` setting refers to a nonexistent directory, the agent shuts down. If this occurs, refer to the appropriate logs (for example, MSLSAM.log) for debugging information.
:::

## Filename and directory variables

SMA suggests that executables use two variables when producing an E.C.O.F.:

- `SMA_MSLSAM_JOB_NAME` to create the E.C.O.F. name.
- `SMA_ECOF_DIRECTORY` to write into the default E.C.O.F. directory.

:::note
Programs may use these variables for reasons other than producing an E.C.O.F.
:::

### SMA_MSLSAM_JOB_NAME

The agent defines a variable called `SMA_MSLSAM_JOB_NAME` for every new job environment. Containing the job name and the unique job number from OpCon, this variable helps write the E.C.O.F. name required by the default E.C.O.F. directory.

The value for the variable is in the format of `12-character job name` + space + `unique job number`. If the job name is less than 12 characters, spaces fill the extra character positions. For example, a job named BACKUP would have an `SMA_MSLSAM_JOB_NAME` value of `"BACKUP       12345"`. For a complete list of environment variables defined by the agent, refer to [Windows Agent environment variables](../reference/environment-variables).

### SMA_ECOF_DIRECTORY

For all executables on a machine to easily reference the `DefaultECOFDirectory` setting in the MSLSAM.ini file, SMA Technologies recommends creating a system variable called `SMA_ECOF_DIRECTORY`. When defined, the `SMA_ECOF_DIRECTORY` variable simplifies the modification of programs and scripts that use the default E.C.O.F. directory feature.

:::info Example
The following command file example shows modifying an E.C.O.F. script in the default E.C.O.F. directory:
:::

```console
ECHO "1| 1 : Failed" > %SMA_ECOF_DIRECTORY%\%SMA_MSLSAM_JOB_NAME%.txt
```

## Exception handling

**`DefaultECOFDirectory` points to a nonexistent directory** — The agent shuts down immediately at startup. Correct the path in MSLSAM.ini to an existing directory, or create the directory, then restart the agent. Check MSLSAM.log for confirmation.

**E.C.O.F. file not found at job completion** — The job's executable did not write the E.C.O.F. to the expected path, or the filename does not match the required format. Behavior is controlled by `FailJobWithMissingECOF`: if `TRUE`, the job is marked Failed; if `FALSE`, the agent uses the job's native exit code. Verify the executable is writing to the correct path and that the filename follows the `"job name job number.txt"` format.

**E.C.O.F. path not enclosed in double quotes** — The agent may fail to locate the file if the path contains spaces. Enclose the E.C.O.F. path in double quotes in the job definition (for example, `"C:\program files\OpconXps\scripts\ecof.txt"`).

## Set up the SMA_ECOF_DIRECTORY variable

To set up the `SMA_ECOF_DIRECTORY` system variable, complete the following steps:

1. Right-click **My Computer**.
2. Select **Properties**.
3. Select the **Advanced** tab.
4. Select the **Environment Variables** button.
5. Select **New** in the **System variables** section.
6. Enter `SMA_ECOF_DIRECTORY` in the **Variable Name** field.
7. Enter the `DefaultECOFDirectory` path in the **Variable Value** field.
8. Select **OK**.
9. Close the **Environment Variables** screen.
10. Close the **System Properties** screen.

## Configuration options

The following MSLSAM.ini settings control E.C.O.F. behavior. For complete setting descriptions, refer to [MSLSAM.ini configuration file](../administration/configuration).

| Setting | What It Does | Default | Notes |
|---|---|---|---|
| `DefaultECOFDirectory` | Directory the agent checks for E.C.O.F. files when no path is specified in the job definition. If blank, the agent uses the job's native exit code. | Blank | Dynamic — no service restart needed. Setting a nonexistent path causes the agent to shut down at startup. |
| `FailJobWithMissingECOF` | When `TRUE`, marks the job Failed if the expected E.C.O.F. is not found. When `FALSE`, uses the job's native exit code instead. Applies only to E.C.O.F. paths in the job definition, not `DefaultECOFDirectory`. | `FALSE` | Dynamic — no service restart needed. |

## FAQs

**What happens if the E.C.O.F. is not found at job completion?**  
Behavior depends on the `FailJobWithMissingECOF` setting in MSLSAM.ini. If `TRUE`, the agent marks the job as Failed. If `FALSE`, the agent uses the job's native exit code from the operating system.

**If I set DefaultECOFDirectory, does it override the E.C.O.F. field in the job definition?**  
No. The E.C.O.F. field in the job definition takes precedence. `DefaultECOFDirectory` only applies when the job definition does not specify an E.C.O.F. path.

## Glossary

**E.C.O.F.** — Exit Code Override File; a file produced by a job that the agent reads to determine the job's final exit code, overriding the native process termination value.

**DefaultECOFDirectory** — An MSLSAM.ini setting that specifies where the agent looks for E.C.O.F. files when a job does not define one explicitly in its job definition.

**FailJobWithMissingECOF** — An MSLSAM.ini setting that controls whether the agent marks a job as Failed when the expected E.C.O.F. is not found.
