**Command to connect EC2 instance using SSH**

```bash
ssh -i path/to/key.pem user@remote
```

**Command to push your code to EC2 instance using RSYNC**

```bash
rsync -e "ssh -i path/to/key.pem" -av --include-from rsync-pattern.txt -r source/directory user@remote:destination/directory
```
