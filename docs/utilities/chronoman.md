---
sidebar_label: "Chronoman"
title: Chronoman utility
description: "Use Chronoman to calculate date values and set OpCon properties, with support for fiscal quarter dates, schedule offsets, and date formatting."
tags:
  - Reference
  - System Administrator
  - Automation Engineer
  - Agents
---

# Chronoman utility

**Theme:** Configure  
**Who Is It For?** System Administrator, Automation Engineer

## What is it?

Chronoman is a command-line utility that calculates a date value and sets an OpCon global property with the result. It supports a range of date-calculation options including day offsets, schedule-based working day adjustments, fiscal quarter dates, Julian dates, and format strings. Chronoman is typically run as an OpCon job at the start of a schedule to populate a property that other jobs in the schedule reference as a token.

* Calculate a date relative to today, a base date, or a Julian date using day, hour, minute, or other offsets
* Set an OpCon global property with the formatted result for use by downstream jobs as a token
* Use fiscal quarter start dates defined in Chronoman.ini to calculate quarter-relative dates
* Align calculated dates to schedule working days, skipping non-working dates defined in a schedule calendar

## Configuration file

Chronoman reads optional settings from `Chronoman.ini` in the agent's configuration directory.

### \[General\] section

| Setting | Default | Description |
|---|---|---|
| `PathToMsgInDir` | `.\MSGIN` | Path to the MSGIN directory for message input. |
| `PathToLogDir` | `.\Log` | Path to the directory where Chronoman writes its log file. |
| `Debug` | *(not set)* | Set to `True` to enable debug trace output. |

### \[Fiscal Quarter Begin Dates\] section

Define the first date of each fiscal quarter. Chronoman uses these dates when calculating quarter-relative values.

```ini
[Fiscal Quarter Begin Dates]
Q1=
Q2=
Q3=
Q4=
```

## Command-line parameters

```
Chronoman.exe -f <format> -p <property> [options]
```

The `-f` (time format) and `-p` (property name) parameters are required for every run.

| Parameter | Description |
|---|---|
| `-f <format>` | **Required.** The format string used to format the calculated date before setting the property. Uses standard .NET date format patterns (for example, `MM/dd/yyyy`, `yyyyMMdd`). |
| `-p <name>` | **Required.** The name of the OpCon global property to set with the formatted date result. |
| `-b <date>` | Base date for the calculation. If not specified, today's date is used. |
| `-j <Julian>` | Base date in Julian date format. |
| `-o <number>` | Numeric offset to apply to the base date. Requires `-u`. |
| `-u <units>` | Units for the offset specified with `-o`. Required when `-o` is used. |
| `-s <schedule>` | Schedule name. When specified, Chronoman aligns the result to working days in the schedule, skipping non-working dates. |
| `-n <plan>` | Name of the negative annual plan calendar used with `-s` to identify additional non-working dates. |
| `-c <file>` | Path to a command file. A command file contains Chronoman directives and can replace multiple command-line parameters. Cannot be used with `-o` or `-u`. |
| `-x <directive>` | Character fill directive for padding the formatted result. |
| `-z <directive>` | Zero-fill directive for padding the formatted result. |
| `-d` | Enable debug trace output for this run. |
| `-l <file>` | Redirect the output log to the specified file instead of the default log location. |
| `-t <name>` | *(Deprecated.)* Token name. Use `-p` instead. |

### Offset units (-u)

When using `-o` to specify a numeric offset, use `-u` to define the unit:

| Value | Unit |
|---|---|
| `Days` | Calendar days |
| `Hours` | Hours |
| `Minutes` | Minutes |

Additional units may be supported. Refer to the Chronoman command file documentation for the full list.

### Day-of-week codes

Chronoman uses the following numeric codes internally when working with schedule day alignments:

| Code | Day |
|---|---|
| `200` | Sunday |
| `201` | Monday |
| `202` | Tuesday |
| `203` | Wednesday |
| `204` | Thursday |
| `205` | Friday |
| `206` | Saturday |

## Exit codes

| Code | Meaning |
|---|---|
| `0` | Success |
| `-1` | General program error |
| `9` | Invalid Julian date |
| `14` | No arguments specified on the command line |
| `15` | An argument is missing its value |
| `16` | Offset value must be numeric |
| `17` | Unknown option specifier |
| `18` | Cannot use `-o` (offset) with a command file |
| `19` | Cannot use `-u` (offset units) with a command file |
| `20` | Command file does not exist |
| `21` | Offset (`-o`) must be specified when not using a command file |
| `22` | Offset units (`-u`) must be specified when not using a command file |
| `24` | Schedule not found |
| `26` | Property name (`-p`) is required |
| `27` | Time format (`-f`) is required |
| `30` | Invalid date format or culture |
| `34` | Invalid date in `SET_COMPUTED_DATE` directive |
| `35` | `SET_COMPUTED_DATE_JULIAN` directive is missing a value |
| `36` | `SET_FORMAT_STRING` directive is missing an argument |
| `37` | `SET_SCHEDULE_NAME` directive is missing an argument |
| `38` | `SET_PROPERTY_NAME` directive is missing an argument |
| `39` | `ZERO_FILL_DIRECTIVE` is missing an argument |
| `44` | `FILL_DIRECTIVE` is missing an argument |
| `49` | `SET_NEGATIVE_ANNUAL_PLAN_NAME` directive is missing an argument |
| `53` | Cannot find SMAODBCConfiguration.dat |
| `99` | Culture or date parsing error |

## Logging

Chronoman writes a log file to the directory configured in `PathToLogDir`. Log file names use the format:

```
Chronoman_yyyyMMdd_HHmmssff.log
```

For example: `Chronoman_20260608_142530ff.log`

## FAQs

**Can Chronoman set the property to yesterday's date?**  
Yes. Use `-o -1 -u Days` to subtract one day from today (or from a base date specified with `-b`).

**What happens if the `-p` property does not exist in OpCon?**  
Chronoman attempts to set the property. If the property does not exist in OpCon and the connection succeeds, OpCon behavior depends on the OpCon version. Confirm that the global property exists in the OpCon Administration before running Chronoman.

**Is the `-t` parameter still supported?**  
The `-t` (TokenName) parameter is deprecated. Use `-p` (PropertyName) instead. `-t` may be removed in a future release.

**Can I use Chronoman without a command file?**  
Yes. All directives can be passed as command-line parameters. The `-c` command file option is an alternative for complex date calculations.

## Glossary

**Global property** — A named value stored in OpCon that can be referenced as a token (`[[PropertyName]]`) in job definitions, schedule definitions, and events.

**Command file** — A text file containing Chronoman directives that define a date calculation. Used as an alternative to individual command-line parameters.

**Fiscal quarter** — A three-month period in a fiscal (business) calendar. Define fiscal quarter start dates in the `[Fiscal Quarter Begin Dates]` section of Chronoman.ini.

**Offset** — A numeric value added to (positive) or subtracted from (negative) a base date to calculate a new date. Requires the `-o` and `-u` parameters.

**Julian date** — A date expressed as a continuous count of days. Use `-j` to provide a Julian base date for Chronoman calculations.
