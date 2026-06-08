---
sidebar_label: "SMAHoliday"
title: SMAHoliday utility
description: "Configure and run the SMAHoliday utility to add holiday dates to OpCon calendars based on fixed, range, and variable holiday rules."
tags:
  - Reference
  - System Administrator
  - Agents
  - System Configuration
---

# SMAHoliday utility

**Theme:** Configure  
**Who Is It For?** System Administrator

## What is it?

SMAHoliday is a command-line utility that calculates holiday dates and adds them to calendars in the OpCon database. Dates are calculated from rules you define in the SMAHoliday.ini configuration file. SMAHoliday supports three rule types — fixed, range, and variable — to accommodate virtually any calendar requirement, including national holidays, fiscal blackout periods, and conditional date adjustments when a holiday falls on a weekend.

SMAHoliday writes to the OpCon database directly using the connection information in SMAODBCConfiguration.dat. Run it as an OpCon job, a scheduled task, or from the command line.

* Define holidays once in SMAHoliday.ini and regenerate calendar dates each year with a single command
* Support multiple named calendars with different rule sets from one configuration file
* Adjust holiday dates conditionally — for example, observe the preceding Friday when a holiday falls on Saturday

## Configuration file

SMAHoliday reads its rules from `SMAHoliday.ini`, located in the agent's configuration directory by default. Use the `-i` parameter to specify an alternate path.

### \[General\] section

| Setting | Default | Description |
|---|---|---|
| `CalendarName` | `Master Holiday` | The name of the OpCon calendar to populate. Must match an existing calendar in the OpCon database. |
| `StartDate` | *(required)* | The first date to include when calculating holiday dates. Format: `MM/DD/YYYY`. |
| `DebugMode` | `OFF` | Set to `ON` to write additional diagnostic information to the log. Also accepted as `Debug`. |

### \[FixedHolidays\] section

Each entry defines a recurring date rule. The key is the rule expression; the value is an optional description.

**Day-of-week rules:**

| Rule | Day |
|---|---|
| `d1` | All Sundays |
| `d2` | All Mondays |
| `d3` | All Tuesdays |
| `d4` | All Wednesdays |
| `d5` | All Thursdays |
| `d6` | All Fridays |
| `d7` | All Saturdays |

**Nth-weekday-of-month rules** use the format `MM/WW-N`, where `MM` is the two-digit month, `WW` is the weekday abbreviation, and `N` is the occurrence number. Use `l` (lowercase L) for last occurrence.

| Example | Meaning |
|---|---|
| `01/mo-3` | Third Monday of January |
| `05/mo-l` | Last Monday of May |
| `11/th-4` | Fourth Thursday of November |

Valid weekday abbreviations: `su`, `mo`, `tu`, `we`, `th`, `fr`, `sa`.

### \[RangeHolidays\] or \[Range\] section

Each entry defines a date range in the format `start_date=end_date`. Both dates use `MM/DD` format. All dates from start through end are added to the calendar.

Example:
```ini
[RangeHolidays]
12/24=12/26
```

### \[VariableHoliday\#N\] sections

Variable holidays define a fixed date that is adjusted when it falls on a specific day of the week. Number each section sequentially starting at 1: `[VariableHoliday#1]`, `[VariableHoliday#2]`, and so on.

| Key | Description |
|---|---|
| `date` | The base date in `MM/DD` format. |
| `condition` | One or more `if outputdate == dN then +X` or `then -X` expressions, separated by `\|\|`. Positive values shift the date forward; negative values shift it backward. |
| `tag` | Comma-separated list of tags. SMAHoliday only applies the rule when the `-t` tag parameter matches. Leave blank to always apply. |
| `InclusiveDate` | `YES` or `NO`. When `YES`, both the original date and the shifted date are added to the calendar. When `NO`, only the shifted date is added. |

Example — New Year's Day observed on the nearest weekday:
```ini
[VariableHoliday#1]
date=01/01
condition=if outputdate == d1 then +1 || if outputdate == d7 then -1
tag=
InclusiveDate=NO
```

## Command-line parameters

```
SMAHoliday.exe [options]
```

| Parameter | Long name | Type | Description |
|---|---|---|---|
| `-c` | `--Calendar` | string | Calendar name in the OpCon database. Overrides `CalendarName` in the INI file. |
| `-y` | `--Year` | integer | The year for which to calculate and add holiday dates. |
| `-s` | `--Country` | string | Country code used for locale-specific holiday rules. |
| `-t` | `--Tag` | string | Tag filter. Only variable holiday rules whose `tag` matches this value are applied. |
| `-i` | `--Ini` | string | Full path to an alternate SMAHoliday.ini file. |
| `-d` | `--StartDate` | string | Start date for holiday calculations. Format: `DD/MM/YYYY`. |
| `-o` | `--Conversion` | string | Path to an older-format SMAHoliday.ini file to upgrade. |
| `-p` | `--Culture` | string | Country-language culture code (for example, `en-US`) for date parsing. |
| `-b` | `--ConnectionPath` | string | Path to the SMAODBCConfiguration.dat file used to connect to the OpCon database. |
| `-g` | `--DebugMode` | flag | Enables debug mode output. |

## Exit codes

| Code | Meaning |
|---|---|
| `0` | Success — dates were calculated and added to the calendar. |
| `1` | Error — processing failed. Review the log for details. |
| `2` | Warning — processing completed with warnings. |
| `2` *(error context)* | Invalid command-line options. |
| `4` | Invalid or missing configuration file. |
| `5` | Invalid date format. |
| `7` | Invalid calendar name. |
| `8` | Invalid date during validation. |
| `10` | Could not connect to the database or SMAODBCConfiguration.dat not found. |
| `11` | SQL exception while adding calendar dates. |
| `12` | Calendar does not exist in the OpCon database. |

## FAQs

**Where does SMAHoliday write output?**  
SMAHoliday writes dates directly to the OpCon database. It connects using the SMAODBCConfiguration.dat file. No output file is generated unless debug mode is enabled.

**How do I add holidays for a new year?**  
Run SMAHoliday with the `-y` parameter set to the target year. The same rules in SMAHoliday.ini are applied, and the resulting dates for that year are added to the calendar.

**Can one SMAHoliday.ini file manage multiple calendars?**  
Each run of SMAHoliday targets one calendar (defined in `CalendarName` or via `-c`). To populate multiple calendars, run SMAHoliday once for each calendar with the appropriate `-c` value.

**What happens if a calendar does not exist in OpCon?**  
SMAHoliday exits with code 12. Create the calendar in OpCon before running SMAHoliday.

## Glossary

**Calendar** — A named set of dates in OpCon used to designate working or non-working days for schedule processing.

**Fixed holiday** — A holiday rule that applies on the same day or the same Nth weekday of a month every year.

**Range holiday** — A holiday rule that marks every date between a start date and an end date as a non-working day.

**Variable holiday** — A holiday rule that defines a base date and a condition to shift it when it falls on a specific day of the week (for example, move to Monday when the holiday falls on Sunday).

**InclusiveDate** — A variable holiday setting. When `YES`, both the original and the shifted date are added to the calendar.

**SMAODBCConfiguration.dat** — The file that stores the ODBC connection information SMAHoliday uses to connect to the OpCon database.
