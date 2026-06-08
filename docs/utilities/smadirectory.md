---
sidebar_label: "SMADirectory"
title: SMADirectory utility
description: "Use the SMADirectory utility to delete, move, copy, or zip files in a directory based on age, extension, and other criteria."
tags:
  - Reference
  - System Administrator
  - Automation Engineer
  - Agents
---

# SMADirectory utility

**Theme:** Configure  
**Who Is It For?** System Administrator, Automation Engineer

## What is it?

SMADirectory is a command-line utility that processes files in a directory by deleting, moving, copying, or zipping them. Files are selected based on age (relative to last-write, last-access, or creation time), file extension, and whether hidden or system files are included. SMADirectory includes a recovery mechanism that backs up selected files before processing them, allowing a rollback if an error occurs.

SMADirectory is commonly used in the SMAUtility schedule to automate directory maintenance tasks such as purging aged logs, archiving data files, and cleaning working directories.

* Delete, move, copy, or zip files older than a specified retention period
* Filter by file extension using wildcards
* Recover from errors by automatically rolling back changes from a backup copy

## Command-line parameters

```
SMADirectory.exe -d <directory> [options]
```

| Parameter | Long name | Required | Description |
|---|---|---|---|
| `-d` | `DirectoryName` | Yes | The directory to process. |
| `-x` | `Delete` | No | Delete all qualifying files from the directory. |
| `-m` | `Move` | No | Move qualifying files to the specified destination path. |
| `-z` | `Zip` | No | Zip qualifying files to the specified destination path and filename. |
| `-r` | `Recursive` | No | Process all subdirectories under the source directory. |
| `-c` | `Counter` | No | Retention period. Files older than this period qualify for processing. See [Time counter format](#time-counter-format) below. Default: `5d`. |
| `-e` | `Extensions` | No | File extension filter. Default: all files. See [Extension filter format](#extension-filter-format) below. |
| `-F` | `TimeType` | No | The file timestamp to compare against the retention counter. `FM` = last write time (default), `FA` = last access time, `FC` = creation time. |
| `-o` | `RecoverPath` | No | Path where backup copies are stored before processing. Default recovery location is used when not specified. |
| `-b` | `Recover` | No | Enable the recovery (backup) process. Recovery is enabled by default. |
| `-B` | `NoRecover` | No | Disable the recovery process. Files are deleted or moved without a backup copy. No rollback is possible. |
| `-h` | `HiddenFile` | No | Exclude hidden and system files from processing. By default, hidden and system files are included. |
| `-v` | `Verbose` | No | Print the names of files that do not qualify for processing. |
| `-u` | `Debug` | No | Enable debug mode output. |

### Time counter format {#time-counter-format}

The `-c` parameter accepts a number followed by a time-unit letter:

| Letter | Unit |
|---|---|
| `d` | Days |
| `x` | Months |
| `y` | Years |
| `h` | Hours |
| `m` | Minutes |
| `s` | Seconds |

Examples: `5d` (5 days), `3x` (3 months), `1y` (1 year), `24h` (24 hours). The default is `5d`.

### Extension filter format {#extension-filter-format}

The `-e` parameter accepts:

- A single extension: `*.log`, `.txt`, or `log`
- Multiple extensions separated by a pipe character: `*.log|*.txt|*.bak`
- `*`, `ALL`, `.*`, or `.` to include all files

### Legacy comma-delimited format

SMADirectory also accepts a positional comma-delimited argument for compatibility with older installations:

```
SMADirectory.exe "DirectoryPath,RetentionPeriod,Extension1,Extension2,..."
```

At least three values are required. The retention period is appended with `d` (days) if no unit letter is provided. Recovery, recursive processing, and hidden-file handling are disabled in this mode.

## Recovery process

By default, SMADirectory copies qualifying files to a recovery folder before performing any operation. If an error occurs during processing, SMADirectory rolls back changes by restoring files from the recovery folder.

Use `-B` (NoRecover) to disable recovery when a backup copy is not needed. Without recovery, no rollback is available if an error occurs during processing.

## Exit codes

| Code | Meaning |
|---|---|
| `0` | Success |
| `1` | Failed |
| `3` | Invalid directory |
| `4` | Input/output error |
| `5` | Security error |
| `6` | Unauthorized access error |
| `7` | Move error |
| `201` | Insufficient parameters in comma-delimited mode |
| `202` | Invalid parameters |
| `203` | Value is not numeric |
| `204` | Invalid value |
| `205` | Invalid file |
| `206` | Invalid options |

## FAQs

**Can I use SMADirectory to delete files without a backup copy?**  
Yes. Use the `-B` (NoRecover) flag to disable the backup-before-delete behavior. Qualifying files are deleted directly with no rollback available.

**How does SMADirectory determine which files are old enough to qualify?**  
It compares the file's timestamp (controlled by `-F`) against the current time minus the retention period (`-c`). Files with a timestamp older than or equal to the retention cutoff qualify. The default uses last-write time (`FM`) and a 5-day retention period.

**Does SMADirectory process files without extensions?**  
Yes. Files without an extension are matched when no extension filter is specified or when the extension filter includes all files (`*`).

**What files does SMADirectory always exclude?**  
SMADirectory always excludes its own executable and several support files: `SMADirectory.exe`, `ecofile.txt`, `OpCon.CommandLine.dll`, `SMACommon.ini`, `SMAEcof.dll`, `SMACommon.dll`, and `OpCon.CommandLine.xml`. The `SMADirectory` folder itself is also excluded.

**Can I filter by multiple extensions?**  
Yes. Separate extensions with a pipe character in the `-e` value. For example: `-e "*.log|*.txt|*.bak"`.

## Glossary

**Retention period** — The minimum age a file must be before SMADirectory includes it in processing. Specified with the `-c` parameter.

**Recovery** — SMADirectory's built-in backup mechanism that copies qualifying files to a recovery folder before processing. Enables rollback if an error occurs.

**NoRecover** — The `-B` flag that disables the recovery backup. Use when a pre-processing backup is unnecessary and direct deletion or movement is preferred.

**TimeType** — The file timestamp attribute SMADirectory uses to determine file age: last-write time (`FM`), last-access time (`FA`), or creation time (`FC`).
