for /F "tokens=3 delims=: " %%H in ('sc query MongoDB ^| findstr "        ESTADO"') do (
  if /I "%%H" NEQ "RUNNING" (
    net start MongoDB
  )
)