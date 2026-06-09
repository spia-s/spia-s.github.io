$content = Get-Content 'c:\Users\piabo\Documents\GitHub\spia-s.github.io\kidscorner\Filter Page\temp_extract\word\document.xml' -Raw
$content -split '<w:t>|</w:t>' | Where-Object { $_ -match '\w' } | Out-File 'c:\Users\piabo\Documents\GitHub\spia-s.github.io\kidscorner\Filter Page\extracted_text.txt' -Encoding UTF8
