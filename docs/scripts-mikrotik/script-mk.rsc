/system script
add dont-require-permissions=no name=HOTSPOT-HOST-UPDATE owner=admin policy=ftp,reboot,read,write,policy,test,password,sniff,sensitive,romon source=\
    "/ip/hotspot/host/remove [find]; /ip/hotspot/active/remove [find]"
add dont-require-permissions=no name=HOTSPOT-CLEAR-USERS owner=admin policy=read,write,policy,sniff source=":foreach i in=[/ip/hotspot/user/find] do={\
    \n:local userUptime [/ip/hotspot/user/get [find .id=\$i] uptime]\
    \n:if ( \$userUptime >= 1800 ) do={\
    \n/log info \$i;\
    \n/ip hotspot user remove \$i;\
    \n};\
    \n}"
add dont-require-permissions=no name=HOTSPOT-UPDATE-ALL owner=admin policy=ftp,reboot,read,write,policy,test,password,sniff,sensitive,romon source=\
    ":system script run HOTSPOT-CLEAR-USERS;\
    \n:system script run HOTSPOT-HOST-UPDATE;"
