# Backup System

This directory contains automatic backups of critical files.

## Backup Files
- `page_*.tsx` - Artist detail page backups with timestamps
- `data_*.ts` - Data file backups with timestamps

## Naming Convention
Files are named with timestamps: `filename_YYYYMMDD_HHMMSS.extension`

## Restoration
To restore a backup:
1. Find the backup file with the desired timestamp
2. Copy it to the original location
3. Rename it to the original filename

## Auto-Backup
Backups are created automatically before major edits.
