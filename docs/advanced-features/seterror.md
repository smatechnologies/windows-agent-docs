---
sidebar_label: "Seterror"
title: Seterror command
description: "Set the ERRORLEVEL exit code for command scripts using the seterror.exe utility included with the Windows Agent."
tags:
  - Reference
  - Automation Engineer
  - Agents
---

# Seterror command

**Theme:** Build  
**Who Is It For?** Automation Engineer

## What is it?

The `seterror.exe` utility sets the value of the ERRORLEVEL environment variable for a command script (`.cmd` or `.bat`). The agent reads the final ERRORLEVEL value upon the job's termination and reports the status to OpCon. The `seterror.exe` file resides in the `<Target Directory>\OpConxps\MSLSAM\` directory.

* Set any integer exit code from 0 to 2,000,000,000 from inside a batch script
* Use conditional logic to produce different exit codes based on script outcomes

:::note
To make `seterror.exe` easier to access, copy the file into the Windows or WINNT directory.
:::

## When to use

- When a batch script needs to return a specific exit code to OpCon based on conditional logic, independent of the last command run.
- When a script calls multiple programs and needs to propagate or selectively override their exit codes.

## Benefits

- Provides precise control over the exit code a script returns to OpCon, regardless of what the final command line returns natively.
- Enables conditional exit code logic that standard batch scripting does not support directly.

## Syntax

```bat
seterror <value>
```

- **seterror**: The name of the command.
- **\<value\>**: *(Optional)* An integer from 0 to 2000000000.

By default, `seterror.exe` sets the value of ERRORLEVEL to 0.

When incorporated into a program, seterror provides greater flexibility in assigning error conditions. For example, the `if` command with seterror can create a logical structure for setting exit conditions.

:::note
A command script returns the seterror value as an exit code when seterror is the script's last command.
:::

## Examples

### Example 1 — Conditional exit codes based on file existence

The following script uses a local variable and `seterror` to produce different exit codes depending on which files are present:

:::info Example
The following example shows a command script that uses a local variable and the seterror utility to produce exit codes based on conditional statements:
:::

```bat
set ERRLVL=0
if not exist "c:\file1.txt" goto error1
if not exist "c:\file2.txt" goto error10
goto end
:error1
echo Error 1
set ERRLVL=1
goto end
:error10
echo Error 10
set ERRLVL=10
goto end
:end
seterror %ERRLVL% 
```

### Example 1 explanation

- The command file uses the local variable ERRLVL to store the exit condition.
- The first line initializes ERRLVL to 0.
- If `c:\file1.txt` does not exist, the script sets ERRLVL to 1.
- If `c:\file2.txt` does not exist, the script sets ERRLVL to 10.
- The seterror utility on the last line assigns the ERRLVL value to ERRORLEVEL.

:::note
The percent signs (`%`) surrounding ERRLVL are required for retrieving the value stored in the variable.
:::

### Example 2 — Propagating an exit code from a called command

The following script calls an external program and propagates its exit code to OpCon:

:::info Example
The following example shows a command script retrieving the exit code from an internal command:
:::

```bat
set ERRLVL=0
echo Building schedules for next week > "C:\Build.log"
cd "c:program files\opconxps\opconxps"
dobatch DSNName,batchuser,batchpassword,Schedule1.log,BUILD,7,14,y,Schedule1
if %errorlevel% NEQ 0 set ERRLVL=%ERRORLEVEL%
echo The exit code for the job was %ERRLVL% >> "C:\Build.log"
seterror %ERRLVL%
```

### Example 2 explanation

- The command file uses the local variable ERRLVL to store the exit code value.
- The first line initializes ERRLVL to 0.
- The second line begins the log file `Build.log`.
- The next two lines run the DoBatch command to build a schedule called `Schedule1`.
- If the DoBatch exit code is not 0, the script sets ERRLVL to the command's exit code.
- The next line appends information to the `Build.log` file.
- The seterror utility on the last line assigns the ERRLVL value to ERRORLEVEL.

## FAQs

**What happens if seterror is not the last command in the script?**  
Any command that runs after seterror will overwrite ERRORLEVEL. For the intended exit code to reach OpCon, seterror must be the last command the script executes.

## Glossary

**ERRORLEVEL** — A Windows environment variable that stores the exit code of the most recently executed command. The Windows Agent reads this value when a job ends to determine the job's final status in OpCon.

**Exit code** — A numeric value returned by a process or command when it completes. The agent compares this value against the job's configured Failure Criteria to determine whether the job succeeded or failed.
