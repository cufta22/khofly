export const SYSTEM_ART = {
  linux: `              ###          
           ###...#         
           #.......#         
           #.......##        
        #............##       
     #.................##      
  ##...............####     
&&&&#....    ....#&&&&&   
  &&&&#         #&&&& 
`,
  windows: `#########      #########
#########      #########
#########      #########
#########      #########

#########      #########
#########      #########
#########      #########
#########      #########`,
  macos: `                     +%=     
                  %@+      
       :+##*=+*#%#+.  
   *@@@@@@@@@#:  
:@@@@@@@@@:    
.@@@@@@@@@@:   
  #@@@@@@@@@@*  
    #@@@@@@@@@+  
      =%@%**#@@#:
  `,
};

export const getOsLabel = () => {
  const userAgent = navigator.userAgent;

  // Windows
  if (/Windows NT/.test(userAgent)) {
    const match = userAgent.match(/Windows NT (\d+\.\d+)/);
    if (match) {
      const majorVersion = Number.parseInt(match[1], 10);
      return `Windows ${majorVersion}`;
    }
  }

  // macOS
  if (/Macintosh/.test(userAgent)) {
    return "macOS";
  }

  // Linux
  if (/Linux/.test(userAgent)) {
    // Basic architecture detection
    if (/x86_64/.test(userAgent)) {
      return "Linux x86_64";
    } else if (/arm/.test(userAgent)) {
      return "Linux arm";
    } else {
      return "Linux";
    }
  }

  // iOS
  if (/iPhone|iPad|iPod/.test(userAgent)) {
    return "iOS";
  }

  // Android
  if (/Android/.test(userAgent)) {
    return "Android";
  }

  return "Unknown";
};

export const getBrowserLabel = () => {
  const userAgent = navigator.userAgent;
  let browserName = "Unknown";
  let version = "";

  if (userAgent.indexOf("Firefox") > -1) {
    browserName = "Firefox";
    version = userAgent.match(/Firefox\/([0-9]+)\./)?.[1] || "";
  } else if (userAgent.indexOf("Opera") > -1 || userAgent.indexOf("OPR") > -1) {
    browserName = "Opera";
    version = userAgent.match(/(Opera|OPR)\/([0-9]+)\./)?.[2] || "";
  } else if (userAgent.indexOf("Trident") > -1) {
    browserName = "Internet Explorer";
    version = userAgent.match(/rv:([0-9]+)\./)?.[1] || "";
  } else if (userAgent.indexOf("Edge") > -1) {
    browserName = "Edge";
    version = userAgent.match(/Edge\/([0-9]+)\./)?.[1] || "";
  } else if (userAgent.indexOf("Chrome") > -1) {
    browserName = "Chrome";
    version = userAgent.match(/Chrome\/([0-9]+)\./)?.[1] || "";
  } else if (userAgent.indexOf("Safari") > -1) {
    browserName = "Safari";
    version = userAgent.match(/Version\/([0-9]+)\./)?.[1] || "";
  }

  return `${browserName} ${version}`;
};
