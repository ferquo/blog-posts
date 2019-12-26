Get-ChildItem env:* | sort-object name
Write-Host ("The password from Azure KeyVault is: " + $env:MONGO_DB_PASSWORD)
