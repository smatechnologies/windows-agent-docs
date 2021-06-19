---
sidebar_label: "Seterror"
---

# Seterror command

The seterror.exe utility sets the value of the ERRORLEVEL environment variable for a command script (.cmd or .bat). The MSLSAM reads the final ERRORLEVEL value upon the job's termination and reports the status to the SAM. The seterror.exe file resides in the <Target Directory\>\\OpConxps\\MSLSAM\\ directory.

:::note
To make seterror.exe easier to access, copy the file into the Windows or WINNT director.
:::

## Syntax

```bat
seterror <value\>
```

- seterror: The name of the command.
- <value\>: *(Optional)* An integer from 0 to 2000000000.

By default, seterror.exe sets the value of ERRORLEVEL to 0.

When incorporated into a program, seterror provides greater flexibility in assigning error conditions. For example, the "if" command with seterror can create a logical structure for setting exit conditions.

:::note
A command script returns the seterror value as an exit code when seterror is the script\'s last command.
:::

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

## Example 1 explanation

- The command file uses the local variable ERRLVL to store the exit condition.
- The first line initializes ERRLVL to 0.
- If "c:\\file1.txt" does not exist, the script sets ERRLVL to 1.
- If "c:\\file2.txt" does not exist, the script sets ERRLVL to 10.
- The seterror utility on the last line of the file assigns the ERRLVL value to ERRORLEVEL.

:::note
The percent signs (%) surrounding ERRLVL are required for retrieving the value stored in the variable.
:::

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

## Example 2 explanation

- The command file uses the local variable ERRLVL to store the exit code value.
- The first line initializes ERRLVL to 0.
- The second line begins the log file "Build.log".
- The next two lines execute the DoBatch command to build a schedule called "Schedule1".
- If the DoBatch exit code is not 0, the script sets ERRLVL to the command's exit code.
- The next line echoes/appends information to the "Build.log" file.
- The seterror utility on the last line of the file assigns the ERRLVL value to ERRORLEVEL.
