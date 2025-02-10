/system script
add dont-require-permissions=no name=HOTSPOT-HOST-UPDATE owner=jeyson policy=\
    ftp,reboot,read,write,policy,test,password,sniff,sensitive,romon source="/ip/hotspot/host/remove [find]"
add dont-require-permissions=no name=HOTSPOT-CLEAR-USERS owner=jeyson policy=read,write,policy,sniff source=":foreach i in=[/ip/hotspot/user/\
    find] do={\
    \n:local userUptime [/ip/hotspot/user/get [find .id=\$i] uptime]\
    \n:if ( \$userUptime >= 3600 ) do={\
    \n/log info \$i;\
    \n/ip hotspot user remove \$i;\
    \n};\
    \n}"
add dont-require-permissions=no name=HOTSPOT-UPDATE-ALL owner=admin policy=ftp,reboot,read,write,policy,test,password,sniff,sensitive,romon \
    source=":system script run HOTSPOT-CLEAR-USERS;\
    \n:system script run HOTSPOT-HOST-UPDATE;"
add dont-require-permissions=no name=HOTSPOT-ERASE-USERS owner=jeyson policy=\
    ftp,reboot,read,write,policy,test,password,sniff,sensitive,romon source="/ip/hotspot/user/remove [find name!=default-trial]"

/system scheduler
add interval=1m name=schedule1 on-event=HOTSPOT-CLEAR-USERS policy=ftp,reboot,read,write,policy,test,password,sniff,sensitive,romon \
    start-date=2025-02-01 start-time=19:46:54
add interval=1w name=TIME-ERASE-USERS on-event=HOTSPOT-ERASE-USERS policy=ftp,reboot,read,write,policy,test,password,sniff,sensitive,romon \
    start-date=2025-02-10 start-time=00:00:00
