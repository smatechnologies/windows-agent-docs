---
sidebar_label: "SMACheckFileSecurity"
title: SMACheckFileSecurity utility
description: "Use SMACheckFileSecurity to verify that a file exists on the agent machine before allowing downstream jobs to proceed."
tags:
  - Reference
  - Automation Engineer
  - Agents
  - Jobs
---

# SMACheckFileSecurity utility

**Theme:** Build  
**Who Is It For?** Automation Engineer

## What is it?

SMACheckFileSecurity (`SMACheckFileSecurity.exe`) is a command-line utility that checks whether a specified file exists on the agent machine and returns an exit code indicating the result. Use it as an OpCon job to gate downstream processing on file presence — for example, confirming that a required input file has arrived before allowing a dependent job to run.

* Check whether a specific file path exists on the agent machine
* Return a clear exit code that OpCon failure criteria can use to allow or block downstream jobs

:::note
Despite its name, SMACheckFileSecurity checks file existence only. It does not validate file permissions, ownership, or access control lists.
:::

## Syntax

```
SMACheckFileSecurity.exe "<FilePath>"
```

Or, with an optional source data type:

```
SMACheckFileSecurity.exe "<FilePath>||<SourceDataType>"
```

Pass the file path as a single quoted argument. If the file path contains a `||` delimiter, the portion before it is used as the file path and the portion after it is the source data type (currently parsed but not used in processing).

:::note
SMACheckFileSecurity waits 5 seconds before checking file existence. This delay allows file-writing processes time to release a file before the check runs.
:::

## Exit codes

| Code | Meaning |
|---|---|
| `0` | The file exists. |
| `1` | The file does not exist. |
| `-1` | An exception occurred during execution. |

## FAQs

**How do I use SMACheckFileSecurity to block a job until a file arrives?**  
Configure an OpCon job to run SMACheckFileSecurity with the expected file path. Set the job's failure criteria to treat exit code `1` (file not found) as a failure. Add a dependency or retry logic so that the check job re-runs until the file is present, then allow downstream jobs to proceed.

**Why does SMACheckFileSecurity wait 5 seconds before checking?**  
The built-in delay allows time for a file-writing process to close and release the file before the existence check runs. This reduces false negatives when SMACheckFileSecurity is run immediately after a file-generating process.

**Can I check for a file on a network path?**  
Yes, as long as the agent machine has access to the network path and the service account running the agent has read access to that location.

## Glossary

**File existence check** — A test that confirms whether a file at a specified path is present on the file system, without reading or validating its contents.

**Source data type** — An optional value passed after the `||` delimiter in the argument. Currently parsed by SMACheckFileSecurity but not used in the existence check.
