# File Arrival

The MSLSAM includes components that support the File Arrival job type. The SMAFilewatcher.exe is the main program responsible for the functions related to watching for files. Supported File Arrival features include:

- Watching for a specific file name, a file name with wildcards, or a UNC path name.
- Watching sub-directories.
- Watching for a file's creation stamp to be within a specific time frame.
- Watching for a file's size to be stable for a specific amount of time before reporting the file's successful arrival.
- Using tokens for the time frame and stable time.
- Defining advanced failure criteria.

For information on creating File Arrival jobs in the Enterprise Manager, refer to [Defining Job Action: File Arrival Job Details](https://help.smatechnologies.com/opcon/core/Files/UI/Enterprise-Manager/Job-Type-Management/#defining-job-action-file-arrival-job-details-1) in the **Enterprise Manager** online help.
