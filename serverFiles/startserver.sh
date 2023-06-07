﻿DO_RAMDISK=0
if [[ $(cat server-setup-config.yaml | grep 'ramDisk:' | awk 'BEGIN {FS=":"}{print $2}') =~ "yes" ]]; then
    SAVE_DIR=$(cat server.properties | grep 'level-name' | awk 'BEGIN {FS="="}{print $2}')
    mv $SAVE_DIR "${SAVE_DIR}_backup"
    mkdir $SAVE_DIR
    sudo mount -t tmpfs -o size=2G tmpfs $SAVE_DIR
    DO_RAMDISK=1
fi
	if [ -f serverstarter-2.3.1.jar ]; then
			echo "Skipping download. Using existing serverstarter-2.3.1.jar"
         java -jar serverstarter-2.3.1.jar
               if [[ $DO_RAMDISK -eq 1 ]]; then
               sudo umount $SAVE_DIR
               rm -rf $SAVE_DIR
               mv "${SAVE_DIR}_backup" $SAVE_DIR
               fi
               exit 0
	else
			export URL="https://github.com/Ocraftyone/ServerStarter-CFCorePatch/releases/download/v2.3.1/serverstarter-2.3.1.jar"
	fi
		echo $URL
		which wget >> /dev/null
		if [ $? -eq 0 ]; then
            echo "Credits Credits to AOF TEAM for the scripts to start this server"
			echo "DEBUG: (wget) Downloading ${URL}"
			wget -O serverstarter-2.3.1.jar "${URL}"
   else
			which curl >> /dev/null
			if [ $? -eq 0 ]; then
                echo "Credits Credits to AOF TEAM for the scripts to start this server"
				echo "DEBUG: (curl) Downloading ${URL}"
				curl -Lo serverstarter-2.3.1.jar "${URL}"
			else
				echo "Neither wget or curl were found on your system. Please install one and try again"
         fi
      fi
java -jar serverstarter-2.3.1.jar
if [[ $DO_RAMDISK -eq 1 ]]; then
    sudo umount $SAVE_DIR
    rm -rf $SAVE_DIR
    mv "${SAVE_DIR}_backup" $SAVE_DIR
fi
